/**
 * Expression evaluator for the subset of expr-lang used in CrowdSec parsers and scenarios.
 *
 * Supported constructs:
 *   Field access:   evt.Meta["source_ip"],  evt.Parsed.program,  evt.Line.Labels.type
 *   Comparisons:    ==  !=  <  <=  >  >=
 *   Logic:          &&  ||  !
 *   Membership:     x in ["a","b","c"]   (also: "a" in evt.Meta)
 *   String:         startsWith  endsWith  contains  matches (regex)
 *   Ternary:        cond ? a : b
 *   Functions:      len()  Upper()  Lower()  IpInRange()  KeyExists()
 *   String concat:  +
 *   Arithmetic:     + - * /
 */
/**
 * Evaluate an expr-lang expression against an event context.
 * env should at minimum be { evt: event }.
 * Returns the result, or undefined on error.
 */
export function evalExpr(expression, env) {
    try {
        const tokens = tokenize(expression);
        const parser = new ExprParser(tokens);
        const ast = parser.parseExpr();
        return evalNode(ast, env);
    }
    catch (e) {
        // Silently return undefined on eval errors (mirrors Go behaviour of logging and continuing)
        return undefined;
    }
}
/** Evaluate to a boolean. Returns false on error. */
export function evalBool(expression, env) {
    const result = evalExpr(expression, env);
    return !!result;
}
/** Evaluate to a string. Returns '' on error/non-string. */
export function evalString(expression, env) {
    const result = evalExpr(expression, env);
    if (result == null)
        return '';
    return String(result);
}
function tokenize(src) {
    const tokens = [];
    let i = 0;
    while (i < src.length) {
        const ch = src[i];
        // Whitespace
        if (/\s/.test(ch)) {
            i++;
            continue;
        }
        // Numbers
        if (/[0-9]/.test(ch) || (ch === '-' && /[0-9]/.test(src[i + 1] ?? ''))) {
            let j = i;
            if (src[j] === '-')
                j++;
            while (j < src.length && /[0-9.]/.test(src[j]))
                j++;
            tokens.push({ kind: 'NUM', value: src.slice(i, j) });
            i = j;
            continue;
        }
        // Strings
        if (ch === '"' || ch === "'") {
            const quote = ch;
            let j = i + 1;
            let s = '';
            while (j < src.length && src[j] !== quote) {
                if (src[j] === '\\' && j + 1 < src.length) {
                    s += src[j + 1];
                    j += 2;
                }
                else {
                    s += src[j++];
                }
            }
            tokens.push({ kind: 'STR', value: s });
            i = j + 1;
            continue;
        }
        // Multi-char operators
        if (src[i] === '!' && src[i + 1] === '=') {
            tokens.push({ kind: 'NEQ', value: '!=' });
            i += 2;
            continue;
        }
        if (src[i] === '=' && src[i + 1] === '=') {
            tokens.push({ kind: 'EQ', value: '==' });
            i += 2;
            continue;
        }
        if (src[i] === '<' && src[i + 1] === '=') {
            tokens.push({ kind: 'LTE', value: '<=' });
            i += 2;
            continue;
        }
        if (src[i] === '>' && src[i + 1] === '=') {
            tokens.push({ kind: 'GTE', value: '>=' });
            i += 2;
            continue;
        }
        if (src[i] === '&' && src[i + 1] === '&') {
            tokens.push({ kind: 'AND', value: '&&' });
            i += 2;
            continue;
        }
        if (src[i] === '|' && src[i + 1] === '|') {
            tokens.push({ kind: 'OR', value: '||' });
            i += 2;
            continue;
        }
        // Single-char operators
        if (ch === '<') {
            tokens.push({ kind: 'LT', value: '<' });
            i++;
            continue;
        }
        if (ch === '>') {
            tokens.push({ kind: 'GT', value: '>' });
            i++;
            continue;
        }
        if (ch === '!') {
            tokens.push({ kind: 'NOT', value: '!' });
            i++;
            continue;
        }
        if (ch === '.') {
            tokens.push({ kind: 'DOT', value: '.' });
            i++;
            continue;
        }
        if (ch === '[') {
            tokens.push({ kind: 'LBRACKET', value: '[' });
            i++;
            continue;
        }
        if (ch === ']') {
            tokens.push({ kind: 'RBRACKET', value: ']' });
            i++;
            continue;
        }
        if (ch === '(') {
            tokens.push({ kind: 'LPAREN', value: '(' });
            i++;
            continue;
        }
        if (ch === ')') {
            tokens.push({ kind: 'RPAREN', value: ')' });
            i++;
            continue;
        }
        if (ch === ',') {
            tokens.push({ kind: 'COMMA', value: ',' });
            i++;
            continue;
        }
        if (ch === '?') {
            tokens.push({ kind: 'QUESTION', value: '?' });
            i++;
            continue;
        }
        if (ch === ':') {
            tokens.push({ kind: 'COLON', value: ':' });
            i++;
            continue;
        }
        if (ch === '+') {
            tokens.push({ kind: 'PLUS', value: '+' });
            i++;
            continue;
        }
        if (ch === '-') {
            tokens.push({ kind: 'MINUS', value: '-' });
            i++;
            continue;
        }
        if (ch === '*') {
            tokens.push({ kind: 'STAR', value: '*' });
            i++;
            continue;
        }
        if (ch === '/') {
            tokens.push({ kind: 'SLASH', value: '/' });
            i++;
            continue;
        }
        if (ch === '%') {
            tokens.push({ kind: 'PERCENT', value: '%' });
            i++;
            continue;
        }
        // Identifiers / keywords
        if (/[a-zA-Z_]/.test(ch)) {
            let j = i;
            while (j < src.length && /[a-zA-Z0-9_]/.test(src[j]))
                j++;
            const word = src.slice(i, j);
            if (word === 'true') {
                tokens.push({ kind: 'BOOL', value: 'true' });
                i = j;
                continue;
            }
            if (word === 'false') {
                tokens.push({ kind: 'BOOL', value: 'false' });
                i = j;
                continue;
            }
            if (word === 'nil' || word === 'null') {
                tokens.push({ kind: 'NULL', value: word });
                i = j;
                continue;
            }
            if (word === 'in') {
                // look ahead: "not in" is NOTIN
                tokens.push({ kind: 'IN', value: 'in' });
                i = j;
                continue;
            }
            if (word === 'not') {
                // could be "not in"
                let k = j;
                while (k < src.length && src[k] === ' ')
                    k++;
                if (src.slice(k, k + 2) === 'in') {
                    tokens.push({ kind: 'NOTIN', value: 'not in' });
                    i = k + 2;
                    continue;
                }
                tokens.push({ kind: 'NOT', value: 'not' });
                i = j;
                continue;
            }
            tokens.push({ kind: 'IDENT', value: word });
            i = j;
            continue;
        }
        // Unknown char: skip
        i++;
    }
    tokens.push({ kind: 'EOF', value: '' });
    return tokens;
}
// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------
class ExprParser {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }
    peek() { return this.tokens[this.pos]; }
    consume() { return this.tokens[this.pos++]; }
    expect(kind) {
        const t = this.consume();
        if (t.kind !== kind)
            throw new Error(`Expected ${kind}, got ${t.kind} (${t.value})`);
        return t;
    }
    parseExpr() {
        return this.parseTernary();
    }
    parseTernary() {
        const cond = this.parseOr();
        if (this.peek().kind === 'QUESTION') {
            this.consume();
            const then = this.parseExpr();
            this.expect('COLON');
            const else_ = this.parseExpr();
            return { t: 'ternary', cond, then, else_ };
        }
        return cond;
    }
    parseOr() {
        let left = this.parseAnd();
        while (this.peek().kind === 'OR') {
            this.consume();
            left = { t: 'binary', op: '||', left, right: this.parseAnd() };
        }
        return left;
    }
    parseAnd() {
        let left = this.parseNot();
        while (this.peek().kind === 'AND') {
            this.consume();
            left = { t: 'binary', op: '&&', left, right: this.parseNot() };
        }
        return left;
    }
    parseNot() {
        if (this.peek().kind === 'NOT') {
            this.consume();
            return { t: 'unary', op: '!', expr: this.parseNot() };
        }
        return this.parseComparison();
    }
    parseComparison() {
        let left = this.parseInExpr();
        const ops = ['EQ', 'NEQ', 'LT', 'LTE', 'GT', 'GTE'];
        while (ops.includes(this.peek().kind)) {
            const op = this.consume().value;
            left = { t: 'binary', op, left, right: this.parseInExpr() };
        }
        return left;
    }
    parseInExpr() {
        let left = this.parseAddSub();
        if (this.peek().kind === 'IN') {
            this.consume();
            return { t: 'binary', op: 'in', left, right: this.parseAddSub() };
        }
        if (this.peek().kind === 'NOTIN') {
            this.consume();
            return { t: 'unary', op: '!', expr: { t: 'binary', op: 'in', left, right: this.parseAddSub() } };
        }
        return left;
    }
    parseAddSub() {
        let left = this.parseMulDiv();
        while (this.peek().kind === 'PLUS' || this.peek().kind === 'MINUS') {
            const op = this.consume().value;
            left = { t: 'binary', op, left, right: this.parseMulDiv() };
        }
        return left;
    }
    parseMulDiv() {
        let left = this.parseUnary();
        while (['STAR', 'SLASH', 'PERCENT'].includes(this.peek().kind)) {
            const op = this.consume().value;
            left = { t: 'binary', op, left, right: this.parseUnary() };
        }
        return left;
    }
    parseUnary() {
        if (this.peek().kind === 'MINUS') {
            this.consume();
            return { t: 'unary', op: '-', expr: this.parsePostfix() };
        }
        return this.parsePostfix();
    }
    parsePostfix() {
        let node = this.parsePrimary();
        while (true) {
            if (this.peek().kind === 'DOT') {
                this.consume();
                const name = this.expect('IDENT').value;
                // Method call?
                if (this.peek().kind === 'LPAREN') {
                    this.consume();
                    const args = this.parseArgList();
                    this.expect('RPAREN');
                    node = { t: 'method', obj: node, method: name, args };
                }
                else {
                    node = { t: 'field', obj: node, key: { t: 'str', v: name } };
                }
            }
            else if (this.peek().kind === 'LBRACKET') {
                this.consume();
                const key = this.parseExpr();
                this.expect('RBRACKET');
                node = { t: 'field', obj: node, key };
            }
            else {
                break;
            }
        }
        return node;
    }
    parseArgList() {
        const args = [];
        if (this.peek().kind === 'RPAREN')
            return args;
        args.push(this.parseExpr());
        while (this.peek().kind === 'COMMA') {
            this.consume();
            args.push(this.parseExpr());
        }
        return args;
    }
    parsePrimary() {
        const t = this.peek();
        if (t.kind === 'NUM') {
            this.consume();
            return { t: 'num', v: parseFloat(t.value) };
        }
        if (t.kind === 'STR') {
            this.consume();
            return { t: 'str', v: t.value };
        }
        if (t.kind === 'BOOL') {
            this.consume();
            return { t: 'bool', v: t.value === 'true' };
        }
        if (t.kind === 'NULL') {
            this.consume();
            return { t: 'null' };
        }
        if (t.kind === 'LPAREN') {
            this.consume();
            const node = this.parseExpr();
            this.expect('RPAREN');
            return node;
        }
        if (t.kind === 'LBRACKET') {
            this.consume();
            const items = [];
            if (this.peek().kind !== 'RBRACKET') {
                items.push(this.parseExpr());
                while (this.peek().kind === 'COMMA') {
                    this.consume();
                    items.push(this.parseExpr());
                }
            }
            this.expect('RBRACKET');
            return { t: 'array', items };
        }
        if (t.kind === 'IDENT') {
            this.consume();
            // function call?
            if (this.peek().kind === 'LPAREN') {
                this.consume();
                const args = this.parseArgList();
                this.expect('RPAREN');
                return { t: 'call', fn: t.value, args };
            }
            return { t: 'ident', v: t.value };
        }
        // Fallback: skip unknown token
        this.consume();
        return { t: 'null' };
    }
}
// ---------------------------------------------------------------------------
// Evaluator
// ---------------------------------------------------------------------------
function evalNode(node, env) {
    switch (node.t) {
        case 'num': return node.v;
        case 'str': return node.v;
        case 'bool': return node.v;
        case 'null': return null;
        case 'ident': {
            if (node.v in env)
                return env[node.v];
            return undefined;
        }
        case 'field': {
            const obj = evalNode(node.obj, env);
            const key = evalNode(node.key, env);
            if (obj == null)
                return undefined;
            if (typeof key === 'string' || typeof key === 'number') {
                return obj[key];
            }
            return undefined;
        }
        case 'array': {
            return node.items.map(item => evalNode(item, env));
        }
        case 'unary': {
            if (node.op === '!')
                return !evalNode(node.expr, env);
            if (node.op === '-')
                return -evalNode(node.expr, env);
            return undefined;
        }
        case 'ternary': {
            return evalNode(node.cond, env) ? evalNode(node.then, env) : evalNode(node.else_, env);
        }
        case 'call': {
            return evalBuiltinCall(node.fn, node.args.map(a => evalNode(a, env)), env);
        }
        case 'method': {
            const obj = evalNode(node.obj, env);
            const args = node.args.map(a => evalNode(a, env));
            return evalMethod(node.method, obj, args);
        }
        case 'binary': {
            const op = node.op;
            // Short-circuit for && and ||
            if (op === '&&')
                return !!evalNode(node.left, env) && !!evalNode(node.right, env);
            if (op === '||')
                return !!evalNode(node.left, env) || !!evalNode(node.right, env);
            const left = evalNode(node.left, env);
            const right = evalNode(node.right, env);
            if (op === 'in') {
                if (Array.isArray(right))
                    return right.includes(left);
                if (typeof right === 'object' && right !== null)
                    return left in right;
                if (typeof right === 'string')
                    return right.includes(left);
                return false;
            }
            if (op === '==')
                return left === right || String(left) === String(right);
            if (op === '!=')
                return left !== right && String(left) !== String(right);
            if (op === '<')
                return left < right;
            if (op === '<=')
                return left <= right;
            if (op === '>')
                return left > right;
            if (op === '>=')
                return left >= right;
            if (op === '+') {
                if (typeof left === 'string' || typeof right === 'string')
                    return String(left ?? '') + String(right ?? '');
                return left + right;
            }
            if (op === '-')
                return left - right;
            if (op === '*')
                return left * right;
            if (op === '/')
                return right !== 0 ? left / right : 0;
            if (op === '%')
                return left % right;
            return undefined;
        }
    }
}
function evalMethod(method, obj, args) {
    if (typeof obj === 'string') {
        if (method === 'startsWith')
            return obj.startsWith(args[0]);
        if (method === 'endsWith')
            return obj.endsWith(args[0]);
        if (method === 'contains')
            return obj.includes(args[0]);
        if (method === 'matches') {
            try {
                return new RegExp(args[0]).test(obj);
            }
            catch {
                return false;
            }
        }
        if (method === 'hasPrefix')
            return obj.startsWith(args[0]);
        if (method === 'hasSuffix')
            return obj.endsWith(args[0]);
        if (method === 'toLower')
            return obj.toLowerCase();
        if (method === 'toUpper')
            return obj.toUpperCase();
        if (method === 'trimSpace')
            return obj.trim();
        if (method === 'len')
            return obj.length;
    }
    if (Array.isArray(obj)) {
        if (method === 'len')
            return obj.length;
    }
    // Map contains check: "key" in map → map.contains("key") equiv
    if (typeof obj === 'object' && obj !== null) {
        if (method === 'contains')
            return args[0] in obj;
    }
    return undefined;
}
function evalBuiltinCall(fn, args, env = {}) {
    switch (fn) {
        case 'len': {
            const v = args[0];
            if (typeof v === 'string')
                return v.length;
            if (Array.isArray(v))
                return v.length;
            if (typeof v === 'object' && v !== null)
                return Object.keys(v).length;
            return 0;
        }
        case 'Upper': return typeof args[0] === 'string' ? args[0].toUpperCase() : '';
        case 'Lower': return typeof args[0] === 'string' ? args[0].toLowerCase() : '';
        case 'string': return String(args[0] ?? '');
        case 'int': return parseInt(String(args[0] ?? '0'), 10);
        case 'float': return parseFloat(String(args[0] ?? '0'));
        case 'KeyExists': {
            const key = args[0];
            const map = args[1];
            if (!map || typeof map !== 'object')
                return false;
            return key in map;
        }
        case 'IpInRange': {
            const ip = args[0];
            const cidr = args[1];
            return ipInRange(ip, cidr);
        }
        case 'ToString': return String(args[0] ?? '');
        case 'Atof': return parseFloat(String(args[0] ?? '0'));
        case 'sprintf':
        case 'Sprintf': {
            // Basic sprintf: replace %s, %d, %f
            let fmt = String(args[0] ?? '');
            let i = 1;
            fmt = fmt.replace(/%[sdf]/g, () => String(args[i++] ?? ''));
            return fmt;
        }
        // UnmarshalJSON(jsonStr, targetMap, key) — parses JSON into targetMap[key],
        // returns "" on success (or the error string on failure), matching Go behaviour.
        case 'UnmarshalJSON': {
            const jsonStr = String(args[0] ?? '');
            // args[1] is the live Unmarshaled map object from the event (passed by reference)
            const targetMap = args[1];
            const key = String(args[2] ?? '');
            try {
                const parsed = JSON.parse(jsonStr);
                // Write into the event's Unmarshaled map if we can reach it
                const evt = env['evt'];
                if (evt && typeof evt['Unmarshaled'] === 'object' && evt['Unmarshaled'] !== null) {
                    evt['Unmarshaled'][key] = parsed;
                }
                else if (targetMap && typeof targetMap === 'object') {
                    targetMap[key] = parsed;
                }
                return ''; // success: empty string, so `in ["", nil]` is true
            }
            catch {
                return 'parse error';
            }
        }
        default: return undefined;
    }
}
/** Minimal CIDR range check — supports IPv4 only for now */
function ipInRange(ip, cidr) {
    try {
        const [rangeIp, prefixLen] = cidr.split('/');
        const prefix = parseInt(prefixLen, 10);
        if (isNaN(prefix))
            return false;
        const ipNum = ipToNum(ip);
        const rangeNum = ipToNum(rangeIp);
        if (ipNum === null || rangeNum === null)
            return false;
        const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
        return (ipNum & mask) === (rangeNum & mask);
    }
    catch {
        return false;
    }
}
function ipToNum(ip) {
    const parts = ip.split('.');
    if (parts.length !== 4)
        return null;
    const nums = parts.map(Number);
    if (nums.some(isNaN))
        return null;
    return ((nums[0] << 24) | (nums[1] << 16) | (nums[2] << 8) | nums[3]) >>> 0;
}

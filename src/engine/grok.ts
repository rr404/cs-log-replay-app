/**
 * Grok engine — named regex macro expansion.
 *
 * A grok pattern looks like: %{PATTERN_NAME:field_name} or %{PATTERN_NAME}
 * They expand recursively into raw regex, with named capture groups for fields.
 *
 * This mirrors the behaviour of github.com/crowdsecurity/grokky which CrowdSec uses.
 */

export class GrokEngine {
  // Map of pattern name → raw regex string (before expansion)
  private patterns: Map<string, string> = new Map()
  // Compiled regex cache: pattern expression → RegExp
  private compiled: Map<string, RegExp> = new Map()

  constructor() {
    this.loadBuiltins()
  }

  /** Load a block of pattern definitions in Logstash/grok format:
   *  PATTERN_NAME  regex_or_grok_expression
   *  Lines starting with # or empty are skipped.
   */
  loadPatternText(text: string): void {
    for (const line of text.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const spaceIdx = trimmed.search(/\s/)
      if (spaceIdx === -1) continue
      const name = trimmed.slice(0, spaceIdx)
      const value = trimmed.slice(spaceIdx).trim()
      this.patterns.set(name, value)
    }
  }

  /** Add / override a single named pattern */
  addPattern(name: string, value: string): void {
    this.patterns.set(name, value)
    // Clear any compiled cache entries that might reference this name
    this.compiled.clear()
  }

  /**
   * Compile a grok expression to a JS RegExp.
   * Named captures (%{PATTERN:field}) become named capture groups (?<field>...).
   * Returns the RegExp.
   */
  compile(expr: string): RegExp {
    const cached = this.compiled.get(expr)
    if (cached) return cached

    const re = this.buildRegex(expr)
    this.compiled.set(expr, re)
    return re
  }

  private buildRegex(expr: string): RegExp {
    // seenFields tracks how many times each field name has appeared so we can
    // deduplicate: JS named groups must be unique within a pattern, but Go RE2
    // (used by grokky) allows duplicates in alternation branches.
    const seenFields = new Map<string, number>()
    const pattern = this.expandWithCaptures(expr, 0, seenFields)
    try {
      return new RegExp(pattern, 's') // dotAll so . matches newlines in multiline logs
    } catch (e) {
      console.warn(`Grok compile error for pattern "${expr}":`, e)
      return /(?!)/  // never-matches sentinel
    }
  }

  /**
   * Expand grok, emitting (?<field>...) for %{PAT:field} references.
   * We do a single pass, and for each %{PAT:field} we wrap the expanded pattern
   * in a named group. %{PAT} with no field is expanded inline without a group.
   *
   * JS regex does not allow duplicate named capture groups (unlike Go RE2).
   * When the same field name appears more than once, we suffix duplicates with
   * __1, __2, … and strip the suffix back out in matchRegex() / match().
   */
  private expandWithCaptures(expr: string, depth: number, seenFields: Map<string, number>): string {
    if (depth > 20) return '.*?' // guard against infinite recursion

    let result = ''
    let i = 0
    while (i < expr.length) {
      const start = expr.indexOf('%{', i)
      if (start === -1) {
        result += this.escapeNonGrok(expr.slice(i))
        break
      }
      result += this.escapeNonGrok(expr.slice(i, start))
      const end = expr.indexOf('}', start)
      if (end === -1) {
        result += this.escapeNonGrok(expr.slice(start))
        break
      }
      const inner = expr.slice(start + 2, end)
      const parts = inner.split(':')
      const name = parts[0]
      const field = parts[1] // may be undefined

      const raw = this.patterns.get(name) ?? '.*?'
      // Recursively expand the referenced pattern (share the seenFields map so
      // duplicates are tracked across the entire top-level pattern)
      const expanded = this.expandWithCaptures(raw, depth + 1, seenFields)

      if (field) {
        // Sanitize field name for JS named group (replace hyphens etc.)
        const safeField = field.replace(/[^a-zA-Z0-9_]/g, '_')
        const count = seenFields.get(safeField) ?? 0
        seenFields.set(safeField, count + 1)
        // First occurrence uses the plain name; duplicates get __N suffix
        const groupName = count === 0 ? safeField : `${safeField}__${count}`
        result += `(?<${groupName}>${expanded})`
      } else {
        result += `(?:${expanded})`
      }
      i = end + 1
    }
    return result
  }

  /**
   * In the literal parts of a grok pattern (between %{...} tokens) we must NOT
   * re-escape regex metacharacters — the pattern author already wrote raw regex there.
   * We only need to leave it as-is.
   */
  private escapeNonGrok(s: string): string {
    return s
  }

  /** Execute a compiled regex against input. Returns captured fields or null. */
  match(expr: string, input: string): Record<string, string> | null {
    const re = this.compile(expr)
    const m = re.exec(input)
    if (!m) return null
    return normalizeGroups(m.groups ?? {})
  }

  /** Execute a pre-compiled RegExp against input */
  matchRegex(re: RegExp, input: string): Record<string, string> | null {
    const m = re.exec(input)
    if (!m) return null
    return normalizeGroups(m.groups ?? {})
  }

  private loadBuiltins(): void {
    // Core grok primitives — a subset of the standard Logstash patterns
    // that covers the vast majority of CrowdSec parsers.
    const builtins = `
USERNAME [a-zA-Z0-9._-]+
USER %{USERNAME}
INT (?:[+-]?(?:[0-9]+))
BASE10NUM (?:[+-]?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+)))
NUMBER (?:%{BASE10NUM})
BASE16NUM (?:0[xX]?[0-9a-fA-F]+)
BASE16FLOAT (?:[+-]?(?:0x)?(?:(?:[0-9a-fA-F]+(?:\\.[0-9a-fA-F]*)?)|(?:\\.[0-9a-fA-F]+)))
POSINT \\b(?:[1-9][0-9]*)\\b
NONNEGINT \\b(?:[0-9]+)\\b
WORD \\b\\w+\\b
NOTSPACE \\S+
SPACE \\s*
DATA .*?
GREEDYDATA .*
QUOTEDSTRING "(?:[^"\\\\]|\\\\.)*"
NOTDQUOTE [^"]*
UUID [A-Fa-f0-9]{8}-(?:[A-Fa-f0-9]{4}-){3}[A-Fa-f0-9]{12}
BOOL (?:true|false)
LOGLEVEL (?:[Aa]lert|ALERT|[Tt]race|TRACE|[Dd]ebug|DEBUG|[Nn]otice|NOTICE|[Ii]nfo|INFO|[Ww]arning|WARNING|[Ee]rror|ERROR|[Cc]ritical|CRITICAL|[Ff]atal|FATAL|[Ss]evere|SEVERE|[Ee]merg|EMERG)
# Networking
CISCOMAC (?:[A-Fa-f0-9]{4}\\.){2}[A-Fa-f0-9]{4}
WINDOWSMAC (?:[A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}
COMMONMAC (?:[A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}
MAC (?:%{CISCOMAC}|%{WINDOWSMAC}|%{COMMONMAC})
IPV6 (?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?::[0-9A-Fa-f]{1,4}){1,6}|:(?::[0-9A-Fa-f]{1,4}){1,7}|::(?:[fF]{4}(?::0{1,4})?:)?(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])(?:\\.(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])){3}|(?:[0-9A-Fa-f]{1,4}:){1,4}:(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])(?:\\.(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])){3})
IPV4 (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
IP (?:%{IPV6}|%{IPV4})
IPORHOST (?:%{IP}|%{HOSTNAME})
HOSTNAME \\b(?:[0-9A-Za-z][0-9A-Za-z-]{0,62})(?:\\.(?:[0-9A-Za-z][0-9A-Za-z-]{0,62}))*\\.?\\b
HOST %{HOSTNAME}
HOSTPORT %{IPORHOST}:%{POSINT}
# Paths
UNIXPATH (?:/[\\w_%!$@:.,+\\-]*)+
WINPATH (?:[A-Za-z]+:|\\\\)(?:\\\\[^\\\\?*]*)+
PATH (?:%{UNIXPATH}|%{WINPATH})
# URIs
URIPROTO [A-Za-z][A-Za-z0-9+\\-.]+
URIHOST %{IPORHOST}(?::%{POSINT})?
URIPATH (?:/[A-Za-z0-9$.+!*'(){},~:;=@#%&_\\-]*)+
URIPARAM \\?[A-Za-z0-9$.+!*'|(){},~@#%&/=:;_?\\-\\[\\]<>]*
URIPATHPARAM %{URIPATH}(?:%{URIPARAM})?
URI %{URIPROTO}://(?:%{USER}(?::[^@]*)?@)?(?:%{URIHOST})?(?:%{URIPATH}(?:%{URIPARAM})?)?
# Dates & times
MONTH \\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\b
MONTHNUM (?:0?[1-9]|1[0-2])
MONTHNUM2 (?:0[1-9]|1[0-2])
MONTHDAY (?:(?:0[1-9])|(?:[12][0-9])|(?:3[01])|[1-9])
DAY (?:Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?)
YEAR (?:\\d\\d){1,2}
HOUR (?:2[0123]|[01]?[0-9])
MINUTE (?:[0-5][0-9])
SECOND (?:(?:[0-5]?[0-9]|60)(?:[:.,][0-9]+)?)
TIME (?:%{HOUR}:%{MINUTE}(?::%{SECOND}))
DATE_US %{MONTHNUM}[/-]%{MONTHDAY}[/-]%{YEAR}
DATE_EU %{MONTHDAY}[./-]%{MONTHNUM}[./-]%{YEAR}
ISO8601_TIMEZONE (?:Z|[+-]%{HOUR}:?%{MINUTE})
ISO8601_SECOND (?:%{SECOND}|60)
TIMESTAMP_ISO8601 %{YEAR}-%{MONTHNUM2}-%{MONTHDAY}[T ]%{HOUR}:?%{MINUTE}(?::?%{ISO8601_SECOND})?%{ISO8601_TIMEZONE}?
DATE %{DATE_US}|%{DATE_EU}
DATESTAMP %{DATE}[- ]%{TIME}
TZ (?:[APMCE][SD]T|UTC)
DATESTAMP_RFC822 %{DAY} %{MONTH} %{MONTHDAY} %{YEAR} %{TIME} %{TZ}
DATESTAMP_RFC2822 %{DAY}, %{MONTHDAY} %{MONTH} %{YEAR} %{TIME} %{ISO8601_TIMEZONE}
DATESTAMP_OTHER %{DAY} %{MONTH} %{MONTHDAY} %{TIME} %{TZ} %{YEAR}
DATESTAMP_EVENTLOG %{YEAR}%{MONTHNUM2}%{MONTHDAY}%{HOUR}%{MINUTE}%{SECOND}
HTTPDATE %{MONTHDAY}/%{MONTH}/%{YEAR}:%{TIME} %{INT}
# Syslog
SYSLOGTIMESTAMP %{MONTH} +%{MONTHDAY} %{TIME}
PROG (?:[\\w._/%-]+)
SYSLOGPROG %{PROG:program}(?:\\[%{POSINT:pid}\\])?
SYSLOGHOST %{IPORHOST}
SYSLOGFACILITY <%{NONNEGINT:facility}(?:\\.%{NONNEGINT:priority})?>
SYSLOGBASE %{SYSLOGTIMESTAMP:timestamp} (?:%{SYSLOGFACILITY} )?%{SYSLOGHOST:logsource} %{SYSLOGPROG}:
SYSLOGBASE2 (?:%{SYSLOGTIMESTAMP:timestamp}|%{TIMESTAMP_ISO8601:timestamp8601}) (?:%{SYSLOGFACILITY} )?%{SYSLOGHOST:logsource}+(?: %{SYSLOGPROG}:|)
SYSLOGLINE %{SYSLOGBASE2} %{GREEDYDATA:message}
# HTTP
NGINXERRTIME %{YEAR}/%{MONTHNUM2}/%{MONTHDAY} %{TIME}
# SSH
SSHD_FAIL Failed %{WORD:sshd_auth_type} for %{USERNAME:sshd_invalid_user} from %{IP:sshd_client_ip} port %{NUMBER:sshd_port} %{WORD:sshd_protocol}
SSHD_SUCCESS Accepted %{WORD:sshd_auth_type} for %{USERNAME:sshd_user} from %{IP:sshd_client_ip} port %{NUMBER:sshd_port} %{WORD:sshd_protocol}
SSHD_DISCONNECT Received disconnect from %{IP:sshd_client_ip} port %{NUMBER:sshd_port}:%{NUMBER}:%{GREEDYDATA}
SSHD_CONN_CLOSE Connection closed by %{IP:sshd_client_ip}
`
    this.loadPatternText(builtins)
  }
}

/**
 * Strip the __N deduplication suffix from named capture group keys.
 * e.g. { program: 'foo', program__1: undefined } → { program: 'foo' }
 * When multiple variants captured the same field, the first non-undefined value wins.
 */
function normalizeGroups(groups: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, val] of Object.entries(groups)) {
    const canonical = key.replace(/__\d+$/, '')
    // First defined value for this canonical name wins
    if (!(canonical in out) || (val !== undefined && val !== '')) {
      out[canonical] = val
    }
  }
  return out
}

// Singleton instance shared across the app
export const grokEngine = new GrokEngine()

// Load the bundled CrowdSec pattern files (imported statically so Vite bundles them)
import { CROWDSEC_PATTERNS } from '../data/patterns'
grokEngine.loadPatternText(CROWDSEC_PATTERNS)

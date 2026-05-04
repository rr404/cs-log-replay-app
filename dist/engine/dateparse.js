/**
 * Date parsing — a port of pkg/parser/enrich_date.go's GenDateParse.
 *
 * Go's time.Parse uses a reference time (Mon Jan 2 15:04:05 MST 2006).
 * We translate each Go layout to a JS date-fns / manual regex approach
 * since the JS Date constructor handles many formats already.
 *
 * We try formats in the same order as the Go source, falling back to
 * unix timestamp parsing (ParseUnixTime equivalent).
 */
/** All date format patterns in the same order as GenDateParse in Go */
const MONTH_MAP = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
    January: 1, February: 2, March: 3, April: 4, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};
/** Parse a string into a Date, trying multiple formats.
 *  Returns null if nothing matched. */
export function genDateParse(s) {
    s = s.trim();
    if (!s)
        return null;
    // 1. time.RFC3339: "2006-01-02T15:04:05Z07:00"
    // 2. "2006-01-02T15:04:05Z07:00" (duplicate in Go, same)
    // 3. ISO 8601 variants — JS Date handles these natively
    const iso = tryISO(s);
    if (iso)
        return iso;
    // 4. "02/Jan/2006:15:04:05 -0700"  (nginx / apache combined log)
    const apacheDate = tryApache(s);
    if (apacheDate)
        return apacheDate;
    // 5. "Mon Jan 2 15:04:05 2006"
    const unix = tryUnixAsctime(s);
    if (unix)
        return unix;
    // 6. "Jan  2 15:04:05"  (syslog timestamp, no year)
    const syslog = trySyslog(s);
    if (syslog)
        return syslog;
    // 7. Various "2006-01-02" style
    const ymd = tryYMD(s);
    if (ymd)
        return ymd;
    // 8. Unix timestamp (integer or float seconds)
    const unixTs = tryUnixTimestamp(s);
    if (unixTs)
        return unixTs;
    return null;
}
function toISO(d) {
    if (isNaN(d.getTime()))
        return null;
    return { iso: d.toISOString(), date: d };
}
function tryISO(s) {
    // Matches: 2006-01-02T15:04:05[.nnn][Z|+00:00]
    //           2006-01-02 15:04:05
    //           2006-01-02T15:04:05
    //           2006/01/02
    //           2006-01-02
    if (/^\d{4}[-\/]\d{2}[-\/]\d{2}/.test(s)) {
        const normalized = s.replace(/\//g, '-');
        const d = new Date(normalized);
        return toISO(d);
    }
    return null;
}
function tryApache(s) {
    // "02/Jan/2006:15:04:05 -0700"
    const m = s.match(/^(\d{2})\/(\w{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2})\s*([+-]\d{4})?/);
    if (!m)
        return null;
    const mon = MONTH_MAP[m[2]];
    if (!mon)
        return null;
    const tz = m[7] ? m[7].slice(0, 3) + ':' + m[7].slice(3) : 'Z';
    const iso = `${m[3]}-${String(mon).padStart(2, '0')}-${m[1]}T${m[4]}:${m[5]}:${m[6]}${tz}`;
    return toISO(new Date(iso));
}
function tryUnixAsctime(s) {
    // "Mon Jan  2 15:04:05 2006" or "Mon Jan 02 15:04:05.000000 2006"
    const m = s.match(/^\w{3}\s+(\w{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?\s+(\d{4})/);
    if (!m)
        return null;
    const mon = MONTH_MAP[m[1]];
    if (!mon)
        return null;
    const iso = `${m[6]}-${String(mon).padStart(2, '0')}-${m[2].padStart(2, '0')}T${m[3]}:${m[4]}:${m[5]}Z`;
    return toISO(new Date(iso));
}
function trySyslog(s) {
    // "Jan  2 15:04:05" or "Jan 02 15:04:05"
    const m = s.match(/^(\w{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})/);
    if (!m)
        return null;
    const mon = MONTH_MAP[m[1]];
    if (!mon)
        return null;
    const year = new Date().getUTCFullYear();
    const iso = `${year}-${String(mon).padStart(2, '0')}-${m[2].padStart(2, '0')}T${m[3]}:${m[4]}:${m[5]}Z`;
    return toISO(new Date(iso));
}
function tryYMD(s) {
    // "01/02/2006 15:04:05" (US format MM/DD/YYYY)
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?/);
    if (!m)
        return null;
    const time = m[4] ? `T${m[4]}:${m[5]}:${m[6]}Z` : 'T00:00:00Z';
    const iso = `${m[3]}-${m[1]}-${m[2]}${time}`;
    return toISO(new Date(iso));
}
function tryUnixTimestamp(s) {
    // Integer or float unix timestamp
    if (!/^\d+(\.\d+)?$/.test(s))
        return null;
    const n = parseFloat(s);
    if (isNaN(n))
        return null;
    return toISO(new Date(n * 1000));
}
/** Full ParseDate equivalent: try to parse, fall back to now */
export function parseDate(s) {
    if (s) {
        const result = genDateParse(s);
        if (result)
            return result;
    }
    const now = new Date();
    return { iso: now.toISOString(), date: now };
}

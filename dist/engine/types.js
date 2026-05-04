export function makeEvent(raw, labels = {}, src = 'user-paste') {
    return {
        Line: { Raw: raw, Src: src, Time: new Date(), Labels: labels, Module: 'file' },
        Parsed: {},
        Enriched: {},
        Unmarshaled: {},
        Meta: {},
        Stage: '',
        Process: false,
        Whitelisted: false,
        MarshaledTime: '',
        Time: new Date(),
        StrTime: '',
        StrTimeFormat: '',
        Type: 'LOG',
    };
}

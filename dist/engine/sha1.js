/**
 * Minimal SHA-1 implementation for bucket key computation.
 * Mirrors BucketFactory.BucketKey() in Go.
 */
export function sha1(input) {
    // Encode to UTF-8 bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hex = sha1Bytes(data);
    return hex;
}
function sha1Bytes(data) {
    let h0 = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;
    const orig = data.length;
    // Pre-processing: append bit '1', then zeros, then 64-bit length
    const paddedLen = orig + 1 + (((orig + 9) % 64 === 0 ? 0 : 64 - ((orig + 9) % 64))) + 8;
    const padded = new Uint8Array(paddedLen);
    padded.set(data);
    padded[orig] = 0x80;
    const bitLen = orig * 8;
    // Write 64-bit big-endian length (we only support 32-bit lengths here)
    const dv = new DataView(padded.buffer);
    dv.setUint32(paddedLen - 4, bitLen >>> 0, false);
    const w = new Uint32Array(80);
    for (let i = 0; i < paddedLen; i += 64) {
        const chunk = new DataView(padded.buffer, i, 64);
        for (let j = 0; j < 16; j++) {
            w[j] = chunk.getUint32(j * 4, false);
        }
        for (let j = 16; j < 80; j++) {
            w[j] = rotl(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
        }
        let a = h0, b = h1, c = h2, d = h3, e = h4;
        for (let j = 0; j < 80; j++) {
            let f, k;
            if (j < 20) {
                f = (b & c) | (~b & d);
                k = 0x5A827999;
            }
            else if (j < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            }
            else if (j < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            }
            else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }
            const temp = (rotl(a, 5) + f + e + k + w[j]) >>> 0;
            e = d;
            d = c;
            c = rotl(b, 30);
            b = a;
            a = temp;
        }
        h0 = (h0 + a) >>> 0;
        h1 = (h1 + b) >>> 0;
        h2 = (h2 + c) >>> 0;
        h3 = (h3 + d) >>> 0;
        h4 = (h4 + e) >>> 0;
    }
    return [h0, h1, h2, h3, h4].map(n => n.toString(16).padStart(8, '0')).join('');
}
function rotl(n, s) {
    return ((n << s) | (n >>> (32 - s))) >>> 0;
}

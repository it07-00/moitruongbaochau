export const t = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
export default { t };

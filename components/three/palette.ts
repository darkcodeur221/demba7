// Kept free of three.js imports, so components outside the lazy WebGL chunk
// can read the colours without pulling three into the page bundle.

export const LIME = "#c6f24a";
/** Must match --background: the glass refracts the scene, so it needs the page colour behind it. */
export const PAGE = "#f4f5f7";
/** Must match --surface, for scenes set on the one-step-darker sections. */
export const SURFACE = "#eceef1";

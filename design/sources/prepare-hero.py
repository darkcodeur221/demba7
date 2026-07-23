"""Hero image prep, take 2.

Fully keying out the silver background also eats the white fibre-optic streams
(they are the same brightness), which leaves black voids on a dark page. So
instead: keep the rendered background, but
  1. inpaint the three baked-in label blocks from their surroundings, and
  2. dissolve the rectangular edges with a soft elliptical alpha falloff,
so the illustration reads as floating rather than as a boxed screenshot.
"""

import sys
import numpy as np
from PIL import Image

SRC, DST = sys.argv[1], sys.argv[2]

LABEL_RECTS = [
    (560, 20, 900, 215),
    (130, 495, 375, 595),
    (1080, 495, 1470, 595),
]

img = Image.open(SRC).convert("RGB")
a = np.asarray(img).astype(np.float32)
H, W, _ = a.shape

# --- 1. Inpaint each label block by interpolating between its top and bottom
#        edge rows (the background is a smooth vertical-ish gradient). ---
for x0, y0, x1, y1 in LABEL_RECTS:
    yt, yb = max(y0 - 2, 0), min(y1 + 2, H - 1)
    top = a[yt, x0:x1, :]
    bot = a[yb, x0:x1, :]
    h = y1 - y0
    t = np.linspace(0.0, 1.0, h, dtype=np.float32)[:, None, None]
    a[y0:y1, x0:x1, :] = top[None, :, :] * (1 - t) + bot[None, :, :] * t

# --- 2. Elliptical alpha falloff so the frame edges dissolve. ---
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
nx = (xx - W / 2) / (W / 2)
ny = (yy - H / 2) / (H / 2)
r = np.sqrt(nx**2 * 0.92 + ny**2)          # slightly wider than tall
inner, outer = 0.78, 1.18
t = np.clip((r - inner) / (outer - inner), 0.0, 1.0)
fade = 1.0 - (t * t * (3 - 2 * t))          # smoothstep
alpha = (fade * 255).astype(np.uint8)

out = Image.fromarray(a.clip(0, 255).astype(np.uint8), "RGB").convert("RGBA")
out.putalpha(Image.fromarray(alpha, "L"))
out.save(DST)
print(f"saved {DST}")

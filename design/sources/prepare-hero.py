"""Turn the rendered hero illustration into a clean transparent cutout.

Keying on brightness alone also eats the white fibre-optic streams, because they
are as bright as the silver backdrop. The backdrop is however perfectly smooth
while the streams are finely textured, so the key combines low saturation with
low local variance, and only removes regions connected to the image border. The
three baked-in label blocks are knocked out too, so the labels can be rendered
as real localised HTML text in the hero component.

  python design/sources/prepare-hero.py design/sources/hero-original.png cut.png
"""

import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

SRC, DST = sys.argv[1], sys.argv[2]

S_MAX = 0.17      # background is desaturated
STD_MAX = 0.035   # ...and smooth; the streams are not
WINDOW = 9

# Verified by inspection: each rect holds only black glyphs + a line-art icon.
LABEL_RECTS = [
    (560, 20, 900, 215),     # "Systeme IA" + AI icon
    (130, 495, 375, 595),    # "data" + database icon
    (1080, 495, 1470, 595),  # "Decision" + target icon
]

img = Image.open(SRC).convert("RGB")
a = np.asarray(img).astype(np.float32) / 255.0

mx, mn = a.max(axis=2), a.min(axis=2)
sat = np.where(mx > 1e-6, (mx - mn) / np.maximum(mx, 1e-6), 0.0)

gray = a.mean(axis=2)
mean = ndimage.uniform_filter(gray, WINDOW)
mean_sq = ndimage.uniform_filter(gray * gray, WINDOW)
std = np.sqrt(np.maximum(mean_sq - mean * mean, 0.0))

candidate = (sat < S_MAX) & (std < STD_MAX)
labels, _ = ndimage.label(candidate)
border = np.concatenate([labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]])
background = np.isin(labels, [int(v) for v in np.unique(border) if v != 0])

alpha = Image.fromarray(np.where(background, 0, 255).astype(np.uint8), "L")
alpha = alpha.filter(ImageFilter.MinFilter(3))  # pull in the light fringe
draw = ImageDraw.Draw(alpha)
for rect in LABEL_RECTS:
    draw.rectangle(rect, fill=0)
alpha = alpha.filter(ImageFilter.GaussianBlur(0.8))

out = img.convert("RGBA")
out.putalpha(alpha)
out.save(DST)
print(f"saved {DST}  kept={float((np.asarray(alpha) > 10).mean()):.1%}")

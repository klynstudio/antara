#!/usr/bin/env python3
"""
Process the Antara photography.

Reads the raw Gemini drops from public/images/antara/raw/ and emits every crop
and size the site asks for. Same pipeline as scripts/build-hero-images.py, which
already does this for the Klyn hero — crop to a ratio around a chosen centre,
grade the whole set onto one palette, convert to WebP.

The grade is the point. Twenty-two separate generations will not agree on
white balance or contrast on their own; pulling them all through the same
curve is what makes them look like one commission.

Run:  python3 scripts/build-antara-images.py
"""

from pathlib import Path
from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
# Sources live outside public/ on purpose. 190MB of PNGs sitting in public/
# gets copied into dist/ on every build — it took a ten-minute build down to
# twenty seconds to move them out.
RAW = ROOT / "raw-images"
OUT = ROOT / "public" / "images"

# The ratios each slot is used at, widest first
RATIOS = {
    "hero": [("", 16 / 9, 2400)],
    "cover": [("", 3 / 2, 1800)],
    "wide": [("", 16 / 9, 2000)],
    "tall": [("", 4 / 5, 1200)],
}

# filename stem -> which treatment. Everything else falls back to "cover".
PLAN = {
    "hero": "hero",
    "studio": "wide",
    **{f"p{p}-01": "cover" for p in range(1, 6)},
    **{f"p{p}-02": "wide" for p in range(1, 6)},
    **{f"p{p}-03": "tall" for p in range(1, 6)},
    **{f"p{p}-04": "tall" for p in range(1, 6)},
}


# Gemini stamps a four-point sparkle into every frame it generates, in the same
# place each time: roughly x 0.90-0.93, y 0.81-0.87 of the image. It is subtle
# on grass and glaring on plaster. Trimming the right-hand edge removes it for
# about a tenth of the width, which is far cheaper than the fifth of the height
# it would cost to cut it off the bottom.
WATERMARK_SAFE_X = 0.885


def crop(im: Image.Image, ratio: float, cx: float = 0.5, cy: float = 0.5) -> Image.Image:
    """Largest crop of `ratio` that fits, centred on (cx, cy) as fractions."""
    im = im.crop((0, 0, int(im.width * WATERMARK_SAFE_X), im.height))
    w, h = im.size
    if w / h > ratio:
        cw, ch = int(h * ratio), h
    else:
        cw, ch = w, int(w / ratio)
    x = min(max(int(cx * w - cw / 2), 0), w - cw)
    y = min(max(int(cy * h - ch / 2), 0), h - ch)
    return im.crop((x, y, x + cw, y + ch))


def grade(im: Image.Image) -> Image.Image:
    """One curve for the whole set: slightly desaturated, gently warmed, a touch
    of contrast. Restrained on purpose — heavy grading is what makes a portfolio
    look filtered rather than photographed."""
    im = ImageEnhance.Color(im).enhance(0.9)
    im = ImageEnhance.Contrast(im).enhance(1.04)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.015)))
    b = b.point(lambda v: int(v * 0.985))
    return Image.merge("RGB", (r, g, b))


def main() -> None:
    if not RAW.exists():
        print(f"nothing to do — {RAW} does not exist")
        return

    OUT.mkdir(parents=True, exist_ok=True)
    done = 0

    for src in sorted(RAW.iterdir()):
        if src.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue

        stem = src.stem
        kind = PLAN.get(stem, "cover")
        im = Image.open(src).convert("RGB")

        for suffix, ratio, width in RATIOS[kind]:
            out = crop(im, ratio)
            height = int(width / ratio)
            out = out.resize((width, height), Image.LANCZOS)
            name = f"{stem}{suffix}.webp"
            grade(out).save(OUT / name, quality=82, method=6)
            print(f"  {src.name:16s} -> {name:16s} {width}x{height}")
            done += 1

    print(f"\n{done} images written to {OUT}")


if __name__ == "__main__":
    main()

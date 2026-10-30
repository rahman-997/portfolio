"""Render HAJAR app icons from the user's traced original emblem.
No network requests, image generation or external branding are involved.
"""
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageDraw
import cairosvg

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "brand" / "hajar-emblem.svg"
OUT = ROOT / "public" / "icons"


def build(size, name, maskable=False):
    aa = 3
    canvas = Image.new("RGBA", (size * aa, size * aa), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    border = int(size * aa * .022)
    margin = int(size * aa * (.01 if maskable else .015))
    radius = int(size * aa * .21)
    draw.rounded_rectangle(
        (margin, margin, size*aa-margin-1, size*aa-margin-1),
        radius=radius, fill=(12, 22, 27, 255),
        outline=(173, 139, 108, 180), width=max(2, border))
    logo_h = int(size*aa*(.54 if maskable else .67))
    png = cairosvg.svg2png(url=str(LOGO), output_height=logo_h)
    icon = Image.open(BytesIO(png)).convert("RGBA")
    canvas.alpha_composite(icon, ((size*aa-icon.width)//2, (size*aa-icon.height)//2))
    canvas = canvas.resize((size, size), Image.Resampling.LANCZOS).convert("RGB")
    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / name
    canvas.save(target, "PNG", optimize=True)
    print(name, target.stat().st_size)


for size, name, mask in [
    (192, "icon-192.png", False),
    (512, "icon-512.png", False),
    (512, "icon-maskable-512.png", True),
    (180, "apple-touch-icon.png", False),
]:
    build(size, name, mask)

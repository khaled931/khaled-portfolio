"""Technical crops of observed browser captures; requires Pillow, not used by the app."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

root = Path(__file__).parent
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
source = Image.open(root / "reference/approved-gallery.png").convert("RGB")
assert source.size == (1717, 916)


def browser_crop(filename, box, output):
    image = Image.open(root / filename).convert("RGB")
    assert image.size in [(1348, 926), (1363, 936)]
    # The screenshot transport downsampled some 1363x936 DPR=1 browser captures.
    # Restore the observed CSS coordinates before removing canvas and scrollbar.
    if image.size != (1363, 936):
        image = image.resize((1363, 936), Image.Resampling.LANCZOS)
    image = image.crop(box)
    image.save(root / output, quality=94)
    return image


def sheet(filename, regions, cell):
    width, height = cell
    rows = (len(regions) + 1) // 2
    image = Image.new("RGB", (2 * width + 40, rows * (height + 56) + 24), "#e7efeb")
    draw = ImageDraw.Draw(image)
    for index, (label, region) in enumerate(regions):
        x = 20 + (index % 2) * width
        y = 16 + (index // 2) * (height + 56)
        draw.text((x + 8, y), label, font=font, fill="#0b2b34")
        fitted = ImageOps.contain(region, (width - 16, height))
        image.paste(fitted, (x + (width - fitted.width) // 2, y + 34))
    image.save(root / filename, quality=93)


reference_desktop = source.crop((22, 107, 1096, 891))
reference_experience = source.crop((1125, 156, 1397, 893))
reference_projects = source.crop((1424, 156, 1696, 893))
desktop = browser_crop("desktop-overview-final.jpg", (24, 22, 1324, 936), "desktop-overview-content.jpg")
desktop_ar = browser_crop("desktop-overview-ar.jpg", (24, 22, 1324, 936), "desktop-overview-ar-content.jpg")
experience = browser_crop("mobile-experience-final.jpg", (31, 46, 406, 890), "mobile-experience-content.jpg")
projects = browser_crop("mobile-projects-final.jpg", (31, 46, 406, 890), "mobile-projects-content.jpg")
education = browser_crop("mobile-320-education.jpg", (31, 80, 336, 747), "mobile-320-education-content.jpg")
volunteering = browser_crop("mobile-430-volunteering.jpg", (31, 46, 446, 890), "mobile-430-volunteering-content.jpg")
overview = browser_crop("mobile-overview-final.jpg", (31, 46, 406, 890), "mobile-overview-content.jpg")

sheet("comparison-desktop.jpg", [
    ("Approved reference · EN / light", reference_desktop),
    ("Implemented browser · EN / light", desktop),
], (780, 590))
sheet("comparison-mobile.jpg", [
    ("Reference · Experience / AR", reference_experience), ("Browser · Experience / AR", experience),
    ("Reference · Projects / AR", reference_projects), ("Browser · Projects / AR", projects),
], (450, 880))
sheet("comparison-details.jpg", [
    ("Reference · theme / language / contact", reference_desktop.crop((845, 0, 1074, 69))),
    ("Browser · theme / language / contact", desktop.crop((1035, 0, 1300, 72))),
    ("Reference · Experience card + CTA", reference_experience.crop((8, 420, 265, 638))),
    ("Browser · Experience card + CTA", experience.crop((20, 495, 355, 755))),
    ("Reference · active room dock", reference_experience.crop((0, 661, 272, 737))),
    ("Browser · active room dock", experience.crop((0, 772, 375, 844))),
], (700, 340))
sheet("implemented-mobile-rooms.jpg", [
    ("Experience · 390 CSS px", experience), ("Projects · 390 CSS px", projects),
    ("Volunteering · 430 CSS px", volunteering), ("Education · 320 CSS px", education),
], (440, 860))

preview = Image.new("RGB", (1780, 875), "#e7efeb")
draw = ImageDraw.Draw(preview)
for label, image, x, width in [
    ("Implemented portfolio · desktop", desktop_ar, 20, 1000),
    ("Phone · Experience", experience, 1040, 345),
    ("Phone · Projects", projects, 1405, 345),
]:
    draw.text((x + 4, 20), label, font=font, fill="#0b2b34")
    image = ImageOps.contain(image, (width, 795))
    preview.paste(image, (x, 56))
preview.save(root / "implementation-preview.jpg", quality=94)
print("Saved normalized comparisons and actual-browser preview.")

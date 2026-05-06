import sys
from PIL import Image, ImageOps

img_path = '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/media__1777356574615.png'
img = Image.open(img_path).convert('RGB')
print(f"Original size: {img.size}")

# The image has a dark blue background. We want the white rounded rectangle.
# Let's crop to the white area.
gray = img.convert('L')
# threshold for white-ish
bw = gray.point(lambda x: 255 if x > 200 else 0, mode='1')
bbox = bw.getbbox()
print(f"White area bounding box: {bbox}")

if bbox:
    cropped = img.crop(bbox)
    cropped.save('cropped_label.png')
    print("Saved cropped_label.png")

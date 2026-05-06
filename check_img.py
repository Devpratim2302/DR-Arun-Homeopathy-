from PIL import Image
import sys

img_path = '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/media__1777356959314.png'
try:
    img = Image.open(img_path)
    print(f"Size: {img.size}")
except Exception as e:
    print(e)

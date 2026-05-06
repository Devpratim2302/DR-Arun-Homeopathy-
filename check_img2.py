from PIL import Image
import sys

def check(path):
    try:
        img = Image.open(path)
        img.thumbnail((50,50))
        # get average color
        pixels = list(img.getdata())
        if len(pixels[0]) > 3:
            pixels = [p[:3] for p in pixels]
        r = sum([p[0] for p in pixels]) / len(pixels)
        g = sum([p[1] for p in pixels]) / len(pixels)
        b = sum([p[2] for p in pixels]) / len(pixels)
        print(f"{path}: R={r:.1f}, G={g:.1f}, B={b:.1f}")
    except Exception as e:
        print(e)

check('/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/media__1777356959314.png')
check('/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/media__1777356574615.png')

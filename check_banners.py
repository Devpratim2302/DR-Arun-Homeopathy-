import cv2
import glob

for f in glob.glob('src/assets/homeo/*.jpeg'):
    img = cv2.imread(f)
    if img is not None:
        # Check top left corner for the dark blue color #1B3A6B (RGB: 27, 58, 107 -> BGR: 107, 58, 27)
        # We will just print the average color of a patch in the top left
        patch = img[30:60, 30:60]
        avg_color = patch.mean(axis=0).mean(axis=0)
        print(f"{f}: {avg_color}")

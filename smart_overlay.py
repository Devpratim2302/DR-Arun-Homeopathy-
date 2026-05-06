import os
import cv2
import numpy as np
from PIL import Image
import sys

def apply_label(base_img_path, label_path, out_path):
    img = cv2.imread(base_img_path)
    if img is None:
        print(f"Failed to read {base_img_path}")
        return False
        
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Range for white color (blank labels)
    lower_white = np.array([0, 0, 180])
    upper_white = np.array([180, 50, 255])
    
    mask = cv2.inRange(hsv, lower_white, upper_white)
    
    # Optional: apply some morphology to clean up the mask
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    valid_contours = []
    h, w = img.shape[:2]
    for cnt in contours:
        x, y, w_cnt, h_cnt = cv2.boundingRect(cnt)
        area = w_cnt * h_cnt
        if area > 1500 and area < (h*w/2):
            aspect = w_cnt / float(h_cnt)
            if 0.3 < aspect < 3.0:
                if x > w*0.02 and x+w_cnt < w*0.98 and y > h*0.05 and y+h_cnt < h*0.95:
                    valid_contours.append((area, x, y, w_cnt, h_cnt))
                
    if not valid_contours:
        print(f"Could not find any labels in {base_img_path}.")
        base_pil = Image.open(base_img_path).convert("RGBA")
        base_pil.convert("RGB").save(out_path)
        return False
        
    # Sort by area descending and take top 4
    valid_contours.sort(reverse=True, key=lambda c: c[0])
    valid_contours = valid_contours[:4]
        
    base_pil = Image.open(base_img_path).convert("RGBA")
    label_pil = Image.open(label_path).convert("RGBA")
    label_aspect = label_pil.width / label_pil.height
    
    print(f"Found {len(valid_contours)} labels in {base_img_path}")
    
    for (area, bx, by, bw, bh) in valid_contours:
        target_w = int(bw * 0.9)
        target_h = int(target_w / label_aspect)
        
        if target_h > bh * 0.9:
            target_h = int(bh * 0.9)
            target_w = int(target_h * label_aspect)
            
        label_resized = label_pil.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        offset_x = bx + (bw - target_w) // 2
        offset_y = by + (bh - target_h) // 2
        
        base_pil.paste(label_resized, (offset_x, offset_y), label_resized)
        
    base_pil.convert("RGB").save(out_path)
    print(f"Successfully applied label to {out_path}")
    return True

label_file = 'cropped_label.png'

images = {
    'resp': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_resp_v3_1777665132808.png',
    'migraine': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_migraine_v3_1777665148340.png',
    'endo': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_endo_v3_1777665161382.png',
    'peds': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_peds_v3_1777665176593.png'
}

dest_paths = {
    'resp': 'src/assets/homeo/homeo_respiratory.png',
    'migraine': 'src/assets/homeo/homeo_migraine.png',
    'endo': 'src/assets/homeo/homeo_endocrine.png',
    'peds': 'src/assets/homeo/homeo_pediatric.png'
}

for key in images:
    if os.path.exists(images[key]):
        apply_label(images[key], label_file, dest_paths[key])
    else:
        print(f"Missing {images[key]}")

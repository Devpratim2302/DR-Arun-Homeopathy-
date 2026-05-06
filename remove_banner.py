import cv2
import numpy as np

def remove_banner(img_path, out_path):
    img = cv2.imread(img_path)
    if img is None:
        print(f"Failed to read {img_path}")
        return
        
    h, w = img.shape[:2]
    
    # The banner is usually in the top left.
    # We will search the top-left quadrant for the blue color.
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Dark blue color range for the banner
    # #1B3A6B is approximately Hue 217, Sat 74%, Val 42%
    # In OpenCV, Hue is 0-180, so 217/2 ~ 108.
    lower_blue = np.array([90, 100, 50])
    upper_blue = np.array([130, 255, 150])
    
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    
    # Dilate mask a bit to ensure we cover the edges and the text inside it
    # But wait, the text inside is white! The red dot is red.
    # It's better to just find the bounding box of the blue banner and mask that entire rectangle.
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    banner_rect = None
    max_area = 0
    for cnt in contours:
        x, y, w_cnt, h_cnt = cv2.boundingRect(cnt)
        area = w_cnt * h_cnt
        if area > max_area and area > 1000 and x < w/2 and y < h/2:
            max_area = area
            banner_rect = (x, y, w_cnt, h_cnt)
            
    if banner_rect is not None:
        x, y, bw, bh = banner_rect
        # Create a mask for inpainting covering the entire banner rectangle, slightly expanded
        inpaint_mask = np.zeros((h, w), dtype=np.uint8)
        padding = 10
        cv2.rectangle(inpaint_mask, 
                      (max(0, x - padding), max(0, y - padding)), 
                      (min(w, x + bw + padding), min(h, y + bh + padding)), 
                      255, -1)
                      
        # Inpaint
        result = cv2.inpaint(img, inpaint_mask, 3, cv2.INPAINT_TELEA)
        cv2.imwrite(out_path, result)
        print(f"Successfully removed banner from {img_path} and saved to {out_path}")
    else:
        print(f"Could not detect banner in {img_path}")
        cv2.imwrite(out_path, img)

remove_banner('/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/media__1777803285525.jpg', 'src/assets/homeo/homeo_migraine.jpeg')
remove_banner('/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/media__1777803285502.jpg', 'src/assets/homeo/homeo_resp.jpeg')

import os
from PIL import Image

# Paths
logo_path = 'src/assets/arh-logo-transparent.png'
images = {
    'cardio': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_cardio_1777356048862.png',
    'resp': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_resp_1777356068212.png',
    'migraine': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_migraine_1777356084578.png',
    'endo': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_endo_1777355994460.png',
    'peds': '/Users/devpratim/.gemini/antigravity/brain/ca95bf18-3955-414a-a763-a6fbd6026384/blank_peds_1777356007250.png'
}
dest_paths = {
    'cardio': 'src/assets/homeo/homeo_cardiovascular.png',
    'resp': 'src/assets/homeo/homeo_respiratory.png',
    'migraine': 'src/assets/homeo/homeo_migraine.png',
    'endo': 'src/assets/homeo/homeo_endocrine.png',
    'peds': 'src/assets/homeo/homeo_pediatric.png'
}

logo = Image.open(logo_path).convert("RGBA")

for key in images:
    try:
        base = Image.open(images[key]).convert("RGBA")
        bw, bh = base.size
        
        # Calculate new size for logo (e.g. 40% of image width)
        new_logo_w = int(bw * 0.4)
        aspect = logo.size[1] / logo.size[0]
        new_logo_h = int(new_logo_w * aspect)
        
        logo_resized = logo.resize((new_logo_w, new_logo_h), Image.Resampling.LANCZOS)
        
        # Position in center
        offset = ((bw - new_logo_w) // 2, (bh - new_logo_h) // 2)
        
        # Optional: Add semi-transparent white background behind logo for visibility
        bg = Image.new("RGBA", base.size, (255, 255, 255, 0))
        bg.paste(logo_resized, offset, mask=logo_resized)
        
        # Blend
        combined = Image.alpha_composite(base, bg)
        
        combined.convert("RGB").save(dest_paths[key])
        print(f"Processed {key}")
    except Exception as e:
        print(f"Failed {key}: {e}")

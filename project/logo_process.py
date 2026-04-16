import os
import sys

def process_logo():
    try:
        from PIL import Image, ImageFilter, ImageEnhance
        import numpy as np
    except ImportError:
        print("Pillow or numpy not installed.")
        return

    img_path = r"c:\Users\kanan\OneDrive\Desktop\Final\Portfolio\project\src\assets\Yashvi-logo.jpeg"
    out_path = r"c:\Users\kanan\OneDrive\Desktop\Final\Portfolio\project\src\assets\Yashvi-logo.png"

    # Load image
    try:
        img = Image.open(img_path).convert("RGB")
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    data = np.array(img).astype(np.float32)
    
    # Calculate luminance to use as alpha channel for smooth anti-aliasing
    luminance = np.dot(data, [0.2989, 0.5870, 0.1140])
    
    # Enhance the alpha path: map things below ~20 to 0, things above ~100 to 255 for solid logo
    # This prevents dark compression artifacts from showing up.
    alpha = (luminance - 20) * (255.0 / 100.0)
    alpha = np.clip(alpha, 0, 255)
    
    # Create gradient
    h, w = data.shape[:2]
    out_data = np.zeros((h, w, 4), dtype=np.uint8)
    
    for y in range(h):
        t = y / max(1, (h - 1))
        # Cyan: 0, 255, 255 -> Purple: 128, 0, 255 -> Blue: 0, 100, 255
        if t < 0.5:
            t2 = t / 0.5
            r = int(0 * (1-t2) + 160 * t2)
            g = int(255 * (1-t2) + 32 * t2)
            b = int(255 * (1-t2) + 255 * t2)
        else:
            t2 = (t - 0.5) / 0.5
            r = int(160 * (1-t2) + 0 * t2)
            g = int(32 * (1-t2) + 128 * t2)
            b = int(255 * (1-t2) + 255 * t2)
        
        out_data[y, :, 0] = r
        out_data[y, :, 1] = g
        out_data[y, :, 2] = b

    out_data[:, :, 3] = alpha.astype(np.uint8)
    
    logo_layer = Image.fromarray(out_data, "RGBA")
    
    # Add neon bloom
    # Create blurred versions with lower opacity
    bloom_strong = logo_layer.filter(ImageFilter.GaussianBlur(8))
    bloom_wide = logo_layer.filter(ImageFilter.GaussianBlur(25))
    
    # To combine them properly, we can composite them
    # But wait, alpha composite keeps the image size
    # We want the bloom to not be clipped, so padding first
    padding = max(h, w) // 4
    canvas = Image.new("RGBA", (w + padding*2, h + padding*2), (0,0,0,0))
    canvas.paste(logo_layer, (padding, padding), logo_layer)
    
    bloom_canvas1 = canvas.filter(ImageFilter.GaussianBlur(10))
    bloom_canvas2 = canvas.filter(ImageFilter.GaussianBlur(30))
    
    # Reduce opacity of bloom layers slightly by manipulating alpha array
    def reduce_opacity(img_obj, factor):
        data = np.array(img_obj)
        data[:,:,3] = (data[:,:,3] * factor).astype(np.uint8)
        return Image.fromarray(data, "RGBA")
        
    bloom_canvas1 = reduce_opacity(bloom_canvas1, 0.7)
    bloom_canvas2 = reduce_opacity(bloom_canvas2, 0.5)
    
    final = Image.new("RGBA", canvas.size, (0,0,0,0))
    final = Image.alpha_composite(final, bloom_canvas2)
    final = Image.alpha_composite(final, bloom_canvas1)
    final = Image.alpha_composite(final, canvas)
    
    # Center the visible area
    bbox = final.getbbox()
    if bbox:
        # uniform padding
        pad = 20
        new_bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(final.width, bbox[2]+pad), min(final.height, bbox[3]+pad))
        final = final.crop(new_bbox)
        
    final.save(out_path)
    print("Successfully processed and saved to", out_path)

if __name__ == "__main__":
    process_logo()

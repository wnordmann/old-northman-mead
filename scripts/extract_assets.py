import os
from PIL import Image

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def slice_image(src_path, dest_dir, prefix, slices):
    if not os.path.exists(src_path):
        print(f"Skipping {src_path}, file not found.")
        return

    try:
        with Image.open(src_path) as img:
            width, height = img.size
            for name, box in slices.items():
                left = int(box[0] * width)
                upper = int(box[1] * height)
                right = int(box[2] * width)
                lower = int(box[3] * height)
                
                cropped = img.crop((left, upper, right, lower))
                dest_path = os.path.join(dest_dir, f"{prefix}_{name}.png")
                cropped.save(dest_path)
                print(f"Saved {dest_path}")
    except Exception as e:
        print(f"Error processing {src_path}: {e}")

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    drive_dir = os.path.join(base_dir, "Drive-files")
    assets_dir = os.path.join(base_dir, "public", "assets")
    ensure_dir(assets_dir)

    # Tighter Coordinates to exclude text
    
    homepage = os.path.join(drive_dir, "ONM_HomePage_FINAL.png")
    homepage_slices = {
        "hero": (0.4, 0.0, 1.0, 0.35), # Just the man and landscape on the right
        "craft": (0.15, 0.35, 0.27, 0.65), # Just the pouring bottle on the left
        "nature": (0.4, 0.35, 0.5, 0.65), # Just the plant on the left
        "expressions": (0.83, 0.35, 1.0, 0.65), # Just the old man on the right
        "shared": (0.55, 0.65, 0.7, 0.95), # Just the people at the table on the right
        "credo": (0.85, 0.65, 1.0, 0.95), # Just the wooden pillar on the right
        "logo": (0.02, 0.02, 0.13, 0.15)
    }
    slice_image(homepage, assets_dir, "home", homepage_slices)

    craftpage = os.path.join(drive_dir, "The Craft_FINAL.png")
    # Assuming text is on one side, let's tightly crop left and right sections
    craftpage_slices = {
        "hero": (0.4, 0.0, 1.0, 0.4),
        "content1": (0.15, 0.4, 0.35, 0.7),
        "content2": (0.7, 0.4, 1.0, 0.7),
        "content3": (0.15, 0.7, 1.0, 1.0),
    }
    slice_image(craftpage, assets_dir, "craft", craftpage_slices)

if __name__ == "__main__":
    main()

import os
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_ASSETS = os.path.join(BASE_DIR, "public", "assets")
CANDIDATES_DIR = os.path.join(PUBLIC_ASSETS, "candidates")

os.makedirs(CANDIDATES_DIR, exist_ok=True)

# Map of placeholder slot ID to source candidate files and target solid names
candidates_map = {
    "home_hero": [
        (os.path.join(PUBLIC_ASSETS, "home_hero.png"), "home_hero_v1_mead_hall_hearth.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "homePage", "meadHall_1.png"), "home_hero_v2_viking_hall_warm.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "homePage", "meadHall_2.png"), "home_hero_v3_norse_banquet_dark.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "homePage", "meadHall_3.png"), "home_hero_v4_great_hall_parchment.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "homePage", "meadHall_4.png"), "home_hero_v5_viking_gathering_gold.png"),
    ],
    "home_craft": [
        (os.path.join(PUBLIC_ASSETS, "home_craft.png"), "home_craft_v1_pouring_amber_mead.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "homePageFewColors", "pour.png"), "home_craft_v2_horn_pour_rustic.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "honey.png"), "home_craft_v3_honeycomb_linocut.png"),
    ],
    "home_nature": [
        (os.path.join(PUBLIC_ASSETS, "home_nature.png"), "home_nature_v1_meadowsweet_bloom.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "homePageFewColors", "flower.png"), "home_nature_v2_wildflower_botanical.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "medowsweet.png"), "home_nature_v3_herbal_harvest_engraving.png"),
    ],
    "home_expressions": [
        (os.path.join(PUBLIC_ASSETS, "home_expressions.png"), "home_expressions_v1_founder_portrait.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "homePageFewColors", "founder.png"), "home_expressions_v2_master_brewer_woodcut.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "founder.png"), "home_expressions_v3_oak_casks_cellar.png"),
    ],
    "home_shared": [
        (os.path.join(PUBLIC_ASSETS, "home_shared.png"), "home_shared_v1_fellowship_table.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "homePageFewColors", "men.png"), "home_shared_v2_warriors_toast.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "homePageFewColors", "ship.png"), "home_shared_v3_voyage_fellowship.png"),
    ],
    "home_credo": [
        (os.path.join(PUBLIC_ASSETS, "home_credo.png"), "home_credo_v1_runic_pillar_stone.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "homePageFewColors", "runes.png"), "home_credo_v2_credo_carved_runes.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "time.png"), "home_credo_v3_ancient_oath_woodcut.png"),
    ],
    "craft_hero": [
        (os.path.join(PUBLIC_ASSETS, "craft_hero.png"), "craft_hero_v1_hall_entrance_mist.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "homePage", "meadHall_5.png"), "craft_hero_v2_brewhouse_hearth.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "hall.png"), "craft_hero_v3_ancient_cauldron_amber.png"),
    ],
    "craft_content1": [
        (os.path.join(PUBLIC_ASSETS, "craft_content1.png"), "craft_content1_v1_honey_harvest_gold.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "ingregience.png"), "craft_content1_v2_botanical_infusion.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "honey.png"), "craft_content1_v3_cauldron_stirring.png"),
    ],
    "craft_content2": [
        (os.path.join(PUBLIC_ASSETS, "craft_content2.png"), "craft_content2_v1_copper_vessels.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "time.png"), "craft_content2_v2_fermentation_casks.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "homePageFewColors", "runes.png"), "craft_content2_v3_runic_cask_seals.png"),
    ],
    "craft_content3": [
        (os.path.join(PUBLIC_ASSETS, "craft_content3.png"), "craft_content3_v1_panoramic_hall_hearth.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "homePage", "meadHall_1.png"), "craft_content3_v2_panoramic_feast_table.png"),
        (os.path.join(BASE_DIR, "imageGeneration", "referance", "craftPageRichColor", "hall.png"), "craft_content3_v3_panoramic_shield_wall.png"),
    ],
}

print("Setting up candidate assets...")
for slot_id, file_list in candidates_map.items():
    slot_dir = os.path.join(CANDIDATES_DIR, slot_id)
    os.makedirs(slot_dir, exist_ok=True)
    for src, filename in file_list:
        if os.path.exists(src):
            dst = os.path.join(slot_dir, filename)
            shutil.copy2(src, dst)
            print(f"Copied {filename} to {slot_id}/")
        else:
            print(f"Warning: source file {src} does not exist.")

print("Candidate assets setup complete!")

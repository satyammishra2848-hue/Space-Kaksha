import os
import json
from PIL import Image

OUT_DIR = os.path.join("public", "assets", "illustrations")
MANIFEST_PATH = os.path.join("public", "assets", "manifest.json")
os.makedirs(OUT_DIR, exist_ok=True)

crops_to_extract = [
    {
        "id": "kaksha_logo",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (50, 15, 330, 65),
        "purpose": "Brand logo and wordmark with orbit swoop",
        "alt": "Kaksha The Space Academy logo"
    },
    {
        "id": "hero_earth_astronaut",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (450, 40, 940, 450),
        "purpose": "Hero astronaut boy and robot sitting on moon gazing at Earth and Saturn",
        "alt": "Astronaut boy and robot gazing at Earth from Moon"
    },
    {
        "id": "planet_level1_explorer",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (130, 800, 270, 930),
        "purpose": "Level 1 Explorer planet icon",
        "alt": "Level 1 Explorer planet"
    },
    {
        "id": "planet_level2_cadet",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (300, 800, 480, 930),
        "purpose": "Level 2 Cadet Saturn icon",
        "alt": "Level 2 Cadet ringed planet"
    },
    {
        "id": "planet_level3_astronaut",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (570, 800, 705, 930),
        "purpose": "Level 3 Astronaut cratered planet icon",
        "alt": "Level 3 Astronaut cratered planet"
    },
    {
        "id": "planet_level4_specialist",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (730, 800, 925, 930),
        "purpose": "Level 4 Mission Specialist galaxy icon",
        "alt": "Level 4 Mission Specialist spiral galaxy"
    },
    {
        "id": "how_step1_astronaut",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (210, 540, 320, 650),
        "purpose": "How it works step 1 astronaut student",
        "alt": "Astronaut taking test on tablet"
    },
    {
        "id": "how_step2_astronaut",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (530, 550, 630, 650),
        "purpose": "How it works step 2 walking astronaut",
        "alt": "Astronaut student walking forward"
    },
    {
        "id": "how_step3_flag",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (830, 530, 925, 650),
        "purpose": "How it works step 3 star flag on lunar hill",
        "alt": "Star flag on moon surface"
    },
    {
        "id": "mascot_saturn_curious",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (740, 1210, 980, 1440),
        "purpose": "Astronaut mascot sitting on Saturn with curiosity quote",
        "alt": "Astronaut sitting atop ringed planet"
    },
    {
        "id": "hero_final_cta",
        "file": "Kaksha Space Academy Homepage.png",
        "box": (170, 1370, 310, 1550),
        "purpose": "Boy looking back at Earth for final CTA",
        "alt": "Student gazing at bright Earth from lunar landscape"
    },
    {
        "id": "rocket_quiz_launch",
        "file": "Kaksha Space Academy Quiz Interface.png",
        "box": (730, 1340, 900, 1560),
        "purpose": "Dynamic rocket launching into space with plume",
        "alt": "Rocket launching into space"
    },
    {
        "id": "moon_mission_surface",
        "file": "Kaksha Moon Mission Dashboard.png",
        "box": (430, 510, 615, 770),
        "purpose": "High detail cratered Moon sphere for simulator and lesson",
        "alt": "Detailed cratered surface of the Moon"
    },
    {
        "id": "earth_blue_marble",
        "file": "Kaksha Moon Mission Dashboard.png",
        "box": (195, 480, 405, 860),
        "purpose": "Detailed Earth sphere from orbit view",
        "alt": "Earth viewed from space orbit"
    },
    {
        "id": "mascot_tutor_robot",
        "file": "Kaksha AI Space Tutor Dashboard.png",
        "box": (530, 85, 675, 335),
        "purpose": "Friendly floating robot AI Space Tutor mascot",
        "alt": "AI Space Tutor friendly floating robot"
    },
    {
        "id": "moon_phases_diagram",
        "file": "Kaksha Space Academy Level Check.png",
        "box": (205, 435, 505, 795),
        "purpose": "Sun Earth Moon phase orbit diagram",
        "alt": "Diagram showing Moon phases around Earth with Sunlight"
    },
    {
        "id": "mascot_celebrating_complete",
        "file": "Kaksha Space Academy Lesson Complete.png",
        "box": (300, 175, 580, 580),
        "purpose": "Cheering boy astronaut and robot celebrating completion",
        "alt": "Astronaut kid and robot celebrating with hands raised"
    },
    {
        "id": "mascot_levelup_cadet",
        "file": "Level Up to New Horizons geschniegelt.png",
        "box": (60, 185, 375, 630),
        "purpose": "Level Up celebration astronaut with Level 2 flag",
        "alt": "Astronaut cheering next to Level 2 mission flag"
    },
    {
        "id": "aarav_avatar",
        "file": "Kaksha Space Academy Profile Dashboard.png",
        "box": (180, 135, 275, 310),
        "purpose": "Aarav student profile avatar with astronaut suit",
        "alt": "Aarav profile portrait"
    }
]

manifest = {}

for item in crops_to_extract:
    src_path = os.path.join("images", item["file"])
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        continue
    
    img = Image.open(src_path)
    cropped = img.crop(item["box"])
    
    out_filename = f"{item['id']}.png"
    out_path = os.path.join(OUT_DIR, out_filename)
    cropped.save(out_path, format="PNG", optimize=True)
    
    manifest[item["id"]] = {
        "src": f"/assets/illustrations/{out_filename}",
        "width": cropped.width,
        "height": cropped.height,
        "purpose": item["purpose"],
        "alt": item["alt"]
    }
    print(f"Extracted {item['id']}: {cropped.size} -> {out_path}")

with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print(f"\nManifest successfully written to {MANIFEST_PATH} with {len(manifest)} assets.")

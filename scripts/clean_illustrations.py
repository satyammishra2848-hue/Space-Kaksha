# scripts/clean_illustrations.py
import os
from PIL import Image, ImageDraw

OUT_DIR = os.path.join("public", "assets", "illustrations")
os.makedirs(OUT_DIR, exist_ok=True)

hp = Image.open("images/Kaksha Space Academy Homepage.png")

print("Processing illustrations...")

# Helper: make black background transparent
def black_to_alpha(img, threshold=20):
    img = img.convert("RGBA")
    datas = img.getdata()
    newData = []
    for item in datas:
        # If dark night background
        if item[0] < threshold and item[1] < threshold and item[2] < threshold:
            newData.append((item[0], item[1], item[2], 0))
        else:
            newData.append(item)
    img.putdata(newData)
    return img

# Helper: make paper background transparent
def paper_to_alpha(img, threshold=220):
    img = img.convert("RGBA")
    datas = img.getdata()
    newData = []
    for item in datas:
        # If light paper background
        if item[0] > threshold and item[1] > threshold and item[2] > threshold - 15:
            newData.append((item[0], item[1], item[2], 0))
        else:
            newData.append(item)
    img.putdata(newData)
    return img

# 1. HERO PORTAL (Organic space window with Earth, Moon, Saturn, boy, and robot)
# Box: X 458 to 941, Y 66 to 468
hero = hp.crop((458, 66, 941, 468)).convert("RGBA")
# Clean out baked-in "Same Sky. Bigger Dreams." handwriting (approx X: 140 to 225, Y: 195 to 290 in cropped coordinates)
draw = ImageDraw.Draw(hero)
draw.rectangle([140, 195, 225, 290], fill=(7, 9, 15, 255))
# Add subtle stars in that cleared patch so it looks like authentic starfield
stars = [(160, 210), (195, 205), (150, 260), (210, 275), (180, 240)]
for sx, sy in stars:
    draw.point((sx, sy), fill=(255, 255, 255, 230))
draw.point((175, 225), fill=(243, 201, 94, 255))

# Convert paper surrounding the organic blob to alpha transparent so it bleeds naturally
hero = paper_to_alpha(hero, threshold=225)
hero.save(os.path.join(OUT_DIR, "hero_earth_astronaut.png"), "PNG")
print("Saved hero_earth_astronaut.png (organic alpha blob without baked text)")

# 2. FOUR LEVEL PLANETS
# Level 1: Explorer Planet
p1 = hp.crop((110, 818, 242, 918)).convert("RGBA")
d1 = ImageDraw.Draw(p1)
# Erase bottom right arrow artifact
d1.rectangle([100, 75, 132, 100], fill=(0, 0, 0, 255))
p1 = black_to_alpha(p1, threshold=18)
p1.save(os.path.join(OUT_DIR, "planet_level1_explorer.png"), "PNG")

# Level 2: Cadet Saturn
p2 = hp.crop((280, 820, 470, 915)).convert("RGBA")
d2 = ImageDraw.Draw(p2)
d2.rectangle([165, 70, 190, 95], fill=(0, 0, 0, 255))
p2 = black_to_alpha(p2, threshold=18)
p2.save(os.path.join(OUT_DIR, "planet_level2_cadet.png"), "PNG")

# Level 3: Astronaut Planet
p3 = hp.crop((580, 818, 710, 920)).convert("RGBA")
d3 = ImageDraw.Draw(p3)
d3.rectangle([105, 75, 130, 102], fill=(0, 0, 0, 255))
# Also erase top right SP artifact
d3.rectangle([115, 0, 130, 25], fill=(0, 0, 0, 255))
p3 = black_to_alpha(p3, threshold=18)
p3.save(os.path.join(OUT_DIR, "planet_level3_astronaut.png"), "PNG")

# Level 4: Specialist Galaxy
p4 = hp.crop((736, 832, 916, 920)).convert("RGBA")
d4 = ImageDraw.Draw(p4)
d4.rectangle([145, 60, 180, 88], fill=(0, 0, 0, 255))
p4 = black_to_alpha(p4, threshold=18)
p4.save(os.path.join(OUT_DIR, "planet_level4_specialist.png"), "PNG")
print("Saved 4 level planet icons (alpha background, no text/arrows)")

# 3. HOW IT WORKS 3 STEPS
step1 = hp.crop((215, 542, 315, 645)).convert("RGBA")
step1 = paper_to_alpha(step1, threshold=225)
step1.save(os.path.join(OUT_DIR, "how_step1_astronaut.png"), "PNG")

step2 = hp.crop((538, 548, 628, 648)).convert("RGBA")
step2 = paper_to_alpha(step2, threshold=225)
step2.save(os.path.join(OUT_DIR, "how_step2_astronaut.png"), "PNG")

step3 = hp.crop((836, 532, 920, 648)).convert("RGBA")
step3 = paper_to_alpha(step3, threshold=225)
step3.save(os.path.join(OUT_DIR, "how_step3_flag.png"), "PNG")
print("Saved how it works steps 1-3 with alpha")

# 4. SATURN MASCOT
saturn_mascot = hp.crop((755, 1220, 975, 1445)).convert("RGBA")
d_sat = ImageDraw.Draw(saturn_mascot)
# Erase handwriting "Curiosity Today. A Better Tomorrow." from top right
d_sat.rectangle([115, 0, 220, 95], fill=(12, 14, 22, 255))
# Add background stars
for sx, sy in [(130, 20), (170, 45), (145, 75), (200, 30)]:
    d_sat.point((sx, sy), fill=(255, 255, 255, 220))
saturn_mascot.save(os.path.join(OUT_DIR, "mascot_saturn_curious.png"), "PNG")
print("Saved mascot_saturn_curious.png without baked text")

# 5. FINAL CTA HERO
final_cta = hp.crop((175, 1375, 305, 1545)).convert("RGBA")
d_cta = ImageDraw.Draw(final_cta)
# Erase "Same Sky. Bigger Possibilities."
d_cta.rectangle([0, 0, 60, 80], fill=(12, 14, 22, 255))
final_cta.save(os.path.join(OUT_DIR, "hero_final_cta.png"), "PNG")
print("Saved hero_final_cta.png without baked text")

print("All illustrations successfully cleaned and updated!")

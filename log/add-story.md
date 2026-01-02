# Adding a New Graphic Novel Story

This log documents the steps to add a new physicist story to the Physics History Graphic Novels section.

## Example: Adding Nikola Tesla

**Date:** 2026-01-01

---

## Step 1: Create the Story Directory

```bash
mkdir -p docs/stories/tesla
```

## Step 2: Review Existing Story Format

Read an existing story to understand the required structure:

```bash
# Example: Read the Faraday story as a template
cat docs/stories/faraday/index.md
```

**Required elements:**
- YAML frontmatter with title, description, and social image paths
- Cover image with prompt in `<details>` block
- Narrative prompt in `<details>` block
- Prologue section
- Multiple chapters (typically 12-14), each with:
  - Narrative text
  - Image placeholder (`![](./image-XX.png)`)
  - Image prompt in `<details>` block
- Epilogue with lessons table
- Call to action section
- Quotes from the physicist
- References section (can use placeholders initially)

## Step 3: Create the Story Content

Write `docs/stories/tesla/index.md` with:

### YAML Frontmatter
```yaml
---
title: The Man Who Lit the World - Nikola Tesla's Battle Against the Doubters
description: A graphic-novel story of how a penniless immigrant...
image: /stories/tesla/cover.png
og:image: /stories/tesla/cover.png
twitter:image: /stories/tesla/cover.png
social:
   cards: false
---
```

**Important:** Use `.png` extension for all image references (not `.jpg`).

### Image Prompts
Each image prompt should specify:
- Wide-landscape 16:9 format
- Period-appropriate art style (e.g., "Gilded Age/Art Nouveau" for Tesla)
- Specific scene details
- Color palette guidance
- Emotional tone

### Narrative Structure
- Focus on a compelling theme (e.g., "overcoming doubters")
- Include historically accurate details
- Make it engaging for high school students
- Balance drama with educational content

## Step 4: Add to Navigation (mkdocs.yml)

Edit `mkdocs.yml` to add the story in chronological order:

```yaml
  - Stories:
    - Overview: stories/index.md
    - Archimedes - Eureka: stories/archimedes/index.md
    - Galileo - The Troublemaker: stories/galileo/index.md
    - Newton - The Plague Year: stories/newton/index.md
    - Faraday - The Bookbinder's Apprentice: stories/faraday/index.md
    - Tesla - The Man Who Lit the World: stories/tesla/index.md  # NEW
    - Marie Curie - Glowing in the Dark: stories/marie-curie/index.md
    # ... rest of stories
```

**Chronological order by birth year:**
- Archimedes (287 BC)
- Galileo (1564)
- Newton (1643)
- Faraday (1791)
- Tesla (1856)
- Marie Curie (1867)
- Rutherford (1871)
- Lise Meitner (1878)
- Einstein (1879)
- Chien-Shiung Wu (1912)
- Vera Rubin (1928)

## Step 5: Add to Stories Index Page

Edit `docs/stories/index.md` to add a grid card entry:

```markdown
- **[The Man Who Lit the World](tesla/index.md)**

    ![Nikola Tesla](./tesla/cover.png)
    He arrived in America with four cents in his pocket. Thomas Edison called his ideas
    dangerous and impractical. He dug ditches to survive. But Nikola Tesla never stopped
    believing in alternating current—and when he lit the 1893 World's Fair with 100,000
    bulbs, the doubters were silenced forever. Every power plant, every electrical grid,
    every outlet in your wall exists because Tesla proved them all wrong.
```

**Grid card requirements:**
- Link to story index page
- Cover image reference
- 2-4 sentence compelling description
- Emphasize the story's theme

## Step 6: Generate Images (Future Step)

After the narrative is complete, generate images using the prompts:

1. Use an image generation tool (e.g., DALL-E, Midjourney)
2. Generate each image using the prompts in the `<details>` blocks
3. Save as PNG files:
   - `cover.png`
   - `image-01.png` through `image-XX.png`
4. Place all images in `docs/stories/tesla/`

## Step 7: Update References (Future Step)

Replace placeholder references with actual URLs:

```markdown
## References

1. [Nikola Tesla | Biography, Facts, & Inventions](https://www.britannica.com/biography/Nikola-Tesla) - Britannica

2. [Tesla vs Edison: The War of Currents](https://www.energy.gov/articles/war-currents-ac-vs-dc-power) - Department of Energy
```

---

## Checklist for New Stories

- [ ] Create story directory: `docs/stories/<name>/`
- [ ] Write `index.md` with full narrative and image prompts
- [ ] Use `.png` extensions for all image references
- [ ] Add to `mkdocs.yml` navigation in chronological order
- [ ] Add grid card to `docs/stories/index.md`
- [ ] Generate cover image
- [ ] Generate chapter images (typically 13-15 images)
- [ ] Replace reference placeholders with real URLs
- [ ] Test locally with `mkdocs serve`

---

## File Structure After Adding a Story

```
docs/stories/tesla/
├── index.md          # Main story content
├── cover.png         # Cover image (generated)
├── image-01.png      # Chapter images (generated)
├── image-02.png
├── ...
└── image-15.png
```

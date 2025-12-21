# Add Level 4 Diagram Links

!!! prompt
    > go through all the markdown files in @docs/chapters/*/index.md (not the quiz files).  For every line that has a <details 
    markdown="1"> I want you to add a like before that line that has `#### Diagram: NAME` where NAME is in the <summary> line after the 
    details like.  Create a python program to do this and put it in the @src/diagram-reports/add-level-4-links.py 

    Run the script and put the results in logs/add-level-4-links.md

## Result

# Add Level 4 Links Report

**Date:** 2025-11-13
**Script:** `src/diagram-reports/add-level-4-links.py`

## Summary

Successfully added level 4 headers (####) before all `<details markdown="1">` blocks in chapter index.md files. The headers are formatted as "#### Diagram: NAME" where NAME is extracted from the corresponding `<summary>` tag.

## Results

- **Total files processed:** 12 chapter index.md files
- **Total headers added:** 104
- **Chapters modified:** All chapters (01-12)

## Breakdown by Chapter

| Chapter | File | Headers Added |
|---------|------|---------------|
| 01 | Scientific Foundations | 5 |
| 02 | Motion in One Dimension | 7 |
| 03 | Motion in Two Dimensions | 7 |
| 04 | Forces and Newton's Laws | 7 |
| 05 | Applications of Newton's Laws | 14 |
| 06 | Work, Energy, and Power | 9 |
| 07 | Momentum and Collisions | 7 |
| 08 | Rotational Motion | 10 |
| 09 | Oscillations | 11 |
| 10 | Waves and Sound | 11 |
| 11 | Light and Optics | 9 |
| 12 | Electric Charge and Fields | 7 |

## Before and After Example

### Before:
```markdown
<details markdown="1">
<summary>Metric Scale Zoom</summary>

**Type:** MicroSim
```

### After:
```markdown
#### Diagram: Metric Scale Zoom
<details markdown="1">
<summary>Metric Scale Zoom</summary>

**Type:** MicroSim
```

## Script Features

1. **Pattern Recognition:** Automatically detects `<details markdown="1">` blocks followed by `<summary>` tags
2. **Text Extraction:** Extracts the summary text to create meaningful headers
3. **Duplicate Prevention:** Checks if header already exists before adding
4. **Dry Run Mode:** Supports `--dry-run` flag to preview changes without modifying files
5. **Comprehensive Reporting:** Lists all changes made with line numbers

## Usage

```bash
# Dry run (preview only)
python3 src/diagram-reports/add-level-4-links.py --dry-run

# Apply changes
python3 src/diagram-reports/add-level-4-links.py
```

## Benefits

1. **Improved Navigation:** Level 4 headers create anchor links in MkDocs, making it easier to link directly to diagrams and MicroSims
2. **Better SEO:** Headers improve search engine indexing
3. **Consistent Structure:** All diagrams and MicroSims now have a consistent header format
4. **Table of Contents:** Headers appear in the page TOC, improving discoverability

## Notes

- Script only processes chapter index.md files, not quiz.md files
- Headers use the prefix "Diagram:" for all types (MicroSims, diagrams, infographics, etc.)
- The script is idempotent - running it multiple times won't create duplicate headers


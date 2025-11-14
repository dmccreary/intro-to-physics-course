# Diagram and MicroSim Report Generator

This tool analyzes all chapter markdown files in the geometry course and generates comprehensive reports of diagrams and MicroSims.

## Features

- **Automatic extraction** of visual elements from chapter markdown files
- **Bloom's Taxonomy detection** - identifies cognitive levels
- **UI complexity analysis** - counts interactive elements (sliders, buttons, etc.)
- **Difficulty estimation** - calculates implementation difficulty based on:
  - Element type (diagram vs MicroSim)
  - Number of UI elements
  - Complex features (animation, 3D, graphs, etc.)
  - Canvas size
- **Multiple output formats** - Markdown, CSV, and HTML

## Installation

No special dependencies required! Uses only Python standard library.

```bash
# Ensure you have Python 3.7+
python3 --version
```

## Usage

### Basic Usage

Generate a markdown report (default):

```bash
python3 diagram-report.py
```

This creates `diagram-report.md` in the current directory.

### Specify Output File and Format

```bash
# Markdown format
python3 diagram-report.py --output my-report.md --format markdown

# CSV format (great for Excel/Google Sheets)
python3 diagram-report.py --output my-report.csv --format csv

# HTML format (interactive, viewable in browser)
python3 diagram-report.py --output my-report.html --format html
```

### Custom Chapters Directory

If running from a different location:

```bash
python3 diagram-report.py --chapters-dir /path/to/docs/chapters
```

### Get Help

```bash
python3 diagram-report.py --help
```

## Output Formats

### Markdown Format

Best for: Documentation, GitHub, version control

Features:
- Summary statistics
- Detailed table of all elements
- Elements grouped by chapter
- Full learning objectives

Example:
```bash
python3 diagram-report.py --output report.md --format markdown
```

### CSV Format

Best for: Data analysis, Excel, filtering, sorting

Features:
- One row per element
- All fields in columns
- Easy to import into spreadsheets
- Great for pivot tables and charts

Example:
```bash
python3 diagram-report.py --output report.csv --format csv
```

### HTML Format

Best for: Viewing in browser, presentations, sharing with team

Features:
- Color-coded difficulty levels
- Sortable/filterable table
- Visual statistics cards
- Professional styling
- Interactive elements

Example:
```bash
python3 diagram-report.py --output report.html --format html
```

## Report Contents

Each visual element includes:

| Field | Description |
|-------|-------------|
| **Chapter** | Chapter number (e.g., "01", "12") |
| **Chapter Name** | Chapter title extracted from directory name |
| **Element Title** | Title from `<summary>` tag |
| **Type** | "Diagram" or "Microsim" |
| **Bloom Levels** | Cognitive levels (e.g., "Applying, Analyzing") |
| **UI Elements** | Count of interactive components |
| **Difficulty** | Estimated implementation difficulty |
| **Learning Objective** | Extracted from specification |

## Difficulty Estimation Algorithm

The tool estimates difficulty based on:

### Base Score
- **Diagram:** +0 points
- **MicroSim:** +2 points (inherently more complex)

### UI Complexity
- **0 UI elements:** +1 (static)
- **1-3 elements:** +2 (simple interactivity)
- **4-6 elements:** +3 (moderate interactivity)
- **7+ elements:** +4 (high interactivity)

### Complex Features
Each of these adds +1 point:
- Animation
- Rotation/transformation
- 3D or isometric views
- Graphs or plots
- Real-time calculations
- Dynamic comparisons
- Multiple panels
- Side-by-side views

### Canvas Size
- Canvas > 900px wide or > 700px tall: +1 point

### Final Categories
- **Easy:** 0-3 points
- **Medium:** 4-6 points
- **Hard:** 7-9 points
- **Very Hard:** 10+ points

## Example Output

### Summary Statistics

```
Total visual elements: 26
Diagrams: 12
MicroSims: 13

By Difficulty:
  Easy: 7
  Medium: 6
  Hard: 5
  Very Hard: 8

By Chapter:
  Chapter 01: 8 elements
  Chapter 12: 18 elements
```

### Sample Table Row

| Chapter | Element Title | Type | Bloom Levels | UI Elements | Difficulty |
|---------|---------------|------|--------------|-------------|------------|
| 12 | Interactive volume calculation and comparison tool | Microsim | Applying, Analyzing, Evaluating | 31 | Very Hard |

## Use Cases

### 1. Project Planning
Use the CSV export to estimate implementation time:
```bash
python3 diagram-report.py --output planning.csv --format csv
# Open in Excel, sort by Difficulty, allocate resources
```

### 2. Progress Tracking
Generate reports at different stages to track completion:
```bash
python3 diagram-report.py --output progress-week1.md
python3 diagram-report.py --output progress-week2.md
# Compare to see what's been implemented
```

### 3. Team Collaboration
Share HTML report with team members:
```bash
python3 diagram-report.py --output team-report.html --format html
# Email or host the HTML file
```

### 4. Quality Assurance
Verify all elements have proper specifications:
- Check for "Not specified" in Bloom levels
- Look for elements with 0 UI but marked as MicroSim
- Identify missing learning objectives

## Customization

### Adding New UI Keywords

Edit the `UI_KEYWORDS` list in `DiagramAnalyzer` class:

```python
UI_KEYWORDS = [
    'slider', 'button', 'dropdown', 'checkbox', 'input', 'toggle',
    'menu', 'control', 'panel', 'display', 'text box', 'selector',
    # Add your keywords here
]
```

### Adjusting Difficulty Thresholds

Modify the `estimate_difficulty` method scoring or thresholds.

### Custom Output Format

Extend the `ReportGenerator` class with a new method:

```python
def generate_custom_format(self) -> str:
    # Your custom format logic
    pass
```

## Troubleshooting

### "No visual elements found"

Check that:
1. Chapter directories follow naming pattern: `01-name`, `02-name`, etc.
2. Each chapter has an `index.md` file
3. Visual elements use `<details markdown="1">` blocks
4. Type is specified as **Type:** diagram or microsim

### "Error analyzing file"

The tool skips files with errors. Check:
1. File encoding is UTF-8
2. Markdown is well-formed
3. No unclosed `<details>` tags

### Incorrect Bloom's levels

The tool looks for keywords like "understand", "apply", "analyze", etc.
Ensure learning objectives use these standard Bloom's verbs.

## Output Examples

All generated reports are saved in the same directory as the script:
- `diagram-report.md` - Default markdown report
- `diagram-report.csv` - CSV for spreadsheet analysis
- `diagram-report.html` - Interactive HTML report

## Future Enhancements

Possible additions:
- [ ] Filter by difficulty level
- [ ] Filter by chapter
- [ ] Export to JSON for API consumption
- [ ] Generate implementation checklist
- [ ] Time estimation based on difficulty
- [ ] Dependencies between elements
- [ ] Track implementation status
- [ ] Generate skeleton MicroSim code

## Contributing

To improve the analyzer:
1. Add more UI keywords for better counting
2. Refine difficulty estimation algorithm
3. Add new output formats
4. Improve Bloom's taxonomy detection
5. Add element dependency tracking

## License

Same as the main geometry course project.

## Author

Generated by Claude Code for the Geometry Course project.

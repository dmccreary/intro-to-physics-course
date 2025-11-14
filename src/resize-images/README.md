# Image Resize Utilities

Utilities for resizing images for the geometry course.

## social-media.py

Resizes images to **1200 × 630 pixels** for optimal social media preview display (Open Graph, Twitter Cards, LinkedIn, etc.).

### Installation

Requires Python 3 and Pillow:

```bash
pip install Pillow
```

### Usage

```bash
python social-media.py input.jpg output.jpg [OPTIONS]
```

### Resize Modes

**Fit Mode (default)** - Maintains aspect ratio, adds letterboxing/pillarboxing if needed:
```bash
python social-media.py input.jpg output.jpg
python social-media.py input.jpg output.jpg --mode fit
```

**Fill Mode** - Maintains aspect ratio, crops excess from center:
```bash
python social-media.py input.jpg output.jpg --mode fill
```

**Stretch Mode** - Stretches to exact dimensions (may distort):
```bash
python social-media.py input.jpg output.jpg --mode stretch
```

### Options

- `-m, --mode {fit,fill,stretch}` - Resize mode (default: fit)
- `-b, --background COLOR` - Background color for fit mode (default: white)
- `-v, --verbose` - Print detailed information

### Examples

```bash
# Basic usage - fit with white letterboxing
python social-media.py photo.jpg preview.jpg

# Fill and crop from center
python social-media.py photo.jpg preview.jpg --mode fill

# Custom background color
python social-media.py photo.jpg preview.jpg --background "#1a73e8"

# Verbose output
python social-media.py photo.jpg preview.jpg -v
```

### Background Colors

Supports CSS color names and hex codes:
- `white`, `black`, `red`, `blue`, etc.
- `#1a73e8`, `#ff0000`, etc.

### Supported Input Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- BMP (.bmp)
- TIFF (.tiff)
- WebP (.webp)

Output is always saved as high-quality JPEG (quality=95).

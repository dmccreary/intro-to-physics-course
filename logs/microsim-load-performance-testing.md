# MicroSim Load Performance Testing

**Date:** 2024-12-30

## Problem

MicroSims embedded in chapter pages were taking a very long time (minutes) to render when scrolling to them.

## Root Cause Analysis

1. **Lazy loading backfire** - Added `loading="lazy"` to 71 iframes across all chapters
2. When user scrolled, multiple lazy iframes triggered simultaneously
3. Each iframe loaded its own copy of p5.js (~4MB unminified)
4. Competing network requests and JavaScript initialization caused traffic jam
5. Result: Minutes-long delays instead of faster loading

## Solution: Hybrid Approach

### 1. Removed Lazy Loading from All Chapter Iframes

Lazy loading was counterproductive for p5.js-heavy pages where multiple simulations need to initialize.

**Files modified:**
- `docs/chapters/01-scientific-foundations/index.md` (6 iframes)
- `docs/chapters/02-motion-one-dimension/index.md` (7 iframes)
- `docs/chapters/03-motion-two-dimensions/index.md` (7 iframes)
- `docs/chapters/04-forces-newtons-laws/index.md` (7 iframes)
- `docs/chapters/05-applications-newtons-laws/index.md` (14 iframes)
- `docs/chapters/06-work-energy-power/index.md` (8 iframes)
- `docs/chapters/07-momentum-collisions/index.md` (7 iframes)
- `docs/chapters/10-waves-sound/index.md` (5 iframes)
- `docs/chapters/11-light-optics/index.md` (2 iframes)
- `docs/chapters/12-electric-charge-fields/index.md` (3 iframes)
- `docs/chapters/13-electric-circuits/index.md` (5 iframes)

**Total: 71 iframes reverted to normal loading**

### 2. Switched All MicroSims to Minified p5.js

Changed from `p5.js` to `p5.min.js` in all MicroSim main.html files.

**Command used:**
```bash
find docs/sims -name "main.html" -exec sed -i '' 's|lib/p5.js|lib/p5.min.js|g' {} \;
```

**Impact:**
- 92 MicroSims updated
- Library size reduced from ~4MB to ~1MB per iframe
- Same functionality, just minified/compressed
- JavaScript code still copies to p5.js editor without issues

### 3. Optimized metric-scale-zoom Images

Resized images from original dimensions (512-716px) to 256x256px, which is sufficient for the 200x200px display size.

**Command used:**
```bash
cd docs/sims/metric-scale-zoom/img
for f in *.png; do sips -Z 256 "$f" --out "$f"; done
```

**Results:**

| Image | Before | After | Reduction |
|-------|--------|-------|-----------|
| earth.png | 238K | 28K | 88% |
| fingernail.png | 284K | 23K | 92% |
| football-field.png | 175K | 48K | 73% |
| galaxy.png | 228K | 37K | 84% |
| hair.png | 281K | 22K | 92% |
| person.png | 299K | 25K | 92% |
| solar.png | 243K | 40K | 84% |
| state.png | 189K | 52K | 72% |
| textbook.png | 203K | 58K | 71% |
| virus.png | 227K | 64K | 72% |
| **Total** | **2.4MB** | **397KB** | **83%** |

## Lessons Learned

1. **Lazy loading isn't always beneficial** - For pages with many JavaScript-heavy iframes, lazy loading can cause worse performance than eager loading due to simultaneous initialization when scrolling.

2. **Minification matters** - Using `p5.min.js` instead of `p5.js` reduces download size by ~3x with no functional difference.

3. **Right-size images** - Images should be sized appropriately for their display dimensions. 716px images displayed at 200px waste bandwidth.

4. **Browser caching helps** - After first load, p5.min.js is cached by the browser, benefiting all subsequent MicroSims.

5. **Restart mkdocs serve after changes** - The development server may cache old assets. Restart after significant changes to images or static files.

## Testing Notes

- After making changes, always restart `mkdocs serve`
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R) to clear cache
- Check browser console (F12) for 404 or loading errors
- Test MicroSims both directly and in iframe context

## Performance Summary

| Optimization | Before | After | Improvement |
|--------------|--------|-------|-------------|
| Lazy loading | 71 iframes with delays | Normal loading | Eliminated delays |
| p5.js library | ~4MB | ~1MB | 75% smaller |
| metric-scale-zoom images | 2.4MB | 397KB | 83% smaller |

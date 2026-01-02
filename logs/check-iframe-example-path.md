# Check iframe Example Path Analysis

**Date:** 2026-01-01

## Purpose

Verify that all sample iframe references in `docs/sims/*/index.md` files use the correct base path for the GitHub Pages deployment.

## Expected Path Format

All sample iframe examples should reference:
```
https://dmccreary.github.io/intro-to-physics-course/sims/<microsim-name>/main.html
```

## Analysis Command

```bash
grep -r "github.io" docs/sims/*/index.md | grep -v "intro-to-physics-course" | grep -v "visjs.github.io" | grep -v "vislupus.github.io"
```

This command:
- Searches for all GitHub Pages URLs in MicroSim index files
- Excludes correctly formatted paths (`intro-to-physics-course`)
- Excludes legitimate external references (vis.js documentation, source code credits)

## Issues Found

| File | Incorrect Path | Issue |
|------|----------------|-------|
| `fft-basic/index.md` | `.../intro-to-physics-course/sims/basic-fft/...` | Wrong directory name (`basic-fft` instead of `fft-basic`) |
| `projectile-motion-gravity/index.md` | `.../microsims/sims/...` | Wrong repository (`microsims` instead of `intro-to-physics-course`) |
| `sine-wave/index.md` | `.../intro-to-physics/sims/...` | Missing `-course` suffix in repository name |

## Fixes Applied

### fft-basic/index.md
```diff
- <iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/basic-fft/main.html"
+ <iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/fft-basic/main.html"
```

### projectile-motion-gravity/index.md
```diff
- <iframe src="https://dmccreary.github.io/microsims/sims/projectile-motion-gravity/main.html"
+ <iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/projectile-motion-gravity/main.html"
```

### sine-wave/index.md
```diff
- <iframe src="https://dmccreary.github.io/intro-to-physics/sims/sine-wave/main.html"
+ <iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/sine-wave/main.html"
```

## Verification

After fixes, running the analysis command returns no results, confirming all paths are correct.

## Recommendations

1. Add this check to the `microsim-utils` standardization skill
2. The check should:
   - Extract the repository name from `mkdocs.yml` or project config
   - Verify all sample iframe URLs match the expected pattern
   - Flag any mismatches for correction
3. Consider adding a pre-commit hook to validate iframe paths

## Common Causes of Incorrect Paths

1. **Copy-paste from other projects** - MicroSims copied from other repositories retain old paths
2. **Typos in repository names** - Easy to miss `-course` or similar suffixes
3. **Directory renaming** - When a MicroSim directory is renamed, the iframe example isn't updated

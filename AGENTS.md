# Repository Guidelines

## Project Structure & Module Organization
The MkDocs source lives in `docs/`. Chapters sit in `docs/chapters/`, MicroSims and shared JS/CSS in `docs/sims/` and `docs/css/`, and glossary plus learning-graph JSON in `docs/data/`. Supporting data prep lives in `data/` and `generate_physics_quizzes.py`, while reusable plugins and helpers are in `plugins/` and `src/`. The published site is generated in `site/`; never edit it directly—rerun `mkdocs build` instead. Repo-wide settings are centralized in `mkdocs.yml`.

## Build, Test, and Development Commands
Create a virtualenv and install the toolchain with `pip install mkdocs "mkdocs-material[imaging]"`. Use `mkdocs serve` for a hot-reloading preview at `http://localhost:8000`, `mkdocs build --strict` for CI-quality validation, and `mkdocs gh-deploy` to push to GitHub Pages. Regenerate quizzes or other structured content via `python generate_physics_quizzes.py --refresh`. When touching MicroSims, run `npm install` to refresh p5 typings and rebuild bundled assets referenced from `src/`.

## Coding Style & Naming Conventions
Markdown files use ATX headings, sentence-case titles, and concise sections with tables when listing metrics. Keep filenames kebab-cased to align with the nav (`docs/chapters/05-work-energy.md`). Python scripts follow PEP 8 (4-space indents, snake_case functions, constants in ALL_CAPS) and gate execution with `if __name__ == "__main__":`. MicroSim JS uses camelCase functions, `const` for fixed parameters, and descriptive module names such as `projectile-motion.js`. Update `mkdocs.yml` navigation entries whenever you add, rename, or retire a page to avoid orphaned content.

## Testing Guidelines
`mkdocs build --strict` is the baseline test; it fails on missing images, malformed front matter, and bad links, so run it before every commit. Preview MicroSims through `mkdocs serve` and verify the browser console stays clean to catch p5 runtime regressions. When scripts transform data, add sample outputs under `logs/` or `data/` and note the regeneration command in the PR so reviewers can reproduce results.

## Commit & Pull Request Guidelines
Recent history uses imperative, scoped subject lines (`Resize the images in the metric microSim`, `Refactor physics documentation: ...`). Follow that style, wrap at ~72 characters, and group related doc and code edits in a single commit. Pull requests should describe the affected chapters or simulations, list the commands you ran (`mkdocs build --strict`, quiz regeneration, etc.), and include screenshots or GIFs when visual behavior changes. Link issues or TODOs for tracking and request reviews from both content and tooling maintainers when edits span Markdown and MicroSims.

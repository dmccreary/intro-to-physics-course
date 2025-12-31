# MicroSim Similarity Finder

This tool finds similar MicroSims by generating embeddings from metadata and visualizing them in 2D space.

## Setup

### 1. Create a conda environment

```bash
conda create -n similarity python=3.11
conda activate similarity
```

### 2. Install dependencies

```bash
# For CPU-only (smaller download, recommended for most users)
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt

# Or if you have a GPU and want faster processing
pip install -r requirements.txt
```

### 3. Optional: Install UMAP for alternative visualization

```bash
pip install umap-learn
```

## Usage

### Generate Embeddings

First, generate embeddings from all MicroSim metadata files:

```bash
python generate_embeddings.py
```

This will:
- Scan all directories in `docs/sims/`
- Read `metadata.json` from each MicroSim
- Generate embeddings using the `all-MiniLM-L6-v2` model
- Save results to `microsim-embeddings.json`
- List any MicroSims missing metadata files

**Options:**

```bash
# Use a different sims directory
python generate_embeddings.py --sims-dir /path/to/sims

# Save embeddings to a different location
python generate_embeddings.py --output my-embeddings.json

# Use a different embedding model
python generate_embeddings.py --model all-mpnet-base-v2
```

### Visualize Similarity

Create a 2D visualization of MicroSim similarity:

```bash
python plot_similarity.py
```

This opens an interactive plot where similar MicroSims are clustered together, color-coded by physics topic.

**Options:**

```bash
# Use different dimensionality reduction algorithms
python plot_similarity.py --method tsne    # t-SNE (default, best clustering)
python plot_similarity.py --method umap    # UMAP (requires umap-learn)
python plot_similarity.py --method pca     # PCA (fastest, linear)

# Save plot to file
python plot_similarity.py --output similarity-map.png

# Don't show interactive window (useful for scripts)
python plot_similarity.py --output similarity-map.png --no-interactive
```

### Interactive Visualization (Plotly)

For a rich interactive experience with hover details, use the Plotly-based visualization:

```bash
python plot_similarity_interactive.py
```

This opens in your browser with:
- **Hover info**: Quality score, lines of code, number of controls, library, concepts, description
- **Marker sizing**: Larger dots indicate higher quality scores
- **Legend filtering**: Click categories to show/hide
- **Zoom/pan**: Full interactivity

**Options:**

```bash
# Save as interactive HTML file
python plot_similarity_interactive.py --output similarity-map.html

# Use different reduction method
python plot_similarity_interactive.py --method pca

# Save as static image (requires kaleido: pip install kaleido)
python plot_similarity_interactive.py --output similarity-map.png
```

### Calculate Quality Scores

Calculate and update quality scores for all MicroSims based on the standardization rubric:

```bash
python calculate_quality_scores.py
```

This evaluates each MicroSim against a 100-point rubric:

| Criterion | Points |
|-----------|--------|
| Title in index.md (level 1 header) | 2 |
| main.html present | 10 |
| YAML metadata (title & description) | 3 |
| Social preview images in YAML | 5 |
| metadata.json present | 10 |
| metadata.json valid (Dublin Core) | 20 |
| iframe with src="main.html" | 10 |
| Fullscreen link button | 5 |
| Copy-paste iframe example | 5 |
| Screenshot image present | 5 |
| Overview/Description section | 5 |
| Lesson Plan section | 10 |
| References section | 5 |
| Type-specific (p5.js editor link) | 5 |

**Options:**

```bash
# Preview changes without modifying files
python calculate_quality_scores.py --dry-run

# Show detailed breakdown for each MicroSim
python calculate_quality_scores.py --verbose

# Only update MicroSims missing a quality_score
python calculate_quality_scores.py --only-missing

# Filter by score range
python calculate_quality_scores.py --max-score 50  # Show only low-quality
python calculate_quality_scores.py --min-score 85  # Show only high-quality
```

### Find Similar MicroSims

Find the most similar MicroSims to a specific one:

```bash
python plot_similarity.py --similar-to projectile-motion
```

Output example:
```
Most similar microsims to 'Projectile Motion Simulation':
============================================================
1. Projectile Motion with Gravity (similarity: 0.892)
   ID: projectile-motion-gravity
2. Angled Projectile (similarity: 0.845)
   ID: angled-projectile
3. Horizontal Projection (similarity: 0.798)
   ID: horizontal-projection
...
```

**Options:**

```bash
# Show more results
python plot_similarity.py --similar-to doppler-effect --top-k 10
```

## Missing Metadata

When you run `generate_embeddings.py`, it will list MicroSims that are missing `metadata.json` files. To create metadata for these, use the `microsim-util` skill:

```bash
claude
> /microsim-utils standardization
```

## File Descriptions

| File | Description |
|------|-------------|
| `generate_embeddings.py` | Generates embeddings from MicroSim metadata |
| `plot_similarity.py` | Static matplotlib visualization and CLI similarity finder |
| `plot_similarity_interactive.py` | Interactive Plotly visualization with hover metrics |
| `calculate_quality_scores.py` | Calculates and updates quality scores based on rubric |
| `requirements.txt` | Python dependencies |
| `microsim-embeddings.json` | Generated embeddings (created by running scripts) |

## Topic Categories

The visualization color-codes MicroSims by physics topic:

| Color | Topic |
|-------|-------|
| Red | Kinematics |
| Blue | Dynamics |
| Green | Energy |
| Purple | Momentum |
| Orange | Rotation |
| Teal | Oscillations |
| Pink | Waves |
| Cyan | Electricity |
| Yellow | Optics |
| Gray | General/Foundation |

## Embedding Model

By default, this uses the `all-MiniLM-L6-v2` model from sentence-transformers:
- 384-dimensional embeddings
- Fast inference
- Good semantic similarity for technical content

For potentially better results with longer text, try:
```bash
python generate_embeddings.py --model all-mpnet-base-v2
```

## Troubleshooting

### PyTorch installation fails

Make sure you're using Python 3.11 or 3.12:
```bash
python --version
```

Install CPU-only PyTorch first:
```bash
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

### Not enough MicroSims for visualization

You need at least 3 MicroSims with metadata for the visualization to work. Run `generate_embeddings.py` first to see how many have metadata.

### UMAP not found

UMAP is optional. Install it with:
```bash
pip install umap-learn
```

Or use t-SNE (default) or PCA instead.

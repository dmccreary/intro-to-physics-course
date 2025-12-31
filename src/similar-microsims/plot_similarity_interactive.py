#!/usr/bin/env python3
"""
Interactive 2D similarity visualization of MicroSim embeddings using Plotly.

This script creates an interactive scatter plot where users can hover over
microsims to see detailed metrics including quality score, lines of code,
library used, and other metadata.

Usage:
    python plot_similarity_interactive.py [--method tsne|umap|pca] [--output PATH]
"""

import json
import argparse
import os
import re
from pathlib import Path
import sys

try:
    import numpy as np
except ImportError:
    print("Error: numpy not installed. Install with: pip install numpy")
    sys.exit(1)

try:
    import plotly.express as px
    import plotly.graph_objects as go
except ImportError:
    print("Error: plotly not installed. Install with: pip install plotly")
    sys.exit(1)

try:
    from sklearn.manifold import TSNE
    from sklearn.decomposition import PCA
except ImportError:
    print("Error: scikit-learn not installed. Install with: pip install scikit-learn")
    sys.exit(1)


# Physics topic categories for coloring
TOPIC_CATEGORIES = {
    "kinematics": {
        "keywords": ["motion", "velocity", "acceleration", "displacement", "projectile",
                     "position", "time", "kinematic", "trajectory", "free-fall", "free fall"],
        "color": "#e74c3c",
        "label": "Kinematics"
    },
    "dynamics": {
        "keywords": ["force", "newton", "friction", "tension", "normal", "incline",
                     "equilibrium", "free body", "inertia", "action-reaction", "atwood"],
        "color": "#3498db",
        "label": "Dynamics"
    },
    "energy": {
        "keywords": ["energy", "work", "power", "potential", "kinetic", "conservation",
                     "efficiency", "roller coaster", "joule"],
        "color": "#2ecc71",
        "label": "Energy"
    },
    "momentum": {
        "keywords": ["momentum", "collision", "impulse", "elastic", "inelastic", "rocket"],
        "color": "#9b59b6",
        "label": "Momentum"
    },
    "rotation": {
        "keywords": ["rotation", "angular", "torque", "moment of inertia", "centripetal",
                     "banked", "curve", "rolling", "spin", "rotational"],
        "color": "#f39c12",
        "label": "Rotation"
    },
    "oscillations": {
        "keywords": ["oscillation", "pendulum", "spring", "harmonic", "shm", "period",
                     "frequency", "hooke", "damping", "resonance", "driven"],
        "color": "#1abc9c",
        "label": "Oscillations"
    },
    "waves": {
        "keywords": ["wave", "transverse", "longitudinal", "interference", "standing",
                     "wavelength", "amplitude", "doppler", "sound"],
        "color": "#e91e63",
        "label": "Waves"
    },
    "electricity": {
        "keywords": ["electric", "charge", "current", "voltage", "resistance", "ohm",
                     "capacitor", "circuit", "coulomb", "field lines", "induction"],
        "color": "#00bcd4",
        "label": "Electricity"
    },
    "optics": {
        "keywords": ["light", "reflection", "refraction", "snell", "lens", "mirror", "optic"],
        "color": "#ffeb3b",
        "label": "Optics"
    },
    "general": {
        "keywords": ["metric", "measurement", "precision", "accuracy", "scientific method",
                     "graph", "vector", "physics branches"],
        "color": "#95a5a6",
        "label": "General/Foundation"
    }
}


def categorize_microsim(title: str, sim_id: str) -> tuple[str, str]:
    """Categorize a microsim based on its title and ID. Returns (category, color)."""
    text = f"{title} {sim_id}".lower()

    for category, info in TOPIC_CATEGORIES.items():
        for keyword in info["keywords"]:
            if keyword in text:
                return info["label"], info["color"]

    return "General/Foundation", "#95a5a6"


def count_lines_of_code(sim_dir: Path) -> int:
    """Count total lines of JavaScript code in a microsim directory."""
    total_lines = 0
    for js_file in sim_dir.glob("*.js"):
        try:
            with open(js_file, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                # Count non-empty, non-comment lines
                code_lines = [l for l in lines if l.strip() and not l.strip().startswith('//')]
                total_lines += len(code_lines)
        except Exception:
            pass

    # Also check main.html for inline scripts
    main_html = sim_dir / "main.html"
    if main_html.exists():
        try:
            with open(main_html, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find inline script content
                script_matches = re.findall(r'<script[^>]*>([^<]+)</script>', content, re.DOTALL)
                for script in script_matches:
                    if 'src=' not in script[:50]:  # Skip external scripts
                        lines = script.split('\n')
                        code_lines = [l for l in lines if l.strip() and not l.strip().startswith('//')]
                        total_lines += len(code_lines)
        except Exception:
            pass

    return total_lines


def count_controls(sim_dir: Path) -> int:
    """Count UI controls (sliders, buttons, checkboxes) in a microsim."""
    control_count = 0
    control_patterns = [
        r'createSlider', r'createButton', r'createCheckbox',
        r'createSelect', r'createInput', r'createRadio',
        r'<input\s+type', r'<button', r'<select'
    ]

    for file_path in list(sim_dir.glob("*.js")) + [sim_dir / "main.html"]:
        if file_path.exists():
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    for pattern in control_patterns:
                        control_count += len(re.findall(pattern, content, re.IGNORECASE))
            except Exception:
                pass

    return control_count


def get_quality_score(sim_dir: Path) -> int:
    """Extract quality score from index.md frontmatter."""
    index_md = sim_dir / "index.md"
    if not index_md.exists():
        return 0

    try:
        with open(index_md, 'r', encoding='utf-8') as f:
            content = f.read()
            # Look for quality_score in YAML frontmatter
            match = re.search(r'quality_score:\s*(\d+)', content)
            if match:
                return int(match.group(1))
    except Exception:
        pass

    return 0


def get_library(metadata: dict) -> str:
    """Extract library name from metadata."""
    if "microsim" in metadata:
        tech = metadata["microsim"].get("technical", {})
        return tech.get("framework", "unknown")
    return metadata.get("library", "unknown")


def get_concepts(metadata: dict) -> list:
    """Extract concepts from metadata."""
    if "microsim" in metadata:
        edu = metadata["microsim"].get("educational", {})
        return edu.get("topic", [])
    return metadata.get("concepts", [])


def has_screenshot(sim_dir: Path) -> bool:
    """Check if microsim has a screenshot PNG."""
    for png in sim_dir.glob("*.png"):
        return True
    return False


def has_lesson_plan(sim_dir: Path) -> bool:
    """Check if index.md contains a lesson plan section."""
    index_md = sim_dir / "index.md"
    if not index_md.exists():
        return False

    try:
        with open(index_md, 'r', encoding='utf-8') as f:
            content = f.read().lower()
            return '## lesson plan' in content or '## lesson' in content
    except Exception:
        return False


def reduce_dimensions(embeddings: np.ndarray, method: str = "tsne", **kwargs) -> np.ndarray:
    """Reduce embedding dimensions to 2D using the specified method."""
    if method == "tsne":
        perplexity = min(30, len(embeddings) - 1)
        reducer = TSNE(
            n_components=2,
            perplexity=perplexity,
            random_state=42,
            max_iter=1000,
            **kwargs
        )
        return reducer.fit_transform(embeddings)

    elif method == "umap":
        try:
            import umap
        except ImportError:
            print("Error: umap-learn not installed. Falling back to t-SNE...")
            return reduce_dimensions(embeddings, "tsne", **kwargs)

        n_neighbors = min(15, len(embeddings) - 1)
        reducer = umap.UMAP(
            n_components=2,
            n_neighbors=n_neighbors,
            min_dist=0.1,
            random_state=42,
            **kwargs
        )
        return reducer.fit_transform(embeddings)

    elif method == "pca":
        reducer = PCA(n_components=2, random_state=42)
        return reducer.fit_transform(embeddings)

    else:
        raise ValueError(f"Unknown method: {method}. Use 'tsne', 'umap', or 'pca'.")


def collect_microsim_metrics(sims_dir: Path, microsims: list) -> list[dict]:
    """Collect detailed metrics for each microsim."""
    metrics = []

    for ms in microsims:
        sim_dir = sims_dir / ms["id"]
        metadata_path = sim_dir / "metadata.json"

        # Load metadata
        metadata = {}
        if metadata_path.exists():
            try:
                with open(metadata_path, 'r', encoding='utf-8') as f:
                    metadata = json.load(f)
            except Exception:
                pass

        # Get category and color
        category, color = categorize_microsim(ms["title"], ms["id"])

        # Collect metrics
        quality_score = get_quality_score(sim_dir)
        lines_of_code = count_lines_of_code(sim_dir)
        num_controls = count_controls(sim_dir)
        library = get_library(metadata)
        concepts = get_concepts(metadata)
        has_image = has_screenshot(sim_dir)
        has_lesson = has_lesson_plan(sim_dir)

        # Get description
        if "microsim" in metadata:
            description = metadata["microsim"].get("dublinCore", {}).get("description", "")
        else:
            description = metadata.get("description", "")

        # Truncate description for hover
        if len(description) > 150:
            description = description[:147] + "..."

        metrics.append({
            "id": ms["id"],
            "title": ms["title"],
            "category": category,
            "color": color,
            "quality_score": quality_score,
            "lines_of_code": lines_of_code,
            "num_controls": num_controls,
            "library": library,
            "concepts": concepts[:5] if isinstance(concepts, list) else concepts,
            "has_screenshot": has_image,
            "has_lesson_plan": has_lesson,
            "description": description
        })

    return metrics


def create_interactive_plot(
    embeddings_path: Path,
    sims_dir: Path,
    output_path: Path = None,
    method: str = "tsne"
):
    """Create an interactive Plotly scatter plot."""

    # Load embeddings
    print(f"Loading embeddings from: {embeddings_path}")
    with open(embeddings_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    microsims = data["microsims"]
    n_microsims = len(microsims)
    print(f"Loaded {n_microsims} microsims")

    if n_microsims < 3:
        print("Error: Need at least 3 microsims for visualization")
        return

    # Collect metrics for each microsim
    print("Collecting metrics for each microsim...")
    metrics = collect_microsim_metrics(sims_dir, microsims)

    # Extract embeddings as numpy array
    embeddings = np.array([ms["embedding"] for ms in microsims])

    # Reduce dimensions
    print(f"Reducing dimensions using {method.upper()}...")
    coords_2d = reduce_dimensions(embeddings, method)

    # Build DataFrame-like structure for Plotly
    plot_data = []
    for i, m in enumerate(metrics):
        concepts_str = ", ".join(m["concepts"]) if isinstance(m["concepts"], list) else str(m["concepts"])

        plot_data.append({
            "x": coords_2d[i, 0],
            "y": coords_2d[i, 1],
            "id": m["id"],
            "title": m["title"],
            "category": m["category"],
            "color": m["color"],
            "quality_score": m["quality_score"],
            "lines_of_code": m["lines_of_code"],
            "num_controls": m["num_controls"],
            "library": m["library"],
            "concepts": concepts_str,
            "has_screenshot": "Yes" if m["has_screenshot"] else "No",
            "has_lesson_plan": "Yes" if m["has_lesson_plan"] else "No",
            "description": m["description"],
            # Size based on quality score (min 8, max 20)
            "marker_size": max(8, min(20, 8 + m["quality_score"] / 10))
        })

    # Create the figure
    fig = go.Figure()

    # Add traces by category for legend
    categories_added = set()
    for item in plot_data:
        cat = item["category"]
        if cat not in categories_added:
            # Get all items in this category
            cat_items = [p for p in plot_data if p["category"] == cat]

            # Create hover text
            hover_texts = []
            for p in cat_items:
                hover_text = (
                    f"<b>{p['title']}</b><br>"
                    f"<b>ID:</b> {p['id']}<br>"
                    f"<b>Category:</b> {p['category']}<br>"
                    f"<b>Quality Score:</b> {p['quality_score']}<br>"
                    f"<b>Lines of Code:</b> {p['lines_of_code']}<br>"
                    f"<b>Controls:</b> {p['num_controls']}<br>"
                    f"<b>Library:</b> {p['library']}<br>"
                    f"<b>Screenshot:</b> {p['has_screenshot']}<br>"
                    f"<b>Lesson Plan:</b> {p['has_lesson_plan']}<br>"
                    f"<b>Concepts:</b> {p['concepts']}<br>"
                    f"<b>Description:</b> {p['description']}"
                )
                hover_texts.append(hover_text)

            fig.add_trace(go.Scatter(
                x=[p["x"] for p in cat_items],
                y=[p["y"] for p in cat_items],
                mode='markers',
                name=cat,
                marker=dict(
                    size=[p["marker_size"] for p in cat_items],
                    color=cat_items[0]["color"],
                    opacity=0.8,
                    line=dict(width=1, color='white')
                ),
                text=[p["id"] for p in cat_items],
                hovertext=hover_texts,
                hoverinfo='text',
                hoverlabel=dict(
                    bgcolor='white',
                    font_size=12,
                    font_family="Arial"
                )
            ))
            categories_added.add(cat)

    # Update layout
    fig.update_layout(
        title=dict(
            text=f"MicroSim Similarity Map ({method.upper()} Projection)",
            font=dict(size=20, family="Arial Black"),
            x=0.5
        ),
        xaxis=dict(
            title=f"{method.upper()} Dimension 1",
            showgrid=True,
            gridcolor='lightgray',
            zeroline=False
        ),
        yaxis=dict(
            title=f"{method.upper()} Dimension 2",
            showgrid=True,
            gridcolor='lightgray',
            zeroline=False
        ),
        legend=dict(
            title="Physics Topics",
            yanchor="top",
            y=0.99,
            xanchor="left",
            x=1.02,
            bgcolor="rgba(255, 255, 255, 0.9)",
            bordercolor="lightgray",
            borderwidth=1
        ),
        hovermode='closest',
        plot_bgcolor='aliceblue',
        width=1200,
        height=800,
        margin=dict(r=200)
    )

    # Add annotation with stats
    quality_scores = [m["quality_score"] for m in metrics]
    avg_quality = sum(quality_scores) / len(quality_scores) if quality_scores else 0
    with_score = sum(1 for q in quality_scores if q > 0)
    without_score = len(quality_scores) - with_score

    fig.add_annotation(
        xref="paper", yref="paper",
        x=0.02, y=0.02,
        text=(
            f"<b>Statistics</b><br>"
            f"Total MicroSims: {n_microsims}<br>"
            f"With Quality Score: {with_score}<br>"
            f"Without Score: {without_score}<br>"
            f"Avg Quality: {avg_quality:.1f}"
        ),
        showarrow=False,
        font=dict(size=11),
        align="left",
        bgcolor="rgba(255, 255, 255, 0.9)",
        bordercolor="lightgray",
        borderwidth=1,
        borderpad=8
    )

    # Save or show
    if output_path:
        if str(output_path).endswith('.html'):
            fig.write_html(output_path)
            print(f"Interactive plot saved to: {output_path}")
        else:
            fig.write_image(output_path)
            print(f"Static image saved to: {output_path}")
    else:
        fig.show()


def main():
    parser = argparse.ArgumentParser(
        description="Create interactive similarity visualization using Plotly."
    )
    parser.add_argument(
        "--input",
        type=Path,
        default=Path(__file__).parent / "microsim-embeddings.json",
        help="Path to embeddings JSON file"
    )
    parser.add_argument(
        "--sims-dir",
        type=Path,
        default=Path(__file__).parent.parent.parent / "docs" / "sims",
        help="Path to the sims directory"
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Path to save the plot (HTML for interactive, PNG/SVG for static)"
    )
    parser.add_argument(
        "--method",
        type=str,
        choices=["tsne", "umap", "pca"],
        default="tsne",
        help="Dimensionality reduction method (default: tsne)"
    )

    args = parser.parse_args()

    if not args.input.exists():
        print(f"Error: Embeddings file not found: {args.input}")
        print("Run generate_embeddings.py first to create the embeddings.")
        sys.exit(1)

    create_interactive_plot(
        args.input,
        args.sims_dir,
        args.output,
        args.method
    )


if __name__ == "__main__":
    main()

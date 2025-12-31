#!/usr/bin/env python3
"""
Plot 2D similarity visualization of MicroSim embeddings.

This script loads the embeddings from microsim-embeddings.json and uses
dimensionality reduction algorithms (t-SNE, UMAP, or PCA) to create
an interactive 2D visualization showing similar microsims clustered together.

Usage:
    python plot_similarity.py [--method tsne|umap|pca] [--input PATH] [--output PATH]
"""

import json
import argparse
from pathlib import Path
import sys

try:
    import numpy as np
except ImportError:
    print("Error: numpy not installed. Install with: pip install numpy")
    sys.exit(1)

try:
    import matplotlib.pyplot as plt
    from matplotlib.patches import Patch
except ImportError:
    print("Error: matplotlib not installed. Install with: pip install matplotlib")
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
        "color": "#e74c3c",  # Red
        "label": "Kinematics"
    },
    "dynamics": {
        "keywords": ["force", "newton", "friction", "tension", "normal", "incline",
                     "equilibrium", "free body", "inertia", "action-reaction", "atwood"],
        "color": "#3498db",  # Blue
        "label": "Dynamics"
    },
    "energy": {
        "keywords": ["energy", "work", "power", "potential", "kinetic", "conservation",
                     "efficiency", "roller coaster", "joule"],
        "color": "#2ecc71",  # Green
        "label": "Energy"
    },
    "momentum": {
        "keywords": ["momentum", "collision", "impulse", "elastic", "inelastic", "rocket"],
        "color": "#9b59b6",  # Purple
        "label": "Momentum"
    },
    "rotation": {
        "keywords": ["rotation", "angular", "torque", "moment of inertia", "centripetal",
                     "banked", "curve", "rolling", "spin", "rotational"],
        "color": "#f39c12",  # Orange
        "label": "Rotation"
    },
    "oscillations": {
        "keywords": ["oscillation", "pendulum", "spring", "harmonic", "shm", "period",
                     "frequency", "hooke", "damping", "resonance", "driven"],
        "color": "#1abc9c",  # Teal
        "label": "Oscillations"
    },
    "waves": {
        "keywords": ["wave", "transverse", "longitudinal", "interference", "standing",
                     "wavelength", "amplitude", "doppler", "sound"],
        "color": "#e91e63",  # Pink
        "label": "Waves"
    },
    "electricity": {
        "keywords": ["electric", "charge", "current", "voltage", "resistance", "ohm",
                     "capacitor", "circuit", "coulomb", "field lines", "induction"],
        "color": "#00bcd4",  # Cyan
        "label": "Electricity"
    },
    "optics": {
        "keywords": ["light", "reflection", "refraction", "snell", "lens", "mirror", "optic"],
        "color": "#ffeb3b",  # Yellow
        "label": "Optics"
    },
    "general": {
        "keywords": ["metric", "measurement", "precision", "accuracy", "scientific method",
                     "graph", "vector", "physics branches"],
        "color": "#95a5a6",  # Gray
        "label": "General/Foundation"
    }
}


def categorize_microsim(title: str, sim_id: str) -> str:
    """Categorize a microsim based on its title and ID."""
    text = f"{title} {sim_id}".lower()

    for category, info in TOPIC_CATEGORIES.items():
        for keyword in info["keywords"]:
            if keyword in text:
                return category

    return "general"


def reduce_dimensions(embeddings: np.ndarray, method: str = "tsne", **kwargs) -> np.ndarray:
    """
    Reduce embedding dimensions to 2D using the specified method.

    Args:
        embeddings: High-dimensional embeddings (n_samples, n_features)
        method: Reduction method ('tsne', 'umap', or 'pca')
        **kwargs: Additional arguments for the reduction algorithm

    Returns:
        2D coordinates (n_samples, 2)
    """
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
            print("Error: umap-learn not installed. Install with: pip install umap-learn")
            print("Falling back to t-SNE...")
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


def plot_similarity(
    embeddings_path: Path,
    output_path: Path = None,
    method: str = "tsne",
    interactive: bool = True
):
    """
    Create a 2D similarity plot from embeddings.

    Args:
        embeddings_path: Path to the microsim-embeddings.json file
        output_path: Path to save the plot image (optional)
        method: Dimensionality reduction method
        interactive: Whether to show interactive plot
    """
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

    # Extract embeddings as numpy array
    embeddings = np.array([ms["embedding"] for ms in microsims])

    # Reduce dimensions
    print(f"Reducing dimensions using {method.upper()}...")
    coords_2d = reduce_dimensions(embeddings, method)

    # Categorize each microsim
    categories = [categorize_microsim(ms["title"], ms["id"]) for ms in microsims]

    # Create plot
    fig, ax = plt.subplots(figsize=(14, 10))

    # Plot points by category
    for category, info in TOPIC_CATEGORIES.items():
        indices = [i for i, cat in enumerate(categories) if cat == category]
        if indices:
            x = coords_2d[indices, 0]
            y = coords_2d[indices, 1]
            ax.scatter(x, y, c=info["color"], label=info["label"],
                      s=100, alpha=0.7, edgecolors='white', linewidth=0.5)

    # Add labels for each point
    for i, ms in enumerate(microsims):
        ax.annotate(
            ms["id"].replace("-", "\n", 1),
            (coords_2d[i, 0], coords_2d[i, 1]),
            fontsize=6,
            alpha=0.8,
            ha='center',
            va='bottom',
            xytext=(0, 5),
            textcoords='offset points'
        )

    # Add legend
    ax.legend(loc='upper left', bbox_to_anchor=(1.02, 1), fontsize=9)

    # Style the plot
    ax.set_title(f"MicroSim Similarity Map ({method.upper()} Projection)", fontsize=14, fontweight='bold')
    ax.set_xlabel(f"{method.upper()} Dimension 1", fontsize=10)
    ax.set_ylabel(f"{method.upper()} Dimension 2", fontsize=10)
    ax.grid(True, alpha=0.3)

    # Add metadata info
    info_text = f"Model: {data['metadata']['model']}\nMicrosims: {n_microsims}"
    ax.text(0.02, 0.02, info_text, transform=ax.transAxes, fontsize=8,
            verticalalignment='bottom', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

    plt.tight_layout()

    # Save if output path provided
    if output_path:
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        print(f"Plot saved to: {output_path}")

    # Show interactive plot
    if interactive:
        plt.show()


def find_similar_microsims(embeddings_path: Path, microsim_id: str, top_k: int = 5):
    """
    Find the most similar microsims to a given one.

    Args:
        embeddings_path: Path to the microsim-embeddings.json file
        microsim_id: ID of the microsim to find similar ones for
        top_k: Number of similar microsims to return
    """
    with open(embeddings_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    microsims = data["microsims"]

    # Find the target microsim
    target = None
    target_idx = None
    for i, ms in enumerate(microsims):
        if ms["id"] == microsim_id:
            target = ms
            target_idx = i
            break

    if target is None:
        print(f"Error: Microsim '{microsim_id}' not found")
        print("Available microsims:")
        for ms in microsims:
            print(f"  - {ms['id']}")
        return

    # Calculate cosine similarities
    embeddings = np.array([ms["embedding"] for ms in microsims])
    target_embedding = embeddings[target_idx]

    # Cosine similarity
    norms = np.linalg.norm(embeddings, axis=1)
    target_norm = np.linalg.norm(target_embedding)
    similarities = np.dot(embeddings, target_embedding) / (norms * target_norm)

    # Get top-k (excluding self)
    sorted_indices = np.argsort(similarities)[::-1]
    top_indices = [i for i in sorted_indices if i != target_idx][:top_k]

    print(f"\nMost similar microsims to '{target['title']}':")
    print("=" * 60)
    for rank, idx in enumerate(top_indices, 1):
        ms = microsims[idx]
        sim = similarities[idx]
        print(f"{rank}. {ms['title']} (similarity: {sim:.3f})")
        print(f"   ID: {ms['id']}")
    print()


def main():
    parser = argparse.ArgumentParser(
        description="Plot 2D similarity visualization of MicroSim embeddings."
    )
    parser.add_argument(
        "--input",
        type=Path,
        default=Path(__file__).parent / "microsim-embeddings.json",
        help="Path to embeddings JSON file"
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Path to save the plot image (optional)"
    )
    parser.add_argument(
        "--method",
        type=str,
        choices=["tsne", "umap", "pca"],
        default="tsne",
        help="Dimensionality reduction method (default: tsne)"
    )
    parser.add_argument(
        "--similar-to",
        type=str,
        default=None,
        help="Find microsims similar to this ID"
    )
    parser.add_argument(
        "--top-k",
        type=int,
        default=5,
        help="Number of similar microsims to show (default: 5)"
    )
    parser.add_argument(
        "--no-interactive",
        action="store_true",
        help="Don't show interactive plot window"
    )

    args = parser.parse_args()

    if not args.input.exists():
        print(f"Error: Embeddings file not found: {args.input}")
        print("Run generate_embeddings.py first to create the embeddings.")
        sys.exit(1)

    if args.similar_to:
        find_similar_microsims(args.input, args.similar_to, args.top_k)
    else:
        plot_similarity(
            args.input,
            args.output,
            args.method,
            interactive=not args.no_interactive
        )


if __name__ == "__main__":
    main()

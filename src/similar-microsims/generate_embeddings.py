#!/usr/bin/env python3
"""
Generate embeddings for MicroSim metadata files.

This script scans all microsim directories, reads their metadata.json files,
creates text representations, and generates embeddings using sentence-transformers.
The embeddings are saved to microsim-embeddings.json for similarity analysis.

Usage:
    python generate_embeddings.py [--sims-dir PATH] [--output PATH]
"""

import json
import os
import argparse
from pathlib import Path
from typing import Optional
import sys

try:
    from sentence_transformers import SentenceTransformer
except ImportError:
    print("Error: sentence-transformers not installed.")
    print("Install with: pip install sentence-transformers")
    sys.exit(1)


def to_string_list(items: list) -> list[str]:
    """Convert a list of items (strings or dicts) to a list of strings."""
    result = []
    for item in items:
        if isinstance(item, str):
            result.append(item)
        elif isinstance(item, dict):
            # Try common keys for dict items
            if "name" in item:
                result.append(str(item["name"]))
            elif "label" in item:
                result.append(str(item["label"]))
            elif "description" in item:
                result.append(str(item["description"]))
            else:
                # Convert whole dict to string
                result.append(str(item))
        else:
            result.append(str(item))
    return result


def extract_text_from_metadata(metadata: dict) -> str:
    """
    Extract a text representation from metadata for embedding.
    Handles both nested (detailed) and flat metadata formats.
    """
    text_parts = []

    # Check if it's the detailed nested format
    if "microsim" in metadata:
        ms = metadata["microsim"]

        # Dublin Core metadata
        if "dublinCore" in ms:
            dc = ms["dublinCore"]
            if "title" in dc:
                text_parts.append(f"Title: {dc['title']}")
            if "description" in dc:
                text_parts.append(f"Description: {dc['description']}")
            if "subject" in dc:
                subjects = dc["subject"] if isinstance(dc["subject"], list) else [dc["subject"]]
                text_parts.append(f"Subjects: {', '.join(subjects)}")

        # Educational metadata
        if "educational" in ms:
            edu = ms["educational"]
            if "topic" in edu:
                text_parts.append(f"Topic: {edu['topic']}")
            if "learningObjectives" in edu:
                objectives = edu["learningObjectives"]
                if isinstance(objectives, list):
                    text_parts.append(f"Learning Objectives: {'; '.join(to_string_list(objectives))}")
            if "prerequisites" in edu:
                text_parts.append(f"Prerequisites: {edu['prerequisites']}")
            if "bloomsTaxonomyLevels" in edu:
                levels = edu["bloomsTaxonomyLevels"]
                if isinstance(levels, list):
                    text_parts.append(f"Bloom's Levels: {', '.join(to_string_list(levels))}")

        # Simulation metadata
        if "simulation" in ms:
            sim = ms["simulation"]
            if "modelType" in sim:
                text_parts.append(f"Model Type: {sim['modelType']}")
            if "variables" in sim:
                variables = sim["variables"]
                if isinstance(variables, list):
                    text_parts.append(f"Variables: {', '.join(to_string_list(variables))}")
            if "equations" in sim:
                equations = sim["equations"]
                if isinstance(equations, list):
                    text_parts.append(f"Equations: {'; '.join(to_string_list(equations))}")

        # Pedagogical context
        if "pedagogicalContext" in ms:
            ped = ms["pedagogicalContext"]
            if "commonMisconceptions" in ped:
                misconceptions = ped["commonMisconceptions"]
                if isinstance(misconceptions, list):
                    text_parts.append(f"Common Misconceptions: {'; '.join(to_string_list(misconceptions))}")
            if "realWorldApplications" in ped:
                apps = ped["realWorldApplications"]
                if isinstance(apps, list):
                    text_parts.append(f"Real World Applications: {'; '.join(to_string_list(apps))}")

    else:
        # Flat format
        if "title" in metadata:
            text_parts.append(f"Title: {metadata['title']}")
        if "description" in metadata:
            text_parts.append(f"Description: {metadata['description']}")
        if "subject" in metadata:
            subjects = metadata["subject"] if isinstance(metadata["subject"], list) else [metadata["subject"]]
            text_parts.append(f"Subjects: {', '.join(to_string_list(subjects))}")
        if "concepts" in metadata:
            concepts = metadata["concepts"] if isinstance(metadata["concepts"], list) else [metadata["concepts"]]
            text_parts.append(f"Concepts: {', '.join(to_string_list(concepts))}")
        if "prerequisites" in metadata:
            prereqs = metadata["prerequisites"] if isinstance(metadata["prerequisites"], list) else [metadata["prerequisites"]]
            text_parts.append(f"Prerequisites: {', '.join(to_string_list(prereqs))}")
        if "bloomsLevel" in metadata:
            levels = metadata["bloomsLevel"] if isinstance(metadata["bloomsLevel"], list) else [metadata["bloomsLevel"]]
            text_parts.append(f"Bloom's Levels: {', '.join(to_string_list(levels))}")

    return "\n".join(text_parts)


def get_title_from_metadata(metadata: dict, fallback: str) -> str:
    """Extract title from metadata, with fallback to directory name."""
    if "microsim" in metadata and "dublinCore" in metadata["microsim"]:
        return metadata["microsim"]["dublinCore"].get("title", fallback)
    return metadata.get("title", fallback)


def find_microsim_directories(sims_dir: Path) -> list[Path]:
    """Find all microsim directories (those with main.html or index.md)."""
    microsim_dirs = []

    for item in sims_dir.iterdir():
        if item.is_dir():
            # Check if it looks like a microsim directory
            has_main = (item / "main.html").exists()
            has_index = (item / "index.md").exists()
            if has_main or has_index:
                microsim_dirs.append(item)

    return sorted(microsim_dirs)


def load_metadata(microsim_dir: Path) -> Optional[dict]:
    """Load metadata.json from a microsim directory."""
    metadata_path = microsim_dir / "metadata.json"

    if not metadata_path.exists():
        return None

    try:
        with open(metadata_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"Warning: Invalid JSON in {metadata_path}: {e}")
        return None


def generate_embeddings(sims_dir: Path, output_path: Path, model_name: str = "all-MiniLM-L6-v2"):
    """
    Generate embeddings for all microsims with metadata.

    Args:
        sims_dir: Path to the sims directory
        output_path: Path to save the embeddings JSON
        model_name: Name of the sentence-transformer model to use
    """
    print(f"Loading model: {model_name}")
    model = SentenceTransformer(model_name)

    print(f"Scanning microsims in: {sims_dir}")
    microsim_dirs = find_microsim_directories(sims_dir)
    print(f"Found {len(microsim_dirs)} microsim directories")

    # Collect metadata and text for embedding
    microsims_data = []
    texts_to_embed = []
    missing_metadata = []

    for microsim_dir in microsim_dirs:
        dir_name = microsim_dir.name
        metadata = load_metadata(microsim_dir)

        if metadata is None:
            missing_metadata.append(dir_name)
            continue

        text = extract_text_from_metadata(metadata)
        if not text.strip():
            print(f"Warning: Empty text extracted from {dir_name}")
            continue

        title = get_title_from_metadata(metadata, dir_name)

        microsims_data.append({
            "id": dir_name,
            "title": title,
            "path": str(microsim_dir.relative_to(sims_dir.parent.parent)),
            "text": text
        })
        texts_to_embed.append(text)

    if missing_metadata:
        print(f"\nMicrosims missing metadata.json ({len(missing_metadata)}):")
        for name in missing_metadata:
            print(f"  - {name}")
        print("\nRun the microsim-util skill standardization to generate metadata for these.")

    if not texts_to_embed:
        print("Error: No valid microsims with metadata found.")
        return

    print(f"\nGenerating embeddings for {len(texts_to_embed)} microsims...")
    embeddings = model.encode(texts_to_embed, show_progress_bar=True)

    # Build output data
    output_data = {
        "metadata": {
            "model": model_name,
            "embedding_dimension": len(embeddings[0]),
            "total_microsims": len(microsims_data),
            "missing_metadata_count": len(missing_metadata),
            "missing_metadata": missing_metadata
        },
        "microsims": []
    }

    for i, ms_data in enumerate(microsims_data):
        output_data["microsims"].append({
            "id": ms_data["id"],
            "title": ms_data["title"],
            "path": ms_data["path"],
            "embedding": embeddings[i].tolist()
        })

    # Save to file
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)

    print(f"\nEmbeddings saved to: {output_path}")
    print(f"Total microsims with embeddings: {len(output_data['microsims'])}")
    print(f"Embedding dimension: {output_data['metadata']['embedding_dimension']}")


def main():
    parser = argparse.ArgumentParser(
        description="Generate embeddings for MicroSim metadata files."
    )
    parser.add_argument(
        "--sims-dir",
        type=Path,
        default=Path(__file__).parent.parent.parent / "docs" / "sims",
        help="Path to the sims directory (default: ../../docs/sims)"
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path(__file__).parent / "microsim-embeddings.json",
        help="Output path for embeddings JSON (default: ./microsim-embeddings.json)"
    )
    parser.add_argument(
        "--model",
        type=str,
        default="all-MiniLM-L6-v2",
        help="Sentence transformer model name (default: all-MiniLM-L6-v2)"
    )

    args = parser.parse_args()

    if not args.sims_dir.exists():
        print(f"Error: Sims directory not found: {args.sims_dir}")
        sys.exit(1)

    generate_embeddings(args.sims_dir, args.output, args.model)


if __name__ == "__main__":
    main()

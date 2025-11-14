#!/usr/bin/env python3
"""
Add Level 4 Headers Before Details Blocks

This script processes all chapter index.md files and adds a level 4 header
(####) before each <details markdown="1"> block. The header text is taken
from the <summary> tag on the following line.

Usage:
    python add-level-4-links.py [--dry-run]

Options:
    --dry-run    Show what would be changed without modifying files

Example:
    Before:
        <details markdown="1">
        <summary>Metric Scale Zoom</summary>

    After:
        #### Diagram: Metric Scale Zoom
        <details markdown="1">
        <summary>Metric Scale Zoom</summary>
"""

import re
import os
import sys
from pathlib import Path
from typing import List, Tuple


def find_chapter_files(base_path: str) -> List[Path]:
    """Find all chapter index.md files.

    Args:
        base_path: Base directory path to search

    Returns:
        List of Path objects for chapter index.md files
    """
    docs_path = Path(base_path) / "docs" / "chapters"

    if not docs_path.exists():
        print(f"Error: Path does not exist: {docs_path}")
        return []

    chapter_files = []
    for chapter_dir in sorted(docs_path.iterdir()):
        if chapter_dir.is_dir():
            index_file = chapter_dir / "index.md"
            if index_file.exists():
                # Skip quiz.md files
                if index_file.name != "quiz.md":
                    chapter_files.append(index_file)

    return chapter_files


def extract_summary_text(summary_line: str) -> str:
    """Extract text from a summary tag.

    Args:
        summary_line: Line containing <summary> tag

    Returns:
        The text between <summary> and </summary> tags
    """
    match = re.search(r'<summary>(.*?)</summary>', summary_line)
    if match:
        return match.group(1).strip()
    return ""


def process_file(file_path: Path, dry_run: bool = False) -> Tuple[int, List[str]]:
    """Process a single file to add level 4 headers.

    Args:
        file_path: Path to the file to process
        dry_run: If True, don't write changes, just report them

    Returns:
        Tuple of (number_of_changes, list_of_change_descriptions)
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    changes = []
    i = 0

    while i < len(lines):
        current_line = lines[i]

        # Check if current line is a <details markdown="1"> tag
        if '<details markdown="1">' in current_line:
            # Check if next line contains <summary>
            if i + 1 < len(lines):
                next_line = lines[i + 1]
                summary_text = extract_summary_text(next_line)

                if summary_text:
                    # Check if the line before already has a level 4 header
                    has_header = False
                    if i > 0 and new_lines:
                        prev_line = new_lines[-1].strip()
                        if prev_line.startswith('#### Diagram:'):
                            has_header = True

                    if not has_header:
                        # Add the level 4 header
                        header_line = f"#### Diagram: {summary_text}\n"
                        new_lines.append(header_line)
                        changes.append(f"Line {i+1}: Added header for '{summary_text}'")

        new_lines.append(current_line)
        i += 1

    # Write changes if not dry run and there are changes
    if not dry_run and changes:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

    return len(changes), changes


def main():
    """Main function to process all chapter files."""
    # Parse command line arguments
    dry_run = '--dry-run' in sys.argv

    # Get the base path (project root)
    script_dir = Path(__file__).parent
    base_path = script_dir.parent.parent

    print(f"Searching for chapter files in: {base_path / 'docs' / 'chapters'}")
    print(f"Mode: {'DRY RUN (no changes will be made)' if dry_run else 'LIVE (files will be modified)'}")
    print("=" * 80)

    # Find all chapter index.md files
    chapter_files = find_chapter_files(str(base_path))

    if not chapter_files:
        print("No chapter files found!")
        return 1

    print(f"Found {len(chapter_files)} chapter files to process\n")

    # Process each file
    total_changes = 0
    for file_path in chapter_files:
        relative_path = file_path.relative_to(base_path)
        num_changes, changes = process_file(file_path, dry_run)

        if num_changes > 0:
            print(f"\n{relative_path}:")
            for change in changes:
                print(f"  - {change}")
            total_changes += num_changes
        else:
            print(f"{relative_path}: No changes needed")

    # Summary
    print("\n" + "=" * 80)
    print(f"Total changes: {total_changes} headers added")

    if dry_run:
        print("\nThis was a dry run. No files were modified.")
        print("Run without --dry-run to apply changes.")
    else:
        print("\nFiles have been modified successfully.")

    return 0


if __name__ == "__main__":
    sys.exit(main())

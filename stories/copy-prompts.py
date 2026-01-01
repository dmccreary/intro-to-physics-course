#!/usr/bin/env python3
"""
Clipboard automation for copying image prompts to ChatGPT.

This script extracts <details> blocks containing image prompts from a story's
index.md file and copies them to the clipboard one at a time.

Usage:
    python copy-prompts.py galileo              # Interactive mode - press Enter for each prompt
    python copy-prompts.py galileo --delay 90   # Auto mode with 90 second delay
    python copy-prompts.py galileo --start 5    # Start from image 5 (skip 1-4)
    python copy-prompts.py galileo --list       # Just list prompts without copying
"""

import argparse
import os
import re
import subprocess
import sys
import time
from pathlib import Path


def extract_image_prompts(index_path: Path) -> list[dict]:
    """Extract all image prompt details blocks from an index.md file."""
    content = index_path.read_text()

    # Pattern to match <details> blocks with Image or Final Image prompts
    # We look for the summary containing "Image Prompt" and capture the content
    pattern = r'<details>\s*<summary>([^<]*(?:Image|Final Image)[^<]*)</summary>\s*(.*?)</details>'

    matches = re.findall(pattern, content, re.DOTALL | re.IGNORECASE)

    prompts = []
    for i, (summary, body) in enumerate(matches, 1):
        # Clean up the body text
        body = body.strip()
        prompts.append({
            'number': i,
            'summary': summary.strip(),
            'prompt': body
        })

    return prompts


def copy_to_clipboard(text: str) -> bool:
    """Copy text to macOS clipboard using pbcopy."""
    try:
        process = subprocess.Popen(['pbcopy'], stdin=subprocess.PIPE)
        process.communicate(text.encode('utf-8'))
        return process.returncode == 0
    except Exception as e:
        print(f"Error copying to clipboard: {e}")
        return False


def play_notification_sound():
    """Play a system sound to notify user."""
    try:
        # Use macOS afplay to play a system sound
        subprocess.run(['afplay', '/System/Library/Sounds/Glass.aiff'],
                      capture_output=True, timeout=2)
    except Exception:
        pass  # Silently fail if sound doesn't work


def display_notification(title: str, message: str):
    """Display a macOS notification."""
    try:
        script = f'display notification "{message}" with title "{title}" sound name "Glass"'
        subprocess.run(['osascript', '-e', script], capture_output=True, timeout=5)
    except Exception:
        pass  # Silently fail if notification doesn't work


def format_time(seconds: int) -> str:
    """Format seconds as MM:SS."""
    minutes = seconds // 60
    secs = seconds % 60
    return f"{minutes}:{secs:02d}"


def countdown(seconds: int, message: str = "Next prompt in"):
    """Display a countdown timer."""
    for remaining in range(seconds, 0, -1):
        print(f"\r{message}: {format_time(remaining)}  ", end='', flush=True)
        time.sleep(1)
    print(f"\r{' ' * 40}\r", end='')  # Clear the line


def main():
    parser = argparse.ArgumentParser(
        description='Copy image prompts to clipboard at intervals for ChatGPT image generation'
    )
    parser.add_argument('story', help='Story directory name (e.g., "galileo")')
    parser.add_argument('--delay', '-d', type=int, default=0,
                       help='Auto mode: delay between prompts in seconds (default: 0 = interactive)')
    parser.add_argument('--start', '-s', type=int, default=1,
                       help='Start from this image number (default: 1)')
    parser.add_argument('--list', '-l', action='store_true',
                       help='List all prompts without copying')
    parser.add_argument('--no-sound', action='store_true',
                       help='Disable notification sounds')

    args = parser.parse_args()

    # Find the story directory
    script_dir = Path(__file__).parent
    story_dir = script_dir / args.story
    index_path = story_dir / 'index.md'

    if not index_path.exists():
        print(f"Error: Could not find {index_path}")
        sys.exit(1)

    # Extract prompts
    prompts = extract_image_prompts(index_path)

    if not prompts:
        print(f"No image prompts found in {index_path}")
        sys.exit(1)

    print(f"Found {len(prompts)} image prompts in {args.story}/index.md")
    print()

    # List mode - just show prompts
    if args.list:
        for p in prompts:
            preview = p['prompt'][:80].replace('\n', ' ') + '...'
            print(f"  {p['number']:2}. {p['summary']}: {preview}")
        sys.exit(0)

    # Filter to starting point
    prompts_to_copy = [p for p in prompts if p['number'] >= args.start]

    if not prompts_to_copy:
        print(f"No prompts remaining (start={args.start}, total={len(prompts)})")
        sys.exit(1)

    print(f"Starting from image {args.start}, {len(prompts_to_copy)} prompts to copy")
    if args.delay > 0:
        print(f"Auto mode: {format_time(args.delay)} delay between prompts")
    else:
        print("Interactive mode: press Enter for each prompt")
    print()
    print("=" * 60)
    print("Instructions:")
    print("  1. Switch to your ChatGPT window")
    print("  2. Press Cmd+V to paste the prompt")
    print("  3. Submit and wait for the image to generate")
    if args.delay > 0:
        print("  4. The next prompt will be copied automatically")
    else:
        print("  4. Come back here and press Enter for the next prompt")
    print()
    print("Press Ctrl+C at any time to stop")
    print("=" * 60)
    print()

    # Copy first prompt immediately
    print("First prompt copied to clipboard - go paste it in ChatGPT!")
    print()

    for i, prompt in enumerate(prompts_to_copy):
        # In interactive mode, wait for Enter before copying (except first prompt)
        if args.delay == 0 and i > 0:
            next_num = prompt['number']
            input(f"Press Enter to copy image {next_num}/{len(prompts)}...")

        # Copy to clipboard
        if copy_to_clipboard(prompt['prompt']):
            print(f"✓ Copied image {prompt['number']}/{len(prompts)}: {prompt['summary']}")

            # Show preview
            preview_lines = prompt['prompt'].split('\n')[:3]
            for line in preview_lines:
                if line.strip():
                    print(f"  │ {line[:70]}{'...' if len(line) > 70 else ''}")
            print()

            # Notify user
            if not args.no_sound:
                display_notification(
                    f"Image {prompt['number']}/{len(prompts)} Ready",
                    "Prompt copied to clipboard - paste with Cmd+V"
                )

            # Wait before next prompt (unless this is the last one)
            if args.delay > 0 and i < len(prompts_to_copy) - 1:
                countdown(args.delay, f"Next prompt ({prompts_to_copy[i+1]['number']}) in")
        else:
            print(f"✗ Failed to copy image {prompt['number']}")

    print()
    print("=" * 60)
    print("All prompts copied!")
    print("=" * 60)

    if not args.no_sound:
        # Play a different sound to indicate completion
        try:
            subprocess.run(['afplay', '/System/Library/Sounds/Funk.aiff'],
                          capture_output=True, timeout=2)
        except Exception:
            pass


if __name__ == '__main__':
    main()

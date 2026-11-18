#!/usr/bin/env python3
import argparse
import json
import re
import sys
from pathlib import Path


def find_key_paths(data, target_key, path=""):
    found = []
    if isinstance(data, dict):
        for k, v in data.items():
            current_path = f"{path}.{k}" if path else k
            if k == target_key:
                found.append(current_path)
            found.extend(find_key_paths(v, target_key, current_path))
    elif isinstance(data, list):
        for i, item in enumerate(data):
            current_path = f"{path}[{i}]"
            found.extend(find_key_paths(item, target_key, current_path))
    return found


def all_dict_keys_recursive(data, path=""):
    found = []
    if isinstance(data, dict):
        for k, v in data.items():
            current_path = f"{path}.{k}" if path else k
            found.append((path, k))
            found.extend(all_dict_keys_recursive(v, current_path))
    elif isinstance(data, list):
        for i, item in enumerate(data):
            found.extend(all_dict_keys_recursive(item, f"{path}[{i}]"))
    return found


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("target", help="Path to the JSON messages file")
    parser.add_argument("key", nargs="?", help="Specific key to search for")
    parser.add_argument("--scan-all", action="store_true")
    args = parser.parse_args()

    path = Path(args.target)
    if not path.exists():
        print(f"ERROR: file not found: {path}", file=sys.stderr)
        return 1

    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, dict):
        print("ERROR: top level of this file is not an object.", file=sys.stderr)
        return 1

    top_level_keys = set(data.keys())

    if args.scan_all:
        pattern = re.compile(r"(_page|_page_cards|_metadata|_principles|_products|_resources)$")
        all_keys = all_dict_keys_recursive(data)

        by_name = {}
        for parent_path, k in all_keys:
            if pattern.search(k):
                by_name.setdefault(k, []).append(parent_path or "(top level)")

        print("=== Namespace-like keys found anywhere in the file ===\n")
        problems = 0
        for name, locations in sorted(by_name.items()):
            correctly_placed = "(top level)" in locations
            marker = "OK" if correctly_placed else "MISPLACED"
            if not correctly_placed:
                problems += 1
            print(f"[{marker}] {name}")
            for loc in locations:
                print(f"    found under: {loc}")
            print()

        print(f"=== {problems} namespace(s) found ONLY nested (not at top level) ===")
        return 0

    if not args.key:
        print("ERROR: provide a key name, or use --scan-all", file=sys.stderr)
        return 1

    results = find_key_paths(data, args.key)
    if not results:
        print(f"'{args.key}' was not found anywhere in {path}.")
        return 0

    print(f"Found '{args.key}' at {len(results)} location(s):\n")
    for r in results:
        marker = "  <-- TOP LEVEL (correct)" if r == args.key else "  <-- NESTED (likely misplaced)"
        print(f"  {r}{marker}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
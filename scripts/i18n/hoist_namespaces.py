#!/usr/bin/env python3
"""
hoist_namespaces.py

Repairs messages/ar.json by finding page namespaces that got
accidentally nested under the wrong parent (e.g. everything nested
inside "search" because it never got closed properly) and moving them
back to the top level, where next-intl expects them.

Unlike a generic pattern scan, this uses the REAL list of top-level
keys from en.json as the source of truth for what counts as a "real
namespace" -- so legitimate nested fields that happen to share a name
pattern (e.g. right_actions.qxt_products, navbar.media_resources) are
left completely untouched. Only exact matches to an actual en.json
top-level key name are moved.

Usage:
    python3 hoist_namespaces.py messages/en.json messages/ar.json

    # Preview only, writes nothing:
    python3 hoist_namespaces.py messages/en.json messages/ar.json --dry-run

A timestamped backup of ar.json is written before any changes are made.
"""

from __future__ import annotations

import argparse
import json
import shutil
import sys
import time
from pathlib import Path


def find_and_extract(data, target_keys, path=""):
    """
    Recursively walk `data`. For every dict, if a key is in
    `target_keys`, remove it from that dict and record it (with the
    path it was found at) instead of leaving it in place.
    """
    extracted = {}

    def _walk(node, node_path):
        if isinstance(node, dict):
            for key in list(node.keys()):
                value = node[key]
                child_path = f"{node_path}.{key}" if node_path else key

                if key in target_keys:
                    popped = node.pop(key)
                    extracted.setdefault(key, []).append((child_path, popped))
                    _walk(popped, child_path)
                else:
                    _walk(value, child_path)

        elif isinstance(node, list):
            for i, item in enumerate(node):
                _walk(item, f"{node_path}[{i}]")

    _walk(data, path)
    return extracted


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("en_path", help="Path to messages/en.json (source of truth)")
    parser.add_argument("ar_path", help="Path to messages/ar.json (to repair)")
    parser.add_argument("--dry-run", action="store_true", help="Preview only, write nothing")
    args = parser.parse_args()

    en_path = Path(args.en_path)
    ar_path = Path(args.ar_path)

    if not en_path.exists():
        print(f"ERROR: {en_path} not found", file=sys.stderr)
        return 1
    if not ar_path.exists():
        print(f"ERROR: {ar_path} not found", file=sys.stderr)
        return 1

    with en_path.open("r", encoding="utf-8") as f:
        en_data = json.load(f)

    with ar_path.open("r", encoding="utf-8") as f:
        ar_data = json.load(f)

    target_keys = set(en_data.keys())
    ar_top_level_keys = set(ar_data.keys())

    root_backup = {}
    for k in list(ar_data.keys()):
        root_backup[k] = ar_data.pop(k)

    extracted_all = {}
    for k, v in root_backup.items():
        found = find_and_extract(v, target_keys, path=k)
        for name, occurrences in found.items():
            extracted_all.setdefault(name, []).extend(occurrences)
        root_backup[k] = v

    for k, v in root_backup.items():
        ar_data[k] = v

    print("=== Namespaces found nested in the wrong place ===\n")
    promoted = 0
    conflicts = 0

    for name, occurrences in sorted(extracted_all.items()):
        if name in ar_top_level_keys:
            print(f"[SKIP] '{name}' already exists at top level -- "
                  f"found {len(occurrences)} nested duplicate(s), NOT promoted:")
            for p, _ in occurrences:
                print(f"    at: {p}")
            conflicts += 1
            continue

        if len(occurrences) > 1:
            print(f"[MULTIPLE] '{name}' found nested in {len(occurrences)} places -- "
                  f"promoting the first one, please check the others manually:")
            for p, _ in occurrences:
                print(f"    at: {p}")
        else:
            print(f"[PROMOTE] '{name}'")
            print(f"    was at: {occurrences[0][0]}")

        ar_data[name] = occurrences[0][1]
        promoted += 1
        print()

    print(f"=== Summary: {promoted} namespace(s) promoted to top level, "
          f"{conflicts} skipped due to existing top-level conflict ===")

    if args.dry_run:
        print("\n--dry-run set: ar.json was NOT modified.")
        return 0

    if promoted == 0:
        print("\nNothing to change -- ar.json not modified.")
        return 0

    backup_path = ar_path.with_suffix(f".backup-{int(time.time())}.json")
    shutil.copy(ar_path, backup_path)
    print(f"\nBackup of original file saved to: {backup_path}")

    with ar_path.open("w", encoding="utf-8") as f:
        json.dump(ar_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Repaired {ar_path} -- {promoted} namespace(s) moved to top level.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
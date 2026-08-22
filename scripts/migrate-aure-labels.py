from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [*ROOT.rglob("*.html"), ROOT / "build-site.py"]
EXCLUDED = {ROOT / "node_modules"}

changed = []
for path in TARGETS:
    if any(parent in EXCLUDED for parent in path.parents):
        continue
    original = path.read_text(encoding="utf-8")
    updated = original.replace("AURE Swarm", "AURE")
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        changed.append(path.relative_to(ROOT).as_posix())

print(f"Updated {len(changed)} files:")
for name in changed:
    print(name)

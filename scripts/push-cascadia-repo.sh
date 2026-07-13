#!/usr/bin/env bash
# Push the Cascadia Cinema Co. site into Joeflowcode/cascadia-cinema-co
# Prerequisite: create the empty public repo first (see CREATE_GITHUB_REPO.md)
set -euo pipefail

REPO_SLUG="${REPO_SLUG:-Joeflowcode/cascadia-cinema-co}"
SRC="${SRC:-/tmp/cascadia-cinema-co}"

if [[ ! -d "$SRC/.git" ]]; then
  echo "Missing prepared site at $SRC"
  exit 1
fi

cd "$SRC"

# Prefer an explicit PAT if provided (needed when GITHUB_TOKEN can't write other repos)
if [[ -n "${CASCADIA_PAT:-}" ]]; then
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://x-access-token:${CASCADIA_PAT}@github.com/${REPO_SLUG}.git"
elif [[ -n "${FLIP_FINDER_PAT:-}" ]]; then
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://x-access-token:${FLIP_FINDER_PAT}@github.com/${REPO_SLUG}.git"
fi

echo "Pushing to https://github.com/${REPO_SLUG} ..."
git push -u origin main
echo "Done. Enable Pages: Settings → Pages → main / (root)"

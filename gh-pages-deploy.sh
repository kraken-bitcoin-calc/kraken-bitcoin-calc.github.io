#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

if ! git status | grep --quiet 'On branch develop'; then
    echo 'Error: you are not in the branch "develop"'
    exit 1
fi

tmpdir=$(mktemp --quiet --directory)
cp --recursive ./src/* "${tmpdir}"
git checkout gh-pages
rm --recursive --force *
cp --recursive "${tmpdir}/*" .
rm --recursive --force "${tmpdir}"
git add .
git commit --message 'Bump GitHub Pages'
git push
git checkout develop
echo 'Done: https://kraken-bitcoin-calc.github.io/'

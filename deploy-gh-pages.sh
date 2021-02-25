#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

source_dir='src'
source_branch='develop'
target_branch='gh-pages'
remote='origin'

# Credits: https://damianavila.github.io/blog/posts/one-line-deployment-of-your-site-to-gh-pages.html
function deploy {
    git checkout ${source_branch}
    git subtree split --prefix "${source_dir}" --branch ${target_branch}
    git push --force ${remote} ${target_branch}:${target_branch}
    git branch --delete --force ${target_branch}
}

read -p "Pushing directory '${source_dir}' to ${remote}/${target_branch}. Are you sure? [y/n]: " answer
case ${answer} in
    [yY]) deploy ;;
    *)    echo 'Cancelled.' ;;
esac

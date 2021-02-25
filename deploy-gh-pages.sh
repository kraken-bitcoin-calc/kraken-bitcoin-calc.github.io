#!/usr/bin/env bash

dir='src'
remote='origin'
branch='gh-pages'

read -p "Pushing directory '${dir}' to ${remote}/${branch}. Are you sure? [y/n]: " answer
case ${answer} in
    [yY]) git subtree push --prefix ${dir} ${remote} ${branch} ;;
    *)    echo 'Cancelled.' ;;
esac

#!/bin/bash
# Commit and push all changes

git add -A
git commit -m "$1"
git push

#!/bin/bash

set -e

echo
echo "===================================================================================="
echo
echo "WARNING: FOR DEVELOPMENT PURPOSE ONLY! DO NOT USE OR COPY THIS SCRIPT TO PRODUCTION!"
echo
echo "===================================================================================="
echo

# Configurable varible
docker_image_reponame=recocloud-app/traffic-violation-alert-system

## Variable auto init (No need change, auto generate)
# Ref: https://stackoverflow.com/questions/3404936/show-which-git-tag-you-are-on
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
git_version="$(git describe --tags --exact-match --match "v*.*.*" ||
    git describe --match "v*.*.*" --tags || git describe --tags || git rev-parse HEAD)"
current_tagname="$docker_image_reponame":"$git_version"
latest_tagname="$docker_image_reponame":latest
echo "Building $current_tagname"

## Process
DOCKER_BUILDKIT=1 docker build -t "$current_tagname" "$SCRIPT_DIR"/../
docker tag "$current_tagname" "$latest_tagname"

echo "Finished docker build for all endpoints. Please check with: docker images"

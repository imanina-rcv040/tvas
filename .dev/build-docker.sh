#!/bin/bash

set -e

docker_image_reponame=recocloudapp/recocloud:tvas
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# docker build -t recocloud-app/tvas:v1.0.0 "$SCRIPT_DIR"/../


git_version="$(git describe --tags --exact-match --match "v*.*.*"\
 || git describe --match "v*.*.*" --tags\
 || git describe --tags\
 || git rev-parse HEAD)"

current_tagname="$docker_image_reponame":"$git_version"
latest_tagname="$docker_image_reponame":latest

export DOCKER_BUILDKIT=1

echo "Building ${docker_image_reponame}-$git_version"
docker build\
 -t "$current_tagname"\
 -f "$SCRIPT_DIR"/../frontend/\
 .
docker tag "$current_tagname" "$latest_tagname"
 echo "Jobs done!"

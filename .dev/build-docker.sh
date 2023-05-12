#!/bin/bash

set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# docker build -t recocloud-app/tvas:v1.0.0 "$SCRIPT_DIR"/../


git_version="$(git describe --tags --exact-match --match "v*.*.*"\
 || git describe --match "v*.*.*" --tags\
 || git describe --tags\
 || git rev-parse HEAD)"

export DOCKER_BUILDKIT=1

echo "Building recocloudapp/recocloud:tvas-$git_version"
docker build\
 -t recocloudapp/recocloud:tvas-"$git_version"\
 -f "$SCRIPT_DIR"/../frontend/dockerfile\
 .

 echo "Jobs done!"
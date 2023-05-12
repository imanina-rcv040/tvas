#!/bin/bash

set -e

echo "WARNING: FOR DEVELOPMENT PURPOSE ONLY! DO NOT USE OR COPY THIS SCRIPT TO PRODUCTION!"

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

## Stop all running docker containers
echo "==============================================="
echo "Stopping all running docker containers"
echo "==============================================="
"$SCRIPT_DIR"/stop-server.sh

echo "==============================================="
echo "Update to latest Git changes"
echo "==============================================="
git pull
echo "Done git pulling"

echo "==============================================="
echo "Docker build the new images"
echo "==============================================="
"$SCRIPT_DIR"/build-docker.sh

echo "==============================================="
echo "Docker up all the containers"
echo "==============================================="
"$SCRIPT_DIR"/run-server.sh

echo "[+] --- Finished deploying the dockers"

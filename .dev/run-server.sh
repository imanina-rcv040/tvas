#!/bin/bash

set -e

echo "WARNING: FOR DEVELOPMENT PURPOSE ONLY! DO NOT USE OR COPY THIS SCRIPT TO PRODUCTION!"
echo "NOTE: Make sure that you have docker build all the images!"

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

echo "[1] --- Up server"
docker-compose -f "$SCRIPT_DIR"/../docker-compose.yml up -d

echo
echo "Finished setting up the servers. Please check with: docker ps && docker logs"

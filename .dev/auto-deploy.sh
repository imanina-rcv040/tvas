#!/bin/bash

set -e

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

echo "Stopping container..."
"$SCRIPT_DIR"/stop-server.sh || true # ignore error for active network issue

echo "Pulling latest library..."
git pull

echo "Building latest image..."
"$SCRIPT_DIR"/build-docker.sh

echo "Starting the server..."
"$SCRIPT_DIR"/run-server.sh

echo "Jobs done!"

#!/bin/bash

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

# Stop the existing server
"$SCRIPT_DIR"/stop-server.sh

# Start the development server
docker-compose -f "$SCRIPT_DIR"/../docker-compose.yml -f "$SCRIPT_DIR"/../docker-compose.dev.yml up

# Perform server cleanup
docker-compose -f "$SCRIPT_DIR"/../docker-compose.yml -f "$SCRIPT_DIR"/../docker-compose.dev.yml down

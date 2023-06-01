#!/bin/bash

# set -e

echo "WARNING: FOR DEVELOPMENT PURPOSE ONLY! DO NOT USE OR COPY THIS SCRIPT TO PRODUCTION!"
echo "Stopping all the docker that runs the api-gateway server:"

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo "[1] --- Stopping server"
docker-compose -f "$SCRIPT_DIR"/../docker-compose.yml down

echo
echo "Finished stopping all dockerized servers. Please check with: docker ps"
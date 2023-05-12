#!/bin/bash

# set -e

echo "WARNING: FOR DEVELOPMENT PURPOSE ONLY! DO NOT USE OR COPY THIS SCRIPT TO PRODUCTION!"
echo "Stopping all the docker that runs the api-gateway server:"

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo "Stopping the application..."
docker-compose -f "$SCRIPT_DIR"/../frontend/docker-compose.yml down

echo
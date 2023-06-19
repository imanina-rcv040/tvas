#!/bin/bash

set -e

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
source "$SCRIPT_DIR"/../.env

container_name="${COMPOSE_PROJECT_NAME}_${project_dirname}"_1
echo "container_name: $container_name"

if [ "$(docker container inspect -f '{{.State.Running}}' $container_name)" == "false" ]; then
    echo "The container fail to run."
    exit 1
fi

if [ "$(docker container inspect -f '{{.State.Restarting}}' $container_name)" == "true" ]; then
    echo "The container is restarting."
    exit 1
fi

echo "The container run succefully."

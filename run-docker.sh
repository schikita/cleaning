#!/bin/bash
set -e
cd "$(dirname "$0")"
export DOCKER_BUILDKIT=1
docker compose up --build -d

#!/bin/sh
export DOCKER_HOST=unix:///var/run/docker.sock
dockerd-entrypoint.sh --host=unix:///var/run/docker.sock &

# 도커 데몬이 준비될 때까지 대기 (에러 메시지 출력)
while ! DOCKER_HOST=unix:///var/run/docker.sock docker info; do
  echo "Waiting for dockerd..."
  sleep 1
done

echo "dockerd is ready!"

export HOST=0.0.0.0
export PORT=3000
export ENABLE_UNSAFE_SSE_TRANSPORT=1
export DEBUG='*'
node dist/index.js

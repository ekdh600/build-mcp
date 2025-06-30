#!/bin/sh
# 도커 데몬을 /var/run/docker.sock로 리스닝하도록 명시
exec dockerd-entrypoint.sh --host=unix:///var/run/docker.sock &

# 도커 데몬이 준비될 때까지 대기
while ! docker info > /dev/null 2>&1; do
  echo "Waiting for dockerd..."
  sleep 1
done

echo "dockerd is ready!"

export HOST=0.0.0.0
export PORT=3000
export ENABLE_UNSAFE_SSE_TRANSPORT=1
export DEBUG='*'
export DOCKER_HOST=unix:///var/run/docker.sock
node dist/index.js

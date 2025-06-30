#!/bin/sh
# 도커 데몬 실행 (백그라운드)
dockerd-entrypoint.sh &

# 도커 데몬이 준비될 때까지 대기
while ! docker info > /dev/null 2>&1; do
  echo "Waiting for dockerd..."
  sleep 1
done

echo "dockerd is ready!"

# MCP 서버 실행 (외부에서 접근 가능)
export HOST=0.0.0.0
export PORT=3000
export ENABLE_UNSAFE_SSE_TRANSPORT=1
export DEBUG='*'
export DOCKER_HOST=tcp://localhost:2375
node dist/index.js

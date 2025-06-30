# DinD(Docker-in-Docker) + Node.js + MCP 서버
FROM docker:24-dind

# Node.js, npm 설치
RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false
COPY . ./
RUN npm run build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
EXPOSE 3000

# 도커 데몬 + MCP 서버 동시 실행
CMD dockerd-entrypoint.sh & \
    sleep 3 && \
    node dist/index.js

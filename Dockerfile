# DinD(Docker-in-Docker) + Node.js + MCP 서버
FROM docker:24-dind

# Node.js, npm 설치
RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false
COPY . ./
RUN npm run build

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000

CMD ["/docker-entrypoint.sh"]

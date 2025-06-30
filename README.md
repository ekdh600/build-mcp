# Docker Build MCP TypeScript Server

이 프로젝트는 MCP(modelcontextprotocol) 표준을 완벽히 따르는 Docker Build MCP 서버입니다.

- **SSE(Server-Sent Events) 및 stdio 모드 지원**
- Cursor, Claude 등 MCP 클라이언트에서 tool discovery/실행 100% 호환
- 주요 기능: Docker 이미지 build, push

## 실행 방법

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행 (SSE 모드)

```bash
ENABLE_UNSAFE_SSE_TRANSPORT=1 npm run dev
```

3. 빌드 및 배포 실행

```bash
npm run build
npm start
```

## 주요 엔드포인트/동작
- MCP 표준 SSE: `/sse`, `/messages` (자동)
- MCP tool discovery 및 실행: MCP 프로토콜(JSON-RPC)

## tools
- `docker_build`: 여러 파일을 context로 받아 Docker 이미지를 빌드
- `docker_push`: 태그된 이미지를 레지스트리로 푸시

---

실제 build/push는 child_process로 docker CLI를 호출합니다.

---

추가 확장/문의는 언제든 요청해 주세요!

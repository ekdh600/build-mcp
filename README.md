# Docker Build MCP TypeScript Server

이 프로젝트는 MCP(modelcontextprotocol) 표준을 완벽히 따르는 Docker Build MCP 서버입니다.

## 주요 특징
- **MCP 표준 완벽 지원**: Cursor, Claude 등 MCP 클라이언트에서 tool discovery/실행 100% 호환
- **도커 이미지 관리 자동화**: build, run, stop, rm, rmi, push 등 도커 CLI의 주요 기능을 API로 제공
- **SSE(Server-Sent Events) 및 stdio 모드 지원**
- **확장성 높은 구조**: 각 도커 명령이 독립적인 tool로 구현되어 유지보수 및 확장 용이
- **실행 명령어 및 결과 로그**: 모든 도커 명령 실행 시 콘솔에 명령어와 결과가 출력됨

## 디렉토리 구조
```
./
  ├── dist/                # 빌드 결과물
  ├── node_modules/        # 의존성 모듈
  ├── src/
  │   ├── config/          # 서버 및 도구 설정
  │   ├── models/          # 타입/스키마 정의
  │   ├── prompts/         # MCP 프롬프트 핸들러
  │   ├── resources/       # 리소스 핸들러
  │   ├── tools/           # 도커 관련 MCP 도구 (build, run, stop, rm, rmi 등)
  │   ├── utils/           # 유틸리티 함수
  │   ├── http-server.ts   # HTTP 서버 진입점
  │   └── index.ts         # MCP 서버 진입점
  ├── tests/               # 테스트 코드
  ├── package.json         # 프로젝트 메타/스크립트
  ├── tsconfig.json        # 타입스크립트 설정
  └── vitest.config.ts     # 테스트 설정
```

## 주요 기능 및 지원 도구
- **docker_build**: 여러 파일을 context로 받아 Docker 이미지를 빌드
- **docker_run**: 원하는 옵션으로 컨테이너 생성 및 실행
- **docker_ps**: 실행 중/전체 컨테이너 목록 조회 (all 옵션 지원)
- **docker_stop, docker_stop_multi**: 컨테이너(들) 중지
- **docker_rm, docker_rm_multi**: 컨테이너(들) 삭제 (삭제 전 자동 중지)
- **docker_images**: 로컬 이미지 목록 조회
- **docker_rmi, docker_rmi_multi**: 이미지(들) 삭제
- **docker_push**: 태그된 이미지를 레지스트리로 푸시
- **docker_login**: 도커 레지스트리 로그인
- **docker-inspect**: 컨테이너/이미지 상세 정보 조회
- **docker-container-prune, docker-image-prune, docker-network-prune, docker-volume-prune**: 불필요한 리소스 일괄 정리

## 설치 및 실행 방법
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

## 예시: MCP 툴 사용
- MCP 클라이언트에서 tool discovery를 통해 위 도구들을 자동 인식/실행 가능
- 각 도구는 child_process로 docker CLI를 직접 호출하여 실제 도커 환경과 동일하게 동작

## 테스트
- `tests/` 디렉토리 내에 각 도구별 테스트 코드 포함
- vitest 기반 테스트 지원

## 기여 및 문의
- 이 프로젝트는 확장/기여를 환영합니다.
- MCP 표준, 도커 자동화, 추가 기능 문의는 언제든 이슈/PR로 남겨주세요.

---

실제 build/push/run 등은 child_process로 docker CLI를 호출합니다.

---

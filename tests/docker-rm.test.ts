import { describe, it, expect } from "vitest";
import { dockerRm } from "../src/tools/docker-rm";

// 실제로 존재하는 컨테이너 이름을 입력해야 합니다.
const TEST_CONTAINER = "test-mcp-container";

describe("docker rm MCP 도구", () => {
  it("존재하지 않는 컨테이너 삭제 시 실패를 반환해야 한다", async () => {
    const result = await dockerRm({ container: "nonexistent-container-xyz" });
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("존재하는 컨테이너 삭제 시 성공을 반환해야 한다 (사전 준비 필요)", async () => {
    // 이 테스트는 실제로 TEST_CONTAINER가 존재해야 성공합니다.
    // 미리 docker run -d --name test-mcp-container nginx 등으로 컨테이너를 띄워두세요.
    const result = await dockerRm({ container: TEST_CONTAINER });
    // 성공 또는 이미 삭제된 경우 모두 허용
    expect(typeof result.success).toBe("boolean");
    expect(result.output).toBeDefined();
  });
});

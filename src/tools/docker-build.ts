import { exec } from "child_process";
import { promisify } from "util";
import { DockerToolSchema } from "../models/tool-models.js";
import { DockerToolResponse } from "../models/response-schemas.js";

const execAsync = promisify(exec);

export const dockerBuildSchema = {
  name: "docker_build",
  description: "여러 파일을 업로드하여 Docker 이미지를 빌드합니다.",
  inputSchema: {
    type: "object",
    properties: {
      tag: { type: "string", description: "이미지 태그" },
      contextPath: { type: "string", description: "Docker build context 경로" }
    },
    required: ["tag", "contextPath"]
  },
  returns: {
    type: "object",
    properties: {
      output: { type: "string" },
      success: { type: "boolean" },
      error: { type: "string" }
    }
  }
};

export async function dockerBuild(args: { tag: string, contextPath: string }): Promise<{ content: { type: string; text: string }[] }> {
  const cmd = `docker build -t ${args.tag} ${args.contextPath}`;
  console.log("실행 명령어:", cmd);
  try {
    const { stdout, stderr } = await execAsync(cmd);
    return { content: [{ type: "text", text: stdout || stderr }] };
  } catch (e: any) {
    return { content: [{ type: "text", text: e.stderr || e.message }] };
  }
}

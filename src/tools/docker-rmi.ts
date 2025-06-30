import { exec } from "child_process";
import { promisify } from "util";
import { DockerToolSchema } from "../models/tool-models.js";
import { DockerToolResponse } from "../models/response-schemas.js";

const execAsync = promisify(exec);

export const dockerRmiSchema: DockerToolSchema = {
  name: "docker_rmi",
  description: "이미지 이름 또는 ID로 Docker 이미지를 삭제합니다.",
  inputSchema: {
    type: "object",
    properties: {
      image: { type: "string", description: "삭제할 이미지 이름 또는 ID" }
    },
    required: ["image"]
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

export async function dockerRmi(input: { image: string }): Promise<{ content: { type: string; text: string }[] }> {
  const name = input.image;
  try {
    const cmd = `docker rmi ${name}`;
    console.log("실행 명령어:", cmd);
    const { stdout, stderr } = await execAsync(cmd);
    return { content: [{ type: "text", text: stdout || stderr || `${name} removed` }] };
  } catch (e: any) {
    return { content: [{ type: "text", text: `[${name}] 삭제 실패: ${e.stderr || e.message}` }] };
  }
} 
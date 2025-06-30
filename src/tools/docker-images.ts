import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const dockerImagesSchema = {
  name: "docker_images",
  description: "로컬에 저장된 Docker 이미지 목록을 출력합니다.",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  },
  returns: {
    type: "object",
    properties: {
      output: { type: "string" },
      error: { type: "string" }
    }
  }
};

export async function dockerImages(): Promise<{ content: { type: string; text: string }[] }> {
const cmd = "docker images";
console.log("실행 명령어:", cmd);
try {
  const { stdout, stderr } = await execAsync(cmd);
return { content: [{ type: "text", text: stdout || stderr }] };
} catch (e: any) {
    return { content: [{ type: "text", text: e.stderr || e.message }] };
  }
}  
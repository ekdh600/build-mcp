import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const dockerInspectSchema = {
  name: "docker_inspect",
  description: "컨테이너 또는 이미지의 상세 정보를 출력합니다.",
  inputSchema: {
    type: "object",
    properties: {
      target: { type: "string", description: "컨테이너 또는 이미지 이름/ID" }
    },
    required: ["target"]
  },
  returns: {
    type: "object",
    properties: {
      content: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: { type: "string" },
            text: { type: "string" }
          }
        }
      }
    }
  }
};

export async function dockerInspect(input: { target: string }): Promise<{ content: { type: string; text: string }[] }> {
  const cmd = `docker inspect ${input.target}`;
  console.log("실행 명령어:", cmd);
  try {
    const { stdout, stderr } = await execAsync(cmd);
    return { content: [{ type: "text", text: stdout || stderr }] };
  } catch (e: any) {
    return { content: [{ type: "text", text: e.stderr || e.message }] };
  }
} 
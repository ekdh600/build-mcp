import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const dockerImagePruneSchema = {
  name: "docker_image_prune",
  description: "사용하지 않는 이미지를 일괄 삭제합니다.",
  inputSchema: {
    type: "object",
    properties: {
      force: { type: "boolean", description: "강제 삭제 여부" },
      filter: { type: "string", description: "필터" }
    },
    required: []
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

export async function dockerImagePrune(args: { force?: boolean; filter?: string } = {}): Promise<{ content: { type: string; text: string }[] }> {
  let cmd = "docker image prune ";
  if (args.force) cmd += "--force ";
  if (args.filter) cmd += `--filter \"${args.filter}\" `;
  console.log("실행 명령어:", cmd);
  try {
    const { stdout, stderr } = await execAsync(cmd);
    return { content: [{ type: "text", text: stdout || stderr }] };
  } catch (e: any) {
    return { content: [{ type: "text", text: e.stderr || e.message }] };
  }
}

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const dockerRunSchema = {
  name: "docker_run",
  description: "원하는 이름, 이미지, 옵션, 명령어를 받아 Docker 컨테이너를 생성 및 실행합니다.",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string", description: "컨테이너 이름 (선택)" },
      image: { type: "string", description: "사용할 도커 이미지" },
      options: { type: "string", description: "추가 docker run 옵션 (예: -p 8080:80 -e ENV=prod)" },
      command: { type: "string", description: "컨테이너에서 실행할 명령어 및 인자 (예: 'sleep 3600')" }
    },
    required: ["image"]
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

export async function dockerRun(args: { name?: string; image: string; options?: string; command?: string }): Promise<{ content: { type: string; text: string }[] }> {
  // docker run [options] [image] [command]
  const cmdParts: string[] = ["docker", "run"];

  // options (이미 -d, --name 등 포함 가능)
  if (args.options) {
    cmdParts.push(...args.options.split(" ").filter(Boolean));
  }

  // --name 옵션: options에 없으면 추가
  if (args.name && !(args.options && (args.options.includes("--name") || args.options.includes(`--name=${args.name}`)))) {
    cmdParts.push("--name", args.name);
  }

  // 이미지
  cmdParts.push(args.image);

  // 명령어
  if (args.command) {
    cmdParts.push(...args.command.split(" ").filter(Boolean));
  }

  const cmd = cmdParts.join(" ");
  console.log("실행 명령어:", cmd);
  try {
    const { stdout, stderr } = await execAsync(cmd);
    return { content: [{ type: "text", text: stdout || stderr }] };
  } catch (e: any) {
    return { content: [{ type: "text", text: e.stderr || e.message }] };
  }
}


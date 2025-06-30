import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
export const dockerPsSchema = {
    name: "docker_ps",
    description: "실행 중인 Docker 컨테이너 목록을 출력합니다. (all 옵션 사용 시 중지된 컨테이너도 포함)",
    inputSchema: {
        type: "object",
        properties: {
            all: { type: "boolean", description: "모든 컨테이너 출력 여부(-a)" }
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
                    },
                    required: ["type", "text"]
                }
            }
        }
    }
};
export async function dockerPs(args = {}) {
    const cmd = args.all ? "docker ps -a" : "docker ps";
    console.log("실행 명령어:", cmd);
    try {
        const { stdout, stderr } = await execAsync(cmd);
        return { content: [{ type: "text", text: stdout || stderr }] };
    }
    catch (e) {
        return { content: [{ type: "text", text: e.stderr || e.message }] };
    }
}

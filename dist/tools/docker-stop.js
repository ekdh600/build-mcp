import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
export const dockerStopSchema = {
    name: "docker_stop",
    description: "컨테이너 이름 또는 ID로 Docker 컨테이너를 중지합니다.",
    inputSchema: {
        type: "object",
        properties: {
            container: { type: "string", description: "중지할 컨테이너 이름 또는 ID" }
        },
        required: ["container"]
    },
    returns: {
        type: "object",
        properties: {
            output: { type: "string" },
            success: { type: "boolean" },
            error: { type: "string" },
            containerStatus: { type: "string" }
        }
    }
};
export async function dockerStop(args) {
    try {
        const cmd = `docker stop ${args.container}`;
        console.log("실행 명령어:", cmd);
        const { stdout, stderr } = await execAsync(cmd);
        // 상태 확인
        const { stdout: inspectOut } = await execAsync(`docker ps -a --filter "name=${args.container}" --format "{{.Status}}"`);
        const isStopped = inspectOut.startsWith("Exited") || inspectOut.startsWith("Dead");
        return {
            content: [{ type: "text", text: `${stdout || stderr}\n상태: ${inspectOut.trim()}` }]
        };
    }
    catch (e) {
        return { content: [{ type: "text", text: e.stderr || e.message }] };
    }
}

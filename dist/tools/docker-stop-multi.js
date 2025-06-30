import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
export const dockerStopMultiSchema = {
    name: "docker_stop_multi",
    description: "컨테이너 이름 또는 ID 배열로 여러 Docker 컨테이너를 한 번에 중지합니다.",
    inputSchema: {
        type: "object",
        properties: {
            containers: { type: "array", items: { type: "string" }, description: "중지할 컨테이너 이름 또는 ID 배열" }
        },
        required: ["containers"]
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
export async function dockerStopMulti(input) {
    const results = [];
    for (const name of input.containers) {
        const cmd = `docker stop ${name}`;
        console.log("실행 명령어:", cmd);
        try {
            const { stdout, stderr } = await execAsync(cmd);
            console.log("결과:", stdout || stderr);
            results.push({ type: "text", text: `[STOP] ${name}: ${stdout || stderr || "중지됨"}` });
        }
        catch (e) {
            console.log("에러:", e.stderr || e.message);
            results.push({ type: "text", text: `[STOP] ${name}: 중지 실패 - ${e.stderr || e.message}` });
        }
    }
    return { content: results };
}

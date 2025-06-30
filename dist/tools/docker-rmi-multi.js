import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
export const dockerRmiMultiSchema = {
    name: "docker_rmi_multi",
    description: "이미지 이름 또는 ID 배열로 여러 Docker 이미지를 한 번에 삭제합니다.",
    inputSchema: {
        type: "object",
        properties: {
            images: { type: "array", items: { type: "string" }, description: "삭제할 이미지 이름 또는 ID 배열" }
        },
        required: ["images"]
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
export async function dockerRmiMulti(input) {
    const results = [];
    for (const name of input.images) {
        const cmd = `docker rmi ${name}`;
        console.log("실행 명령어:", cmd);
        try {
            const { stdout, stderr } = await execAsync(cmd);
            console.log("결과:", stdout || stderr);
            results.push({ type: "text", text: `[REMOVE] ${name}: ${stdout || stderr || "삭제됨"}` });
        }
        catch (e) {
            console.log("에러:", e.stderr || e.message);
            results.push({ type: "text", text: `[REMOVE] ${name}: 삭제 실패 - ${e.stderr || e.message}` });
        }
    }
    return { content: results };
}

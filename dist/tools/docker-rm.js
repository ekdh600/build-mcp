import { exec } from "child_process";
import { promisify } from "util";
import { dockerStopMulti } from "./docker-stop-multi.js";
const execAsync = promisify(exec);
// 단일 컨테이너 삭제
export const dockerRmSchema = {
    name: "docker_rm",
    description: "컨테이너 이름 또는 ID로 Docker 컨테이너를 삭제합니다. (삭제 전 중지 시도)",
    inputSchema: {
        type: "object",
        properties: {
            container: { type: "string", description: "삭제할 컨테이너 이름 또는 ID" }
        },
        required: ["container"]
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
export async function dockerRm(input) {
    const name = input.container;
    try {
        // stop 먼저 시도
        const stopCmd = `docker stop ${name}`;
        console.log("실행 명령어:", stopCmd);
        try {
            const { stdout, stderr } = await execAsync(stopCmd);
            console.log("결과:", stdout || stderr);
        }
        catch (e) {
            console.log("에러:", e.stderr || e.message);
        }
        const rmCmd = `docker rm ${name}`;
        console.log("실행 명령어:", rmCmd);
        const { stdout, stderr } = await execAsync(rmCmd);
        console.log("결과:", stdout || stderr);
        return { content: [{ type: "text", text: stdout || stderr || `${name} removed` }] };
    }
    catch (e) {
        console.log("에러:", e.stderr || e.message);
        return { content: [{ type: "text", text: `[${name}] 삭제 실패: ${e.stderr || e.message}` }] };
    }
}
// 다중 컨테이너 삭제
export const dockerRmMultiSchema = {
    name: "docker_rm_multi",
    description: "컨테이너 이름 또는 ID 배열로 여러 Docker 컨테이너를 한 번에 중지 후 삭제합니다.",
    inputSchema: {
        type: "object",
        properties: {
            containers: { type: "array", items: { type: "string" }, description: "삭제할 컨테이너 이름 또는 ID 배열" }
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
export async function dockerRmMulti(input) {
    const results = [];
    // 1. 전체 stop (외부 모듈 호출)
    const stopResults = await dockerStopMulti({ containers: input.containers });
    results.push(...stopResults.content);
    // 2. 전체 rm
    for (const name of input.containers) {
        const rmCmd = `docker rm ${name}`;
        console.log("실행 명령어:", rmCmd);
        try {
            const { stdout, stderr } = await execAsync(rmCmd);
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

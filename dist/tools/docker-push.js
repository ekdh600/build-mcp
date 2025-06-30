import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
export const dockerPushSchema = {
    name: "docker_push",
    description: "태그된 이미지를 레지스트리로 푸시합니다.",
    inputSchema: {
        type: "object",
        properties: {
            sourceTag: { type: "string", description: "소스 이미지 태그" },
            targetTag: { type: "string", description: "타겟 이미지 태그" }
        },
        required: ["sourceTag", "targetTag"]
    },
    returns: {
        type: "object",
        properties: {
            log: { type: "string" },
            success: { type: "boolean" },
            error: { type: "string" }
        }
    }
};
export async function dockerPush(args) {
    let logs = [];
    if (args.sourceTag !== args.targetTag) {
        const tagCmd = `docker tag ${args.sourceTag} ${args.targetTag}`;
        console.log("실행 명령어:", tagCmd);
        logs.push(`실행 명령어: ${tagCmd}`);
        await execAsync(tagCmd);
    }
    const pushCmd = `docker push ${args.targetTag}`;
    console.log("실행 명령어:", pushCmd);
    logs.push(`실행 명령어: ${pushCmd}`);
    try {
        const { stdout, stderr } = await execAsync(pushCmd);
        logs.push(stdout || stderr);
        return { content: logs.map(text => ({ type: "text", text })) };
    }
    catch (e) {
        logs.push(e.stderr || e.message);
        return { content: logs.map(text => ({ type: "text", text })) };
    }
}

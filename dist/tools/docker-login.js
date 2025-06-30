import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
export const dockerLoginSchema = {
    name: "docker_login",
    description: "도커 레지스트리에 로그인합니다.",
    inputSchema: {
        type: "object",
        properties: {
            username: { type: "string", description: "도커 허브 사용자명" },
            password: { type: "string", description: "도커 허브 비밀번호 또는 토큰" },
            registry: { type: "string", description: "레지스트리 주소 (옵션, 기본값: 도커 허브)" }
        },
        required: ["username", "password"]
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
export async function dockerLogin(args) {
    const { username, password, registry } = args;
    let cmd = "docker login ";
    if (registry) {
        cmd += `${registry} `;
    }
    cmd += `-u ${username} -p ${password}`;
    console.log("실행 명령어:", cmd);
    try {
        const { stdout, stderr } = await execAsync(cmd);
        return { content: [{ type: "text", text: stdout || stderr }] };
    }
    catch (e) {
        return { content: [{ type: "text", text: e.stderr || e.message }] };
    }
}

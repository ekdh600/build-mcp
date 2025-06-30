import { ListPromptsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
export const allPrompts = [
    {
        name: "docker_help",
        description: "도커 관련 도움말을 제공합니다.",
        parameters: { type: "object", properties: {}, required: [] }
    }
];
export function registerPromptHandlers(server) {
    server.setRequestHandler(ListPromptsRequestSchema, async () => {
        return { prompts: allPrompts };
    });
}

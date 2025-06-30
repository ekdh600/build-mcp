import { ListResourcesRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { dockerTools } from "../tools/index.js";

export function registerResourceHandlers(server: any) {
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    // MCP tool discovery용 리소스 목록 반환
    return {
      resources: dockerTools.map(tool => ({
        name: tool.schema.name,
        description: tool.schema.description,
        inputSchema: tool.schema.inputSchema,
        returns: tool.schema.returns
      }))
    };
  });

}

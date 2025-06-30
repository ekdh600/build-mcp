import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { startSSEServer } from "./utils/sse.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { serverConfig } from "./config/server-config.js";
import { dockerTools } from "./tools/index.js";
import { registerPromptHandlers } from "./prompts/index.js";
import { registerResourceHandlers } from "./resources/handlers.js";

// MCP 표준: 모든 도구 schema만 추출
export const allTools = dockerTools.map((tool) => tool.schema);

const server = new Server(
  { name: serverConfig.name, version: serverConfig.version },
  {
    ...serverConfig,
    capabilities: {
      ...serverConfig.capabilities,
      prompts: {},
      resources: {},
    },
  }
);

// MCP 표준: tools/list
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: allTools }));

// MCP 표준: tools/call
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;
  const tool = dockerTools.find((t) => t.schema.name === name);
  if (!tool) {
    return {
      content: [
        { type: "text", text: `Unknown tool: ${name}` },
      ],
    };
  }
  try {
    // MCP 표준: handler 호출, 반환값은 항상 { content: [{ type, text }][] }
    const result = await tool.handler(args);
    return result;
  } catch (err: any) {
    return {
      content: [
        { type: "text", text: err?.message || String(err) },
      ],
    };
  }
});

registerPromptHandlers(server);
registerResourceHandlers(server);

if (process.env.ENABLE_UNSAFE_SSE_TRANSPORT) {
  startSSEServer(server);
  console.log("SSE server started");
} else {
  const transport = new StdioServerTransport();
  server.connect(transport);
}

// HTTP/SSE용 핸들러 (MCP 표준)
export async function handleListTools({ method, params }: any) {
  return { tools: allTools };
}

export async function handleCallTool({ method, params }: any) {
  const { name, arguments: args = {} } = params;
  const tool = dockerTools.find((t) => t.schema.name === name);
  if (!tool) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return await tool.handler(args);
}

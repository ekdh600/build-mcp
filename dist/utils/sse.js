import express from "express";
import cors from "cors";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { handleListTools, handleCallTool } from "../index.js";
export function startSSEServer(server) {
    const app = express();
    app.use(cors());
    let transports = [];
    app.get("/sse", async (req, res) => {
        const transport = new SSEServerTransport("/messages", res);
        transports.push(transport);
        await server.connect(transport);
    });
    app.post("/messages", (req, res) => {
        const transport = transports.find((t) => t.sessionId === req.query.sessionId);
        if (transport) {
            transport.handlePostMessage(req, res);
        }
        else {
            res.status(404).send("Not found. Must pass valid sessionId as query param.");
        }
    });
    app.use(express.json({ limit: "10mb" }));
    app.post("/", async (req, res) => {
        try {
            const { method, params, id, jsonrpc } = req.body;
            if (method === "tools/list") {
                const result = await handleListTools({ method, params });
                res.json({
                    jsonrpc: jsonrpc || "2.0",
                    id,
                    result,
                });
            }
            else if (method === "tools/call") {
                const result = await handleCallTool({ method, params });
                res.json({
                    jsonrpc: jsonrpc || "2.0",
                    id,
                    result,
                });
            }
            else {
                res.status(404).json({ error: "Unknown method" });
            }
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    });
    let port = 3000;
    try {
        port = parseInt(process.env.PORT || "3000", 10);
    }
    catch (e) {
        console.error("Invalid PORT environment variable, using default port 3000.");
    }
    const host = process.env.HOST || "localhost";
    app.listen(port, host, () => {
        console.log(`docker-build-mcp-ts is listening on port ${port}\nUse the following url to connect to the server:\nhttp://${host}:${port}/sse`);
    });
}

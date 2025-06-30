import express from "express";
import cors from "cors";
import { allTools } from "./index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/tools/list", (req, res) => {
  res.json({ tools: allTools });
});

app.listen(3000, () => {
  console.log("HTTP server listening on port 3000 (tools/list ready)");
});

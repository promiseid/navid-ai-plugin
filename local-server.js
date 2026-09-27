import http from "node:http";
import mcpHandler from "./api/mcp.js";
import statusHandler from "./api/status.js";

const port = Number(process.env.PORT || 3000);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/") {
    statusHandler(req, {
      setHeader: (...args) => res.setHeader(...args),
      status: (code) => ({
        json: (value) => {
          res.statusCode = code;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify(value, null, 2));
        }
      })
    });
    return;
  }

  if (url.pathname !== "/mcp") {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  let body;
  if (req.method === "POST") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    if (chunks.length) {
      try {
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch {
        res.statusCode = 400;
        res.end("Invalid JSON");
        return;
      }
    }
  }

  req.body = body;
  await mcpHandler(req, res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Navid AI MCP server: http://127.0.0.1:${port}/mcp`);
});

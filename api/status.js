export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    name: "Navid AI Official Plugin",
    type: "MCP Server",
    version: "1.0.0",
    status: "online",
    mcp: "/mcp",
    website: "https://promiseid.github.io/navid-ai-website/",
    demo: "https://www.aparat.com/v/xklqa6y"
  });
}

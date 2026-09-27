# Navid AI Official Plugin

Official MCP server for the Navid AI plugin in ChatGPT and Codex.

This project is completely separate from the Navid AI Android application backend.

## Tools

- `get_navid_info` — official Navid AI product information
- `get_agent_commands` — official Agent command categories and examples
- `search_navid_help` — setup, permissions, Accessibility, and scope help
- `get_navid_links` — official website and demo links

All v1 tools are read-only and require no OpenAI API key.

## Local test

```bash
npm install
npm start
```

MCP endpoint:

```text
http://127.0.0.1:3000/mcp
```

Run MCP Inspector:

```bash
npx @modelcontextprotocol/inspector@latest
```

Choose Streamable HTTP and connect to the endpoint above.

## Production

Deploy this repository as its own Vercel project. Do not attach it to the Android application's Vercel project.

After deployment, use:

```text
https://YOUR-PLUGIN-PROJECT.vercel.app/mcp
```

in OpenAI Platform / ChatGPT Developer Mode.

## Official links

- Persian website: https://promiseid.github.io/navid-ai-website/
- English website: https://promiseid.github.io/navid-ai-website/en/
- Demo video: https://www.aparat.com/v/xklqa6y

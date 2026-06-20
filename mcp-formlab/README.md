# Blackie Labs — WebMCP Explainer

**Teaching demo only** — a side-by-side walkthrough of **Without WebMCP vs With WebMCP**, plus imperative vs declarative API overview, MCP vs WebMCP comparison, and a presenter script. Inspired by the [Chrome Labs explainer](https://googlechromelabs.github.io/webmcp-tools/demos/explainer/).

**Live:** [webmcp.cursorkenya.com](https://webmcp.cursorkenya.com)

Part of [gdgnai-web-mcp](https://github.com/Blackie360/gdgnai-web-mcp).

No build step. No event forms, no external APIs, no backend.

## What's on the page

- Side-by-side **Without WebMCP vs With WebMCP** simulation (generic example, not event content)
- **MCP vs WebMCP** comparison — same tool contract, server vs browser runtime
- Three-step **How it works** for the Declarative API
- Imperative vs declarative API overview with code samples
- Links to live demos, attribute reference, safety notes, presenter script

## Run locally

From the repo root:

```bash
python3 -m http.server 8080 --directory mcp-formlab
```

Open http://localhost:8080

## Companion demos

Hands-on WebMCP implementations live in the sibling folders:

| Demo | API style | Live URL |
|------|-----------|----------|
| [AgentReady Content Studio](../webmcp_declarative/) | Declarative | [symphonious-babka-2aa577.netlify.app](https://symphonious-babka-2aa577.netlify.app/) |
| [GDG Event Guide](../gdgspeakersearch%20web%20mcp/) | Imperative | [travel-webmcp-demo.vercel.app](https://travel-webmcp-demo.vercel.app/) |

## Resources

- [WebMCP specification](https://github.com/webmachinelearning/webmcp)
- [Chrome Labs WebMCP demos](https://googlechromelabs.github.io/webmcp-tools/)
- [Google I/O Extended Nairobi 2026](https://gdg.community.dev/events/details/google-gdg-nairobi-presents-google-io-extended-nairobi-2026/)

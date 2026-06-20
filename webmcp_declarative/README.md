# AgentReady Content Studio

**Declarative WebMCP demo** for [Google I/O Extended Nairobi 2026](https://gdg.community.dev/events/details/google-gdg-nairobi-presents-google-io-extended-nairobi-2026/) — event content tools built from annotated HTML forms, no `registerTool()` required.

**Live:** [symphonious-babka-2aa577.netlify.app](https://symphonious-babka-2aa577.netlify.app/)

Part of [gdgnai-web-mcp](https://github.com/Blackie360/gdgnai-web-mcp).

## What it demonstrates

Each tool is a normal `<form>` with WebMCP Declarative API attributes. The browser discovers tools from HTML — agents receive JSON schemas instead of scraping the DOM.

| Tool | Purpose |
|------|---------|
| `generate_event_post` | Draft social posts for X, LinkedIn, or WhatsApp |
| `create_speaker_intro` | Speaker self-intros (first person) or MC-style introductions |

All tools are **read-only**: no external APIs, no posting, no personal data collection. Generation runs locally in the browser from public event data embedded in the page.

## How it works

```html
<form
  id="form-generate_event_post"
  toolname="generate_event_post"
  tooldescription="Generates a social media draft using public Google I/O Extended Nairobi 2026 event information."
  novalidate
>
  <label for="f1-platform">Platform</label>
  <select
    id="f1-platform"
    name="platform"
    toolparamdescription="Target social platform for the draft post."
  >
    <option value="LinkedIn" selected>LinkedIn</option>
  </select>
  <button type="submit">Generate Draft</button>
</form>
```

When an agent activates a tool, the browser fills fields using `toolparamdescription` hints. The user reviews the form before submit.

### Key attributes

| Attribute | Where | Purpose |
|-----------|-------|---------|
| `toolname` | `<form>` | Unique tool identifier |
| `tooldescription` | `<form>` | Natural-language purpose for agents |
| `toolparamdescription` | Fields | Per-field schema descriptions |
| `name` + `<label>` | Fields | Standard HTML; required for accessibility |

## Run locally

From the repo root:

```bash
python3 -m http.server 8080 --directory webmcp_declarative
```

Open http://localhost:8080

## Files

| File | Role |
|------|------|
| `index.html` | Main demo — forms, inline generation logic, event data |
| `studio.css` | AgentReady Content Studio styles |
| `agent-worker.js` | Optional SharedWorker for Gemini chat (upstream Chrome Labs pattern) |
| `script.js`, `result.html`, `agent.js` | Legacy Chrome Labs bistro demo files; not used by `index.html` |

## Related demos

- [Blackie Labs explainer](../mcp-formlab/) — teaching walkthrough ([webmcp.cursorkenya.com](https://webmcp.cursorkenya.com))
- [GDG Event Guide](../gdgspeakersearch%20web%20mcp/) — imperative `registerTool()` on a React event site ([travel-webmcp-demo.vercel.app](https://travel-webmcp-demo.vercel.app/))

## Resources

- [WebMCP specification](https://github.com/webmachinelearning/webmcp)
- [Chrome Labs WebMCP demos](https://googlechromelabs.github.io/webmcp-tools/)

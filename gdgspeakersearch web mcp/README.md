# GDG Event Guide

**Imperative WebMCP demo** — a React event site for [Google I/O Extended Nairobi 2026](https://gdg.community.dev/events/details/google-gdg-nairobi-presents-google-io-extended-nairobi-2026/) that registers structured tools via `navigator.modelContext.registerTool()`.

**Live:** [travel-webmcp-demo.vercel.app](https://travel-webmcp-demo.vercel.app/)

Part of [gdgnai-web-mcp](https://github.com/Blackie360/gdgnai-web-mcp).

## What it demonstrates

Unlike declarative forms, this SPA registers tools in JavaScript so agents can browse speakers, explore the agenda, set interests, build a schedule, and navigate the UI — with on-screen updates synced to every tool call.

## Agent tools

| Tool | Description |
|------|-------------|
| `listSpeakers` | Returns all event speakers |
| `listSessions` | Shows the full agenda on screen and returns all sessions |
| `suggestSessions` | Suggests talks by interest; highlights matches on screen |
| `setInterests` | Navigates to My Schedule and applies interests |
| `navigateTo` | Opens a page: `home`, `speakers`, `agenda`, `recommend`, `discover` |
| `buildMySchedule` | Builds a personalized, conflict-free schedule path |
| `showFullAgenda` | Opens the agenda; optionally highlights the user's schedule |
| `getSessionDetails` | Returns session info and highlights that talk on screen |

Valid interests: `ai`, `gemini`, `android`, `web`, `angular`, `firebase`, `cloud`, `security`, `data-ml`, `devops`.

## Register tools

Implementation in [`src/webmcp.ts`](src/webmcp.ts):

```typescript
export function registerEventTools() {
  const modelContext = document.modelContext || navigator.modelContext
  if (!modelContext || toolsState.controller) return

  toolsState.controller = new AbortController()
  const options = { signal: toolsState.controller.signal }

  modelContext.registerTool(listSpeakersTool, options)
  modelContext.registerTool(listSessionsAndShowTool, options)
  modelContext.registerTool(suggestSessionsTool, options)
  modelContext.registerTool(navigateToTool, options)
  modelContext.registerTool(buildMyScheduleTool, options)
  modelContext.registerTool(showFullAgendaTool, options)
  modelContext.registerTool(setInterestsTool, options)
  modelContext.registerTool(getSessionDetailsTool, options)
}
```

Example tool definition:

```typescript
export const suggestSessionsTool = {
  execute: (input: Record<string, unknown>) => suggestSessions(input),
  name: 'suggestSessions',
  description:
    'Suggest sessions and speakers based on interests. Updates on-screen highlights for matching talks.',
  inputSchema: {
    type: 'object',
    properties: {
      interests: {
        type: 'array',
        items: { type: 'string', enum: VALID_INTERESTS },
      },
    },
  },
  outputSchema: { type: 'object' },
  annotations: { readOnlyHint: true },
}
```

## Technology stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Routing:** [React Router](https://reactrouter.com/) (hash router)
- **Styling:** Vanilla CSS

## Run locally

```bash
cd "gdgspeakersearch web mcp"
npm install
npm run dev
```

The app starts at http://localhost:5173 (or the next available port).

Build for production:

```bash
npm run build
npm run preview
```

## Event details

- **Date:** Saturday, June 20, 2026
- **Time:** 8:00 AM – 5:00 PM (GMT+3)
- **Venue:** Simba Corporation Aspire Center Westlands, Nairobi
- **Organizer:** [GDG Nairobi](https://gdg.community.dev/gdg-nairobi/)

## Related demos

- [AgentReady Content Studio](../webmcp_declarative/) — declarative forms ([symphonious-babka-2aa577.netlify.app](https://symphonious-babka-2aa577.netlify.app/))
- [Blackie Labs explainer](../mcp-formlab/) — teaching walkthrough ([webmcp.cursorkenya.com](https://webmcp.cursorkenya.com))

## License

Apache-2.0. Adapted from the [Chrome Labs flight search demo](https://googlechromelabs.github.io/webmcp-tools/demos/react-flightsearch/).

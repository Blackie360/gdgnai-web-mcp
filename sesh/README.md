# AgentReady Event Guide

Read-only demo app for Google I/O Extended Nairobi 2026. It shows how a normal event website can expose structured, agent-readable event data using WebMCP-style static files without collecting attendee data.

## Run

```bash
pnpm install
pnpm dev
```

## Validate

```bash
pnpm lint
pnpm build
```

## Static Agent Contract

- `/.well-known/webmcp.json` describes the app, privacy posture, and static resources.
- `/webmcp/event.json` contains canonical public event details.
- `/webmcp/tools.json` describes read-only tools such as `event_lookup`, `sessions_search`, `speakers_profile`, `agenda_explore`, `recommendations_list`, and `event_brief`.

The app does not include sign-in, forms, personalization, or server-side mutation. RSVP remains an outbound link to the official GDG event page.

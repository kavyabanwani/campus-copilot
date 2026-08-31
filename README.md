# Campus Copilot

An AI-first student assistant prototype — a conversational interface for
attendance, fees, timetable, assignments, exams, and college policies.
Frontend only; no backend, database, or API calls yet.

## Run

```bash
npm install
npm run dev
```

## Stack

React + Vite + Tailwind CSS v4 + lucide-react icons. Mock data only.

## Architecture

```
src/
  components/
    Auth/           login + register tabs
    Chat/            message list, rich response cards, input, workspace
    Sidebar/         quick actions, recent conversations, profile
    Suggestions/     empty-state prompts + quick-action chips
    AgentActivity/   mock "tool call" trace shown above assistant replies
    Sources/         placeholder RAG citation list
    UI/              shared Icon wrapper
  data/mockData.js    realistic mock student records
  services/chatService.js   sendMessage(message, currentUser) — the single
                             seam to swap for a real FastAPI call later
```

## Future backend integration

`sendMessage()` in `src/services/chatService.js` is the only place that
needs to change to connect a real backend:

```
React  →  FastAPI  →  Agent (Gemini function calling)  →  Python tools  →  SQLite
                                                        →  RAG over policy docs
```

The response shape it already returns (`type`, `data`, `activitySteps`,
`sources`) matches what the agent pipeline will eventually produce, so the
UI components do not need to change when the backend is wired up.

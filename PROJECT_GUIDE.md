# Campus Copilot — Frontend Guide (for beginners)

This doc explains what's inside this project and how the pieces fit
together. It assumes you know basic JavaScript and have heard of React,
but haven't necessarily worked on a real React project before.

## 1. What this project actually is

A chat website where a student logs in and asks questions like
*"How much fee do I have left?"* or *"Can I skip tomorrow's DBMS class?"*
and gets an answer with a nice card (attendance %, fee breakdown, etc).

There is **no real backend right now**. When you "send a message", the
app doesn't call any AI or server — it looks at your text, guesses what
you're asking about (attendance? fees? exams?), and returns a canned
answer built from fake data in `src/data/mockData.js`. This is called a
**mock** — it lets you build and test the whole UI before the real
backend exists.

## 2. The tech stack, and why each piece is there

| Tool | What it does | Why it's used here |
|---|---|---|
| **React** | Lets you build the UI out of reusable components (functions that return HTML-like JSX) instead of writing raw HTML/DOM manipulation | Standard for interactive UIs like a chat app |
| **Vite** | Dev server + build tool | Much faster than older tools (Create React App). `npm run dev` starts it, `npm run build` produces the production files in `dist/` |
| **Tailwind CSS v4** | Utility classes like `rounded-xl text-sm text-stone-600` instead of writing separate `.css` files | Fast styling directly in JSX, no context-switching to a CSS file |
| **lucide-react** | A library of ready-made icon components (`<Icon name="Wallet" />`) | Avoids hand-drawing SVG icons |

If any of `React`, `Tailwind`, or `Vite` are new to you, that's fine —
you mostly just need to recognize the patterns below.

## 3. How to run it

```bash
npm install     # download dependencies (only needed once)
npm run dev     # start the dev server, prints a localhost URL
```

Open the printed URL in your browser. Editing any file under `src/`
updates the page instantly (hot reload) — no manual refresh needed.

## 4. Reading a component (the core React idea)

Every file in `src/components/` exports **one function** that returns
JSX (HTML-looking syntax inside JavaScript). Example, simplified from
`ChatInput.jsx`:

```jsx
export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('')       // local state: the text box content

  function submit(e) {
    e.preventDefault()
    onSend(value)      // tell the PARENT component "a message was sent"
    setValue('')        // clear the box
  }

  return (
    <form onSubmit={submit}>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit" disabled={disabled}>Send</button>
    </form>
  )
}
```

Three ideas to internalize here, since the whole codebase is built on them:

1. **Props** (`{ onSend, disabled }`) — data/functions passed down from
   the parent component. `ChatInput` doesn't know *how* sending works,
   it just calls `onSend(text)` and lets whoever used `<ChatInput />`
   decide what that means.
2. **State** (`useState`) — a variable that, when changed via its setter
   (`setValue`), causes React to re-render the component. This is how
   the textbox visually updates as you type.
3. **One-way data flow** — data flows *down* through props, and events
   flow *up* by calling a function prop (like `onSend`). Nothing ever
   reaches "up" into a parent directly.

## 5. Where state actually lives

Almost all the important state (the list of messages, who's logged in,
whether the assistant is "typing") lives in exactly two places:

- **`src/App.jsx`** — holds `isLoggedIn` and `currentUser`. Decides
  whether to show `<AuthScreen />` or `<ChatWorkspace />`.
- **`src/components/Chat/ChatWorkspace.jsx`** — holds the `messages`
  array and passes pieces of it down to child components
  (`MessageBubble`, `ChatInput`, `Sidebar`, ...).

This is a common beginner trip-up: child components like `MessageBubble`
don't manage state themselves — they just receive a `message` object as
a prop and render it. If you want to understand "how does a new message
appear on screen", start reading at `ChatWorkspace.jsx`'s `handleSend`
function and follow it down.

## 6. Folder-by-folder map

```
src/
  main.jsx                    entry point — mounts <App /> into index.html
  App.jsx                     top-level: shows login screen or chat screen
  index.css                   Tailwind import + design tokens (colors, fonts, shadows)

  components/
    Auth/AuthScreen.jsx        login / register form (fake auth — any input works)
    Sidebar/Sidebar.jsx        left nav: new chat, quick actions, recent chats, profile
    Chat/
      ChatWorkspace.jsx        the main screen — owns `messages` state, wires everything together
      ChatInput.jsx            the text box at the bottom
      MessageBubble.jsx        renders ONE message (user or assistant)
      TypingIndicator.jsx      the "..." animation shown while waiting for a reply
      RichContent.jsx          the data cards (attendance %, fee summary, exam list, ...)
      ProactiveInsights.jsx    the "Copilot noticed..." banner (e.g. low attendance warning)
    Suggestions/
      EmptyState.jsx           the screen shown before you've sent any message
      QuickActions.jsx         the row of quick-prompt chips
    AgentActivity/AgentActivity.jsx   the collapsible "thinking steps" trace under a reply
    Sources/Sources.jsx        the little "Sources" citation list under a reply
    UI/Icon.jsx                 thin wrapper so the rest of the app can do <Icon name="Send" />

  data/mockData.js             fake student records (attendance, fees, timetable, exams...)
  services/chatService.js      sendMessage(text, user) — pretends to be an API call
```

## 7. Following one full user action end-to-end

Say you type "How much fee do I have left?" and hit send. Here's the
exact call chain — useful for understanding how components talk to
each other:

1. `ChatInput` calls `onSend(text)` — this prop was passed in as
   `handleSend` by `ChatWorkspace`.
2. `ChatWorkspace.handleSend`:
   - Adds a `{ role: 'user', content: text }` object to `messages` state
     → React re-renders → your message appears immediately.
   - Sets `isAssistantTyping = true` → `TypingIndicator` appears.
   - Calls `await sendMessage(text, currentUser)` from `chatService.js`.
3. Inside `chatService.js`:
   - `classifyIntent(text)` looks for keywords ("fee" → `'fees'`).
   - `respondFees()` builds a response object using `FEES` from
     `mockData.js`: `{ type: 'fees', content: '...', data: {...} }`.
   - A `delay()` fakes network latency so the typing indicator is visible.
4. Back in `ChatWorkspace`: the response is appended to `messages` as
   an assistant message, `isAssistantTyping` is set back to `false`.
5. `MessageBubble` renders that message: the text via `message.content`,
   and the fee card via `<RichContent type="fees" data={message.data} />`.

This same shape (`type`, `data`, `activitySteps`, `sources`) is designed
to match what a real backend will someday return — see the comment
at the top of `chatService.js`.

## 8. Styling: how Tailwind classes work here

Instead of `className="card"` + a separate CSS rule, Tailwind lets you
write the styling inline as utility classes:

```jsx
<div className="rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-subtle">
```

Read it left to right: rounded corners, a thin border, white background,
padding, a subtle shadow. Colors like `stone-200` and `brand-600` come
from the theme defined in `src/index.css` under `@theme { ... }` — that's
where this project's palette (teal primary / coral accent) and fonts are
defined as reusable tokens (`--color-brand-500`, etc.), so the whole app
stays visually consistent instead of hardcoding hex codes everywhere.

## 9. If you want to practice extending it

Good self-contained exercises, roughly easiest to hardest:

1. Add a new quick-action chip (e.g. "Library Hours") in
   `data/mockData.js` under `QUICK_ACTIONS`, and a matching `respond*`
   handler + intent keyword in `chatService.js`.
2. Add a new mock data field (e.g. `data.hostelFee` in `FEES`) and show
   it in `RichContent.jsx`'s `FeesCard`.
3. Add a "clear chat history" button to the sidebar that just calls the
   same logic as `handleNewChat` in `ChatWorkspace.jsx`.
4. (Harder) Swap `sendMessage()` in `chatService.js` for a real `fetch()`
   call once a backend exists — the comment block at the top of that
   file explains exactly what shape the response should keep.

# Campus Copilot

A modern AI-first student assistant interface built for campus life workflows — attendance, fees, timetable, assignments, exam tracking, and college policy support.

This project is a frontend prototype designed to simulate how a real student assistant could feel before backend integration. It uses realistic mock data and a clean chat-driven UI to demonstrate the experience end-to-end.

## ✨ Features

- Conversational student support chatbot
- Attendance tracking summaries
- Fee and payment insights
- Exam and assignment reminders
- Timetable and academic status overview
- Mock proactive alerts for common student issues
- Rich response cards for structured data
- Sidebar navigation and quick action prompts
- Clean, responsive React UI

## 🧠 Product vision

Campus Copilot is meant to act as a student-facing assistant that can answer questions like:

- "How much fee do I have left?"
- "Can I skip tomorrow's DBMS class?"
- "What are my pending assignments?"
- "Am I at risk of low attendance?"

The current version is intentionally frontend-only and uses mock data so the interaction model and UI can be validated before connecting a real AI/backend.

## 🛠️ Tech stack

- React
- Vite
- Tailwind CSS v4
- lucide-react
- JavaScript / JSX

## 🚀 Getting started

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## 📦 Project structure

```bash
src/
  App.jsx
  main.jsx
  index.css
  components/
    Auth/
    Chat/
    Sidebar/
    Suggestions/
    AgentActivity/
    Sources/
    UI/
  data/
    mockData.js
  services/
    chatService.js
```

## 🧩 Architecture overview

The app is organized around a single interaction flow:

- user types a message
- message is classified by intent
- mock response is generated from sample student data
- assistant message is rendered with structured cards and source metadata

The key integration seam is in `src/services/chatService.js`, which is designed to be swapped later for a real backend API without changing the UI contract.

## 🔌 Future backend integration

The current `sendMessage()` flow is intentionally isolated so it can later connect to a real backend pipeline such as:

```text
React → FastAPI → AI Agent → Python tools → SQLite / RAG data layer
```

The response schema already follows a structured format using:

- `type`
- `data`
- `activitySteps`
- `sources`

This makes it easier to replace mock responses with live service responses later.

## 🌐 Deploy on Vercel

This project is ready for Vercel deployment as a standard Vite app.

Use the following settings in Vercel:

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

A deployment config file is included in the repo for convenience:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

## 🗺️ Roadmap

- connect real backend and authentication
- add database-backed student records
- integrate AI tools for real data retrieval
- add policy/document RAG support
- support persistent chat history
- deploy production-ready version with secured APIs

## 📄 License

This project is currently a personal prototype and is intended for learning and experimentation.

## 🙌 Notes

This is a frontend-first proof of concept built to showcase the student-assistant experience before production backend services are added.

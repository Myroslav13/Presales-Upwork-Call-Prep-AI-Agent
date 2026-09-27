# CallPrep — Upwork Presales Call Prep AI Agent

Turns an Upwork job post (plus optional client messages and constraints) into a structured briefing before a sales call: opportunity summary, needs, risks, positioning, discovery questions, and call strategy.

## Live demo

- **Web app:** [https://presales-upwork-call-prep-ai-agent.vercel.app](https://presales-upwork-call-prep-ai-agent.vercel.app)
- **API:** [https://presales-upwork-call-prep-ai-agent.onrender.com](https://presales-upwork-call-prep-ai-agent.onrender.com) (`POST /api/agent/analyze`)

## Approach

The agent is a **3-step pipeline** (not a single prompt):

1. **Analysis** — opportunity summary, client needs, risks  
2. **Strategy** — positioning + solution approach (uses team expertise & constraints)  
3. **Interview** — discovery questions, call strategy, final prep note  

Each step returns structured JSON and feeds the next.

## Stack

- **Client:** React + TypeScript + Vite (Vercel)
- **Server:** NestJS + Google Gemini (Render)

## Prerequisites

- Node.js 20+
- A [Gemini API key](https://aistudio.google.com/apikey)

## Setup

### 1. Server

```bash
cd server
cp .env.example .env
# set GEMINI_API_KEY in .env
npm install
npm run start:dev
```

API runs at `http://localhost:3000`.  
Analyze endpoint: `POST /api/agent/analyze`.

### 2. Client

```bash
cd client
cp .env.example .env
# for local API:
# VITE_API_URL=http://localhost:3000
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Usage

1. Paste the **Job Post** (required).
2. Optionally add client messages, team expertise, budget, timeline, collaboration model, and timezone.
3. Click **Generate Prep Plan**.

## Examples

Sample job post + optional fields: [`examples/sample-input.md`](examples/sample-input.md)  
Sample structured output: [`examples/sample-output.json`](examples/sample-output.json)

## Environment

| Variable | Where | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | `server/.env` | Gemini access |
| `PORT` | `server/.env` | Server port (default `3000`) |
| `VITE_API_URL` | `client/.env` | Backend base URL (baked in at build time) |

## Project layout

```
client/     # Vite React UI
server/     # NestJS agent API
examples/   # Sample input & output
```

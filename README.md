# CallPrep — Upwork Presales Call Prep AI Agent

Turns an Upwork job post (plus optional client messages and constraints) into a structured briefing before a sales call: opportunity summary, needs, risks, positioning, discovery questions, and call strategy.

## Stack

- **Client:** React + TypeScript + Vite
- **Server:** NestJS + Google Gemini

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

## Environment

| Variable | Where | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | `server/.env` | Gemini access |
| `PORT` | `server/.env` | Server port (default `3000`) |
| `VITE_API_URL` | `client/.env` | Backend base URL (baked in at build time) |

## Project layout

```
client/   # Vite React UI
server/   # NestJS agent API
```

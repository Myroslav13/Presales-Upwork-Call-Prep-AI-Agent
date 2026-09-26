import type { PrepPlan } from './types'

export const MOCK_PLAN: PrepPlan = {
  opportunitySummary:
    'Strong fit for a mid-market SaaS client needing a production-ready AI workflow. Budget and timeline align with a 4–6 week discovery-to-MVP path. Decision-maker is engaged and already comparing 2–3 freelancers.',
  mainNeed:
    'Build an automated call-prep assistant that turns Upwork job posts and client messages into a structured briefing before sales calls.',
  hiddenNeeds: [
    'Reduce time spent manually researching each lead before calls',
    'Standardize how the sales team prepares so quality is consistent',
    'Look more senior on calls by asking sharper discovery questions',
  ],
  discoveryQuestions: [
    'Who will use the prep output day-to-day — founders, AEs, or freelancers?',
    'What does a “good” prep brief look like for your best closed deals?',
    'Where does the current process break: research, framing, or follow-up?',
    'Do you need this integrated with Upwork only, or also CRM / email?',
    'What is the must-have for v1 versus nice-to-have for later?',
    'How do you measure success after two weeks of using the tool?',
    'Are there compliance or data-privacy constraints on client messages?',
  ],
  risks: [
    'Scope may expand into full CRM if stakeholders are unclear on v1 boundaries',
    'Vague success metrics could stall approval after the first demo',
    'Timezone overlap is limited — async communication must be explicit',
    'Budget language is soft; confirm hard ceiling before proposing a fixed price',
  ],
  suggestedPositioning:
    'Position as a specialized Upwork call-prep co-pilot, not a generic chatbot. Lead with time saved per opportunity and consistency of discovery quality. Anchor on your team’s domain experience with freelancers and SaaS sales cycles.',
  solutionApproach:
    'Start with a structured intake form → LLM analysis with a fixed output schema → editable prep plan UI. Phase 1: single-user web app. Phase 2: templates, history, and export to Notion/Google Docs.',
  callStrategy:
    'Open by reflecting their pain in their words. Confirm the main need in the first 5 minutes. Use 3 discovery questions to surface hidden needs. Close with a clear next step: paid discovery workshop or fixed-scope MVP proposal within 48 hours.',
  finalPrepNote:
    'Go in as the prepared specialist. Mirror their language, protect scope, and leave with a documented decision path. Your edge is clarity — not a longer pitch.',
}

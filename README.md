<p align="center">
  <img width="1000" alt="Supavec" src="https://github.com/user-attachments/assets/76e2c674-d683-487c-bf02-ac8bccf19e69" />
</p>

# Pipeline AI - Full-Stack LLM Platform

> 🚀 No-code AI platform for training and deploying custom LLMs  
> 🧠 Build RAG applications, fine-tune models, and deploy to production

[![](https://dcbadge.limes.pink/api/server/https://discord.gg/MS9CjPeXF4)](https://discord.gg/https://discord.gg/MS9CjPeXF4)
[![Analytics – Powered by PostHog](https://img.shields.io/badge/analytics-PostHog-f54d27)](https://posthog.com/)
[![Backend – Powered by Supabase](https://img.shields.io/badge/backend-Supabase-3ECF8E)](https://supabase.com/)

## Features

- **RAG Builder**: Build powerful RAG applications with any data source
- **Model Training**: Fine-tune or train models from scratch with no code required
- **Cloud Integration**: Support for AWS, Azure, OpenAI, HuggingFace, Kaggle, and more
- **Model Deployment**: Deploy trained models to HuggingFace, Kaggle, or custom endpoints
- **API-First**: RESTful API endpoints for all operations

## Related repositories

- [taishikato/supavec-python-api](https://github.com/taishikato/supavec-python-api)

## Built with

* [Next.js](https://nextjs.org/)
* [Supabase](https://supabase.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Bun](https://bun.sh/)
* [Upstash](https://upstash.com/)

## API docs

https://github.com/taishikato/supavec/blob/main/packages/api/README.md



---

## Architecture & Design Philosophy

### Scalable Multi-Tenant Design
- **Row-Level Security (RLS)** for team-level data isolation  
- **Multi-cloud support**: Train and deploy on AWS, Azure, or local infrastructure
- **Batch embeddings**: OpenAI cost **-65 %**

### Vector Search Optimisation
- **Configurable chunk & overlap** (+12 pts recall)  
- **Hybrid filter** (file_id + cosine) P95 **210 ms**  

## Performance & Observability

### Real‑time Analytics
- **PostHog integration** product & API events tracked (11 schema)
- **Request‑level tracing** with unique IDs for rapid debugging
- **Async usage logging** non‑blocking main flow

### API Performance
- **Streaming or standard responses** selectable per request  
- **100‑doc batch embedding** reduces latency + cost  
- **Background processing** keeps critical path lean

```typescript
// Example: choose streaming or standard chat responses
const response = await fetch('/chat', {
  method: 'POST',
  body: JSON.stringify({
    query: 'What is this document about?',
    file_ids: ['uuid-here'],
    stream: true // set false for JSON
  })
});
```

## Developer Experience

- **Visual debugging**: live embedding preview in chat UI  
- **Progressive disclosure**: guided onboarding & contextual states  
- **API-first design**: REST endpoints + comprehensive errors  
- **Redis-backed rate limiting**: sliding-window strategy


---


## Getting Started

### Install dependencies

```bash
bun i
```

### Run the development server

```bash
bun dev
```

#### Run the web server

```bash
cd apps/web && bun run dev
```

#### Run the API server

```bash
cd packages/api && bun run dev
```

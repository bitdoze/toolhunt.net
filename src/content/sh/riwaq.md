---
title: "Riwaq - Multi-Tenant AI Agent Backend"
publishedDate: 2026-07-16
logo: "/images/sh/riwaq-logo.webp"
uiImage: "/images/sh/riwaq-ui.webp"
description: "Riwaq is a Docker-first multi-tenant agent platform with RAG, private memory, self-learning from feedback, reminders, and OpenAI-compatible APIs."
youtubeId: ""
keyFeatures: [
  "Multi-tenant orgs and agents",
  "RAG knowledge bases",
  "Per-agent private memory",
  "Self-learning from thumbs-up",
  "OpenAI-compatible chat API",
  "Reminders with signed webhooks"
]
category: "AI Infrastructure"
alternativeTo: "LangChain"
checkItUrl: "https://github.com/fathah/riwaq"
---

Riwaq is open-source multi-tenant infrastructure for AI agents. Each organization gets API-key isolation; each agent has a private knowledge base, memory, analytics, and optional shared KBs. Chat runs through a RAG + memory pipeline, with async self-learning and dated reminders—Docker-first and OpenAI-compatible on the inbound side.

## Key Features

- **Tenancy**: Organizations, API keys, and hard isolation across orgs.
- **RAG**: Upload PDFs/text/markdown into private or shared knowledge bases.
- **Memory**: Per-agent (and end-user) durable facts recalled into prompts.
- **Self-Learning**: Thumbs-up answers can promote into the knowledge base.
- **Reminders**: Extract or schedule due dates; fire signed webhooks.
- **Provider Flexible**: Anthropic or any OpenAI-compatible LLM outbound; OpenAI-shaped inbound `/v1/chat/completions`.

## Why Choose Riwaq?

- You need multi-tenant agent backends, not a single-user notebook RAG.
- Hindsight/Cognee cover memory/graphs; Riwaq focuses on ops-ready multi-agent hosting.
- You want Open WebUI / LangChain clients to speak a familiar OpenAI API.
- Docker Compose should stand up API + Postgres (pgvector) + cache quickly.

## Docker Deployment

```bash
git clone https://github.com/fathah/riwaq.git
cd riwaq
cp .env.example .env
# set LLM keys (Anthropic or OpenAI-compatible)
docker compose up --build
# API http://localhost:3000  · optional console :3001
```

Production compose and GHCR images are documented in `DOCKER.md`.

## Getting Started

1. Boot the stack and `curl /health`.
2. Create an organization (store the one-time API key).
3. Create an agent and upload documents.
4. Chat via native API or OpenAI-compatible client.
5. Enable feedback → learning and optional reminder webhooks.

## Full Setup Guide

[github.com/fathah/riwaq](https://github.com/fathah/riwaq). Related ToolHunt entries: Hindsight, Cognee, LiteLLM, Open WebUI. VPS deploy patterns: [Dokploy](https://www.bitdoze.com/dokploy-install/).

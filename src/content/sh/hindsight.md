---
title: "Hindsight - Agent Memory System for AI"
publishedDate: 2026-07-14
logo: "/images/sh/hindsight-logo.png"
uiImage: "/images/sh/hindsight-ui.webp"
description: "Hindsight is an open-source agent memory platform that helps AI agents retain, recall, and reflect so they learn over time instead of starting every session from zero."
youtubeId: ""
keyFeatures: [
  "Retain, recall, and reflect memory APIs",
  "State-of-the-art LongMemEval results",
  "Docker and Kubernetes self-hosting",
  "Python, TypeScript, Go, and CLI clients",
  "Broad agent framework integrations",
  "Cloud or private deployment options"
]
category: "AI Infrastructure"
alternativeTo: "LangChain"
checkItUrl: "https://hindsight.vectorize.io/"
---

Hindsight is an agent memory system built for AI agents that need to learn, not just retrieve past chat snippets. Instead of treating memory as plain vector search, it organizes facts, observations, and mental models so agents can answer temporal and multi-hop questions with higher accuracy.

## Key Features

- **Retain / Recall / Reflect**: Core operations for storing knowledge, searching memory, and reasoning over consolidated observations.
- **Memory Hierarchy**: World facts, experience facts, observations, and mental models keep long-term knowledge structured.
- **Benchmark-Proven Accuracy**: Reports state-of-the-art LongMemEval performance for long-term conversational memory.
- **Simple Integrations**: Drop-in LLM wrapper plus SDKs for Python, TypeScript, Go, and CLI workflows.
- **Self-Host Friendly**: Docker image, compose/Kubernetes paths, and support for external PostgreSQL or Oracle storage.
- **Wide Ecosystem Fit**: Integrations across LangGraph/LangChain, CrewAI, AutoGen, Claude Code, Cursor, n8n, MCP, and more.

## Why Choose Hindsight?

- Your agents forget context between sessions and need durable memory.
- Vector RAG alone cannot handle temporal or multi-hop reasoning well.
- You want an open, self-hostable memory layer with production clients.
- You need one memory bank model that works across multiple agent frameworks.

## Docker Deployment

Quick start with Docker:

```bash
export OPENAI_API_KEY=sk-xxx
docker run -it --pull always --name hindsight --restart unless-stopped \
  -p 8888:8888 -p 9999:9999 \
  -e HINDSIGHT_API_LLM_API_KEY=$OPENAI_API_KEY \
  -v hindsight-data:/home/hindsight/.pg0 \
  ghcr.io/vectorize-io/hindsight:latest
```

API defaults to `http://localhost:8888` and UI to `http://localhost:9999`.

## Getting Started

1. Run the Docker image or compose stack.
2. Configure your LLM provider (`openai`, `anthropic`, `gemini`, `ollama`, and others).
3. Install a client (`pip install hindsight-client` or `npm install @vectorize-io/hindsight-client`).
4. Call retain/recall/reflect from your agent, or wrap your LLM client for automatic memory.

## Full Setup Guide

Official docs and source: [Hindsight docs](https://hindsight.vectorize.io/) · [GitHub](https://github.com/vectorize-io/hindsight) · [Cloud](https://ui.hindsight.vectorize.io/signup).
A BitDoze walkthrough will be linked here once published.

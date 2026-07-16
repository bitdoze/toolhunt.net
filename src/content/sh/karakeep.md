---
title: "Karakeep - AI Bookmark Everything App"
publishedDate: 2026-07-16
logo: "/images/sh/karakeep-logo.webp"
uiImage: "/images/sh/karakeep-ui.webp"
description: "Karakeep (formerly Hoarder) is a self-hosted bookmark app for links, notes, and images with AI auto-tagging, full-text search, and browser extensions."
youtubeId: ""
keyFeatures: [
  "Save links, notes, and images",
  "AI auto-tagging and summaries",
  "Full-text search and archives",
  "Browser extensions",
  "Ollama or cloud LLM support",
  "Docker self-hosting"
]
category: "Productivity"
alternativeTo: "Raindrop.io"
checkItUrl: "https://karakeep.app/"
---

Karakeep (previously Hoarder) is a self-hostable “bookmark everything” app. Drop in URLs, notes, and images; optional AI generates tags and summaries so you can find things later without perfect organization. Built for people who hoard links and hate closed SaaS bookmark tools.

## Key Features

- **Everything Bucket**: Links, notes, images, and more in one library.
- **AI Assist**: Auto-tagging and summarization via OpenAI or local models (e.g. Ollama).
- **Search**: Full-text search across saved content and archives.
- **Extensions & API**: Browser extensions, CLI, REST API, and webhooks.
- **Import Paths**: Migrate from Chrome, Pocket, Linkwarden, Omnivore, and others.
- **Self-Host First**: Docker-friendly, SSO options, dark mode.

## Why Choose Karakeep?

- Raindrop/Pocket feel limited or expensive once you scale.
- You want AI tagging without sending every bookmark only to a vendor cloud.
- You already run Ollama and want local enrichment.
- You need a modern UI, not a bare linkding-style list.

## Docker Deployment

Use the project’s official compose stack (see docs). Conceptually:

```bash
git clone https://github.com/karakeep-app/karakeep.git
cd karakeep
# follow docs for docker compose + env (DB, optional AI keys)
docker compose up -d
```

Configure AI providers in settings for auto-tags, or run without AI for a pure bookmark archive.

## Getting Started

1. Deploy with Docker and create an account.
2. Install the browser extension and pin it.
3. Import existing bookmarks if you have a dump.
4. Optional: wire Ollama or an API key for tagging.
5. Build lists and search instead of endless browser folders.

## Full Setup Guide

Docs: [docs.karakeep.app](https://docs.karakeep.app/). Demo: [try.karakeep.app](https://try.karakeep.app/). Deploy on a VPS with Docker using patterns from [Dokploy Docker Compose apps](https://www.bitdoze.com/dokploy-docker-compose-app/).

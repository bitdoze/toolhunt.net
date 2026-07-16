---
title: "Paperless-ngx - Document Management System"
publishedDate: 2026-07-16
logo: "/images/sh/paperless-logo.webp"
uiImage: "/images/sh/paperless-ui.webp"
description: "Paperless-ngx turns paper and PDFs into a searchable, tagged archive with OCR, consume folders, and powerful filters—self-hosted document management."
youtubeId: ""
keyFeatures: [
  "OCR and full-text search",
  "Tags, correspondents, and types",
  "Consume folder automation",
  "Email and mobile ingest",
  "Permissions and multi-user",
  "Docker Compose deploy"
]
category: "Document Tools"
alternativeTo: "Evernote"
checkItUrl: "https://docs.paperless-ngx.com/"
---

Paperless-ngx is a community-driven document management system. Drop scans and PDFs into a consume folder (or email them in); OCR extracts text, and you organize everything with tags, correspondents, document types, and saved views. Ideal for tax papers, contracts, and the paper pile that never ends.

## Key Features

- **OCR Pipeline**: Multi-language OCR so scanned pages become searchable.
- **Smart Metadata**: Tags, correspondents, document types, custom fields.
- **Automation**: Consume directories, mail fetch, and matching rules for auto-tagging.
- **Search**: Full-text search across the entire archive.
- **Access Control**: Multi-user setups with permissions.
- **Integrations**: REST API, webhooks, and mobile-friendly web UI.

## Why Choose Paperless-ngx?

- Evernote/Notion are not built as a serious paper archive.
- You want documents offline and under your control.
- Scanner → folder → searchable library is the workflow you need.
- Homelab staple with long-term maintenance and community.

## Docker Deployment

Official compose is documented at paperless-ngx docs. Minimal idea:

```yaml
# See official docker-compose for redis, db, webserver, and worker
# https://docs.paperless-ngx.com/setup/#docker
services:
  paperless:
    image: ghcr.io/paperless-ngx/paperless-ngx:latest
    # ... env, volumes for data, media, export, consume
```

Mount a `consume` directory; files dropped there are ingested automatically.

## Getting Started

1. Deploy with Docker Compose (Postgres + Redis recommended).
2. Create admin user and set consume path.
3. Scan a test document or drop a PDF into consume.
4. Add tags and correspondents; create matching rules.
5. Export backups of the data volume regularly.

## Full Setup Guide

Official docs: [docs.paperless-ngx.com](https://docs.paperless-ngx.com/). For self-hosted Docker stacks on a VPS, start with [Dokploy install](https://www.bitdoze.com/dokploy-install/).

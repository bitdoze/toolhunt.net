---
title: "AppFlowy - Open-Source Notion Alternative"
publishedDate: 2026-07-16
logo: "/images/sh/appflowy-logo.webp"
uiImage: "/images/sh/appflowy-ui.webp"
description: "AppFlowy is a local-first open-source workspace with docs, databases, boards, and calendars—a self-hostable Notion alternative built with Flutter and Rust."
youtubeId: ""
keyFeatures: [
  "Docs with slash commands",
  "Databases and board views",
  "Local-first and offline",
  "Self-hosted AppFlowy Cloud",
  "Desktop and mobile clients",
  "AGPL open source"
]
category: "Documentation"
alternativeTo: "Notion"
checkItUrl: "https://appflowy.com/"
---

AppFlowy is an open-source, local-first alternative to Notion. You get documents, databases, kanban boards, calendars, and more in a workspace that can stay on your device—or sync through self-hosted AppFlowy Cloud for teams.

## Key Features

- **Rich Documents**: Slash commands, blocks, embeds, and structured writing.
- **Databases**: Grid, board, calendar, and gallery views over the same data.
- **Local-First**: Works offline; your content isn’t trapped in a single SaaS tenant by default.
- **AppFlowy Cloud**: Optional self-hosted sync for multi-device and collaboration.
- **Clients**: Desktop apps plus mobile options connecting to your cloud.
- **Open Core**: AGPL-licensed codebase you can audit and extend.

## Why Choose AppFlowy?

- Notion pricing and data lock-in don’t fit privacy or budget goals.
- You want a real desktop app, not only a browser tab.
- Teams need collaboration without giving a vendor every note.
- Flutter/Rust stack that feels modern and actively developed.

## Docker Deployment

Desktop-only use needs no server. For self-hosted sync, deploy AppFlowy Cloud (Postgres, Redis, MinIO, and app services). See official self-hosting docs for the current compose:

```bash
# Follow AppFlowy Cloud self-hosting guide
# https://docs.appflowy.io/ (self-hosting section)
```

## Getting Started

1. Install the desktop app for a local-only trial.
2. Optional: deploy AppFlowy Cloud for multi-device sync.
3. Create a workspace, pages, and a first database.
4. Invite collaborators if cloud is enabled.
5. Export or back up workspace data on a schedule.

## Full Setup Guide

Product site: [appflowy.com](https://appflowy.com/). Source: [github.com/AppFlowy-IO/AppFlowy](https://github.com/AppFlowy-IO/AppFlowy). For VPS Docker patterns, see [Dokploy install](https://www.bitdoze.com/dokploy-install/).

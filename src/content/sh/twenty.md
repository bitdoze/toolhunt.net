---
title: "Twenty - Open-Source CRM"
publishedDate: 2026-07-16
logo: "/images/sh/twenty-logo.webp"
uiImage: "/images/sh/twenty-ui.webp"
description: "Twenty is a modern open-source CRM with pipelines, custom objects, GraphQL API, and Docker self-hosting—a clean alternative to Salesforce and HubSpot."
youtubeId: ""
keyFeatures: [
  "Contacts and companies",
  "Kanban deal pipelines",
  "Custom objects and fields",
  "Activity timeline",
  "GraphQL API",
  "Docker Compose self-host"
]
category: "Productivity"
alternativeTo: "Salesforce"
checkItUrl: "https://twenty.com/"
---

Twenty is a modern, API-first open-source CRM. It focuses on a clean interface for people and companies, deal pipelines, activity timelines, and a flexible data model—without Salesforce complexity or HubSpot seat taxes when you self-host.

## Key Features

- **Core CRM**: People, companies, opportunities, and tasks.
- **Pipelines**: Kanban views for deals and custom workflows.
- **Custom Objects**: Extend the data model beyond standard CRM entities.
- **Timeline**: Calls, notes, emails, and meetings in one place.
- **GraphQL API**: Strong API surface for automation and integrations.
- **Self-Host**: Docker Compose with Postgres and Redis.

## Why Choose Twenty?

- You need a real CRM, not a spreadsheet pretending to be one.
- Salesforce/HubSpot are overkill or too expensive for the team size.
- Developers want a modern stack and API access.
- Data residency and ownership matter for customer records.

## Docker Deployment

Follow Twenty’s official self-hosting guide (app + worker + Postgres + Redis). Conceptually:

```bash
# See https://twenty.com/developers or GitHub self-hosting docs
# docker compose typically includes:
# - twentycrm/twenty (server)
# - worker
# - postgres
# - redis
```

Set strong secrets, put HTTPS in front, and create the first workspace admin.

## Getting Started

1. Deploy the compose stack and open the web UI.
2. Create the workspace and invite sales/ops users.
3. Import contacts or connect email if available in your version.
4. Build a pipeline board and custom fields you actually use.
5. Use the API for n8n/Activepieces automation later.

## Full Setup Guide

[twenty.com](https://twenty.com/) · [github.com/twentyhq/twenty](https://github.com/twentyhq/twenty). Deploy with Docker Compose patterns from [BitDoze Dokploy guides](https://www.bitdoze.com/dokploy-docker-compose-app/).

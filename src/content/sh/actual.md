---
title: "Actual Budget - Local-First Budgeting"
publishedDate: 2026-07-16
logo: "/images/sh/actual-logo.webp"
uiImage: "/images/sh/actual-ui.webp"
description: "Actual is a free, open-source, local-first personal budget app with envelope-style planning—self-host sync so YNAB-like budgeting stays private."
youtubeId: ""
keyFeatures: [
  "Envelope-style budgeting",
  "Local-first data model",
  "Optional self-hosted sync server",
  "Reports and schedules",
  "Import from banks/CSV",
  "MIT open source"
]
category: "Productivity"
alternativeTo: "YNAB"
checkItUrl: "https://actualbudget.org/"
---

Actual Budget is an open-source personal finance app inspired by envelope budgeting (YNAB-style). It is local-first: your budget lives on your devices, with an optional self-hosted server for multi-device sync—no subscription required for the core software.

## Key Features

- **Envelope Budgeting**: Give every dollar a job with category envelopes.
- **Local-First**: Works as a desktop app with data you own.
- **Self-Hosted Sync**: Run the Actual server for phone/desktop sync.
- **Imports**: Bring transactions from CSV and supported sources.
- **Schedules & Reports**: Recurring transactions and spending insight.
- **MIT Licensed**: Free to use, audit, and host.

## Why Choose Actual?

- YNAB’s subscription adds up yearly.
- Mint-style free tools disappeared or filled with upsells.
- Financial data is among the last things you want only in a SaaS silo.
- Simple enough for personal use, serious enough for real budgeting.

## Docker Deployment

```yaml
services:
  actual-server:
    image: actualbudget/actual-server:latest
    container_name: actual
    restart: unless-stopped
    ports:
      - "5006:5006"
    volumes:
      - actual-data:/data

volumes:
  actual-data:
```

Open the server URL, create a budget file, and connect official clients to your sync URL over HTTPS in production.

## Getting Started

1. Deploy Actual server (or start desktop-only).
2. Create a budget and categories.
3. Import recent transactions.
4. Assign money to envelopes each month.
5. Enable HTTPS and backups for the data volume.

## Full Setup Guide

[actualbudget.org](https://actualbudget.org/) · [github.com/actualbudget/actual](https://github.com/actualbudget/actual). Host with [Dokploy](https://www.bitdoze.com/dokploy-install/).

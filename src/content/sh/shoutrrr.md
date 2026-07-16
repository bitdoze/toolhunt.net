---
title: "Shoutrrr - Self-Hosted Social Scheduler"
publishedDate: 2026-07-16
logo: "/images/sh/shoutrrr-logo.webp"
uiImage: "/images/sh/shoutrrr-ui.webp"
description: "Shoutrrr by coolLabs is an open-source Buffer/Typefully alternative—write once, schedule to X, Bluesky, LinkedIn, and more from your own server."
youtubeId: ""
keyFeatures: [
  "Write once, post everywhere",
  "Multi-network calendar",
  "OAuth account connections",
  "Background publish worker",
  "One-command self-host",
  "coolLabs ecosystem"
]
category: "Productivity"
alternativeTo: "Buffer"
checkItUrl: "https://github.com/coollabsio/shoutrrr"
---

Shoutrrr is a self-hosted social media scheduling app from the coolLabs team (Coolify). Draft a post once, queue it across networks like X, Bluesky, LinkedIn, Instagram, Threads, and Discord, and keep drafts and tokens on infrastructure you control.

## Key Features

- **Multi-Network Publishing**: One calendar for major social platforms.
- **Scheduling Worker**: Background jobs publish on time without babysitting tabs.
- **OAuth Connections**: Connect accounts properly instead of sharing passwords.
- **Self-Host First**: Designed for single-command deploy on your VPS.
- **coolLabs DNA**: Fits next to Coolify and other open-source ops tools.
- **Open Source**: Inspect, fork, and run without per-seat SaaS pricing.

## Why Choose Shoutrrr?

- Buffer/Typefully/Hootsuite costs scale with channels.
- You already self-host marketing tools (e.g. Postiz, Notifuse) and want another OSS option.
- You trust coolLabs’ shipping culture (Coolify).
- Drafts and growth strategy should not live only in a third-party cloud.

## Docker Deployment

```bash
# Follow the current README for the recommended compose / one-liner
git clone https://github.com/coollabsio/shoutrrr.git
cd shoutrrr
# configure env, then docker compose up -d per project docs
```

Create OAuth apps per network you connect—standard for any self-hosted scheduler.

## Getting Started

1. Deploy Shoutrrr and create an admin user.
2. Register OAuth credentials for each social network.
3. Connect accounts and schedule a test post.
4. Build a weekly calendar habit.
5. Optional: compare with [Postiz](https://postiz.com/) if you need heavier team features.

## Full Setup Guide

[github.com/coollabsio/shoutrrr](https://github.com/coollabsio/shoutrrr). Deploy on Coolify/Dokploy with patterns from [BitDoze Coolify](https://www.bitdoze.com/coolify-install-heroku-alternative/) and [Dokploy compose](https://www.bitdoze.com/dokploy-docker-compose-app/).

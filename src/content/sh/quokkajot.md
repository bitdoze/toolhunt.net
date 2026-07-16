---
title: "QuokkaJot - Self-Hosted Feedback Boards"
publishedDate: 2026-07-16
logo: "/images/sh/quokkajot-logo.webp"
uiImage: "/images/sh/quokkajot-ui.webp"
description: "QuokkaJot is an open-source UserJot/Canny alternative—feedback boards, roadmap, and changelog self-hosted on Cloudflare Workers, D1, KV, and R2."
youtubeId: ""
keyFeatures: [
  "Feedback boards",
  "Public roadmap",
  "Changelog",
  "Cloudflare Workers edge host",
  "D1 + KV + R2 storage",
  "No managed DB required"
]
category: "Survey & Feedback"
alternativeTo: "Canny"
checkItUrl: "https://github.com/quokkajot/quokkajot"
---

QuokkaJot is a self-hosted product feedback stack: boards for ideas, a roadmap, and a changelog—without Canny or UserJot SaaS. It runs on Cloudflare’s edge (Workers + D1 + KV + R2), so you avoid a traditional VPS database while still owning the app.

## Key Features

- **Feedback Boards**: Collect and vote on feature requests.
- **Roadmap**: Show what is planned, in progress, and shipped.
- **Changelog**: Publish releases to users in one place.
- **Edge-Native**: Designed for Cloudflare Workers, not a heavy multi-container stack.
- **Self-Hosted Control**: No third-party product-feedback middleman.
- **Open Source**: Fork and brand for your company.

## Why Choose QuokkaJot?

- Canny/UserJot pricing does not fit indie products.
- You already live in Cloudflare and want D1/R2-native tools.
- Feedback should sit next to your docs, not another vendor silo.
- Lightweight alternative to full community platforms.

## Docker Deployment

QuokkaJot targets **Cloudflare** rather than classic Docker. Deploy with Wrangler / project scripts:

```bash
git clone https://github.com/quokkajot/quokkajot.git
cd quokkajot
# install deps, configure wrangler.toml / Cloudflare resources
# follow README for D1, KV, R2 bindings and deploy
```

If you prefer pure Docker apps for feedback, evaluate Formbricks (already on ToolHunt) as a survey-centric option.

## Getting Started

1. Create a Cloudflare account and enable Workers/D1.
2. Clone QuokkaJot and configure bindings.
3. Deploy and create a workspace.
4. Embed or link the board from your product.
5. Publish roadmap and changelog updates with releases.

## Full Setup Guide

[github.com/quokkajot/quokkajot](https://github.com/quokkajot/quokkajot). Related: Formbricks, Heyforms on ToolHunt. For classic Docker self-hosting patterns on a VPS, see [Dokploy](https://www.bitdoze.com/dokploy-install/).

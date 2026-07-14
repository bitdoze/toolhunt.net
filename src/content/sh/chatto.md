---
title: "Chatto - Self-Hosted Team Chat"
publishedDate: 2026-07-14
logo: "/images/sh/chatto-logo.png"
uiImage: "/images/sh/chatto-ui.png"
description: "Chatto is a fast, self-hostable team chat app for communities that want private, owned conversations with rooms, calls, roles, and a single ~50 MB binary."
youtubeId: ""
keyFeatures: [
  "Single ~50 MB binary, zero dependencies",
  "Self-hosted or managed cloud options",
  "Encryption at rest with crypto shredding",
  "Rooms for chat, forums, and social feeds",
  "Built-in audio and video calls",
  "Roles, permissions, GraphQL and NATS APIs"
]
category: "Productivity"
alternativeTo: "Slack"
checkItUrl: "https://chatto.run/"
---

Chatto is a modern self-hostable chat platform for teams and communities that want Slack-like collaboration without giving up data ownership. It ships as a small single binary, stays private by default, and still covers rooms, permissions, and real-time calls.

## Key Features

- **Easy Self-Hosting**: Run one ~50 MB binary with no external service dependencies for the core app.
- **Private by Default**: Encryption at rest, crypto shredding, no tracking/analytics, and GDPR-ready design.
- **Flexible Rooms**: Shape spaces as free-form chat, forums, or social-style feeds depending on the team.
- **Audio & Video Calls**: Built-in voice/video with screen sharing, no third-party call vendor required.
- **Roles & Permissions**: Fine-grained access control so communities can model real org structures.
- **Extensible APIs**: First-class GraphQL and NATS surfaces for integrations and custom clients.

## Why Choose Chatto?

- You want a Slack/Discord alternative you can fully own.
- You prefer a lightweight deploy story over a multi-service stack.
- You need rooms, moderation controls, and calls in one product.
- You care about private messaging infrastructure without vendor lock-in.

## Docker / Binary Deployment

Chatto is designed for simple self-hosting. Download a release binary or follow the official docs for hosting, reverse proxy, and storage settings. Keep TLS termination and backups in place for production.

## Getting Started

1. Grab a release from [GitHub](https://github.com/chattocorp/chatto/releases) or use the official install docs.
2. Point DNS and TLS at your Chatto instance.
3. Create your workspace, rooms, and roles.
4. Invite teammates and enable calls where needed.

## Full Setup Guide

Official product site and docs: [Chatto](https://chatto.run/) · [Documentation](https://docs.chatto.run) · [Source](https://github.com/chattocorp/chatto).
A BitDoze walkthrough will be linked here once published.

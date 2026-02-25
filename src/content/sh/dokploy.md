---
title: "Dokploy - Self-Hosted PaaS for Docker Deployments"
publishedDate: 2026-02-25
logo: "/images/sh/dokploy-logo.png"
uiImage: "/images/sh/dokploy-ui.png"
description: "Dokploy is an open-source deployment platform for Docker apps with projects, domains, environment variables, and workflows that simplify self-hosted app operations."
youtubeId: ""
keyFeatures: [
  "Project-based deployment model",
  "Compose and container services",
  "Domain and SSL management",
  "Environment variable controls",
  "Team collaboration workflows",
  "Self-hosted PaaS experience"
]
category: "Platform as a Service"
alternativeTo: "Heroku"
checkItUrl: "https://dokploy.com/"
---

Dokploy delivers a self-hosted PaaS-style workflow on top of Docker, making service deployment and environment management easier for small teams and solo operators.

## Key Features

- **Project-Centric Workflow**: Organize applications by project and environment.
- **Compose Deployment Support**: Run compose-based stacks with UI-driven controls.
- **Domains and TLS**: Attach domains and manage HTTPS setup from the platform.
- **Environment Variables**: Configure per-service runtime settings clearly.
- **Team Operations**: Coordinate deployments with a shared interface.
- **Self-Hosted Platform Layer**: Keep full control of runtime and data.

## Why Choose Dokploy?

- You want simpler app operations without giving up self-hosting.
- You deploy many small services and need consistent workflow.
- You want a Heroku-like experience on your own server.

## Docker Deployment

Dokploy itself runs in Docker and is commonly fronted by a reverse proxy. Plan persistent storage for service metadata and deployment state.

## Getting Started

1. Install Dokploy on a VPS or dedicated host.
2. Create projects and add services.
3. Configure domains, environment variables, and TLS.
4. Deploy and monitor app health from the dashboard.

## Full Setup Guide

Use the full installation tutorial here: [Dokploy Install Guide](https://www.bitdoze.com/dokploy-install/).

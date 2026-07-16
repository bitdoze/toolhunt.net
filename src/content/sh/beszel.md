---
title: "Beszel - Lightweight Server Monitoring"
publishedDate: 2026-07-16
logo: "/images/sh/beszel-logo.webp"
uiImage: "/images/sh/beszel-ui.webp"
description: "Beszel is a lightweight open-source monitoring hub for CPU, memory, disk, network, and Docker stats with multi-server agents and low overhead."
youtubeId: ""
keyFeatures: [
  "CPU, memory, disk, network metrics",
  "Docker container stats",
  "Multi-server hub and agents",
  "Public-key agent auth",
  "Alerts and historical graphs",
  "Tiny resource footprint"
]
category: "Analytics"
alternativeTo: "Datadog"
checkItUrl: "https://beszel.dev/"
---

Beszel is a lightweight server and Docker monitoring stack: a central **Hub** dashboard plus small **Agents** on each host. You get real-time and historical graphs for system and container metrics without running a full Prometheus/Grafana farm—ideal for homelabs and small fleets.

## Key Features

- **System Metrics**: CPU load, memory, disk, network bandwidth.
- **Docker Awareness**: Per-container CPU, memory, and network when the agent sees the socket.
- **Multi-Server**: One hub, many agents authenticated with public keys.
- **Alerts**: Threshold-based notifications (email, webhooks, and more depending on setup).
- **Low Footprint**: Agents often use only tens of MB of RAM.
- **Simple Deploy**: Docker images for hub and agent; Dokploy/Coolify friendly.

## Why Choose Beszel?

- Datadog/New Relic pricing doesn’t make sense for a home server.
- Prometheus + Grafana is powerful but heavy for a few boxes.
- You care about disk filling up and containers thrashing, not only “is HTTP 200?”
- Use with Uptime Kuma: Beszel = inside the box, Kuma = outside availability.

## Docker Deployment

**Hub** (dashboard):

```yaml
services:
  beszel:
    image: henrygd/beszel:latest
    container_name: beszel
    restart: unless-stopped
    ports:
      - "8090:8090"
    volumes:
      - beszel-data:/beszel_data
    environment:
      - APP_URL=https://monitor.yourdomain.com

volumes:
  beszel-data:
```

**Agent** (on each monitored host)—copy the compose snippet from the Hub “Add System” UI (includes your unique `KEY`):

```yaml
services:
  beszel-agent:
    image: henrygd/beszel-agent
    container_name: beszel-agent
    restart: unless-stopped
    network_mode: host
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    environment:
      PORT: 45876
      KEY: 'ssh-ed25519 AAAA...'
```

## Getting Started

1. Deploy the Hub and set `APP_URL` for correct alert links.
2. Create the admin account in the web UI.
3. Add a system and deploy the agent with the generated key.
4. Confirm metrics turn green and graphs populate.
5. Set alert thresholds (e.g. disk over 85%, host down).

## Full Setup Guide

Complete Dokploy walkthrough with Uptime Kuma: [Beszel & Uptime Kuma Setup on Dokploy](https://www.bitdoze.com/beszel-uptime-kuma/). Broader monitoring context: [Server Monitoring Tools](https://www.bitdoze.com/sever-monitoring/).

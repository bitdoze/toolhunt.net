---
title: "SUB/WAVE - AI DJ for Your Music Library"
publishedDate: 2026-07-16
logo: "/images/sh/subwave-logo.webp"
uiImage: "/images/sh/subwave-ui.webp"
description: "SUB/WAVE turns your Navidrome library into personal internet radio—an AI DJ picks tracks, talks between songs, and streams one shared Icecast broadcast."
youtubeId: ""
keyFeatures: [
  "AI DJ over your own library",
  "One shared Icecast radio stream",
  "Navidrome / Subsonic backend",
  "Local or cloud LLM and TTS",
  "Show schedule and personas",
  "Docker one-command deploy"
]
category: "Productivity"
alternativeTo: "Spotify"
checkItUrl: "https://www.getsubwave.com/"
---

SUB/WAVE is personal internet radio for music you already own. It connects to **Navidrome** (Subsonic API), uses an AI DJ to pick tracks and speak between them, and broadcasts a single Icecast stream everyone hears together—radio, not a shuffle playlist.

## Key Features

- **Shared Broadcast**: One stream, no per-listener skip—true radio pacing.
- **Your Library**: Music stays on Navidrome; nothing is generated or licensed by SUB/WAVE.
- **AI DJ**: Intros, idents, weather/time bits, and plain-language song requests.
- **Swappable LLM/TTS**: Ollama, OpenAI, Anthropic, and multiple TTS engines including local options.
- **Personas & Shows**: Multiple DJ personas and a 24×7 schedule grid.
- **Self-Hosted**: `docker compose up` (or CLI installer) on one Linux host; optional MCP server.

## Why Choose SUB/WAVE?

- You have a huge Navidrome library you never actually “listen through.”
- Spotify Radio is closed and doesn’t play your ripped collection.
- You want a fun, distinctive self-hosted project beyond another dashboard.
- Homelab parties need one stream on Sonos, VLC, and phones.

## Docker Deployment

```bash
mkdir subwave && cd subwave
curl -O https://raw.githubusercontent.com/perminder-klair/subwave/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/perminder-klair/subwave/main/.env.example
mv .env.example .env
# set ADMIN_USER, ADMIN_PASS, SITE_URL
docker compose up -d
# finish Navidrome + LLM setup at http://localhost:7700/onboarding
```

Or install the CLI: `curl -fsSL https://cli.getsubwave.com | sh` then `subwave setup`.

## Getting Started

1. Run Navidrome with your music library.
2. Deploy SUB/WAVE and complete onboarding.
3. Connect Navidrome and choose an LLM/TTS provider.
4. Open the listener player and tune Sonos/VLC to the stream URL.
5. Optional: schedule shows and install mobile players.

## Full Setup Guide

Site: [getsubwave.com](https://www.getsubwave.com/) · [GitHub](https://github.com/perminder-klair/subwave). Pair with [Navidrome](https://www.navidrome.org/) on the same VPS using [Dokploy compose patterns](https://www.bitdoze.com/dokploy-docker-compose-app/).

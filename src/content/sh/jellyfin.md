---
title: "Jellyfin - Free Media Server"
publishedDate: 2026-07-16
logo: "/images/sh/jellyfin-logo.webp"
uiImage: "/images/sh/jellyfin-ui.webp"
description: "Jellyfin is a free, open-source media server for movies, TV, music, and live TV—stream to almost any device with no subscription or forced account."
youtubeId: ""
keyFeatures: [
  "Movies, TV, music libraries",
  "Clients for web, TV, mobile",
  "Hardware transcoding support",
  "Users and parental controls",
  "Plugins ecosystem",
  "No premium license required"
]
category: "Productivity"
alternativeTo: "Plex"
checkItUrl: "https://jellyfin.org/"
---

Jellyfin is a fully free, open-source media system. Point it at your movie, show, and music folders and stream to browsers, phones, smart TVs, and game consoles—without Plex Pass, mandatory accounts, or proprietary lock-in.

## Key Features

- **Media Libraries**: Automatic metadata for movies, series, music, and more.
- **Wide Clients**: Official and community apps across platforms.
- **Transcoding**: CPU/GPU transcoding for remote or weak clients.
- **Multi-User**: Profiles, watch history, and parental controls.
- **Plugins**: Subtitles, metadata providers, and extras from the community.
- **Truly Free**: No paid tier required for core streaming features.

## Why Choose Jellyfin?

- Plex’s free tier keeps shrinking features behind paywalls.
- You already store media on a NAS and want a Netflix-like UI at home.
- Privacy-minded households prefer no phoning home.
- Works great on mini PCs and homelab hardware.

## Docker Deployment

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    ports:
      - "8096:8096"
    volumes:
      - jellyfin-config:/config
      - jellyfin-cache:/cache
      - /path/to/media:/media:ro
    # devices: # optional GPU passthrough for transcoding
    #   - /dev/dri:/dev/dri

volumes:
  jellyfin-config:
  jellyfin-cache:
```

Open port **8096**, complete the wizard, and add library paths.

## Getting Started

1. Deploy Jellyfin and finish the setup wizard.
2. Add libraries for movies, TV, and music.
3. Create user accounts for family members.
4. Install clients on TVs and phones.
5. Optional: reverse proxy + auth for remote access.

## Full Setup Guide

[jellyfin.org](https://jellyfin.org/) · Docker image `jellyfin/jellyfin`. Homelab media notes also appear across [BitDoze home server guides](https://www.bitdoze.com/docker-containers-home-server/).

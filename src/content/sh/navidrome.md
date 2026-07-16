---
title: "Navidrome - Self-Hosted Music Server"
publishedDate: 2026-07-16
logo: "/images/sh/navidrome-logo.webp"
uiImage: "/images/sh/navidrome-ui.webp"
description: "Navidrome is a free, open-source music server with a modern web UI and Subsonic-compatible API—stream your library like Spotify on hardware you own."
youtubeId: ""
keyFeatures: [
  "Fast Subsonic-compatible server",
  "Modern web player",
  "Multi-user and playlists",
  "Wide mobile client ecosystem",
  "Lightweight single binary",
  "Pairs with SUB/WAVE AI radio"
]
category: "Productivity"
alternativeTo: "Spotify"
checkItUrl: "https://www.navidrome.org/"
---

Navidrome turns a folder of music into a personal streaming service. It indexes your library, serves a clean web UI, and speaks the Subsonic/OpenSubsonic API so dozens of mobile and desktop clients can stream as if you had Spotify—without subscriptions or cloud uploads.

## Key Features

- **Your Files**: FLAC, MP3, and common formats from disk or NAS mounts.
- **Web UI**: Browse artists, albums, playlists, and favorites in the browser.
- **Subsonic API**: Compatible with Symfonium, Feishin, and many other apps.
- **Multi-User**: Separate accounts and library access patterns.
- **Light Footprint**: Single Go binary/Docker image; fine on modest hardware.
- **Ecosystem**: Feeds tools like **SUB/WAVE** for AI radio over the same library.

## Why Choose Navidrome?

- Spotify does not play your ripped CDs and purchases as first-class local files.
- Plex/Jellyfin can do music, but Navidrome is purpose-built and lighter.
- You want phone clients that feel like streaming apps.
- Homelab music is the foundation for radio experiments (SUB/WAVE).

## Docker Deployment

```yaml
services:
  navidrome:
    image: deluan/navidrome:latest
    container_name: navidrome
    restart: unless-stopped
    ports:
      - "4533:4533"
    environment:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
    volumes:
      - navidrome-data:/data
      - /path/to/music:/music:ro

volumes:
  navidrome-data:
```

Open port **4533**, create the admin user, and wait for the first scan.

## Getting Started

1. Mount your music library and deploy Navidrome.
2. Create users and verify the web player.
3. Install a Subsonic client on your phone.
4. Optional: point SUB/WAVE at this server for AI radio.
5. Back up the `/data` volume (DB + playlists).

## Full Setup Guide

[navidrome.org](https://www.navidrome.org/) · Docker image `deluan/navidrome`. Homelab lists: [BitDoze home server containers](https://www.bitdoze.com/docker-containers-home-server/).

---
title: "RustDesk - Open-Source Remote Desktop"
publishedDate: 2026-07-16
logo: "/images/sh/rustdesk-logo.webp"
uiImage: "/images/sh/rustdesk-ui.webp"
description: "RustDesk is a fast open-source TeamViewer/AnyDesk alternative written in Rust—self-host the relay/ID server so remote sessions never need a third-party cloud."
youtubeId: ""
keyFeatures: [
  "Remote desktop for Win/Mac/Linux",
  "Self-hosted ID and relay servers",
  "Fast Rust implementation",
  "File transfer and clipboard",
  "Optional address book",
  "No mandatory vendor cloud"
]
category: "Server Management"
alternativeTo: "TeamViewer"
checkItUrl: "https://rustdesk.com/"
---

RustDesk is an open-source remote desktop stack. Clients run on Windows, macOS, and Linux; you can self-host the **ID** and **relay** servers so session traffic stays on infrastructure you trust—unlike default TeamViewer/AnyDesk clouds.

## Key Features

- **Cross-Platform Clients**: Control desktops across major OS families.
- **Self-Hosted Backend**: `hbbs` / `hbbr` (or Docker images) for ID + relay.
- **Performance**: Rust codebase aimed at responsive sessions.
- **Extras**: File transfer, clipboard, and unattended access patterns.
- **Address Book**: Organize devices for family or small MSP-style use.
- **Open Source**: Audit clients and server components.

## Why Choose RustDesk?

- TeamViewer licensing and popups are painful for personal labs.
- You help family PCs and want something free you control.
- Compliance prefers remote access that does not hairpin through a vendor.
- Complements HopToDesk (Mac catalog) with a full self-host story.

## Docker Deployment

```yaml
services:
  hbbs:
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - rustdesk-data:/root
    network_mode: host
    restart: unless-stopped
  hbbr:
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - rustdesk-data:/root
    network_mode: host
    restart: unless-stopped

volumes:
  rustdesk-data:
```

Point clients at your server’s public key / host settings (see current RustDesk self-host docs for ports and encryption keys).

## Getting Started

1. Deploy ID + relay servers and open required ports.
2. Install RustDesk clients on machines you manage.
3. Configure each client to use your server.
4. Test a session on LAN, then remote.
5. Lock down server firewall and keep keys safe.

## Full Setup Guide

[rustdesk.com](https://rustdesk.com/) · [github.com/rustdesk/rustdesk](https://github.com/rustdesk/rustdesk). VPS networking tips on [BitDoze](https://www.bitdoze.com/).

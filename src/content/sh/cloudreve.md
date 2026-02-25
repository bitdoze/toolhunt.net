---
title: "Cloudreve - Self-Hosted File Sharing Cloud"
publishedDate: 2026-02-25
logo: "/images/sh/cloudreve-logo.png"
uiImage: "/images/sh/cloudreve-ui.png"
description: "Cloudreve is a self-hosted file management platform for private cloud storage, sharing links, and organizing team or personal files with a clean web interface."
youtubeId: ""
keyFeatures: [
  "Private cloud storage",
  "File sharing links",
  "Multi-user access controls",
  "Remote upload support",
  "Web file management",
  "Docker deployment ready"
]
category: "File Storage"
alternativeTo: "Google Drive"
checkItUrl: "https://cloudreve.org/"
---

Cloudreve lets you run your own file cloud with browser-based upload, sharing, and access management. It works well for personal storage portals, team file hubs, and controlled client sharing.

## Key Features

- **Self-Hosted Cloud Storage**: Keep your files and metadata on your own infrastructure.
- **Public and Private Sharing**: Generate links with configurable access settings.
- **User and Permission Management**: Organize users and control who can access what.
- **Remote Upload Workflows**: Import files without local re-upload steps.
- **Web File Operations**: Browse, preview, and manage files directly in the UI.
- **Flexible Deployment**: Suitable for Docker-based environments.

## Why Choose Cloudreve?

- You want cloud-drive convenience without third-party lock-in.
- You need direct control of storage policy and privacy.
- You prefer a polished web interface over raw NAS tooling.

## Docker Deployment

Cloudreve is typically deployed with Docker Compose, persistent volumes, and optional reverse proxy access for HTTPS and custom domains.

## Getting Started

1. Deploy Cloudreve on a Docker host.
2. Configure storage backend and environment variables.
3. Set up domain + TLS via reverse proxy.
4. Create users and sharing policies.

## Full Setup Guide

For the full deployment tutorial, read: [Cloudreve Docker Setup](https://www.bitdoze.com/cloudreve-docker-setup/).

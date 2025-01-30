---
title: "Docmost"
publishedDate: 2025-01-29
logo: "/images/sh/docmost-logo.ico"
uiImage: "/images/sh/docmost-ui.webp"
description: "Docmost is an open-source collaborative wiki and documentation platform that makes it easy to create, share, and manage knowledge bases. Perfect for teams looking for a self-hosted documentation solution."
youtubeId: "jFxf4dFKh9s"
keyFeatures: [
  "Real-time collaborative editing",
  "Built-in diagramming tools",
  "Robust permissions system",
  "Organized spaces",
  "Page history tracking",
  "Full-text search"
]
category: "Documentation"
alternativeTo: "Notion"
checkItUrl: "https://docmost.com"
---

Docmost is a modern, open-source documentation platform that makes it simple to create and manage your team's knowledge base. Whether you're documenting your project, building a company wiki, or creating technical documentation, Docmost provides all the tools you need in one place.

## Key Features

- **Real-Time Collaboration**: Work together with your team in real-time using the rich-text editor, making it easy to create and update documentation simultaneously.
- **Diagramming Tools**: Create clear visual explanations using built-in support for Mermaid, Draw.io, and Excalidraw diagrams.
- **Smart Organization**: Keep your content organized with spaces and nested pages, making it easy for teams to find what they need.
- **Powerful Permissions**: Control access with a detailed permissions system that lets you decide who can view, edit, and manage content.
- **Version History**: Track changes and restore previous versions of your documents with built-in page history.
- **Quick Search**: Find any information quickly with the powerful full-text search feature powered by PostgreSQL.
- **File Attachments**: Easily add images and files to your pages by simply dragging and dropping or pasting from your clipboard.

## Why Choose Docmost?

- **User-Friendly**: The clean, intuitive interface makes it easy for anyone to start creating and organizing documentation.
- **Self-Hosted**: Keep full control of your data by hosting Docmost on your own servers.
- **Flexible Storage**: Choose between local storage or S3 for your attachments and files.
- **Team Collaboration**: Built-in features like comments and real-time editing make team collaboration seamless.
- **Cost-Effective**: As an open-source solution, Docmost helps you avoid expensive subscription fees for similar commercial tools.

## Getting Started

Setting up Docmost is straightforward. You can:
1. Follow the installation guide on their GitHub repository
2. Choose your preferred storage solution
3. Start creating spaces and inviting team members
4. Begin documenting with the rich-text editor

## Docker Compose File

```yml
services:
  docmost:
    image: docmost/docmost:latest
    container_name: docmost
    hostname: docmost
    user: root
    healthcheck:
      test: timeout 10s bash -c ':> /dev/tcp/127.0.0.1/3000' || exit 1
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 90s
    depends_on:
      - docmost-db
      - docmost-redis
    environment:
      APP_URL: "${APP_URL}"
      APP_SECRET: "${APP_SECRET}"
      DATABASE_URL: "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@docmost-db:5432/${POSTGRES_DB}?schema=public"
      REDIS_URL: "redis://docmost-redis:6379"
    ports:
      - "5031:3000"
    restart: unless-stopped
    volumes:
      - ./docmost:/app/data/storage

  docmost-db:
    image: postgres:16-alpine
    container_name: docmost-DB
    hostname: docmost-db
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
    volumes:
      - ./docmost-db:/var/lib/postgresql/data:rw
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    restart: on-failure:5

  docmost-redis:
    image: redis:7.2-alpine
    container_name: docmost-redis
    hostname: docmost-redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "redis-cli ping || exit 1"]
    volumes:
      - ./redis_data:/data
```

Docmost is perfect for teams that want a powerful, self-hosted documentation solution without the complexity of traditional enterprise tools. Whether you're a small startup or a larger organization, Docmost provides the flexibility and features you need to keep your team's knowledge organized and accessible.

Start building your team's knowledge base today with Docmost - the open-source solution for modern documentation needs.

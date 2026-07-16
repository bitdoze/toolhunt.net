---
title: "Mealie - Self-Hosted Recipe Manager"
publishedDate: 2026-07-16
logo: "/images/sh/mealie-logo.webp"
uiImage: "/images/sh/mealie-ui.webp"
description: "Mealie is a self-hosted recipe manager and meal planner with shopping lists, imports from URLs, and a clean UI for home cooks."
youtubeId: ""
keyFeatures: [
  "Recipe collection and search",
  "Import from recipe URLs",
  "Meal planning calendar",
  "Shopping lists",
  "Multi-user households",
  "Docker deploy"
]
category: "Productivity"
alternativeTo: "Paprika"
checkItUrl: "https://mealie.io/"
---

Mealie is a self-hosted cookbook for the home. Save recipes, import them from sites, plan meals, and generate shopping lists—without locking family recipes into a closed mobile app.

## Key Features

- **Recipe Library**: Organize, tag, and full-text search your collection.
- **URL Import**: Pull ingredients and steps from many recipe websites.
- **Meal Planner**: Plan the week so dinner is less chaotic.
- **Shopping Lists**: Turn plans into groceries you can check off.
- **Households**: Multi-user access for families.
- **API & Extras**: Automations and integrations for power users.

## Why Choose Mealie?

- Paprika/AnyList are paid and proprietary.
- Browser bookmarks are a terrible recipe box.
- You want data export and self-host ownership.
- Fun, high-utility homelab app non-technical family members will use.

## Docker Deployment

```yaml
services:
  mealie:
    image: ghcr.io/mealie-recipes/mealie:latest
    container_name: mealie
    restart: unless-stopped
    ports:
      - "9925:9000"
    environment:
      PUID: 1000
      PGID: 1000
      TZ: Europe/Bucharest
      BASE_URL: https://recipes.yourdomain.com
    volumes:
      - mealie-data:/app/data

volumes:
  mealie-data:
```

Open the UI, create the admin user, and start importing recipes.

## Getting Started

1. Deploy Mealie and set `BASE_URL` for links.
2. Create household users.
3. Import a few favorite recipe URLs.
4. Build a weekly meal plan and shopping list.
5. Bookmark the app on phones (PWA-friendly workflows).

## Full Setup Guide

[mealie.io](https://mealie.io/) · [github.com/mealie-recipes/mealie](https://github.com/mealie-recipes/mealie). Deploy with [Dokploy compose](https://www.bitdoze.com/dokploy-docker-compose-app/).

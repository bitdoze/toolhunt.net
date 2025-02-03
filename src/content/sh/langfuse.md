---
title: "Langfuse"
publishedDate: 2025-01-29
logo: "/images/sh/langfuse-logo.png"
uiImage: "/images/sh/langfuse-ui.webp"
description: "Langfuse is an open-source observability and analytics platform designed specifically for LLM applications. It helps developers monitor, analyze, and optimize their AI models and applications."
youtubeId: "Gm4HBrK63AM"
keyFeatures: [
  "LLM monitoring and analytics",
  "Production observability",
  "Cost tracking",
  "Performance metrics",
  "Prompt management",
  "A/B testing capabilities"
]
category: "AI Development"
alternativeTo: "LangSmith"
checkItUrl: "https://langfuse.com"
gitHubUrl: "https://github.com/langfuse/langfuse"
---

Langfuse is a comprehensive observability platform built specifically for Large Language Model (LLM) applications. It provides developers with powerful tools to monitor, analyze, and optimize their AI models and applications in production environments.

## Key Features

- **LLM Monitoring**: Track and analyze your LLM applications' performance, usage, and behavior in real-time.
- **Cost Analytics**: Monitor and optimize spending across different LLM providers and models.
- **Prompt Management**: Version control and analyze the effectiveness of different prompts.
- **Performance Metrics**: Track latency, token usage, and other key performance indicators.
- **A/B Testing**: Compare different models and prompts to optimize performance.
- **Error Tracking**: Identify and debug issues in your LLM applications quickly.
- **API Integration**: Easy integration with popular LLM frameworks and languages.
- **Self-Hosted Option**: Deploy Langfuse on your own infrastructure for complete control.

## Why Choose Langfuse?

- **Specialized for LLMs**: Built specifically for the unique challenges of LLM applications.
- **Open Source**: Transparent development and community-driven improvements.
- **Developer-Friendly**: Easy integration with existing workflows and tools.
- **Comprehensive Analytics**: Deep insights into your LLM applications' performance.
- **Cost Optimization**: Tools to manage and optimize LLM-related expenses.

## Use Cases

- **Production Monitoring**: Track the performance and reliability of LLM applications in production.
- **Prompt Optimization**: Test and refine prompts to improve model outputs.
- **Cost Management**: Monitor and optimize spending across different LLM providers.
- **Quality Assurance**: Ensure consistent and high-quality model outputs.
- **Performance Analysis**: Analyze and improve response times and efficiency.

## Getting Started



To begin using Langfuse, visit their [official website](https://langfuse.com) and follow the setup instructions. Whether you're managing a production LLM application or developing new AI features, Langfuse provides the tools needed to understand and improve your AI systems.

## Docker Compose File

```yml
services:
  langfuse-db:
    image: postgres:16-alpine
    container_name: LangFuse-DB
    hostname: langfuse-db
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
    volumes:
      - ./langfuse-db:/var/lib/postgresql/data:rw
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    restart: on-failure:5

  langfuse:
    image: langfuse/langfuse:latest
    container_name: LangFuse
    ports:
      - 5061:3000
    restart: unless-stopped
    depends_on:
      - langfuse-db
    environment:
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@langfuse-db:5432/${POSTGRES_DB}?sslmode=disable
      NEXTAUTH_URL: https://longfuse.bitdoze.com
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      SALT: ${SALT}
      LANGFUSE_CSP_ENFORCE_HTTPS: true
      LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES: false
      TELEMETRY_ENABLED: false
      AUTH_DISABLE_SIGNUP: ${AUTH_DISABLE_SIGNUP}
```


Langfuse is more than just a monitoring tool; it's a complete platform for understanding and optimizing your LLM applications. Its open-source nature and specialized features make it an essential tool for any team working with AI and language models in production.

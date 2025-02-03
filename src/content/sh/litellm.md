---
title: "LiteLLM"
publishedDate: 2025-01-30
logo: "/images/sh/litellm-logo.avif"
uiImage: "/images/sh/litellm-ui.webp"
description: "LiteLLM is a unified API that simplifies interaction with 100+ LLMs through a single interface. It provides monitoring, logging, and cost tracking capabilities for AI applications."
youtubeId: "j0IFFoCfihk"
keyFeatures: [
  "Unified LLM API interface",
  "Support for 100+ models",
  "Cost tracking & optimization",
  "Load balancing",
  "Monitoring & logging",
  "Database integration"
]
category: "AI Development"
alternativeTo: "OpenAI API"
checkItUrl: "https://litellm.ai"
gitHubUrl: "https://github.com/BerriAI/litellm"
---

LiteLLM is a powerful tool that provides a unified interface for interacting with multiple Large Language Models (LLMs) through a standardized API. It supports over 100 different LLMs including those from OpenAI, Anthropic, HuggingFace, and others, making it easier to build and manage AI applications.

## Key Features

- **Unified API Interface**: Access 100+ LLMs through a single, standardized OpenAI-compatible API.
- **Comprehensive Model Support**: Works with models from OpenAI, Anthropic, HuggingFace, Bedrock, and more.
- **Cost Management**: Track and optimize spending across different LLM providers.
- **Load Balancing**: Handle up to 1,500 requests per second with efficient load distribution.
- **Monitoring & Logging**: Built-in tools for tracking performance and debugging.
- **Database Integration**: Optional PostgreSQL integration for advanced features and data persistence.
- **SDK Compatibility**: Works with OpenAI, Anthropic, Mistral, LlamaIndex, and Langchain SDKs.

## Deployment Options

### Basic Deployment (No Database)
```yaml
litellm:
  image: ghcr.io/berriai/litellm:main-latest
  restart: unless-stopped
  command:
    - "--config=/litellm_config.yaml"
    - "--detailed_debug"
  environment:
    LITELLM_MASTER_KEY: ${LITELLM_MASTER_KEY}
    OPENAI_API_KEY: ${OPENAI_API_KEY}
    ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
  volumes:
    - ./litellm_config.yaml:/litellm_config.yaml
```

### Advanced Deployment (With Database)
```yaml
services:
  litellm:
    image: ghcr.io/berriai/litellm:main-latest
    depends_on:
      - litellm-db
    environment:
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@litellm-db:5432/${POSTGRES_DB}
      LITELLM_MASTER_KEY: ${LITELLM_MASTER_KEY}
      UI_USERNAME: ${UI_USERNAME}
      UI_PASSWORD: ${UI_PASSWORD}

  litellm-db:
    image: postgres:16-alpine
    volumes:
      - ./litellm-db:/var/lib/postgresql/data:rw
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

## Use Cases

- **API Unification**: Standardize access to multiple LLM providers through a single API.
- **Cost Optimization**: Monitor and manage expenses across different LLM services.
- **High-Performance Applications**: Build scalable applications with load balancing support.
- **Enterprise Integration**: Implement enterprise-grade LLM solutions with monitoring and logging.
- **Development & Testing**: Easily switch between different models during development.

## Why Choose LiteLLM?

- **Simplification**: Reduce complexity by using a single API for multiple LLMs.
- **Cost Control**: Better visibility and management of LLM-related expenses.
- **Flexibility**: Easy switching between different models and providers.
- **Scalability**: Built-in support for high-performance requirements.
- **Enterprise Ready**: Features like monitoring, logging, and database integration.

## Getting Started

To begin using LiteLLM, visit their [official website](https://litellm.ai) and follow the setup instructions. Whether you're building a simple chatbot or a complex AI application, LiteLLM provides the tools and flexibility needed to manage your LLM interactions effectively.

LiteLLM simplifies the complexity of working with multiple LLMs, making it an essential tool for developers and organizations building AI-powered applications. Its combination of features, flexibility, and enterprise-ready capabilities makes it a powerful choice for LLM integration and management.

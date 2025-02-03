---
title: "HeyForm - Open Source Form Builder"
publishedDate: 2025-02-03
logo: "/images/sh/heyform-logo.webp"
uiImage: "/images/sh/heyform.webp"
description: "HeyForm is an open-source form builder that helps small businesses create engaging, branded forms with smart features, integrations, and responsive design."
youtubeId: ""
keyFeatures: [
  "Branded form design",
  "Conditional logic",
  "Multiple endpoints",
  "Smart workflows",
  "30+ integrations",
  "Responsive design"
]
category: "Survey & Feedback"
alternativeTo: "Typeform"
checkItUrl: "https://heyform.net"
gitHubUrl: "https://github.com/heyform/heyform"
---

HeyForm is a powerful, open-source form builder designed for small businesses to create engaging forms with ease. It combines modern features with simplicity, allowing users to collect and analyze data through customizable forms while maintaining full control over their data.

## Key Features

- **Brand Customization**: Full control over form design and branding
- **Smart Logic**: Conditional logic for dynamic form behavior
- **Multiple Endpoints**: Customizable form completion paths
- **AI Copilot**: Assistance in form creation
- **Responsive Design**: Forms that work on any device
- **Template Library**: Pre-built templates for various use cases
- **30+ Integrations**: Connect with popular tools and services
- **Analytics**: Built-in form performance tracking

## Why Choose HeyForm?

- **Open Source**: Full transparency and customization options
- **Self-Hosted Option**: Complete control over your data
- **User-Friendly**: Intuitive interface for all skill levels
- **Cost-Effective**: Free tier available
- **Bootstrap-Funded**: Sustainable, user-focused development
- **Active Community**: Growing ecosystem of users and developers

## Template Categories

### Business
- Contact Forms
- Customer Feedback
- Lead Generation
- Order Forms

### HR
- Job Applications
- Employee Surveys
- Exit Interviews
- Performance Reviews

### Education
- Student Enrollment
- Course Evaluation
- Teacher Feedback
- Event Registration

### Marketing
- Lead Capture
- Event Registration
- Referral Programs
- Customer Surveys

## Integrations

HeyForm connects with popular tools including:
- Zapier
- Google Sheets
- Slack
- Notion
- Airtable
- Mailchimp
- Stripe
- WordPress
- And 20+ more

## Docker Compose

```yml
networks:
  keydb:
  mongo:

services:
  heyform:
    image: heyform/community-edition:latest
    restart: always
    volumes:
      # Persist uploaded images
      - ./assets:/app/static/upload
    depends_on:
      - mongo
      - keydb
    ports:
      - '9513:8000'
    environment:
      APP_HOMEPAGE_URL: http://form.yourcompany.com
      SESSION_KEY: key1
      FORM_ENCRYPTION_KEY: key2
      MONGO_URI: 'mongodb://mongo:27017/heyform'
      REDIS_HOST: keydb
      REDIS_PORT: 6379

  mongo:
    image: percona/percona-server-mongodb:4.4
    restart: always
    volumes:
      # Persist MongoDB data
      - mongodb_data:/data/db

  keydb:
    image: eqalpha/keydb:6.3.3
    restart: always
    command: keydb-server --appendonly yes --protected-mode no
    volumes:
      # Persist KeyDB data
      - keydb:/data

volumes:
  mongodb_data:
  keydb:

```

## Use Cases

- **Customer Feedback**: Gather insights from users
- **Lead Generation**: Capture and qualify leads
- **Event Registration**: Manage event signups
- **Job Applications**: Streamline recruitment
- **Surveys**: Conduct market research
- **Payment Collection**: Process transactions

HeyForm represents a modern approach to form building, combining the flexibility of open-source software with enterprise-grade features. Whether you're a small business owner, marketer, or developer, HeyForm provides the tools needed to create professional forms that engage users and collect valuable data efficiently.

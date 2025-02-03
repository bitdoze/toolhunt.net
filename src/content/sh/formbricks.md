---
title: "Formbricks - Open Source Experience Management"
publishedDate: 2025-02-03
logo: "/images/sh/formbriks-logo.webp"
uiImage: "/images/sh/formbriks-ui.webp"
description: "Formbricks is a privacy-first, open-source experience management platform that helps businesses collect and analyze user feedback through surveys across websites, apps, and emails."
youtubeId: ""
keyFeatures: [
  "Privacy-first design",
  "In-app surveys",
  "Website feedback",
  "Email surveys",
  "User journey tracking",
  "Pre-built templates"
]
category: "Survey & Feedback"
alternativeTo: "Typeform"
checkItUrl: "https://formbricks.com"
gitHubUrl: "https://github.com/formbricks/formbricks"
---

Formbricks is an open-source alternative to Qualtrics, offering a comprehensive experience management platform that prioritizes privacy while enabling businesses to gather valuable user feedback across multiple touchpoints.

## Key Features

- **Privacy-First Design**: GDPR-compliant with self-hosting options
- **Multi-Channel Surveys**: Deploy surveys across websites, apps, and emails
- **User Journey Tracking**: Target specific moments in the user journey
- **Pre-Built Templates**: Ready-to-use survey templates for common use cases
- **Custom Targeting**: Granular pre-segmentation capabilities
- **No-Code Setup**: Easy implementation with minimal developer involvement
- **Brand Customization**: Fully customizable look and feel
- **Response Analytics**: Comprehensive insight dashboard

## Why Choose Formbricks?

- **Open Source**: Full transparency and customization possibilities
- **Data Privacy**: Complete control over your data
- **Easy Integration**: Simple setup with minimal code
- **Cost-Effective**: Free self-hosted option available
- **Flexible Deployment**: Cloud or self-hosted options
- **Developer-Friendly**: Rich API and extensible architecture

## Quick Integration

Add Formbricks to your application:

```javascript
// NPM Installation
npm install @formbricks/js

// Initialize
import formbricks from "@formbricks/js";

if (typeof window !== "undefined") {
  formbricks.init({
    environmentId: "your-environment-id",
    apiHost: "https://app.formbricks.com",
  });
}
```

## Use Cases

### User Research
- Interview prompts
- Product-market fit surveys
- Onboarding feedback
- Feature usage surveys

### Customer Experience
- NPS surveys
- Churn feedback
- Documentation feedback
- Feature satisfaction tracking

### Revenue Optimization
- Trial conversion surveys
- Pricing feedback
- Upgrade motivation research
- Cancellation surveys

## Docker Compose file

```yml
services:
  db:
    image: pgvector/pgvector:pg17
    container_name: Formbricks-DB
    hostname: formbricks-db
    mem_limit: 1g
    cpu_shares: 1024
    security_opt:
      - no-new-privileges:true
    healthcheck:
      test: ["CMD", "pg_isready", "-q", "-d", "formbricks", "-U", "formbricksuser"]
      timeout: 45s
      interval: 10s
      retries: 10
    volumes:
      - /volume1/docker/formbricks/db:/var/lib/postgresql/data:rw
    environment:
      POSTGRES_DB: formbricks
      POSTGRES_USER: formbricksuser
      POSTGRES_PASSWORD: formbrickspass
    restart: on-failure:5

  formbricks:
    image: ghcr.io/formbricks/formbricks:latest
    restart: on-failure:5
    container_name: Formbricks
    healthcheck:
     test: curl -f http://localhost:3000/ || exit 1
    depends_on:
      - db
    ports:
      - 3774:3000
    volumes:
      - /volume1/docker/formbricks/uploads:/home/nextjs/apps/web/uploads/:rw
    environment:
      WEBAPP_URL: https://formbricks.yourname.synology.me
      DATABASE_URL: "postgresql://formbricksuser:formbrickspass@formbricks-db:5432/formbricks?schema=public"
      NEXTAUTH_SECRET: v6M37byB5LwYHCPZyCJzDGNUSsHY4grj
      NEXTAUTH_URL: https://formbricks.yourname.synology.me
      ENCRYPTION_KEY: v6M37byB5LwYHCPZyCJzDGNUSsHY4grj
      CRON_SECRET: MariushostingMariushostingMari13
      POSTGRES_PASSWORD: formbrickspass
      # ENTERPRISE_LICENSE_KEY:
      EMAIL_VERIFICATION_DISABLED: 1 #Set to 0 to enable Email verification for new signups.
      PASSWORD_RESET_DISABLED: 0 #Set to 1 to enable Password Reset.
      SIGNUP_DISABLED: 0 #Set to 1 to disbale Signups.
      INVITE_DISABLED: 0 #Set to 1 to disable Invites
      MAIL_FROM: Your-own-gmail-address
      SMTP_HOST: smtp.gmail.com
      SMTP_PORT: 587
      SMTP_SECURE_ENABLED: 1
      SMTP_USER: Your-own-gmail-address
      SMTP_PASSWORD: Your-own-app-password
      # SHORT_URL_BASE:
      # EMAIL_AUTH_DISABLED:
      # PRIVACY_URL:
      # TERMS_URL:
      # IMPRINT_URL:
      # GITHUB_ID:
      # GITHUB_SECRET:
      # GOOGLE_CLIENT_ID:
      # GOOGLE_CLIENT_SECRET:
      # DEFAULT_TEAM_ID:
      # DEFAULT_TEAM_ROLE: admin
      # ONBOARDING_DISABLED: 1
```

## Templates

Formbricks comes with pre-built templates for common scenarios:

- Product-Market Fit Surveys
- User Interview Requests
- Onboarding Feedback
- Churn Prevention Surveys
- Feature Usage Feedback
- Documentation Quality Surveys

## Privacy & Compliance

- GDPR-compliant by design
- Self-hosting option for complete data control
- Customizable data retention policies
- Transparent data processing
- Privacy-first architecture

Formbricks represents a modern approach to experience management, combining the power of open-source flexibility with enterprise-grade features while maintaining strict privacy standards. Whether you're conducting user research, measuring customer satisfaction, or optimizing your product, Formbricks provides the tools needed to gather and analyze valuable feedback effectively.

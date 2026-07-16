# Open-source self-hosted tool candidates

Curated research list for ToolHunt. Criteria: **open source**, **self-hostable**, **free community edition** (no paid-only core). Cross-checked against the live catalog (~91 tools: 39 self-hosted, 41 Mac, 9 online, 15 AI cross-catalog) so known entries are **not** repeated.

**Sources:** r/selfhosted New Project Megathreads, X (June–July 2026 launches), NetBird / Pinggy / Open Source Alternatives roundups, GitHub project pages, coolLabs / YouTube self-host roundups.  
**Researched:** 2026-07-16 (updated same day with fresh launches pass)

**Already on ToolHunt (skip):** n8n, Activepieces, Automatisch, Plausible, Umami, NocoDB, Baserow, Teable, Grist, Nextcloud, Cloudreve, Docmost, Memos, Outline, SearXNG, Stirling-PDF, Flowise, Langflow, LiteLLM, Langfuse, Hindsight, Cognee, Executor, Convex, Dokploy, Arcane, Dockhand, UsulNet, Tugtainer, Termix, Chatto, Notifuse, Formbricks, Heyforms, LimeSurvey, RustFS, Zerobyte, Docker Core Monitor, Meetily, Ollama, LM Studio, AnythingLLM, MacWhisper, FluidVoice, Voicebox, ChatboxAI, DiffusionBee, Mochi Diffusion, and other mac/tools entries.

Priority is a rough “add next” score for ToolHunt fit (interesting, popular, clear alternativeTo, Docker-friendly).

---

## Fresh launches — just popped up (Jun–Jul 2026)

New or newly visible projects from r/selfhosted megathreads, X, and GitHub. Many are early (low stars / MVP) but look distinctive for ToolHunt.

### SUB/WAVE
| | |
| --- | --- |
| **What** | Personal internet radio: AI DJ over *your* Navidrome library (Icecast stream, no skip-button jukebox) |
| **Why interesting** | Top comment on r/selfhosted New Project Megathread (09 Jul 2026); ~600 stars; native iOS/Android players; Docker one-liner; very unique niche |
| **License** | MIT |
| **Alt to** | Spotify Radio / Apple Music radio (for owned libraries), commercial internet radio SaaS |
| **Category hint** | Productivity (media) — may need taxonomy stretch |
| **Site** | https://www.getsubwave.com/ |
| **GitHub** | https://github.com/perminder-klair/subwave |
| **Demo** | https://www.getsubwave.com/listen |
| **Deploy** | `docker compose up -d` or CLI installer |

### Shoutrrr (coolLabs)
| | |
| --- | --- |
| **What** | Self-hosted social media scheduler — write once, post to X, Bluesky, LinkedIn, Instagram, etc. |
| **Why interesting** | Brand-new coolLabs project (Andras Bacsai, Coolify author); one-command self-host; fills a catalog gap (no Buffer/Typefully alternative yet) |
| **License** | Open source (verify current SPDX on repo) |
| **Alt to** | Buffer, Typefully, Hootsuite |
| **Category hint** | Marketing / Productivity |
| **GitHub** | https://github.com/coollabsio/shoutrrr |
| **Note** | Name collides historically with a notification library; this is the *scheduler* app. Notifuse is already in catalog (email) — this is social. |

### Postiz
| | |
| --- | --- |
| **What** | Mature open-source AI-assisted social media scheduling platform |
| **Why interesting** | More complete than brand-new Shoutrrr; strong Docker story; active community |
| **License** | Apache-2.0 |
| **Alt to** | Buffer, Hootsuite, Later |
| **Site** | https://postiz.com/ |
| **GitHub** | https://github.com/gitroomhq/postiz-app |

### Riwaq
| | |
| --- | --- |
| **What** | Multi-tenant AI agent backend: RAG, private memory, self-learning from feedback, reminders, OpenAI-compatible API |
| **Why interesting** | Shipped on X Jul 2026; Docker-first; different angle from Hindsight/Cognee (ops-ready multi-org agents + learning loop) |
| **License** | Check repo (early project) |
| **Alt to** | Custom RAG backends, managed agent platforms |
| **Category hint** | AI Infrastructure |
| **GitHub** | https://github.com/fathah/riwaq |
| **Deploy** | `docker compose up --build` |

### Bytebot
| | |
| --- | --- |
| **What** | Self-hosted AI *desktop* agent — drives a containerized Linux GUI via natural language |
| **Why interesting** | Computer-use agents you own; Docker/Helm; stands out vs chat-only agents |
| **License** | Check repo |
| **Alt to** | Anthropic Computer Use / cloud agent sandboxes |
| **Category hint** | AI Development / AI Infrastructure |
| **GitHub** | https://github.com/bytebot-ai/bytebot |
| **Note** | Repo marked public archive in some indexes — verify still maintained before writing a full entry |

### Rybbit
| | |
| --- | --- |
| **What** | Privacy-friendly Google Analytics alternative with a modern UI |
| **Why interesting** | Complements Plausible/Umami already in catalog as another GA alternative with different UX |
| **License** | Open source |
| **Alt to** | Google Analytics, Mixpanel |
| **Category hint** | Analytics |
| **Site** | https://rybbit.com/docs (docs) |
| **GitHub** | https://github.com/rybbit-io/rybbit |

### HeadlessX
| | |
| --- | --- |
| **What** | Self-hosted browser automation / scraping platform (Camoufox, dashboard, MCP endpoint) |
| **Why interesting** | Agent-friendly scraping stack; MCP hook; anti-detection angle |
| **License** | MIT |
| **Alt to** | Browserless cloud, ScrapingBee |
| **Category hint** | Automation / AI Infrastructure |
| **GitHub** | https://github.com/saifyxpro/HeadlessX |

### QuokkaJot
| | |
| --- | --- |
| **What** | Feedback boards, roadmap, changelog — self-hosted on Cloudflare Workers + D1 |
| **Why interesting** | Fresh X launch (Jul 2026); edge-native, no external DB; Canny/UserJot gap |
| **License** | Open source |
| **Alt to** | Canny, UserJot, Featurebase |
| **Category hint** | Survey & Feedback / Productivity |
| **GitHub** | https://github.com/quokkajot/quokkajot |

### PageVault
| | |
| --- | --- |
| **What** | Self-hosted publisher for AI-generated HTML, Markdown, and infographics → shareable links |
| **Why interesting** | Brand-new (Jul 2026 X); useful companion for agent builders sharing artifacts |
| **License** | Open source (verify) |
| **Alt to** | Claude Artifacts hosting, simple gist/paste sites |
| **GitHub** | https://github.com/vdeng-ai/PageVault |

### Faro
| | |
| --- | --- |
| **What** | Open-source DNS control plane: observability, device insights, activity replay, blocklists, upstream benchmarks |
| **Why interesting** | Fresh Jul 2026 build; more “control plane” than classic Pi-hole |
| **License** | Open source |
| **Alt to** | Pi-hole, AdGuard Home, NextDNS |
| **GitHub** | https://github.com/derek-diaz/Faro |

### Craftplan
| | |
| --- | --- |
| **What** | Production / manufacturing management for small makers (inventory, POs, basic CRM) |
| **Why interesting** | Niche but real self-host business software; Docker multi-arch |
| **License** | Open source |
| **Alt to** | Craftybase, Katana, spreadsheets |
| **Site** | https://puemos.github.io/craftplan |
| **GitHub** | https://github.com/puemos/craftplan |

### Nightingale
| | |
| --- | --- |
| **What** | Self-hosted karaoke from your own music library, local ML, single binary |
| **Why interesting** | r/selfhosted Jul 2026; fun, free, no cloud |
| **License** | Free / open (verify on site) |
| **Alt to** | Smule, karaoke SaaS |
| **Site** | https://nightingale.cafe/ |

### Glance (plivo-labs)
| | |
| --- | --- |
| **What** | Open-source self-hosted “Claude artifacts” style interactive canvas |
| **Why interesting** | Trending on X Jul 2026; pairs with agent workflows |
| **License** | Open source |
| **Alt to** | Claude Artifacts |
| **GitHub** | https://github.com/plivo-labs/glance |

### VaaniEval
| | |
| --- | --- |
| **What** | Self-hosted QA / eval for voice agents (import calls, score with evidence) |
| **Why interesting** | Fresh Jul 2026; niche but fills Voice AI eval gap |
| **License** | Open source |
| **Alt to** | Proprietary contact-center QA tools |
| **Source** | X @shubhamofbce (Jul 2026) — track GitHub from author posts |

### OpenX Growth
| | |
| --- | --- |
| **What** | Self-hosted X/Twitter growth toolkit via official API (drafts, threads, analytics) — no handing credentials to SaaS |
| **Why interesting** | Jul 2026 OSS launch; privacy-minded growth tools niche |
| **License** | Open source |
| **Alt to** | Typefully analytics SaaS, various X growth SaaS |
| **Source** | X @dom_gag_96 — search GitHub “OpenX Growth” |

### bettermq
| | |
| --- | --- |
| **What** | HTTP messaging & scheduling with queues, flow control, pub/sub |
| **Why interesting** | Lightweight alternative to heavier queue stacks for small self-host apps |
| **License** | Open source |
| **Alt to** | CloudAMQP, managed Redis queues |
| **Site** | https://bettermq.com/ |

### Stift
| | |
| --- | --- |
| **What** | Auto-sync coding-agent sessions (Claude Code etc.) so laptop death doesn’t lose history |
| **Why interesting** | Jul 2026; OSS + optional cloud; developer pain point |
| **License** | Open source + paid cloud option |
| **Alt to** | Manual export, vendor-only history |
| **Site** | https://stift.sh |

---

## Priority A — strong catalog fits (established, still missing)

### Immich
| | |
| --- | --- |
| **What** | High-performance self-hosted photo & video library (Google Photos alternative) |
| **Why interesting** | ~100k+ GitHub stars; mobile apps; face recognition; timeline; constant r/selfhosted praise |
| **License** | AGPL-3.0 |
| **Alt to** | Google Photos, iCloud Photos, Amazon Photos |
| **Category hint** | File Storage / Productivity |
| **Site** | https://immich.app/ |
| **GitHub** | https://github.com/immich-app/immich |
| **Deploy** | Docker Compose (official) |

### Karakeep (formerly Hoarder)
| | |
| --- | --- |
| **What** | “Bookmark everything” app: links, notes, images + AI auto-tagging & full-text search |
| **Why interesting** | Frequently recommended as best self-hosted bookmark manager; Ollama-friendly |
| **License** | AGPL-3.0 |
| **Alt to** | Raindrop.io, Pocket, Omnivore, Linkwarden |
| **Category hint** | Productivity |
| **Site** | https://karakeep.app/ |
| **GitHub** | https://github.com/karakeep-app/karakeep |
| **Docs** | https://docs.karakeep.app/ |

### Plane
| | |
| --- | --- |
| **What** | Modern project management (issues, cycles, modules, Gantt, GitHub/GitLab links) |
| **Why interesting** | ~46k stars; Linear/Jira-style UX; unlimited seats on self-hosted CE; active on X/dev Twitter |
| **License** | AGPL-3.0 |
| **Alt to** | Jira, Linear, ClickUp, Asana |
| **Category hint** | Productivity / No-Code |
| **Site** | https://plane.so/ |
| **GitHub** | https://github.com/makeplane/plane |

### Vaultwarden
| | |
| --- | --- |
| **What** | Lightweight Bitwarden-compatible password manager server |
| **Why interesting** | Default “self-host first” pick; works with official Bitwarden clients; tiny footprint |
| **License** | AGPL-3.0 |
| **Alt to** | Bitwarden Cloud, 1Password, LastPass |
| **Category hint** | Productivity |
| **Site** | https://github.com/dani-garcia/vaultwarden |
| **GitHub** | https://github.com/dani-garcia/vaultwarden |

### Paperless-ngx
| | |
| --- | --- |
| **What** | Document management: OCR, tags, full-text search for scanned paperwork |
| **Why interesting** | Daily-driver for homelabs; scanner-to-searchable archive workflow |
| **License** | GPL-3.0 |
| **Alt to** | Evernote (docs), Google Drive “scan folders”, commercial DMS |
| **Category hint** | Document Tools / Productivity |
| **Site** | https://docs.paperless-ngx.com/ |
| **GitHub** | https://github.com/paperless-ngx/paperless-ngx |

### AppFlowy
| | |
| --- | --- |
| **What** | Local-first Notion-style workspace (docs, databases, boards, calendar) |
| **Why interesting** | ~60k stars; desktop + self-hosted cloud; strong privacy story |
| **License** | AGPL-3.0 |
| **Alt to** | Notion, Confluence |
| **Category hint** | Documentation / Productivity |
| **Site** | https://appflowy.com/ |
| **GitHub** | https://github.com/AppFlowy-IO/AppFlowy |

### Twenty CRM
| | |
| --- | --- |
| **What** | Modern open-source CRM (pipelines, custom objects, GraphQL API) |
| **Why interesting** | Clean UX; Salesforce/HubSpot alternative that feels current |
| **License** | AGPL-3.0 |
| **Alt to** | Salesforce, HubSpot |
| **Category hint** | Productivity / No-Code |
| **Site** | https://twenty.com/ |
| **GitHub** | https://github.com/twentyhq/twenty |

### Beszel
| | |
| --- | --- |
| **What** | Lightweight server & Docker monitoring dashboard |
| **Why interesting** | Simpler than full Grafana stack; GPU metrics; multi-node; homelab favorite |
| **License** | MIT |
| **Alt to** | Datadog (light), Netdata (lighter UX), basic Grafana |
| **Category hint** | Analytics / DevOps |
| **Site** | https://beszel.dev/ (or project README) |
| **GitHub** | https://github.com/henrygd/beszel |

### Uptime Kuma
| | |
| --- | --- |
| **What** | Beautiful self-hosted uptime monitoring & status pages |
| **Why interesting** | Extremely popular; easy Docker; multi-protocol checks |
| **License** | MIT |
| **Alt to** | UptimeRobot, Pingdom, Better Stack |
| **Category hint** | Analytics / DevOps |
| **Site** | https://uptime.kuma.pet/ |
| **GitHub** | https://github.com/louislam/uptime-kuma |

### Gatus
| | |
| --- | --- |
| **What** | Config-as-code uptime monitoring (GitOps-friendly) |
| **Why interesting** | Reddit “underrated vs Uptime Kuma”; YAML-driven; great for automated deploys |
| **License** | Apache-2.0 |
| **Alt to** | Uptime Kuma, healthchecks.io |
| **Category hint** | DevOps / Analytics |
| **GitHub** | https://github.com/TwiN/gatus |

---

## Priority B — solid & widely loved

### RustDesk
| | |
| --- | --- |
| **What** | Open-source remote desktop; self-hostable relay/ID server |
| **Alt to** | TeamViewer, AnyDesk, Chrome Remote Desktop |
| **License** | AGPL-3.0 |
| **Site** | https://rustdesk.com/ |
| **GitHub** | https://github.com/rustdesk/rustdesk |

### Jellyfin
| | |
| --- | --- |
| **What** | Free media server (movies, TV, music, live TV clients) |
| **Alt to** | Plex, Emby |
| **License** | GPL-2.0 |
| **Site** | https://jellyfin.org/ |
| **GitHub** | https://github.com/jellyfin/jellyfin |

### Audiobookshelf
| | |
| --- | --- |
| **What** | Self-hosted audiobook & podcast server with progress sync |
| **Alt to** | Audible library apps, Plex audiobooks |
| **License** | GPL-3.0 |
| **Site** | https://www.audiobookshelf.org/ |
| **GitHub** | https://github.com/advplyr/audiobookshelf |

### Home Assistant
| | |
| --- | --- |
| **What** | Smart-home hub: devices, automations, dashboards |
| **Alt to** | Google Home / Alexa cloud hubs (local control) |
| **License** | Apache-2.0 |
| **Site** | https://www.home-assistant.io/ |
| **GitHub** | https://github.com/home-assistant/core |

### Syncthing
| | |
| --- | --- |
| **What** | P2P continuous file sync (no central cloud required) |
| **Alt to** | Dropbox, Resilio, iCloud Drive (sync layer) |
| **License** | MPL-2.0 |
| **Site** | https://syncthing.net/ |
| **GitHub** | https://github.com/syncthing/syncthing |

### Forgejo
| | |
| --- | --- |
| **What** | Community-driven Git forge (Gitea hard fork) |
| **Alt to** | GitHub, GitLab, Bitbucket |
| **License** | MIT |
| **Site** | https://forgejo.org/ |
| **Code** | https://codeberg.org/forgejo/forgejo |

### Open WebUI
| | |
| --- | --- |
| **What** | ChatGPT-style UI for Ollama / OpenAI-compatible backends |
| **Alt to** | ChatGPT web UI, proprietary LLM frontends |
| **License** | BSD-3-Clause |
| **Site** | https://openwebui.com/ |
| **GitHub** | https://github.com/open-webui/open-webui |
| **Note** | Pairs well with existing Ollama (mac) + LiteLLM (sh) catalog entries |

### IT-Tools
| | |
| --- | --- |
| **What** | Collection of handy web utilities for developers (hash, converters, etc.) |
| **Alt to** | Various online “dev tools” SaaS sites |
| **License** | GPL-3.0 |
| **GitHub** | https://github.com/CorentinTh/it-tools |

### Blinko
| | |
| --- | --- |
| **What** | AI-powered self-hosted notes / knowledge base |
| **Alt to** | Notion notes, Reflect, Mem |
| **License** | MIT (verify current) |
| **GitHub** | https://github.com/blinkospace/blinko |
| **Mentioned on** | Reddit “favorite self-hosted 2025” threads |

### OpenObserve
| | |
| --- | --- |
| **What** | Logs, metrics, traces in one observability stack |
| **Alt to** | Datadog, Elastic + Grafana stack |
| **License** | AGPL-3.0 |
| **Site** | https://openobserve.ai/ |
| **GitHub** | https://github.com/openobserve/openobserve |

### ZITADEL
| | |
| --- | --- |
| **What** | Identity & access management (OIDC, SAML, multi-tenant) |
| **Alt to** | Auth0, Okta, Cognito |
| **License** | Apache-2.0 |
| **Site** | https://zitadel.com/ |
| **GitHub** | https://github.com/zitadel/zitadel |

### Excalidraw (self-hosted)
| | |
| --- | --- |
| **What** | Hand-drawn whiteboard / diagramming; optional collab server |
| **Alt to** | Miro, FigJam |
| **License** | MIT |
| **Site** | https://excalidraw.com/ |
| **GitHub** | https://github.com/excalidraw/excalidraw |

### AdGuard Home
| | |
| --- | --- |
| **What** | Network-wide DNS ad & tracker blocking |
| **Alt to** | Pi-hole, commercial DNS filters |
| **License** | GPL-3.0 |
| **Site** | https://adguard.com/adguard-home/overview.html |
| **GitHub** | https://github.com/AdguardTeam/AdGuardHome |

### Gotify
| | |
| --- | --- |
| **What** | Self-hosted push notification server (WebSocket + Android) |
| **Alt to** | Pushover, Firebase-only push for personal alerts |
| **License** | MIT |
| **Site** | https://gotify.net/ |
| **GitHub** | https://github.com/gotify/server |

### Mealie
| | |
| --- | --- |
| **What** | Recipe manager with shopping lists & meal planning |
| **Alt to** | Paprika, AnyList, commercial recipe apps |
| **License** | AGPL-3.0 |
| **Site** | https://mealie.io/ |
| **GitHub** | https://github.com/mealie-recipes/mealie |

### Actual Budget
| | |
| --- | --- |
| **What** | Local-first personal budgeting (YNAB-style envelope) |
| **Alt to** | YNAB, Mint |
| **License** | MIT |
| **Site** | https://actualbudget.org/ |
| **GitHub** | https://github.com/actualbudget/actual |

---

## Priority C — niche / solid extras

| Tool | One-liner | Alt to | Links |
| --- | --- | --- | --- |
| **Papra** | Lightweight document management (simpler Paperless) | Paperless-ngx (lighter) | https://github.com/papra-hq/papra |
| **BookLore** | Self-hosted ebook library (~9k stars; Reddit underrated) | Calibre-Web | Search GitHub “BookLore” |
| **Dawarich** | Self-hosted location history / Maps Timeline | Google Maps Timeline | https://github.com/Freika/dawarich |
| **copyparty** | Single-file / lightweight file server with rich web UI | simple HTTP file shares | https://github.com/9001/copyparty |
| **Rejourney** | Product analytics from session recordings | Hotjar / FullStory | https://github.com/rejourneyco/rejourney |
| **uptime-kita** | Smaller uptime + status pages | Uptime Kuma | https://github.com/syofyanzuhad/uptime-kita |
| **Listmonk** | High-performance self-hosted newsletters | Mailchimp, ConvertKit | https://listmonk.app/ · https://github.com/knadh/listmonk |
| **Mixpost** | Self-hosted social media management (Lite free) | Buffer, Hootsuite | https://mixpost.app/ |
| **Penpot** | Design & prototyping platform | Figma | https://penpot.app/ · https://github.com/penpot/penpot |
| **Stalwart** | Rust mail & collaboration server | Google Workspace mail | https://github.com/stalwartlabs/stalwart |
| **Mailcow** | Full mail stack (dockerized) | Microsoft 365 mail | https://github.com/mailcow/mailcow-dockerized |
| **Homarr / Homepage** | Homelab dashboards | custom start pages | Homarr / gethomepage |
| **ChangeDetection.io** | Website change monitoring | Visualping, Distill.io | https://github.com/dgtlmoon/changedetection.io |
| **NetBird** | WireGuard mesh / zero-trust network | Tailscale, ZeroTier | https://netbird.io/ |
| **Blocky** | YAML DNS ad blocker (GitOps) | Pi-hole, AdGuard | https://github.com/0xERR0R/blocky |
| **Technitium DNS** | Full-featured DNS server | Pi-hole | https://github.com/TechnitiumSoftware/DnsServer |
| **Navidrome** | Spotify-like music server (pairs with SUB/WAVE) | Spotify / YouTube Music | https://www.navidrome.org/ |
| **airi** (moeru-ai) | Self-hosted AI companion-style project (watch maturity) | character AI SaaS | https://github.com/moeru-ai/airi |
| **BillionMail** | Self-hosted mail-related project (verify scope/license) | hosted mail tools | https://github.com/aaPanel/BillionMail |

---

## Suggested ToolHunt add order

### Safe bets (mature, clear SEO alternatives)

1. **Immich** — Google Photos  
2. **Vaultwarden** — Bitwarden Cloud  
3. **Karakeep** — Raindrop / Pocket  
4. **Plane** — Jira / Linear  
5. **Paperless-ngx** — document DMS  
6. **AppFlowy** — Notion  
7. **Uptime Kuma** + **Beszel** — monitoring  
8. **Twenty** — Salesforce/HubSpot  
9. **Postiz** or **Shoutrrr** — Buffer (social scheduler gap)  
10. **Open WebUI** + **Jellyfin** — local AI UI + media  

### Fresh / distinctive (after safe bets)

11. **SUB/WAVE** — unique AI radio story; great blog/roundup material  
12. **Riwaq** — multi-tenant agent infra next to Hindsight/Cognee  
13. **HeadlessX** — scraping/MCP automation  
14. **QuokkaJot** — feedback boards (Survey & Feedback)  
15. **Rybbit** — another analytics angle next to Plausible/Umami  
16. **Nightingale** / **Glance** / **PageVault** — fun AI-adjacent utilities  

---

## Catalog gap map (vs current ToolHunt)

| Gap | Why it matters | Candidate |
| --- | --- | --- |
| Photos | Everyone asks; Immich is the default answer | Immich |
| Passwords | Homelab day-one app | Vaultwarden |
| Bookmarks | Not covered | Karakeep |
| PM / issues | No Jira/Linear alternative yet | Plane |
| Documents OCR | No paperless-style tool | Paperless-ngx |
| Notion workspace | Outline/Docmost are wiki-ish, not full Notion | AppFlowy |
| Social scheduling | Notifuse is email only | Postiz / Shoutrrr |
| Remote desktop | HopToDesk is Mac-side; no server product page | RustDesk |
| Media server | Nothing like Plex | Jellyfin + Navidrome |
| Agent “computer use” | Catalog has memory/gateways, not desktop agents | Bytebot (if maintained) |

---

## Notes for content writers

- Prefer tools with **Docker Compose** and a stable **checkItUrl** (project site or GitHub).
- Map `category` only to values in `src/data/categories.ts` (add taxonomy only if needed).
- `alternativeTo` should be a recognizable SaaS name (Google Photos, Notion, Jira, etc.).
- Confirm license is truly free for self-host (some projects have paid cloud; CE must remain usable offline).
- For **fresh launches**: re-check stars, last commit, and license before publishing — early MVPs churn fast.
- Do **not** re-add: Hindsight, Cognee, Executor, Chatto, Meetily, Langfuse, Flowise, Langflow, LiteLLM, Plausible, Umami, NocoDB, Docmost, Memos, Outline, n8n, Activepieces, Dokploy, Ollama, etc.

---

## Research links (indices)

- [Awesome-Selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted)
- [selfh.st apps](https://selfh.st/apps/)
- [r/selfhosted New Project Megathread (09 Jul 2026)](https://www.reddit.com/r/selfhosted/comments/1us4i8v/new_project_megathread_week_of_09_jul_2026/)
- [NetBird: 10 apps for 2026](https://netbird.io/knowledge-hub/10-self-hosted-apps-2026)
- [Open Source Alternatives: best self-hosted 2026](https://www.opensourcealternatives.to/blog/best-self-hosted-apps)
- [Pinggy: best self-hosted 2026](https://pinggy.io/blog/best_self_hosted_apps/)
- coolLabs Shoutrrr: https://github.com/coollabsio/shoutrrr
- SUB/WAVE: https://www.getsubwave.com/

---

*Living list — re-run research periodically; GitHub stars and project names change (e.g. Hoarder → Karakeep). Fresh-launch section should be re-scanned monthly from r/selfhosted megathreads + X.*

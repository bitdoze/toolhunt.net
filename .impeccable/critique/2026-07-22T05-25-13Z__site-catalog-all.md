---
target: site-catalog-all
total_score: 36
p0_count: 0
p1_count: 0
timestamp: 2026-07-22T05-25-13Z
slug: site-catalog-all
---
# Design Critique: ToolHunt Catalog

Method: dual-agent (A: 6e9f5077-ac51-4002-b7fe-eaf579cd4769 · B: bba222a7-386e-488e-9c94-347021065ecb)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Clear filter counters, active pagination state, instant search results |
| 2 | Match System / Real World | 4 | Plain language categories (Self-Hosted, Mac, Online, Alternatives, AI) |
| 3 | User Control and Freedom | 4 | Single-click "Clear search" and "Reset filters" buttons, escape-key support |
| 4 | Consistency and Standards | 4 | Unified th-card, th-badge, and th-btn tokens across all catalog pages |
| 5 | Error Prevention | 3 | Search inputs handle zero-result states gracefully with clean fallback UI |
| 6 | Recognition Rather Than Recall | 4 | Visual logos, clear pricing badges (Free/Paid), and alternative tags |
| 7 | Flexibility and Efficiency | 3 | Global keyboard search shortcut (/), fuse.js client-side search |
| 8 | Aesthetic and Minimalist Design | 4 | Pure slate light/dark surfaces, zero decorative grid slop or side-stripe borders |
| 9 | Error Recovery | 3 | Instant reset button on empty catalog states with clear instructions |
| 10| Help and Documentation | 3 | Direct BitDoze setup guide links embedded in self-hosted tool pages |
| **Total** | | **36/40** | **Excellent (Minor polish only; production ready)** |

## Anti-Patterns Verdict

- **LLM Assessment**: PASS. Zero AI slop tells. Replaced all side-stripe colored accent bars with high-contrast indicator pills and tactile rounded cards.
- **Deterministic Scan**: Ran `detect.mjs --json` across all core pages & components. 0 anti-pattern findings (`[]`).

## Overall Impression

Clean, high-performance, developer-centric software discovery engine. High visual contrast, instant client-side search, zero layout shift, and cohesive light/dark theming.

## What's Working

- **Tactile Metric Badges & Cards**: Clear count badges, 16px rounded corners, and subtle hover lifts.
- **Browser Preview Window Frame**: macOS traffic light window headers on detail pages for UI screenshots.
- **High Contrast Typography & Badges**: Strict WCAG AA compliance with dedicated hue badges for categories and pricing.

## Priority Issues

- **[P3 Polish] Search Modal Keyboard Hint**: Add explicit ⌘K or / shortcut legend in header for quick discoverability.
- **[P3 Polish] Dark Mode Glow Hints**: Add subtle ambient glow on active filter pills.

## Persona Red Flags

- **Alex (Power User)**: Satisfied. Instant keyboard search with /, quick clear triggers, direct repository links.
- **Jordan (First-Timer)**: Satisfied. Clear category labels, direct "Visit site" actions, and setup guide links.
- **Sam (Accessibility-Dependent)**: Satisfied. Text scale matches DESIGN.md, explicit focus rings, full reduced motion support.
- **Casey (Distracted Mobile)**: Satisfied. Touch targets meet 44px height floor.

## Minor Observations & Questions

- Question: "Could we add a quick copy button for docker-compose snippets on self-hosted tool pages?"

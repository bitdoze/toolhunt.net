---
name: "ToolHunt"
description: "High-speed catalog of self-hosted apps, online tools, Mac software, and alternatives"
colors:
  primary: "#2563eb"
  brand-green: "#16a34a"
  brand-purple: "#9333ea"
  brand-indigo: "#4f46e5"
  brand-pink: "#ec4899"
  dark-surface: "#0f172a"
  dark-page: "#020617"
  light-surface: "#ffffff"
  light-page: "#f8fafc"
  border-light: "#e2e8f0"
  border-dark: "#334155"
  text-muted: "#64748b"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.025em"
rounded:
  sm: "12px"
  md: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.light-surface}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.light-surface}"
    textColor: "#334155"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
---

# Design System: ToolHunt

## 1. Overview

**Creative North Star: "The Precision Observatory"**

ToolHunt's design system delivers crisp visual contrast, sharp typographic hierarchy, and fast technical surfaces optimized for rapid software discovery. Built for developers, sysadmins, and self-hosters scanning through catalogs of apps, the UI prioritizes clarity, search efficiency, and direct utility over decorative fluff.

The visual experience balances dark and light technical surfaces (`#020617` dark page / `#f8fafc` light page) with refined 1px slate borders, high text readability, and purposeful blue-tinted accents. Layouts feature clean container grids, structured filter chips, and interactive cards that react smoothly to user intent without layout shift.

### Key Characteristics:
- **High Information Density**: Structured content grid cards (`content-visibility: auto`) designed for fast scanning.
- **Crisp Technical Contrast**: Distinct light and dark modes with dedicated slate borders (`#e2e8f0` light, `#334155` dark).
- **Purposeful Micro-Interactions**: Subtle `translateY(-2px)` elevation lifts and border highlights on hover.
- **Zero-Slop Restraint**: Rejects heavy side-stripe borders, excessive text gradients, over-rounded 32px corners, and decorative background grid patterns.

## 2. Colors

The palette centers on a primary royal blue (`#2563eb`) carrying action emphasis, supported by distinct category accent colors (Green, Purple, Indigo, Pink) and neutral slate surfaces.

### Primary
- **Observatory Blue** (`#2563eb` / `var(--th-color-primary)`): Used for primary action buttons, search focus rings, active navigation items, and key interactive callouts. Reserved for ≤10% of any screen surface.

### Secondary
- **Self-Hosted Green** (`#16a34a`): Category identifier for self-hosted tools, setup guide status, and verified deployment badges.
- **Mac Utility Purple** (`#9333ea`): Category identifier for Mac applications and desktop software entries.
- **Online Tools Indigo** (`#4f46e5`): Category identifier for web services and online utilities.
- **Alternatives Pink** (`#ec4899`): Highlight color for software alternative mapping pages.

### Neutral
- **Light Surface / Page** (`#ffffff` / `#f8fafc`): Primary canvas for light mode. Clean off-white background with zero warm parchment tint.
- **Dark Surface / Page** (`#0f172a` / `#020617`): Deep slate navy canvas for dark mode providing rich contrast.
- **Slate Text** (`#0f172a` light / `#e2e8f0` dark): Crisp body and headline text maintaining ≥4.5:1 contrast against backgrounds.
- **Muted Slate** (`#64748b` light / `#94a3b8` dark): Secondary text, timestamps, and metadata tags.

### Named Rules
**The Single Voice Rule.** The primary blue accent carries interactive authority. Never mix multiple accent colors within a single button group or primary call-to-action.
**The True Neutral Rule.** Background neutrals use pure slate and deep navy hues. Warm cream/sand tints and low-contrast washed grays are strictly forbidden.

## 3. Typography

**Display Font:** Inter, system-ui, -apple-system, sans-serif
**Body Font:** Inter, system-ui, -apple-system, sans-serif
**Label/Mono Font:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace

**Character:** Clean, highly legible neutral grotesque sans-serif paired with crisp monospace elements for code snippets and terminal commands.

### Hierarchy
- **Display** (Bold 700, `clamp(2rem, 5vw, 3.5rem)`, line-height 1.1, tracking `-0.025em`): Used for page heroes and collection headers.
- **Headline** (SemiBold 600, `1.875rem` / `24px`, line-height 1.25, tracking `-0.02em`): Used for main section titles (`.th-section-title`).
- **Title** (SemiBold 600, `1.25rem` / `20px`, line-height 1.4, tracking `-0.015em`): Used for tool card titles and modal headers.
- **Body** (Regular 400, `1rem` / `16px`, line-height 1.6): Used for tool descriptions and documentation prose. Max line length strictly capped at 65–75ch.
- **Label** (SemiBold 600, `0.75rem` / `12px`, tracking `0.025em`): Used for pricing badges, category tags, and pill filters.

### Named Rules
**The Display Letter-Spacing Floor Rule.** Display headlines must never fall below `-0.03em` letter-spacing. Cramped typography with touching letters is forbidden.
**The Balanced Line Rule.** Headings H1–H3 must apply `text-wrap: balance` to prevent awkward line breaks and orphaned words.

## 4. Elevation

ToolHunt relies on structural 1px slate borders paired with light ambient drop shadows (`0 1px 2px rgb(15 23 42 / 0.05), 0 8px 24px rgb(15 23 42 / 0.04)`). Surfaces remain flat at rest, lifting slightly on interaction.

### Shadow Vocabulary
- **Card Rest** (`0 1px 2px rgb(15 23 42 / 0.05), 0 8px 24px rgb(15 23 42 / 0.04)`): Subtle ambient depth for cards and container panels.
- **Card Hover** (`0 1px 2px rgb(15 23 42 / 0.06), 0 14px 32px rgb(15 23 42 / 0.08)`): Interactive elevation lift applied alongside a `-2px` Y-translation.
- **Modal Overlay Backdrop** (`backdrop-filter: blur(8px)` + `rgba(15, 23, 42, 0.6)`): Clean focused backdrop for search dialogs and keyboard modals.

### Named Rules
**The Flat-By-Default Rule.** All cards and container panels are flat with structural 1px borders at rest. Shadows function purely as interactive feedback.
**The No-Ghost-Card Rule.** Never pair a 1px border with wide fuzzy drop shadows (>16px blur) on static elements. Choose either a solid border or a discrete shadow.

## 5. Components

### Buttons
- **Shape:** `12px` rounded corners (`var(--th-radius-sm)`).
- **Primary:** Background `#2563eb`, white text, `padding: 8px 16px`, font-weight 600. Hover transitions to `#1d4ed8`.
- **Secondary:** White background (`#0f172a` in dark mode) with 1px slate border, dark slate text.
- **Ghost:** Transparent background with subtle hover slate tint (`#f1f5f9` light / `#1e293b` dark).

### Chips & Filter Badges
- **Style:** Fully rounded pill (`9999px`), `padding: 2px 10px`, font-size `12px` font-weight 500.
- **Neutral Tag:** Light slate background (`#f1f5f9` light / `#1e293b` dark) with slate text.
- **Category Tags:** Tinted background matching category hue (Blue, Green, Purple, Indigo, Pink).

### Cards / Tool Container
- **Corner Style:** `16px` rounded corners (`var(--th-radius)`).
- **Background:** White surface (`#0f172a` in dark mode).
- **Border:** `1px solid var(--th-border)` (`#e2e8f0` light / `#334155` dark).
- **Hover Behavior:** `transform: translateY(-2px)`, border shifts to blue-tinted highlight.

### Inputs / Search Dialog
- **Style:** 1px slate border, white/dark slate background, 12px rounded radius.
- **Focus Ring:** 2px solid `#2563eb` with 2px offset (`:focus-visible`).

### Navigation Header
- **Style:** Sticky top nav with subtle glass backdrop (`backdrop-filter: blur(12px)`), slate border bottom, clean category link hierarchy.

## 6. Do's and Don'ts

### Do:
- **Do** maintain strict body text contrast (≥4.5:1) against both light and dark backgrounds.
- **Do** enforce 16px corner radius max for cards and 12px for buttons.
- **Do** use `text-wrap: balance` on headings and cap line lengths at 65–75ch for prose readability.
- **Do** keep display letter-spacing at or above `-0.03em`.
- **Do** include complete `@media (prefers-reduced-motion: reduce)` rules for all card transitions and hover states.

### Don't:
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on cards or callouts.
- **Don't** use gradient text (`background-clip: text`) or decorative background grid overlays.
- **Don't** use warm cream, sand, or parchment body backgrounds (`--paper`, `--cream`, `--sand`).
- **Don't** over-round container cards with 24px, 32px, or 40px corner radii.
- **Don't** add eyebrow section kickers or numbered `01 / 02 / 03` markers unless representing a true ordered sequence.
- **Don't** use hand-drawn / sketchy SVG illustrations or paper grain noise filters.

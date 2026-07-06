---
title: "Dusty - Free Open-Source Mac Cleaner"
publishedDate: 2026-07-06
logo: "/images/mac/dusty-logo.png"
uiImage: "/images/mac/dusty-ui.png"
description: "A free, open-source CleanMyMac alternative for macOS that reclaims disk space with preview-first, allowlist-only cleanup."
keyFeatures: [
  "Allowlist-only cleanup",
  "Preview paths before deleting",
  "Xcode and developer caches",
  "CLI and Shortcuts support",
  "No telemetry or account"
]
category: "Utilities"
pricing: "Free"
checkItUrl: "https://github.com/yagcioglutoprak/dusty"
---

Need to clear space on your Mac without handing a black box the keys to your
home folder? **Dusty** is a free, open-source macOS cleaner built around one
simple rule: it only deletes from a fixed allowlist, and it shows every path and
size before anything is removed.

Dusty lives in the menu bar and finds the usual disk-space offenders: app
caches, browser caches, logs, Xcode DerivedData, simulator leftovers,
package-manager caches, local Time Machine snapshots, old installers, opt-in AI
model folders, and stale project artifacts like old `node_modules`, Cargo
`target` dirs, and virtualenvs. Developer and Deep cleanups can move items to
the Trash first, and every action is written to a local JSON deletion log.

## Why You'll Love It
- **Transparent Cleanup**: See exact paths and sizes before deleting.
- **Strict Safety Model**: Documents, Desktop, Photos, Mail, iCloud Drive, and
  Keychains are off limits.
- **Developer Friendly**: Cleans Xcode, simulator, npm, yarn, pnpm, pip, uv,
  Bun, Deno, Cargo, Go, Homebrew, Gradle, CocoaPods, SwiftPM, Dart/Flutter,
  JetBrains, Unity, and Docker caches.
- **Scriptable**: The same engine ships as a `dusty` CLI and two macOS
  Shortcuts actions.
- **No Accounts**: No telemetry, no subscription, and no cloud service.

## What It Offers
- **Safe Level**: User caches, app logs, Trash, browser caches, and common app
  caches.
- **Developer Level**: Regenerable build and package-manager caches.
- **Deep Level**: Per-item review for installers, snapshots, old diagnostics,
  AI models, and stale project artifacts.
- **Undo Window**: Move items to Trash and undo recent cleanups.
- **Open Rules**: Cleanup targets are data in the public repository.

## Perfect For
- **Developers**: Reclaim space from build artifacts and package caches.
- **Mac Users**: Clean safely without a subscription cleaner.
- **Open-Source Fans**: Audit every cleanup rule before trusting it.
- **Automation Users**: Script cleanup through the CLI or Shortcuts.

## Get Started
1. **Install**: Run `brew install --cask yagcioglutoprak/tap/dusty`.
2. **Scan**: Open Dusty from the menu bar or run `dusty scan`.
3. **Review**: Inspect every target, path, and byte count.
4. **Clean**: Delete only the checked allowlisted items.

## System Requirements
- macOS 13.0 or higher
- Works on Intel and Apple Silicon Macs
- Full Disk Access is optional for a few Deep-level system diagnostic paths

# Nurture — Pregnancy & Lactation Companion
made for OBGYN Rotation final project.

A barebones pregnancy companion web app, lactation-first. The user enters a due date
(or current week); the app resolves their gestational age and serves
stage-appropriate content:

- **What you may be feeling** this week
- **Getting ready to breastfeed** — staged lactation prep (the core track)
- **Lactation FAQs** — searchable
- **When to call your provider** — pregnancy + breastfeeding red flags
- A **postpartum / newborn-feeding** view once the baby arrives

## Clinical sourcing rule

This app makes no medical claim from memory. Every piece of guidance must be
sourced from an authoritative body before it is displayed:

> ACOG · CDC · AAP · WHO · Office on Women's Health (womenshealth.gov) ·
> Academy of Breastfeeding Medicine

Until an item is sourced it renders a **"pending clinical sourcing"** badge
instead of placeholder text. Content lives in [`src/data/content.js`](src/data/content.js) —
to publish an item, fill its `detail`/`answer` and its `source` `{name, year, url}`.

## Stack

Vite + React + Tailwind CSS v4.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Status

- [x] Gestational-age engine (due date ⇄ week)
- [x] Stage-based content scaffold + UI
- [x] FAQ search, red-flag sections, postpartum toggle
- [ ] Fill clinical content from approved sources
- [ ] Deploy (GitHub Pages)
- [ ] Later: feeding/diaper log, kick counter, appointment timeline

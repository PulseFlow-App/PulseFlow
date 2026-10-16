# Pulse Flow

**The pulse of your rental operations.**

Pulse Flow is a workspace for short-term rental operations. It pulls properties, jobs, tasks, vendors, bills, and guests out of group chats into one place — so owners, managers, field staff, and guests each see their own part of the day, in their own language.

Bookings stay on Airbnb, Booking.com, or wherever you already take them. Pulse Flow covers what happens after the booking: who cleans, what broke, what it cost, and what the guest can see.

**Site:** [pulseflow.site](https://www.pulseflow.site)  
**App:** [app.pulseflow.site](https://app.pulseflow.site)

## Who it is for

| Role | What they get |
| --- | --- |
| **Owner** | Occupancy, urgent work, and spend by property — without chasing the team |
| **Manager** | Build the day once; hand the shift over with its full history |
| **Field staff** | Jobs on the phone, one-tap confirm, receipts from the site |
| **Guests** | House rules, deposit balance, and a direct line to the host |

Nobody configures permissions by hand. The role is the screen.

## What it does

- **Properties** — one list with status, map pin, stay dates, and a photo for everyone assigned
- **Jobs and vendors** — book cleaners and trades from a contact card; invite them to accept work in-app
- **Money** — attach costs to a property, approve bills, filter by period and category, export for your sheets
- **Guests** — share house rules, track deposits and deductions, let returning guests request dates without your personal number
- **Languages** — the manager writes in English, the cleaner reads Thai, the owner sees Hebrew; each person sets language once
- **Connect your agent** — owners and managers can chat with an agent in the app, or connect an external one from Settings (Pro)

## Plans

- **Personal** — free forever for one or two properties you run yourself
- **Company** — owner pays; managers, staff, and guests stay free (no per-seat charge)
- **Pro** — extra layer for Connect your agent (USD 19 / month on Company, USD 9 / month on Personal when billing is live)

Billing is not live yet. Every new account gets 3 months of full access, including Pro, from signup.

## Design system (Horizon)

All UI work (site and app) follows the **Horizon** design language:

- Bible for agents: [`DESIGN.md`](DESIGN.md)
- Master brief (presentation): [`docs/design-brief.html`](docs/design-brief.html)
- Cursor rule: `.cursor/rules/pulse-horizon-design.mdc` (always apply)

Palette: `#8ecae6` · `#219ebc` · `#023047` · `#ffb703` · `#f26a36` (main, logo)

## This repository

Marketing site for [pulseflow.site](https://www.pulseflow.site): static HTML, CSS, and JS, with locale trees under `en/`, `th/`, `my/`, `fr/`, `de/`, `es/`, `it/`, `tr/`, `he/`, `ar/`, and `ru/`. Edit English sources and `i18n/*.json`, then rebuild locales with:

```bash
python3 scripts/build-locale-sites.py
```

### Local preview

```bash
npx serve .
```

Open the printed URL (usually `http://localhost:3000`).

### Deploy to Vercel

1. Point this repo at the pulseflow.site Vercel project.
2. Framework preset: **Other**
3. Root Directory: empty (repo root)
4. Output Directory: empty / `.`
5. Clear any old `apps/web` or `dist` overrides.

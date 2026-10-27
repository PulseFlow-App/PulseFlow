# Keepio vs Pulse Flow — strengthen before they get louder

**Date:** 2026-10-27  
**Primary threat:** [Keepio](https://www.keepio.co/) · [@keepio_kpg](https://www.instagram.com/keepio_kpg/)  
**Secondary same-shape agency:** [Koh Keeper](https://kohkeeper.com/services)  
**Audience:** product + BD (internal)

---

## 1. Verdict

**Keepio is the best name-match** for “the competitor on Phangan” (Keep… / keepio_kpg). Same category caveat as Koh Keeper: they are a **full-service management agency**, not a Pulse-like SaaS app.

| | Keepio | Pulse Flow |
| --- | --- | --- |
| Business | Commission on rental revenue (~**15%** care / ~**20%** full listing+guest) | Software: Company **USD 15 / mo** + optional Pro **+USD 9** |
| Pitch | “System · technology · precision · no chaos · no random staff” | Your team, confirmed jobs, money trail, languages |
| Owner gets | Monthly financial statement + receipts; agency runs the day | Same-day status in-app; **owner keeps the team and the data** |
| Scope | Private villas **and** communal / village after handover | Company workspace for owners, managers, staff, guests |
| Status | Live agency + Instagram brand | Web app live; founding BD now |

**Owner decision we must win:**

> Pay Keepio **~15–20% of revenue** to “be the system,”  
> **or** keep manager/staff and make **Pulse** the system for **~USD 15 / mo**.

They sell *outsourcing the system*. We sell *owning the system*. Product work below exists to make that sentence feel true in a 15-minute demo.

---

## 2. Keepio’s public wedge (steal the language, not the business)

What their site/marketing stresses (paraphrased from keepio.co public copy):

| Keepio claim | Why it lands | Pulse counter (must be true in product) |
| --- | --- | --- |
| **“System / technology / no chaos”** | Sounds like software; owners hate WhatsApp | Pulse *is* the system. Agency is people + WhatsApp + a monthly PDF. Show the job trail live. |
| **“No random staff”** | Fear of unreliable cleaners | Staff **accept** jobs; trail shows who. Vendors stay on the property record. |
| **Monthly financial statement** with income, expenses, balances, itemized emergency fund + receipts | Remote-owner trust | We don’t take booking money. We **must** own ops spend: by property, receipt photos, month export that can sit next to their bank statement. |
| **15% transparent / 20% full package** | “Only pay when we earn” feels fair | Math the cut: on ฿100k/mo rental, **15% = ฿15k**; Pulse Company ≈ **฿500**. Control is cheaper if the app is trustworthy. |
| **Communal / village management** | Developers + multi-unit after handover | Don’t chase HOA. Chase **operators who already have staff** and hate chat. |
| **Marketing + bookings + pricing** | Calendar fill | Out of scope. Channels stay Airbnb/Booking. We win **after** the booking. |
| **Phangan is our home** | Body on the island | Never pretend we are on-site. Win day-to-day proof so they don’t need an agency for *visibility*. |

**Do not trash-talk by name in outreach.** Win the category: *system you own* vs *system you rent at 15%*.

---

## 3. Category map (Keepio field vs ours)

| Job | Keepio | Pulse |
| --- | --- | --- |
| Fill calendar / dynamic pricing / OTA inbox | Core | Out of scope |
| Listing photos, marketing, guest acquisition | Core | Out of scope |
| On-island body / communal grounds | Core | Not us |
| “The system” for daily work | Claimed in marketing | **Must be undeniable in product** |
| Confirmed jobs / staff accept | Human process inside agency | Core product |
| Receipts + spend by property | Monthly statement promise | Core product — live, not month-end only |
| Owner sees “is Coral done?” today | WhatsApp / monthly pack | Live job trail |
| Multi-language team (TH / HE / EN…) | Unclear | Core |
| Owner keeps team + data | Low (outsourced) | High |
| Cost at ฿100k rental month | ~฿15–20k commission | ~USD 15 software |

**Win condition:** owners and managers who want Keepio’s *feeling of control* without Keepio’s *cut*. Also: local managers who refuse to become a Keepio-style black box for the owner.

---

## 4. Strengthen Pulse against Keepio’s exact promises

Six bars. Keepio’s brand is “system.” If any bar feels soft, their marketing wins the first call.

| # | Harden | Keepio claim it breaks | Status | Highest-leverage gap |
| --- | --- | --- | --- | --- |
| 1 | **Owner home** = urgent / done / **spend this week** | Monthly statement as only clarity | Shipped | Spend this week card on home → Bills |
| 2 | **Job trail as evidence** — accept → **on site** → done → receipt | “No chaos / no random staff” | Shipped | `on_site_at` + timeline + staff “On site” (migration `056`) |
| 3 | **Money export** that can sit beside their monthly PDF | Itemized expenses + receipts | Shipped | Reports → Print money trail (Save as PDF) |
| 4 | **Cleaner path** — invite → browser → **Thai** → one tap | They absorb housekeeping into 15–20% | Improved | Thai join / progress / agree / done filled in |
| 5 | **Turnover from `.ics` + manager day view** | They sell seamless ops around bookings | Improved | Checkout day → Book turnover (contacts prefill) |
| 6 | **Server-side notifies** for remote owners | “Message us on WhatsApp / we report monthly” | Improved | Cron `/api/cron/schedule-alerts` + on-site push (`CRON_SECRET`) |

### How to demo against Keepio (script)

1. Open owner home — “This is your system. Not a monthly email.”  
2. Open one job trail — accept → on site → done → 800 THB receipt. “No random staff: named, timestamped.”  
3. Open bills for Coral this month — export. “Same transparency as an agency statement, without 15%.”  
4. Staff phone (Thai) — invite link, accept, done, photo. “Your cleaner is the system, not a black box.”  
5. Math: their villa’s rough monthly rent × 15% vs USD 15. “Pay for software, keep the margin and the team.”

### Supporting (still matters)

- Property briefing managers open (codes, Wi-Fi, guest-safe vs internal)  
- Onboard under 10 minutes: invite manager → 1 villa → 1 job  
- Hebrew owner + Thai staff path polished  
- PWA home screen; calendar add on accept  
- Connect your agent: “What did we spend on Coral this month?” (Pro)

### Do **not** rush (Keepio’s revenue model)

- Full Airbnb/Booking channel APIs  
- Dynamic pricing  
- Direct-booking villa websites  
- Communal / HOA / village management  
- Becoming the on-island body  

Copying those makes us a worse agency. Stay the system owners keep when they say no to 15%.

---

## 5. Positioning lines (Keepio-first)

| They say | We say |
| --- | --- |
| Keepio has a system / technology | Pulse **is** the system — jobs, receipts, languages. An agency is a team you rent. |
| No chaos, no random staff | Staff **accept** in-app. You see who, when, what it cost. Chaos leaves the chat. |
| 15% is fair / only when we earn | On real rent, 15% is thousands of baht. Company is **USD 15 / mo**. Keep the cut. |
| I get a clear monthly statement | You get that **and** same-day status. Money trail is live, not only month-end. |
| They handle everything | If you want zero involvement, hire an agency. If you want **control**, keep your people + Pulse. |
| They manage the village / communal | Different job. We run **your company’s** properties, jobs, and spend. |
| Can you fill my calendar? | No. Bookings stay on Airbnb/Booking. We run what happens **after** the booking. |
| My manager already uses WhatsApp with me | That’s the problem Keepio sells against. Pulse makes the manager **provable** without giving away 15%. |

**Category line (use this):**  
Keepio sells management for a share of revenue. Pulse Flow sells the ops system so **your** manager and cleaners stay yours. Same island. Different deal.

**Cost line (use this):**  
Agency ~15–20% of rent. Pulse Company USD 15 / mo when billing is live (10 seats, then USD 2 / seat). Billing not live → 3 months full access now.

---

## 6. Two-month checklist (Keepio window)

| Week | Focus | Done when an owner who’s seen Keepio says |
| --- | --- | --- |
| 1–2 | Owner home (spend) + job trail (**on site**) + month money export | “This is clearer than a monthly PDF.” |
| 2–3 | Cleaner Thai path end-to-end | “My cleaner can do this without Keepio.” |
| 3–4 | `.ics` → turnover job + manager day view | “I don’t need them for the daily rhythm.” |
| 4–6 | Server-side notifies + Hebrew owner + agent spend question | “I can stay abroad and still see the day.” |
| Ongoing | Founding 10 companies on Pulse | Local density before agency brand noise |

---

## 7. Koh Keeper (secondary)

Same shape: Phangan agency, ~15% full management, digital package 5–7% for owners who keep a team. Less “system/technology” branding than Keepio; more hotelier / Tristan-on-island. Product bars above still apply. Digital-only package = opening for Pulse as the team workspace under a marketing agency.

---

## 8. Open questions / tracking

1. Confirm: was “competitor in ~2 months” **Keepio** brand scale-up, or a separate **software** launch?  
2. Any Keepio prospects also talking to us? Capture objections verbatim.  
3. Watch for Keepio shipping a real owner portal/app — if they do, re-score §4 weekly.  
4. **[@keepio_kpg](https://www.instagram.com/keepio_kpg/)** (2026-10-27 logged-out): ~**212** followers, **8** following. **Date joined** needs IG app → About this account (blocked logged-out). Specialist brief: `docs/phangan-marketing-specialist-offer.md` §3b.  
5. **keepio.co** availability: our checks saw **500** / **403** while search still indexed content — likely **marketing site not reliably live**, not a working SaaS. Re-check from Phangan network and note dates.  
6. Koh Keeper brand Instagram still unconfirmed; related KUUL / founder handles to find.

---

## 9. Bottom line

Keepio’s strength is **sounding like a system** while charging **agency economics**. Strengthen Pulse until “system” is something the owner **opens on their phone**, not something they **rent for 15%**.

If we cannot win: *“Coral — done, who, how much — today, in Thai for staff and Hebrew for me, for USD 15 not 15%”* — Keepio wins the owner by default.

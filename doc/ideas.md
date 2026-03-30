# Mothertrucking Apps — Ideas & Story Log

_Running log of conversations, decisions, and direction. Not a plan, not a spec — just thinking out loud._

---

## The motto

**Fluff Around and Find Out.**

We learn by failure. Build fast, figure it out, address the actual issue. NZ-polite version of FAFO — but that's exactly what it is.

---

## The brand DNA

- Heavy metal aesthetic. The logo has dots above the O — a deliberate nod to Motörhead and Blue Öyster Cult. Truckers and metal. Makes sense.
- Built on the front line in NZ. Rescue workers. Crane operators. Real people with real problems.
- Not a pivot — an evolution. Fleet Management → Software → Apps. The name follows the understanding.
- Could only have been forged here. NZ-scale means you actually talk to the people doing the work.

---

## The ecosystem

**lowcode.co.nz**
Enterprise software studio. Builds whatever gets the job done — lowcode, custom, doesn't matter. Connects to PLCs, data lakes, CRMs, Epicor. Michelin is a client — production-use audit trails for their manufacturing plant. This is the commercial engine and the domain credibility.

**Mothertrucking Apps**
Product studio. A platform for side-projects that become real products. Like a game studio, or a band, but for apps — they own the IP. Unique network, unique insights. Born from working in the transport/lifting sector.

**geomarqr.com** (formerly RhRn — Right Here Right Now)
First real product out of Mothertrucking Apps. Crowdsourced, real-time geotagged photo reporting — for emergency services, insurance, disaster response. The hard constraint: **it needs to work when nothing else does.** Renamed because the original name was too long and already taken.

**The original Mother Trucking product**
Built with crane companies (McLeod Cranes, Gisborne Hiabs, Lift N Shift). Tried to solve every problem in the lifting/shifting sector. That was the education — learned what stuck, what was hard, what was worth a dedicated product. The original product is how the domain knowledge was earned.

**Merch**
Who doesn't want Mothertrucking swag. People love it. The brand plays into a heavy metal theme — the logo's umlauts are a direct nod to Motörhead and Blue Öyster Cult.

---

## Key people

**Scott (McLeod Cranes)** — huge tinkerer, mentor to Jason. Ex-database engineer, navy, Salesforce background. The kind of person who makes you build better things.

---

## Industry partners

- Michelin (production — PLC, data lake, CRM, Epicor integration)
- Crane Association of NZ
- McLeod Cranes
- Gisborne Hiabs
- Lift N Shift

---

## Awards

- **People's Choice Award** + **HTK Group te Puawai Award** — Electrify C1 2023 (Ministry of Awesome + Callaghan Innovation, Christchurch)
- **People's Choice Award** — Rise Up 2023 (Soda Inc. + Callaghan Innovation, Hamilton)

Still worth featuring. Won those awards, gained traction, used that to build out the "shotgun" — the broader portfolio.

---

## Who visits the site

Three audiences, different needs, same site:

1. **People they might hire** — the site is a culture signal. Who are these people? Would I want to work here?
2. **People trying to understand the company** — investors, collaborators, journalists, curious people. Is this real? What have they actually built?
3. **Clients of Mother Trucking / Geomarqr** — does this company know what they're doing? Can I trust them?

Cosymbiosis. They all read the same page but take different things from it.

---

## The story / narrative

**Evolution, not pivot.**
Started as Mothertrucking Fleet Management. Then Mothertrucking Software. Now Mothertrucking Apps. The name follows the understanding — each version is a more honest description of what it actually is.

**Forged in NZ, on the front line.**
You can't build software for rescue workers and crane operators by reading about them. You have to be there. NZ-scale forces that — you actually talk to the people doing the work, not their procurement department.

**The moat: domain knowledge.**
Most software people don't know what a HIAB is. These people do. That's not a credential — it's a way of seeing problems that other studios miss.

**FAFO methodology.**
We don't over-plan. We build fast, get it in front of real people, and address the actual issue. The original Mother Trucking product was the FAFO — tried to solve everything, found out what stuck. Geomarqr is what survived that filter.

**Open domain.**
Transport is home base. But if someone in another industry wants to let us fluff around and find out — that's a conversation. The methodology travels.

---

## Geomarqr key insight

"Technically hard due to needing to work when nothing else does."

This is the line. Emergency services, disaster zones, field workers — they don't have reliable connectivity. Most apps assume the internet exists. Geomarqr is built for when it doesn't. That's the hard problem.

---

## Tech decisions

- **Static site generator:** Astro
- **Styling:** Hand-written SCSS, custom design system (no Tailwind, no UI kit)
- **SCSS methodology:** Variables/tokens → component-scoped styles. Variables auto-injected into all components via Vite `additionalData`.
- **Hosting:** GitHub Pages, custom domain `mothertrucking.co.nz`, deploy via GitHub Actions
- **Font:** Ubuntu (Google Fonts)
- **Icons:** Font Awesome (duotone kit)

---

## Page structure (locked)

| Page | URL | Notes |
|------|-----|-------|
| Home | `/` | Studio identity, FAFO, signpost to everything |
| Story | `/story` | Evolution, NZ origin, how we work, Scott, awards |
| Geomarqr | `/geomarqr` | Mini page — teaser + sends people to geomarqr.com |
| Enterprise | `/enterprise` | Mini page, reinforces lowcode.co.nz SEO, sends people there |
| Merch | `/merch` | Shopify Buy Button embed — Shopify manages products, JS snippet in static page |
| Work with us | `/work` | "Always keen to listen to people in the industry" — passive/open, not active hiring |

## Decisions

- **Merch:** Shopify Buy Button. Static-site compatible — Shopify handles cart + checkout via JS embed. No backend needed.
- **Enterprise:** Mini page only. Purpose is SEO reinforcement for lowcode.co.nz, not a full pitch.
- **Geomarqr:** Mini page, same pattern as Enterprise. Teaser content, sends people to geomarqr.com. Keeps SEO juice flowing to the product's own domain.
- **Hiring:** Passive. Not "we're hiring", more "if you're in the industry and interesting, let's talk."

## Open questions

- OG image / social card — what visual represents the brand?
- Shopify store — needs to be set up before merch page can go live (Buy Button snippet comes from Shopify dashboard)

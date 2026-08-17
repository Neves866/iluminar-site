# AGENTS.md

## What this repo is

Static multi-page company site for Iluminar (electrical, HVAC, security, home automation) in Cascavel, PR, Brazil. Deployed on **GitHub Pages** at `iluminarcvel.com.br`. Content is in **pt-BR**.

No build tools, no package manager, no bundler, no framework. Pure HTML + CSS + JS.

## Structure

```
index.html                          # Home page
higienizacao/index.html             # AC cleaning
instalacao/index.html               # AC installation/sales
instalacoes-eletricas/index.html    # Electrical work
seguranca-eletronica/index.html     # Security systems
automacao/index.html                # Home automation (AUTOC partnership)
iluminar-360/index.html             # Membership club
equipamentos/0001-0003/index.html   # Equipment reports (noindex)
assets/css/                         # site.css (global), autoc.css, carousel.css, home-i360.css, iluminar360.css, service-showcase.css
assets/js/                          # menu.js, carousel.js, aurora.js, iluminar360.js
assets/images/                      # WebP service images, JPEG photos, PNG logos/products
```

## Deploy

Push to `main` deploys to GitHub Pages automatically. No CI pipeline, no build step.

## Maintenance gotchas

- **Header, footer, and side-menu are copy-pasted in every HTML file.** Any change to navigation or layout must be applied to all 7+ HTML files manually.
- **`equipamentos/` reports have ~320 lines of inline CSS each** (triplicated). Use `assets/css/` for shared styles.
- **`aurora.js` imports OGL from CDN** (`cdn.jsdelivr.net`). Gracefully degrades on failure or `prefers-reduced-motion`.
- **`automacao/` uses a different font** (Cormorant Garamond) and its own palette — it's intentionally distinct for the AUTOC partnership.
- The canonical phone number is `(45) 98842-9228`. Ensure any WhatsApp links use `5545988429228`.

## Audit

`AUDITORIA-ILUMINAR.md` is a comprehensive audit (dated 07/08/2026) with prioritized fixes. Many items from Phases 1–3 appear already resolved (OG tags, favicon, Schema.org, skip link, focus trap, WhatsApp SVG icon). Verify against the audit before re-fixing anything.

## Language

All user-facing content is Brazilian Portuguese. Write new copy in pt-BR. Code comments may be in Portuguese or English — follow the surrounding file's convention.

# KUMO Bakery Website ☁️

A cute, animated, mobile-first responsive website for **KUMO Bakery** — tagline **#FOLLOWTHECLOUD**.

Built with plain HTML, Tailwind CSS (via CDN), vanilla JavaScript, and custom CSS keyframe animations. No build step required — it's a static site, so it deploys straight to Vercel or Netlify.

## Project structure

```
KUMO/
├── index.html          # All page sections (hero, menu, about, contact, pre-order form, footer)
├── css/
│   └── style.css        # Custom keyframe animations (floating clouds, bounce, fade-in, hover lift)
├── js/
│   └── script.js         # Mobile nav toggle, scroll fade-in, WhatsApp pre-order form logic
├── assets/                # favicon + generated decorative cookie cutouts
└── README.md
```

## Features

- **Hero section** with floating cloud SVGs (slow, gentle drift), KUMO logo mark, and the #FOLLOWTHECLOUD tagline.
- **Menu section** with exact pricing, cards that lift + scale gently on hover.
- **Wavy divider lines** (SVG) between sections, echoing the wavy lines on the physical menu board.
- **About Us** section with a short brand story.
- **Contact section** with a WhatsApp click-to-chat link, plus Facebook & Instagram icon links.
- **Pre-order inquiry form** (Name, Item, Quantity, Pickup Date) — on submit, it opens WhatsApp with a prefilled message so orders land directly in your chat, no backend needed.
- **Footer allergen disclaimer** with the exact required wording.
- **Scroll fade-in animations** for every section via `IntersectionObserver`.
- Respects `prefers-reduced-motion` — animations are disabled for users who have that OS setting on.
- Fully responsive, mobile-first, with a hamburger nav on small screens.

## Contact links

WhatsApp is wired to `https://wa.me/23059160168` — Mauritius country code (`+230`) plus the local number `5916 0168`. If the number ever changes, update it in two places:
   - [index.html](index.html): search for `wa.me/23059160168` (2 occurrences — Contact section and footer icon).
   - [js/script.js](js/script.js): the `WHATSAPP_NUMBER` constant near the top, used by the pre-order form.

Facebook (`facebook.com/kumo.mru`) and Instagram (`instagram.com/kumo_mu`) links are already wired up in the Contact section and footer.

## Time-sensitive content

The **Events** section (`<section id="events">` in [index.html](index.html)) promotes a specific pop-up: Fri Jul 31 - Sun Aug 2 at Bakers' Market, Riche Terre Mall. Update the dates/location for the next event, or remove the section entirely, once that weekend has passed — otherwise the site will advertise an outdated event.

## After deploying to Vercel/Netlify

Add an `og:url` meta tag in the `<head>` of [index.html](index.html) pointing at your live domain (e.g. `<meta property="og:url" content="https://your-domain.com" />`). It's omitted for now since the domain isn't known until you deploy — without it, link previews (WhatsApp, Facebook, etc.) still work but won't canonicalize to your real URL.

## Customization

- **Colors**: edit the `tailwind.config` block at the top of `index.html` (`sage`, `brown`, `cream` color scales).
- **Font**: currently [Fredoka](https://fonts.google.com/specimen/Fredoka) from Google Fonts — swap the `<link>` tags and `fontFamily.fredoka` in the Tailwind config to change it.
- **Menu items/prices**: edit the cards inside `<section id="menu">` in `index.html`, and keep the `<select id="item">` options in the pre-order form in sync.
- **Logo**: the KUMO mark is an inline SVG cloud shape (no image file needed) — replace it with your own logo file in `assets/` if you have one.
- **Menu photos**: each menu card currently hotlinks a free stock photo (Unsplash/Pexels, no attribution required) as a stand-in for real product photos. Swap these out with your own photos of KUMO's actual bakes as soon as you have them — real photos will convert far better than stock ones. To replace: save your photo into `assets/`, then update the matching `<img src="...">` in the `<section id="menu">` cards.

## Running locally

No build step needed. Just open `index.html` in a browser, or serve it locally:

```bash
# Option 1: just open the file
open index.html

# Option 2: serve with a local static server (recommended, avoids some browser file:// quirks)
npx serve .
# or
python3 -m http.server 8000
```

---

## Deployment Guide

### Deploy to Netlify

**Option A — Drag & drop (fastest):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `KUMO` project folder onto the page.
3. Netlify instantly builds a live URL. Done.

**Option B — Git-based (recommended for ongoing updates):**
1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. In Netlify: **Add new site → Import an existing project** → connect your repo.
3. Build settings:
   - **Build command**: leave blank (static site, no build step)
   - **Publish directory**: `.` (project root, since `index.html` is at the root)
4. Click **Deploy site**. Netlify redeploys automatically on every push.

### Deploy to Vercel

**Option A — Vercel CLI:**
```bash
npm install -g vercel
cd "KUMO"
vercel
```
Follow the prompts (accept defaults — it will detect a static site automatically). Run `vercel --prod` to promote to production.

**Option B — Git-based:**
1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. In Vercel: **Add New → Project** → import your repo.
3. Framework preset: **Other** (static HTML).
   - **Build command**: leave blank
   - **Output directory**: `.` (root)
4. Click **Deploy**. Vercel redeploys automatically on every push.

### Custom domain

Both Netlify and Vercel let you attach a custom domain (e.g. `kumobakery.com`) for free under **Site settings / Project settings → Domains** — just point your domain's DNS records (usually a CNAME or A record) as instructed by whichever platform you choose.

---

## Allergen Disclaimer (footer, verbatim)

> Our products are crafted in a kitchen that handles common allergens. All KUMO products may contain traces of, or have come into contact with nuts, peanuts, eggs, milk, wheat gluten and soy.

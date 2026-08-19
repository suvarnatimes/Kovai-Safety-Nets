# Kovai Safety Nets — Deployment Guide

## Quick Start

```bash
cd "kovai-safety-nets"
npm install
npm run build    # Builds + generates sitemap/robots.txt
```

The `npm run build` command runs `next build` followed automatically by `next-sitemap`, which produces:
- `public/sitemap.xml` — XML sitemap for all pages
- `public/robots.txt` — robots.txt with sitemap URL

---

## Pre-Deployment Checklist

### 1. Update Your Domain

In `next-sitemap.config.js`, update `siteUrl`:
```js
siteUrl: "https://kovaisafetynets.com",  // ← Replace with your actual domain
```

### 2. Set Up Google Analytics 4

In `app/layout.tsx`, replace `G-XXXXXXXXXX` with your real GA4 Measurement ID:
```tsx
src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"
// and in the init script:
gtag('config', 'G-YOUR-ID', ...);
```

### 3. Set Up the Contact Form

In `components/ui/LeadForm.tsx`, replace the Formspree action URL:
```tsx
action="https://formspree.io/f/YOUR_FORM_ID"
```
Sign up free at **[formspree.io](https://formspree.io)**, create a form, and paste your form ID.

### 4. Google Search Console

After deployment, verify your domain in Google Search Console and submit your sitemap URL:
```
https://kovaisafetynets.com/sitemap.xml
```

---

## Option A: Deploy to Vercel (Recommended)

Vercel provides zero-config Next.js hosting with automatic builds.

### Steps:
1. Push your code to GitHub/GitLab
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repository
4. Vercel auto-detects Next.js — click **Deploy**

### Environment Variables on Vercel:
```
SITE_URL=https://kovaisafetynets.com
```

### Custom Domain on Vercel:
1. Go to **Settings → Domains**
2. Add `kovaisafetynets.com`
3. Update DNS records as instructed by Vercel

### Vercel Benefits for This Project:
- Automatic image optimization (WebP conversion) — our `next.config.ts` uses `unoptimized: true` for static export, but on Vercel you can **remove the `output: "export"` line** and use Vercel's built-in image optimization instead
- Automatic HTTPS
- Edge CDN for fast LCP

---

## Option B: Deploy to Netlify

### Steps:
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → Add New Site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `out`
5. Click **Deploy Site**

> **Note:** For Netlify with `output: "export"`, the `out/` directory is the static output. All pages will be pre-generated as `.html` files.

### Netlify Environment Variables:
Go to **Site Settings → Build & Deploy → Environment**:
```
SITE_URL=https://kovaisafetynets.com
```

### Netlify `_redirects` file (already handled by static export):
Create `public/_redirects`:
```
/* /404/index.html 404
```

---

## Option C: Self-Hosted Static (Apache/Nginx)

Since we use `output: "export"`, the build produces a fully static `out/` directory.

```bash
npm run build
# Upload the contents of 'out/' to your web server
```

**Nginx config example:**
```nginx
server {
    listen 443 ssl;
    server_name kovaisafetynets.com;
    root /var/www/kovaisafetynets;
    index index.html;
    
    # Handle Next.js trailing slash pages
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
    
    # Custom 404
    error_page 404 /404/index.html;
}
```

---

## Post-Deployment SEO Verification

### Verify Server-Rendered HTML (The SSR Checklist)

For each page listed below, use `curl` or **View Page Source** (Ctrl+U) in browser — NOT browser DevTools — to confirm the content is in the initial HTML:

| Page | URL | What to check in source |
|------|-----|--------------------------|
| Home | `/` | `<h1>Protect What Matters Most` |
| About | `/about/` | `<h1>About Kovai Safety Nets` |
| Service (Balcony) | `/services/balcony-safety-nets/` | `<h1>Balcony Safety Nets` + FAQ content |
| Service (Pet) | `/services/pet-safety-nets/` | Pet net description, FAQ |
| Location (RS Puram) | `/locations/rs-puram/` | RS Puram content |
| Gallery | `/gallery/` | Image grid alt tags |
| Testimonials | `/testimonials/` | Review text, author names |
| Contact | `/contact/` | Phone number, form labels |
| Blog | `/blog/` | Blog post titles |
| 404 | `/non-existent-page/` | Call Now button |

**Shell command to verify:**
```bash
curl -s https://kovaisafetynets.com/ | grep -c "Protect What Matters Most"
# Should return: 1
curl -s https://kovaisafetynets.com/services/balcony-safety-nets/ | grep -c "application/ld+json"
# Should return: 2 (Service schema + FAQPage schema)
```

### Verify Schemata
Use Google's Rich Results Test:
```
https://search.google.com/test/rich-results?url=https://kovaisafetynets.com/services/balcony-safety-nets/
```
Should detect: **FAQPage** and **LocalBusiness**

### Verify Sitemap
```
https://kovaisafetynets.com/sitemap.xml
```
Should list all 30+ pages (11 services + 10 locations + home + about + gallery + testimonials + contact + blog + blog posts)

---

## GA4 Conversion Events

The following events are pre-configured and fired via `window.gtag()`:

| Event | Trigger | Label |
|-------|---------|-------|
| `click_to_call` | Call button click | `header_phone`, `mobile_bottom_bar` |
| `whatsapp_click` | WhatsApp button click | `header_whatsapp`, `mobile_bottom_bar` |
| `form_submit` | Form submission | Set up in GA4 UI or via Formspree webhook |

In GA4, mark `click_to_call` and `whatsapp_click` as **Conversions**.

---

## Core Web Vitals Targets

| Metric | Target | How We Achieve It |
|--------|--------|-------------------|
| LCP | < 2.5s | Hero image with `priority`, static HTML |
| FID/INP | < 100ms | Minimal client JS (`use client` only where needed) |
| CLS | < 0.1 | Fixed image dimensions in all `<Image>` components |

---

## Replacing Placeholder Images

The current service images are AI-generated. To replace with your real photos:
1. Save your photos as `.webp` format (use `cwebp` or Squoosh)
2. Place in `public/images/services/` with the exact filenames listed in `lib/services.ts`
3. Add the OG image: `public/images/og-image.webp` (1200×630 px)

```bash
ls public/images/services/
# balcony-safety-nets.webp
# balcony-invisible-grills.webp
# staircase-safety-nets.webp
# apartment-safety-nets.webp
# industrial-safety-nets.webp
# duct-area-safety-nets.webp
# pet-safety-nets.webp
# child-safety-nets.webp
# monkey-safety-nets.webp
# coconut-tree-safety-nets.webp
# cloth-hangers.webp
```

# Pulse Flow - marketing site

Landing page for **pulseflow.site**.

- Brand: Pulse Flow  
- Motto: The pulse of your rental operations  
- App CTA: https://app.pulseflow.site  

## Local preview

```bash
npx serve .
```

Open the printed URL (usually http://localhost:3000).

## Deploy to Vercel

1. Point this repo (or replace `main`) at your existing pulseflow.site Vercel project.
2. Framework preset: **Other**
3. Root Directory: empty (repo root)
4. Output Directory: empty / `.`
5. Clear any old `apps/web` or `dist` overrides.

## Replace old site code

```bash
git remote add origin https://github.com/YOUR_ORG/YOUR_MARKETING_REPO.git
# optional: tag old main first
git push -u origin main --force
```

Then attach the `pulseflow.site` domain in Vercel to this project.

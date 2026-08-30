# Kshaganor

Static website for **Kshaganor Import & Export Pvt. Ltd.** — import, export, and production.

Ready to deploy on **Vercel** or **Railway**. No database, no env secrets.

## Vercel

1. Push this folder to a GitHub / GitLab / Bitbucket repo.
2. [vercel.com/new](https://vercel.com/new) → import the repo.
3. Framework preset: **Other**. Vercel reads `vercel.json`.
4. Deploy.

CLI:

```bash
npx vercel
```

Clean URLs are on (`/about` → `about.html`).

## Railway

1. Push this folder to a Git repo.
2. [railway.app](https://railway.app) → New Project → Deploy from GitHub.
3. Railway detects the **Dockerfile** (Caddy) and serves on `$PORT`.
4. Generate a domain: Settings → Networking → Generate domain.

No variables required. Railway sets `PORT` itself.

### Railway without Docker

If you prefer Nixpacks / Node:

- Delete `Dockerfile` and `railway.toml`, or set the builder to Nixpacks.
- Start command: `npm start`  
  (`serve` listens on `0.0.0.0:$PORT`)

## Local

```bash
# Python
python3 -m http.server 8080

# or Node
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Layout

```
index.html          Home
about.html
services.html
industries.html
contact.html
404.html
css/  js/  images/
```

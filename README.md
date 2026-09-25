# DesiSwad — frontend

A weekly-changing **mystery snack box** storefront, built as a standalone React frontend.
No backend, no database, no payment gateway. Orders, points, supplier leads and feedback are
stored in the browser's `localStorage` so the whole flow can be demonstrated end to end.

Temporary tagline: `xxxxxxx` — kept as a placeholder everywhere until the real one is decided.

---

## 1. Stack

| Piece    | Choice                                |
| -------- | ------------------------------------- |
| Framework| React 18                              |
| Bundler  | Vite 5                                |
| Language | JavaScript (JSX), HTML5, CSS3         |
| Routing  | React Router 6 (`BrowserRouter`)      |
| Icons    | lucide-react                          |
| Storage  | `localStorage` behind a service layer |
| Output   | Static files in `dist/`               |

No SSR. No server process is needed to view the site — Nginx serves the built files.

---

## 2. Run it locally

Requires Node.js 18 or newer.

```bash
npm install        # install dependencies
npm run dev        # dev server on http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the built dist/ on http://localhost:4173
```

---

## 3. Project structure

```
desiswad/
├── index.html                  # page title, meta description, Open Graph, favicon, fonts
├── vite.config.js
├── package.json
├── public/
│   ├── logo.svg                # TEMPORARY placeholder logo — replace this file
│   ├── favicon.svg
│   ├── og-image.svg            # social share image
│   └── robots.txt
└── src/
    ├── main.jsx                # entry: BrowserRouter + ToastProvider
    ├── App.jsx                 # routes, lazy-loaded pages
    ├── index.css               # imports the style layers
    ├── assets/
    ├── styles/
    │   ├── tokens.css          # ← colours, type scale, spacing, radii
    │   ├── base.css            # reset, typography, layout primitives
    │   ├── components.css      # buttons, cards, nav, forms, toast, modal
    │   ├── sections.css        # hero, mystery box, drops, rewards
    │   └── pages.css           # order, about, 404 layouts
    ├── data/                   # static/mock content
    │   ├── site.js             # brand name, tagline, socials, delivery fee
    │   ├── drops.js            # current drop, categories, past drops
    │   ├── plans.js            # Mini / Stash, frequencies, preferences
    │   ├── rewards.js          # earn rules, reward tiers
    │   ├── faqs.js  reviews.js  partners.js  content.js
    ├── services/               # ← swap these for REST calls later
    │   ├── orderService.js
    │   ├── rewardService.js
    │   ├── supplierService.js
    │   ├── feedbackService.js
    │   └── referralService.js
    ├── hooks/
    │   ├── useLocalStorage.js  useToast.js
    │   ├── useDocumentTitle.js useScrolledPast.js  useLockBodyScroll.js
    ├── utils/
    │   ├── storage.js          # safe localStorage wrapper (never throws)
    │   ├── format.js           # ₹ formatting, order IDs, dates
    │   └── validators.js       # phone, address, required, numbers
    ├── components/
    │   ├── Layout.jsx  Navbar.jsx  MobileMenu.jsx  Footer.jsx
    │   ├── MobileStickyCTA.jsx  ScrollToTop.jsx  PageHeader.jsx
    │   ├── MysteryItem.jsx  MysteryReveal.jsx  WeeklyDrop.jsx  BoxPlan.jsx
    │   ├── OrderForm.jsx  OrderSummary.jsx  SupplierForm.jsx  FeedbackForm.jsx
    │   ├── RewardCard.jsx  RewardsProgress.jsx  ReferralCard.jsx
    │   ├── ReviewCard.jsx  FAQAccordion.jsx
    │   ├── ui/                 # Button, SectionHeading, Badge, Modal,
    │   │                       # Field (Input/TextArea/Select/ChipGroup),
    │   │                       # ToastProvider, EmptyState, Skeleton
    │   └── sections/           # Hero, WhyDesiSwad, ProblemSection,
    │                           # ThisWeeksBox, HowItWorks, WeeklyDrops,
    │                           # PastDrops, RewardsTeaser, SupplierSection,
    │                           # Reviews, TrustSection, FAQPreview,
    │                           # InstagramSection, FinalCTA, BoxPlans
    └── pages/
        ├── Home.jsx            /
        ├── MysteryBoxPage.jsx  /mystery-box
        ├── HowItWorksPage.jsx  /how-it-works
        ├── RewardsPage.jsx     /rewards
        ├── AboutPage.jsx       /about
        ├── FAQPage.jsx         /faq
        ├── OrderPage.jsx       /order        (?plan=mini|stash&frequency=once|weekly|biweekly)
        ├── PartnerPage.jsx     /partner
        ├── FeedbackPage.jsx    /feedback
        └── NotFound.jsx        *
```

---

## 4. Things you will want to change first

| What | Where |
| ---- | ----- |
| Tagline (`xxxxxxx`) | `src/data/site.js` → `SITE.tagline`, and `public/og-image.svg` |
| Logo | replace `public/logo.svg` (and `public/favicon.svg`) |
| Instagram handle | `src/data/site.js` → `SITE.instagram`, `SITE.instagramUrl` |
| Phone / email | `src/data/site.js` |
| Colours | `src/styles/tokens.css` → `--primary`, `--secondary`, `--accent`, `--background`, `--surface`, `--text`, `--muted` |
| This week's drop | `src/data/drops.js` → `CURRENT_DROP` |
| Prices, box sizes | `src/data/plans.js` |
| Delivery fee | `src/data/site.js` → `deliveryFee`, `freeDeliveryAbove` |
| Page title / meta / OG | `index.html`, plus `useDocumentTitle()` in each page |

---

## 5. localStorage keys

The app works fine if storage is empty, blocked or full — `src/utils/storage.js`
falls back to an in-memory map and never throws.

```
desiswad_orders           placed demo orders
desiswad_rewards          { points, history }
desiswad_supplier_leads   snack partner submissions
desiswad_feedback         post-delivery feedback
desiswad_referral         { code, shares }
```

To wipe the demo state: **Rewards → Reset demo points**, or in the browser console
`Object.keys(localStorage).filter(k=>k.startsWith('desiswad_')).forEach(k=>localStorage.removeItem(k))`.

---

## 6. Connecting a backend later

Every read/write already goes through `src/services/*`, and every function is `async`.
Replacing localStorage with an API is a body swap — no component changes:

```js
// before
export async function createOrder(payload) { /* localStorage */ }

// after
export async function createOrder(payload) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Order failed');
  return res.json();
}
```

Never put API keys, database credentials, payment secrets or AWS credentials in this
repository — everything in a Vite build is public.

---

## 7. Deploying on AWS EC2 (Ubuntu + Nginx)

```
User → Internet → EC2 (Ubuntu) → Nginx → React production build (dist/)
```

### 7.1 Launch the EC2 instance

1. EC2 → **Launch instance**.
2. AMI: **Ubuntu Server 22.04 LTS** (or 24.04 LTS).
3. Type: `t2.micro` / `t3.micro` is enough for a static frontend.
4. Key pair: create or pick one, download the `.pem`.
5. Storage: 8–16 GB gp3.
6. Launch, then note the **public IPv4 address**.

Connect:

```bash
chmod 400 desiswad-key.pem
ssh -i desiswad-key.pem ubuntu@<EC2_PUBLIC_IP>
```

### 7.2 Security group

Inbound rules on the instance's security group:

| Type  | Protocol | Port | Source            | Why |
| ----- | -------- | ---- | ----------------- | --- |
| SSH   | TCP      | 22   | **Your IP only**  | admin access |
| HTTP  | TCP      | 80   | `0.0.0.0/0`, `::/0` | the website |
| HTTPS | TCP      | 443  | `0.0.0.0/0`, `::/0` | only if you set up SSL |

Outbound: leave the default allow-all (needed for `apt` and `npm`).
Do **not** open 5173 or 4173 — those are dev-only ports; Nginx serves on 80.

### 7.3 Install Node.js and Nginx

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

node -v && npm -v && nginx -v
```

### 7.4 Get the code and build

```bash
cd /home/ubuntu
git clone <your-repo-url> desiswad     # or: scp the folder up from your machine
cd desiswad

npm install
npm run build                          # produces dist/
```

If a `t2.micro` runs out of memory during the build, add swap once:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 7.5 Publish the build

```bash
sudo mkdir -p /var/www/desiswad
sudo rsync -a --delete /home/ubuntu/desiswad/dist/ /var/www/desiswad/
sudo chown -R www-data:www-data /var/www/desiswad
```

### 7.6 Nginx configuration

```bash
sudo nano /etc/nginx/sites-available/desiswad
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name _;                      # or: desiswad.com www.desiswad.com

    root /var/www/desiswad;
    index index.html;

    # React Router: any unknown path falls back to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Hashed assets can be cached hard
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # index.html must never be cached, or users get a stale app shell
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml application/json;
    gzip_min_length 1024;

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/desiswad /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t                # must say "syntax is ok" / "test is successful"
sudo systemctl reload nginx
sudo systemctl enable nginx  # survives reboots
```

Visit `http://<EC2_PUBLIC_IP>`.

### 7.7 Redeploying after a change

```bash
cd /home/ubuntu/desiswad
git pull
npm install
npm run build
sudo rsync -a --delete dist/ /var/www/desiswad/
sudo systemctl reload nginx
```

Save that as `deploy.sh` and run `bash deploy.sh` each time.

### 7.8 Optional: domain + HTTPS

1. Point an **A record** for `desiswad.com` (and `www`) at the EC2 public IP.
   Attach an **Elastic IP** first so the address survives a stop/start.
2. Put the real domain in `server_name`, reload Nginx.
3. Issue a certificate:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d desiswad.com -d www.desiswad.com
sudo systemctl status certbot.timer    # auto-renewal
```

Certbot rewrites the Nginx file to listen on 443 and redirect HTTP to HTTPS.
Make sure port 443 is open in the security group.

### 7.9 Keeping it running

Nginx is a system service, so a static build needs no process manager:

```bash
sudo systemctl enable nginx     # start on boot
sudo systemctl status nginx
sudo systemctl reload nginx     # after a config change
```

There is **no Node process to keep alive** — do not use `npm run preview` or PM2 in
production. If you later add a backend, run that under PM2 or systemd and proxy it:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:5000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

## 8. Troubleshooting

**404 on refresh or on a direct link like `/rewards`** — the classic React Router problem.
The browser asks Nginx for a file called `rewards`, which does not exist. The fix is the
fallback line in the config above:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Check it is actually applied: `sudo nginx -t && sudo systemctl reload nginx`, and confirm
you edited the file that is symlinked into `sites-enabled` (and that `default` is removed —
it otherwise wins on port 80). Same idea on other hosts: Apache needs a `.htaccess`
rewrite to `index.html`, S3 needs the error document set to `index.html`.

**Blank white page, console shows 404s for `/assets/…`** — `base` in `vite.config.js`
must match the path the app is served from. It is `'/'` here, which is right for a domain
root. Serving from a subfolder means `base: '/subfolder/'` and a rebuild.

**Nginx shows the default "Welcome to nginx" page** — `sudo rm /etc/nginx/sites-enabled/default`
then reload.

**403 Forbidden** — permissions. `sudo chown -R www-data:www-data /var/www/desiswad`, and
make sure every parent directory is traversable (`chmod 755`).

**Site unreachable, but Nginx is running** — almost always the security group. Confirm port 80
inbound from `0.0.0.0/0`, and that you are using `http://` not `https://` before certificates exist.

**`npm run build` killed on a t2.micro** — out of memory. Add swap (7.4), or build locally
and `scp` only the `dist/` folder up.

**Styles missing / fonts fall back** — Google Fonts is loaded from `index.html`. Self-host
the two families in `public/` if the deployment must work without external requests.

**Changes not showing after a redeploy** — hard-refresh. If it persists, check the
`index.html` no-cache header is in place and that `rsync --delete` actually replaced the files.

---

## 9. What is real and what is a demo

Clearly marked in the UI, and worth keeping honest as this grows:

- Reviews on the site are **sample copy**, not customer testimonials.
- The rewards system is a **demo** — points are per-browser and redemption is not automatic.
- Orders are **not** charged and nothing ships; details stay in `localStorage`.
- Sample reveal is labelled "actual weekly contents may vary".
- The food-handling section describes checks only. It makes **no certification claim** —
  do not add one until it is true.

---

## 10. Accessibility and performance notes

- Semantic landmarks, one `<h1>` per page, skip-to-content link, visible focus rings.
- All interactive controls are real buttons/links, keyboard reachable, with ARIA on the
  accordion, modals, progress bars and chip groups. Modals trap focus and restore it on close.
- State is never signalled by colour alone (icons + text labels accompany every state).
- `prefers-reduced-motion` disables the animations.
- No `alert()` anywhere — toasts and modals instead.
- Routes are code-split; only the home page ships in the main bundle.
- Images are inline SVG (a few KB), so there is nothing heavy to lazy-load.

Current production build: ~217 kB JS (~69 kB gzipped) and ~35 kB CSS (~8 kB gzipped) for the
initial load, with each additional route between 0.5 kB and 9 kB.

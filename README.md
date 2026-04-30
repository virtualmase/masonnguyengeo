# masonnguyengeo.com — Hostinger Node.js Deployment Guide

**Entity:** Mason Nguyen | GEO Strategist & Signal Architect  
**Stack:** Node.js 18+ · Express · PM2  
**Host:** Hostinger VPS or Business/Cloud Hosting with Node.js support

---

## Quick Start

```bash
npm install
npm start
```

---

## Hostinger Deployment (Step-by-Step)

### Option A — Hostinger VPS (Recommended for full control)

#### 1. SSH into your VPS

```bash
ssh root@YOUR_VPS_IP
```

#### 2. Install Node.js 18 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # should show v18.x.x
```

#### 3. Install PM2 globally

```bash
npm install -g pm2
```

#### 4. Install Nginx (reverse proxy)

```bash
sudo apt install nginx -y
```

#### 5. Upload your project

From your local machine:
```bash
# Using scp
scp -r ./masonnguyengeo root@YOUR_VPS_IP:/var/www/

# OR use Hostinger File Manager, Git, or SFTP (FileZilla)
```

#### 6. Install dependencies on server

```bash
cd /var/www/masonnguyengeo
npm install --production
```

#### 7. Start with PM2

```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup  # Follow the command it outputs to auto-start on reboot
```

#### 8. Configure Nginx reverse proxy

Create the Nginx config:
```bash
sudo nano /etc/nginx/sites-available/masonnguyengeo
```

Paste:
```nginx
server {
    listen 80;
    server_name masonnguyengeo.com www.masonnguyengeo.com;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # GEO signal files — direct serve with proper headers
    location = /llms.txt {
        proxy_pass http://127.0.0.1:3000/llms.txt;
        add_header X-Robots-Tag "index, follow" always;
    }

    location = /robots.txt {
        proxy_pass http://127.0.0.1:3000/robots.txt;
    }

    location = /sitemap.xml {
        proxy_pass http://127.0.0.1:3000/sitemap.xml;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/masonnguyengeo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 9. SSL with Let's Encrypt (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d masonnguyengeo.com -d www.masonnguyengeo.com
```

Certbot will auto-configure HTTPS and renewal.

---

### Option B — Hostinger Shared/Business Hosting (Node.js App)

Hostinger's hPanel supports Node.js apps directly.

#### 1. Go to hPanel → Advanced → Node.js

#### 2. Create a new Node.js application
- **Node.js version:** 18.x (LTS)
- **Application root:** `/public_html/masonnguyengeo` (or your domain folder)
- **Application startup file:** `server.js`
- **Application mode:** Production

#### 3. Upload files via File Manager or SFTP
Upload the entire project folder contents to your application root.

#### 4. In hPanel Node.js panel, run:
```
npm install --production
```

#### 5. Start the application
Click "Restart" in the Node.js panel.

Hostinger will automatically route your domain to the Node.js app and handle the port assignment via the `PORT` environment variable.

---

## Project Structure

```
masonnguyengeo/
├── server.js              ← Main Express server (entry point)
├── package.json           ← Dependencies + npm scripts
├── ecosystem.config.js    ← PM2 process manager config
├── .env.example           ← Environment variables template
├── .gitignore
├── logs/                  ← PM2 log output
├── public/
│   ├── index.html         ← Mason Nguyen's GEO-optimized site
│   ├── mason-nguyen.jpg   ← Profile photo (add this)
│   └── .well-known/
│       └── ai-plugin.json ← Served by Express route
└── README.md              ← This file
```

---

## GEO Signal Endpoints

Once deployed, verify these are live:

| Endpoint | Purpose | Expected |
|----------|---------|---------|
| `/` | Main site | 200 OK |
| `/llms.txt` | LLM crawler permissions | 200 text/plain |
| `/robots.txt` | Crawler config | 200 text/plain |
| `/sitemap.xml` | XML sitemap | 200 application/xml |
| `/.well-known/ai-plugin.json` | AI plugin manifest | 200 application/json |
| `/api/entity` | Machine-readable entity JSON | 200 application/json |
| `/api/health` | Uptime check | 200 application/json |

---

## Adding Mason's Profile Photo

Place `mason-nguyen.jpg` in the `public/` folder.  
This is referenced in the JSON-LD schema and the ai-plugin.json.

Recommended: 400×400px, < 150KB, JPEG.

---

## PM2 Commands (VPS only)

```bash
pm2 status                        # Check process status
pm2 logs masonnguyengeo           # Live log stream
pm2 restart masonnguyengeo        # Restart app
pm2 stop masonnguyengeo           # Stop app
pm2 delete masonnguyengeo         # Remove from PM2
pm2 monit                         # Full monitoring dashboard
```

---

## DNS Configuration

In Hostinger's DNS Zone Editor (or your registrar):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_VPS_IP | 300 |
| A | www | YOUR_VPS_IP | 300 |
| CNAME | www | masonnguyengeo.com | 3600 |

---

## Post-Deployment GEO Checklist

After going live, submit to:

- [ ] Google Search Console → Add property `masonnguyengeo.com`
- [ ] Submit sitemap: `https://masonnguyengeo.com/sitemap.xml`
- [ ] Bing Webmaster Tools → Submit sitemap
- [ ] Verify `/llms.txt` is accessible by LLM crawlers
- [ ] Test JSON-LD at: https://validator.schema.org
- [ ] Test structured data: https://search.google.com/test/rich-results
- [ ] Verify canonical URL in Google Search Console
- [ ] Submit entity to Wikidata if not present
- [ ] Verify LinkedIn `sameAs` bidirectional link is active

---

## Support

**Entity:** Mason Nguyen  
**Email:** mason@au-re.org  
**Site:** https://masonnguyengeo.com  
**Built with:** AURE 16-Agent GEO System

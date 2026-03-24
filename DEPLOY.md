# Synaptica Landing — Deploy Guide

## Project Structure

```
site/
  public/
    index.html                    ← landing page (forms collect emails)
    synaptica-teams-chat-v5.html  ← embedded chat demo
    Logo Synaptica.png            ← header + footer logo
    LOGOS - Transparent.png       ← integration logos image
  api/
    subscribe.js                  ← serverless function (email → Supabase)
  package.json                    ← @supabase/supabase-js dependency
  vercel.json                     ← deployment config
```

## How It Works

- The landing page has two "Request a Demo" forms (hero + bottom CTA).
- When a visitor submits their email, it calls `/api/subscribe` (a Vercel serverless function).
- The function inserts the email into a `demo_requests` table in Supabase (PostgreSQL).
- Duplicate emails are handled gracefully — no error, just "Already registered!".
- You can browse/export collected emails from the Supabase dashboard table editor.

---

## Step 1: Supabase Setup

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Open your project: `https://krmlbtohgqtbwcbbwnmn.supabase.co`
3. Go to **SQL Editor** and run:

```sql
CREATE TABLE demo_requests (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'hero',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON demo_requests
  FOR INSERT WITH CHECK (true);
```

4. Go to **Settings → API** and copy:
   - **Project URL**: `https://krmlbtohgqtbwcbbwnmn.supabase.co`
   - **anon (public) key**: starts with `eyJ...`

## Step 2: Install Vercel CLI

```bash
npm i -g vercel
```

## Step 3: Deploy

```bash
cd site/
vercel
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → your account
- **Link to existing project?** → No (create new)
- **Project name** → `synaptica` (or whatever you want)
- **Framework** → Other
- **Root directory** → `./`

## Step 4: Set Environment Variables

```bash
vercel env add SUPABASE_URL
# paste: https://krmlbtohgqtbwcbbwnmn.supabase.co
# select: Production, Preview, Development → press Enter for all

vercel env add SUPABASE_ANON_KEY
# paste your anon key (eyJ...)
# select: Production, Preview, Development → press Enter for all
```

## Step 5: Production Deploy

```bash
vercel --prod
```

Your site is now live at the URL Vercel gives you (e.g. `synaptica.vercel.app`).

## Step 6: Custom Domain (optional)

1. Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `synaptica.ai`)
3. At your domain registrar, add these DNS records:
   - **A record** (apex `@`): `76.76.21.21`
   - **CNAME** (`www`): `cname.vercel-dns.com`
4. SSL is auto-provisioned by Vercel — wait a few minutes.

---

## Verify Everything Works

1. Visit your deployed URL — landing page loads with logos and starfield
2. Enter an email in the hero form → button shows "Sending..." then "Thank you!"
3. Open Supabase dashboard → **Table Editor → demo_requests** → email appears
4. Submit the same email again → shows "Already registered!" (no duplicate error)
5. Test the bottom CTA form too — should work the same way

## Viewing Collected Emails

- **Supabase dashboard**: Table Editor → `demo_requests` → browse/filter/export as CSV
- **SQL**: `SELECT * FROM demo_requests ORDER BY created_at DESC;`

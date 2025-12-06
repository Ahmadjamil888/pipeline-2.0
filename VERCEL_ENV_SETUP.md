# Vercel Environment Variables Setup

## Quick Fix for Duplicate Variable Error

If you see: `A variable with the name 'SUPABASE_SERVICE_ROLE_KEY' already exists`

### Solution 1: Update via Vercel Dashboard (Easiest)

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Find `SUPABASE_SERVICE_ROLE_KEY`
5. Click **Edit** and update the value
6. Save

### Solution 2: Delete and Re-add

1. Go to **Settings** → **Environment Variables**
2. Find the duplicate variable
3. Click **Delete**
4. Add it again with the correct value

## Import All Variables from .env.local

### Option A: Use PowerShell Script (Windows)

```powershell
cd supavec
.\scripts\vercel-env-import.ps1
```

### Option B: Use Bash Script (Mac/Linux)

```bash
cd supavec
chmod +x scripts/vercel-env-import.sh
./scripts/vercel-env-import.sh
```

### Option C: Manual Import via Vercel CLI

```bash
cd supavec/apps/web

# For each variable in .env.local, run:
echo "your_value_here" | vercel env add VARIABLE_NAME production preview development
```

## Required Environment Variables

Copy these from your `apps/web/.env.local` to Vercel:

### Critical (Must Have):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_URL`
- `OPENAI_API_KEY`

### Important:
- `API_ROUTE_SECRET`

### Optional (Add as needed):
- Cloud provider keys (AWS, Azure, etc.)
- Analytics keys
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

## Vercel Project Settings

When deploying, make sure:

1. **Root Directory**: `apps/web`
2. **Framework**: Next.js
3. **Build Command**: `cd ../.. && bun run build` (or `npm run build` if not using bun)
4. **Output Directory**: `.next` (default)
5. **Install Command**: `cd ../.. && bun install` (or `npm install`)

## After Setting Variables

1. **Redeploy** your project in Vercel
2. The new environment variables will be available
3. Check the deployment logs to ensure build succeeds

## Verification

After deployment, verify your app works:
1. Check that the homepage loads
2. Try logging in
3. Check that the dashboard loads
4. Verify API calls work


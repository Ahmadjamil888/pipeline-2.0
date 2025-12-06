# Quick Fix: Duplicate SUPABASE_SERVICE_ROLE_KEY Error

## The Problem
Vercel says: `A variable with the name 'SUPABASE_SERVICE_ROLE_KEY' already exists`

## Solution (Choose One)

### Option 1: Update Existing Variable (Fastest)

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to **Settings** → **Environment Variables**
4. Find `SUPABASE_SERVICE_ROLE_KEY`
5. Click the **Edit** (pencil icon)
6. Paste your new value from `.env.local`
7. Click **Save**
8. **Redeploy** your project

### Option 2: Delete and Re-add

1. Go to **Settings** → **Environment Variables**
2. Find `SUPABASE_SERVICE_ROLE_KEY`
3. Click **Delete**
4. Click **Add New**
5. Name: `SUPABASE_SERVICE_ROLE_KEY`
6. Value: (paste from `.env.local`)
7. Select: Production, Preview, Development
8. Click **Save**
9. **Redeploy**

### Option 3: Use Import Script

Run the PowerShell script to import all variables:

```powershell
cd "d:\Admin\Documents\pipeline 2.0\supavec"
.\scripts\import-env-to-vercel.ps1
```

This will:
- Check which variables already exist
- Skip duplicates (you can delete them manually)
- Add new variables automatically

## All Required Variables

Make sure these are set in Vercel (from `apps/web/.env.local`):

**Critical:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` ← This is the one causing the error
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_URL`
- `OPENAI_API_KEY`

**Important:**
- `API_ROUTE_SECRET`

**Optional (add as needed):**
- Cloud provider keys
- Analytics keys
- Redis keys

## After Fixing

1. **Redeploy** in Vercel (or push a new commit)
2. Check deployment logs
3. Verify the app works

## Vercel Project Settings

Make sure your project is configured:
- **Root Directory**: `apps/web`
- **Framework**: Next.js
- **Build Command**: `cd ../.. && bun run build`
- **Install Command**: `cd ../.. && bun install`


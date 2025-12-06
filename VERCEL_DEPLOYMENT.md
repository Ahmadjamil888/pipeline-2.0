# Vercel Deployment Guide for Pipeline AI

## Prerequisites
- Vercel account connected to your GitHub repository
- All environment variables ready from your `.env.local` files

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import your repository** (if not already imported)
3. **Configure Project Settings**:
   - **Root Directory**: Set to `apps/web`
   - **Framework Preset**: Next.js
   - **Build Command**: `cd ../.. && bun run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `cd ../.. && bun install`

4. **Add Environment Variables**:
   Go to **Settings** → **Environment Variables** and add all variables from `apps/web/.env.local`:

   **Required Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_APP_URL=your_app_url
   API_ROUTE_SECRET=your_secret
   OPENAI_API_KEY=your_openai_key
   ```

   **Optional Cloud Provider Keys:**
   ```
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   AWS_REGION=us-east-1
   AZURE_SUBSCRIPTION_ID=your_azure_sub_id
   AZURE_CLIENT_ID=your_azure_client_id
   AZURE_CLIENT_SECRET=your_azure_secret
   AZURE_TENANT_ID=your_azure_tenant
   ANTHROPIC_API_KEY=your_anthropic_key
   HUGGINGFACE_API_KEY=your_hf_key
   KAGGLE_USERNAME=your_kaggle_username
   KAGGLE_KEY=your_kaggle_key
   GOOGLE_CLOUD_PROJECT_ID=your_gcp_project
   GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY=your_gcp_key
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   NEXT_PUBLIC_GOOGLE_ANALYTICS=your_ga_id
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
   LOOPS_API_KEY=your_loops_key
   DEMO_SUPA_API_KEY=your_demo_key
   ```

5. **Set Environment for Each Variable**:
   - Select **Production**, **Preview**, and **Development** for each variable
   - Click **Save**

6. **Deploy**: Click **Deploy** button

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project**:
   ```bash
   cd supavec/apps/web
   vercel link
   ```

4. **Set environment variables from .env.local**:
   ```bash
   # Read .env.local and set variables
   vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development
   vercel env add SUPABASE_SERVICE_ROLE_KEY production preview development
   # ... repeat for all variables
   ```

5. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 3: Use Vercel CLI to Import from .env.local (Automated)

Create a script to automatically import all variables:

```bash
# Run this from the supavec/apps/web directory
cd supavec/apps/web

# Read .env.local and add each variable to Vercel
while IFS='=' read -r key value; do
  # Skip empty lines and comments
  [[ -z "$key" || "$key" =~ ^#.*$ ]] && continue
  
  # Remove quotes from value if present
  value=$(echo "$value" | sed 's/^"\(.*\)"$/\1/')
  
  # Add to Vercel (you'll need to confirm each)
  echo "Adding $key..."
  echo "$value" | vercel env add "$key" production preview development
done < .env.local
```

## Fixing the Duplicate Variable Error

If you see: `A variable with the name 'SUPABASE_SERVICE_ROLE_KEY' already exists`

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find the duplicate variable
3. Either:
   - **Delete the old one** and add the new value, OR
   - **Update the existing one** with your new value

## Separate API Deployment (Optional)

If you want to deploy the API separately:

1. **Create a new Vercel project** for the API
2. **Root Directory**: `packages/api`
3. **Build Command**: `bun run build`
4. **Output Directory**: `dist`
5. **Runtime**: Node.js 18+
6. **Add API environment variables** from `packages/api/.env.local`

## Environment Variable Reference

### Frontend (apps/web) - Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_URL`
- `OPENAI_API_KEY`

### Frontend (apps/web) - Optional:
- All cloud provider keys (AWS, Azure, etc.)
- Analytics keys (PostHog, Google Analytics)
- `API_ROUTE_SECRET`
- `LOOPS_API_KEY`
- `DEMO_SUPA_API_KEY`

### Backend (packages/api) - If deploying separately:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- All cloud provider keys

## Troubleshooting

### Build Fails
- Check that all required environment variables are set
- Verify `bun` is available in Vercel (may need to add `packageManager: "bun"` in package.json)

### API Calls Fail
- Ensure `NEXT_PUBLIC_API_URL` points to your deployed API
- Check CORS settings if API is on a different domain

### Database Connection Issues
- Verify Supabase credentials are correct
- Check that Supabase project allows connections from Vercel domain

## Quick Deploy Script

Save this as `deploy-to-vercel.sh`:

```bash
#!/bin/bash

# Navigate to web app
cd apps/web

# Deploy to Vercel
vercel --prod

echo "Deployment complete! Don't forget to set environment variables in Vercel dashboard."
```


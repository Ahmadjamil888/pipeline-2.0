# Environment Variables Setup Guide

## Quick Setup

1. **Create `.env.local` files** in both directories:
   - `apps/web/.env.local`
   - `packages/api/.env.local`

2. **Copy the templates below** into each file and fill in your credentials.

---

## Frontend Environment (`apps/web/.env.local`)

```env
# Supabase Configuration
# Get these from your Supabase project settings: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_ROUTE_SECRET=

# OpenAI (Required for RAG features)
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=

# Cloud Provider API Keys (Optional - paste your keys as needed)
# AWS Configuration
# Get from: https://console.aws.amazon.com/iam/
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1

# Azure Configuration
# Get from: https://portal.azure.com/
AZURE_SUBSCRIPTION_ID=
AZURE_CLIENT_ID=
AZURE_CLIENT_SECRET=
AZURE_TENANT_ID=

# Anthropic Configuration
# Get from: https://console.anthropic.com/
ANTHROPIC_API_KEY=

# HuggingFace Configuration
# Get from: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=

# Kaggle Configuration
# Get from: https://www.kaggle.com/settings
KAGGLE_USERNAME=
KAGGLE_KEY=

# Google Cloud Configuration
# Get from: https://console.cloud.google.com/
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY=

# Upstash Redis (for rate limiting)
# Get from: https://console.upstash.com/
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Email (Optional)
LOOPS_API_KEY=

# Demo API Key (Optional)
DEMO_SUPA_API_KEY=
```

---

## Backend Environment (`packages/api/.env.local`)

```env
# Supabase Configuration
# Get these from your Supabase project settings: https://app.supabase.com/project/_/settings/api
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI (Required for RAG features)
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=

# Cloud Provider API Keys (Optional - paste your keys as needed)
# AWS Configuration
# Get from: https://console.aws.amazon.com/iam/
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1

# Azure Configuration
# Get from: https://portal.azure.com/
AZURE_SUBSCRIPTION_ID=
AZURE_CLIENT_ID=
AZURE_CLIENT_SECRET=
AZURE_TENANT_ID=

# Anthropic Configuration
# Get from: https://console.anthropic.com/
ANTHROPIC_API_KEY=

# HuggingFace Configuration
# Get from: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=

# Kaggle Configuration
# Get from: https://www.kaggle.com/settings
KAGGLE_USERNAME=
KAGGLE_KEY=

# Google Cloud Configuration
# Get from: https://console.cloud.google.com/
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY=

# Upstash Redis (for rate limiting)
# Get from: https://console.upstash.com/
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# PostHog (Optional)
# Get from: https://app.posthog.com/
POSTHOG_API_KEY=
POSTHOG_HOST=

# Server Configuration
PORT=3001
NODE_ENV=development
```

---

## Required Variables (Minimum to get started)

### For Frontend (`apps/web/.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep secret!)
- `OPENAI_API_KEY` - Required for RAG features
- `NEXT_PUBLIC_API_URL` - API server URL (default: http://localhost:3001)
- `NEXT_PUBLIC_APP_URL` - Frontend URL (default: http://localhost:3000)

### For Backend (`packages/api/.env.local`):
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `OPENAI_API_KEY` - Required for RAG features
- `UPSTASH_REDIS_REST_URL` - For rate limiting (optional but recommended)
- `UPSTASH_REDIS_REST_TOKEN` - For rate limiting (optional but recommended)

---

## How to Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

---

## Quick Start Commands

After creating the `.env.local` files:

```bash
# Install dependencies
bun i

# Run database migrations
cd supavec
npx supabase db push

# Start development servers
bun dev
```

---

## Notes

- `.env.local` files are gitignored and won't be committed
- Fill in only the variables you need
- Cloud provider keys are optional - add them when you need to use those services
- Keep your `SERVICE_ROLE_KEY` secret - never commit it to git!


# Running Database Migrations

## Option 1: Link to Remote Supabase and Push (Recommended)

1. **Link your Supabase project:**
   ```bash
   cd supavec
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```
   
   You can find your project ref in your Supabase dashboard URL:
   `https://app.supabase.com/project/YOUR_PROJECT_REF`

2. **Push the migrations:**
   ```bash
   npx supabase db push
   ```

## Option 2: Apply Migration via Supabase Dashboard

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **SQL Editor**
4. Copy the contents of `supabase/migrations/20250101000000_add_model_training_tables.sql`
5. Paste and run the SQL in the SQL Editor

## Option 3: Apply Migration via psql

If you have direct database access:

```bash
psql -h YOUR_DB_HOST -U postgres -d postgres -f supabase/migrations/20250101000000_add_model_training_tables.sql
```

## What This Migration Creates

This migration adds the following tables:

- **models** - Store AI model configurations and metadata
- **training_jobs** - Track training job progress and status
- **cloud_api_keys** - Securely store cloud provider API keys
- **training_data** - Manage training datasets
- **model_deployments** - Track model deployments

All tables include Row-Level Security (RLS) policies for team-based data isolation.

## Verification

After running the migration, verify the tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('models', 'training_jobs', 'cloud_api_keys', 'training_data', 'model_deployments');
```

You should see all 5 tables listed.


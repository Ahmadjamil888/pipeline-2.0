# Linking Supabase Project - Step by Step

## Get Your Access Token

1. Go to https://app.supabase.com/account/tokens
2. Click "Generate new token"
3. Give it a name (e.g., "Pipeline AI CLI")
4. Copy the generated token

## Link Your Project

Run this command in PowerShell (replace YOUR_ACCESS_TOKEN with the token you copied):

```powershell
$env:SUPABASE_ACCESS_TOKEN="YOUR_ACCESS_TOKEN"
cd "d:\Admin\Documents\pipeline 2.0\supavec"
npx supabase link --project-ref kqpcwakwyfpgmgldqbjx
```

## Then Push Migrations

```powershell
npx supabase db push
```

---

## Alternative: Apply Migration via Dashboard (Easier!)

If you prefer not to use the CLI:

1. Go to https://app.supabase.com/project/kqpcwakwyfpgmgldqbjx
2. Click **SQL Editor** in the left sidebar
3. Open the file: `supabase/migrations/20250101000000_add_model_training_tables.sql`
4. Copy ALL the SQL content
5. Paste it into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)

This will create all the tables needed for model training!


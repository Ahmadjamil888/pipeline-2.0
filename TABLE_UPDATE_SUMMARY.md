# Table Name Update Summary

## Updated Table References

All code has been updated to use the `pipeline_` prefixed table names that were created in the migration:

### Table Name Mappings:
- `models` → `pipeline_models`
- `training_jobs` → `pipeline_training_jobs`
- `cloud_api_keys` → `pipeline_cloud_api_keys`
- `training_data` → `pipeline_training_data`
- `model_deployments` → `pipeline_model_deployments`

## Files Updated

### Backend API Controllers:
- ✅ `packages/api/src/controllers/models.ts` - All model CRUD operations
- ✅ `packages/api/src/controllers/training-jobs.ts` - Training job management
- ✅ `packages/api/src/controllers/model-inference.ts` - Model inference
- ✅ `packages/api/src/controllers/deployments.ts` - Model deployments

### Frontend Pages:
- ✅ `apps/web/src/app/dashboard/models/page.tsx` - Models list
- ✅ `apps/web/src/app/dashboard/models/new/page.tsx` - Create model
- ✅ `apps/web/src/app/dashboard/models/[modelId]/page.tsx` - Model details
- ✅ `apps/web/src/app/dashboard/settings/api-keys/page.tsx` - API key management

## Schema Changes

The migration adapted the schema to work with the existing database structure:

### Key Differences:
1. **No Teams Table**: Changed from team-based to user-based access
   - Removed `team_id` foreign keys
   - All queries now use `user_id` directly
   - RLS policies updated for user-based access

2. **User Table**: Uses existing `users` table instead of `profiles`
   - Foreign keys reference `public.users(id)`
   - Matches existing database structure

3. **Table Prefixes**: All new tables use `pipeline_` prefix to avoid conflicts
   - Prevents conflicts with existing `models`, `training_jobs` tables
   - Clear separation between Pipeline AI features and existing features

## API Authentication

The API controllers now:
- Support both `x-api-key` and `authorization` headers
- Use `.match({ api_key: apiKey })` pattern (same as existing RAG code)
- Query `user_id` from `api_keys` table for authorization

## Next Steps

1. **Test the API endpoints** to ensure authentication works correctly
2. **Verify API key structure** - If your `api_keys` table uses `key_hash` instead of `api_key`, you may need to:
   - Update the queries to hash the incoming API key, OR
   - Add an `api_key` column to the table, OR
   - Create a view/function that maps `key_hash` to `api_key`

3. **Test the frontend** to ensure models can be created and viewed

## Verification

To verify the tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'pipeline_%';
```

You should see:
- pipeline_models
- pipeline_training_jobs
- pipeline_cloud_api_keys
- pipeline_training_data
- pipeline_model_deployments


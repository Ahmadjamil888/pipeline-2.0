-- Migration: Add model training tables
-- This migration adds tables for model training, training jobs, and cloud provider API keys

-- Table for storing trained models
CREATE TABLE IF NOT EXISTS "public"."models" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "base_model" text NOT NULL, -- e.g., "gpt-3.5-turbo", "llama-2-7b", "mistral-7b"
    "model_type" text NOT NULL DEFAULT 'fine-tuned', -- 'fine-tuned', 'from-scratch', 'rag'
    "status" text NOT NULL DEFAULT 'draft', -- 'draft', 'training', 'completed', 'failed', 'deployed'
    "user_id" uuid DEFAULT auth.uid() NOT NULL,
    "team_id" uuid NOT NULL,
    "training_config" jsonb DEFAULT '{}'::jsonb, -- Store training hyperparameters
    "deployment_config" jsonb DEFAULT '{}'::jsonb, -- Store deployment settings (HF, Kaggle, etc.)
    "model_path" text, -- Path to the trained model
    "metrics" jsonb DEFAULT '{}'::jsonb, -- Training metrics (loss, accuracy, etc.)
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    "deleted_at" timestamp with time zone,
    CONSTRAINT "models_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "models_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id"),
    CONSTRAINT "models_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE
);

-- Table for training jobs
CREATE TABLE IF NOT EXISTS "public"."training_jobs" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "model_id" uuid NOT NULL,
    "status" text NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed', 'cancelled'
    "job_type" text NOT NULL, -- 'fine-tuning', 'training', 'preprocessing'
    "training_data_path" text, -- Path to training data
    "validation_data_path" text, -- Path to validation data
    "cloud_provider" text, -- 'aws', 'azure', 'openai', 'local'
    "compute_config" jsonb DEFAULT '{}'::jsonb, -- Compute resources configuration
    "progress" integer DEFAULT 0, -- Progress percentage (0-100)
    "logs" text, -- Training logs
    "error_message" text, -- Error message if failed
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "training_jobs_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "training_jobs_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE CASCADE
);

-- Table for cloud provider API keys (encrypted storage)
CREATE TABLE IF NOT EXISTS "public"."cloud_api_keys" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid DEFAULT auth.uid() NOT NULL,
    "team_id" uuid NOT NULL,
    "provider" text NOT NULL, -- 'aws', 'azure', 'openai', 'anthropic', 'huggingface', 'kaggle'
    "key_name" text NOT NULL, -- User-friendly name for the key
    "encrypted_key" text NOT NULL, -- Encrypted API key (use Supabase Vault)
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    "deleted_at" timestamp with time zone,
    CONSTRAINT "cloud_api_keys_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "cloud_api_keys_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id"),
    CONSTRAINT "cloud_api_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE,
    CONSTRAINT "cloud_api_keys_provider_check" CHECK (provider IN ('aws', 'azure', 'openai', 'anthropic', 'huggingface', 'kaggle', 'google'))
);

-- Table for training data files
CREATE TABLE IF NOT EXISTS "public"."training_data" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "model_id" uuid NOT NULL,
    "file_name" text NOT NULL,
    "file_type" text NOT NULL, -- 'jsonl', 'csv', 'txt', 'parquet'
    "file_size" bigint, -- Size in bytes
    "storage_path" text NOT NULL,
    "data_type" text NOT NULL DEFAULT 'training', -- 'training', 'validation', 'test'
    "row_count" integer, -- Number of rows/samples
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "deleted_at" timestamp with time zone,
    CONSTRAINT "training_data_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "training_data_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE CASCADE
);

-- Table for model deployments
CREATE TABLE IF NOT EXISTS "public"."model_deployments" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "model_id" uuid NOT NULL,
    "platform" text NOT NULL, -- 'huggingface', 'kaggle', 's3', 'azure-ml', 'custom'
    "deployment_status" text NOT NULL DEFAULT 'pending', -- 'pending', 'deploying', 'deployed', 'failed'
    "deployment_url" text, -- URL to deployed model
    "deployment_config" jsonb DEFAULT '{}'::jsonb,
    "api_endpoint" text, -- API endpoint for inference
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    "deleted_at" timestamp with time zone,
    CONSTRAINT "model_deployments_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "model_deployments_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE CASCADE,
    CONSTRAINT "model_deployments_platform_check" CHECK (platform IN ('huggingface', 'kaggle', 's3', 'azure-ml', 'custom'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "models_user_id_idx" ON "public"."models"("user_id");
CREATE INDEX IF NOT EXISTS "models_team_id_idx" ON "public"."models"("team_id");
CREATE INDEX IF NOT EXISTS "models_status_idx" ON "public"."models"("status");
CREATE INDEX IF NOT EXISTS "training_jobs_model_id_idx" ON "public"."training_jobs"("model_id");
CREATE INDEX IF NOT EXISTS "training_jobs_status_idx" ON "public"."training_jobs"("status");
CREATE INDEX IF NOT EXISTS "cloud_api_keys_user_id_idx" ON "public"."cloud_api_keys"("user_id");
CREATE INDEX IF NOT EXISTS "cloud_api_keys_team_id_idx" ON "public"."cloud_api_keys"("team_id");
CREATE INDEX IF NOT EXISTS "cloud_api_keys_provider_idx" ON "public"."cloud_api_keys"("provider");
CREATE INDEX IF NOT EXISTS "training_data_model_id_idx" ON "public"."training_data"("model_id");
CREATE INDEX IF NOT EXISTS "model_deployments_model_id_idx" ON "public"."model_deployments"("model_id");

-- Enable Row Level Security
ALTER TABLE "public"."models" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."training_jobs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."cloud_api_keys" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."training_data" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."model_deployments" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for models
CREATE POLICY "Users can select models from their teams" ON "public"."models"
    FOR SELECT USING (
        team_id IN (
            SELECT team_id FROM public.team_memberships
            WHERE profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert models for their teams" ON "public"."models"
    FOR INSERT TO authenticated
    WITH CHECK (
        team_id IN (
            SELECT team_id FROM public.team_memberships
            WHERE profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their team's models" ON "public"."models"
    FOR UPDATE USING (
        team_id IN (
            SELECT team_id FROM public.team_memberships
            WHERE profile_id = auth.uid()
        )
    );

-- RLS Policies for training_jobs
CREATE POLICY "Users can select training jobs for their team's models" ON "public"."training_jobs"
    FOR SELECT USING (
        model_id IN (
            SELECT id FROM public.models
            WHERE team_id IN (
                SELECT team_id FROM public.team_memberships
                WHERE profile_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can insert training jobs for their team's models" ON "public"."training_jobs"
    FOR INSERT TO authenticated
    WITH CHECK (
        model_id IN (
            SELECT id FROM public.models
            WHERE team_id IN (
                SELECT team_id FROM public.team_memberships
                WHERE profile_id = auth.uid()
            )
        )
    );

-- RLS Policies for cloud_api_keys
CREATE POLICY "Users can select their team's API keys" ON "public"."cloud_api_keys"
    FOR SELECT USING (
        team_id IN (
            SELECT team_id FROM public.team_memberships
            WHERE profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert API keys for their teams" ON "public"."cloud_api_keys"
    FOR INSERT TO authenticated
    WITH CHECK (
        team_id IN (
            SELECT team_id FROM public.team_memberships
            WHERE profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their team's API keys" ON "public"."cloud_api_keys"
    FOR UPDATE USING (
        team_id IN (
            SELECT team_id FROM public.team_memberships
            WHERE profile_id = auth.uid()
        )
    );

-- RLS Policies for training_data
CREATE POLICY "Users can select training data for their team's models" ON "public"."training_data"
    FOR SELECT USING (
        model_id IN (
            SELECT id FROM public.models
            WHERE team_id IN (
                SELECT team_id FROM public.team_memberships
                WHERE profile_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can insert training data for their team's models" ON "public"."training_data"
    FOR INSERT TO authenticated
    WITH CHECK (
        model_id IN (
            SELECT id FROM public.models
            WHERE team_id IN (
                SELECT team_id FROM public.team_memberships
                WHERE profile_id = auth.uid()
            )
        )
    );

-- RLS Policies for model_deployments
CREATE POLICY "Users can select deployments for their team's models" ON "public"."model_deployments"
    FOR SELECT USING (
        model_id IN (
            SELECT id FROM public.models
            WHERE team_id IN (
                SELECT team_id FROM public.team_memberships
                WHERE profile_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can insert deployments for their team's models" ON "public"."model_deployments"
    FOR INSERT TO authenticated
    WITH CHECK (
        model_id IN (
            SELECT id FROM public.models
            WHERE team_id IN (
                SELECT team_id FROM public.team_memberships
                WHERE profile_id = auth.uid()
            )
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON public.models
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_jobs_updated_at BEFORE UPDATE ON public.training_jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cloud_api_keys_updated_at BEFORE UPDATE ON public.cloud_api_keys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_model_deployments_updated_at BEFORE UPDATE ON public.model_deployments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


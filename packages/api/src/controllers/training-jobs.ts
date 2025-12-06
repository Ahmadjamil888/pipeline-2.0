import type { Request, Response } from "express";
import { supabase } from "../utils/supabase";
import { posthogClient } from "../utils/posthog";

// Create a training job
export async function createTrainingJob(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const {
      model_id,
      job_type,
      training_data_path,
      validation_data_path,
      cloud_provider,
      compute_config,
    } = req.body;

    if (!model_id || !job_type) {
      return res.status(400).json({ error: "model_id and job_type are required" });
    }

    // Get user_id from api_key
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from("api_keys")
      .select("user_id")
      .match({ api_key: apiKey })
      .single();

    if (apiKeyError || !apiKeyData) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    // Verify model belongs to user
    const { data: model, error: modelError } = await supabase
      .from("pipeline_models")
      .select("id, status")
      .eq("id", model_id)
      .eq("user_id", apiKeyData.user_id)
      .single();

    if (modelError || !model) {
      return res.status(404).json({ error: "Model not found" });
    }

    // Create training job
    const { data: trainingJob, error: jobError } = await supabase
      .from("pipeline_training_jobs")
      .insert({
        model_id,
        job_type,
        status: "pending",
        training_data_path,
        validation_data_path,
        cloud_provider: cloud_provider || "local",
        compute_config: compute_config || {},
      })
      .select()
      .single();

    if (jobError) {
      throw jobError;
    }

    // Update model status
    await supabase
      .from("pipeline_models")
      .update({ status: "training" })
      .eq("id", model_id);

    // TODO: Trigger actual training job (queue system, background worker, etc.)
    // For now, we'll simulate it by updating status after a delay
    // In production, use a job queue like Bull, BullMQ, or similar

    posthogClient.capture({
      distinctId: apiKey,
      event: "training_job_created",
      properties: { job_id: trainingJob.id, model_id, job_type, cloud_provider },
    });

    res.status(201).json({ training_job: trainingJob });
  } catch (error: any) {
    console.error("Error creating training job:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

// Get training jobs for a model
export async function getTrainingJobs(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const { modelId } = req.params;

    // Get user_id from api_key
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from("api_keys")
      .select("user_id")
      .match({ api_key: apiKey })
      .single();

    if (apiKeyError || !apiKeyData) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    // Verify model belongs to user
    const { data: model, error: modelError } = await supabase
      .from("pipeline_models")
      .select("id")
      .eq("id", modelId)
      .eq("user_id", apiKeyData.user_id)
      .single();

    if (modelError || !model) {
      return res.status(404).json({ error: "Model not found" });
    }

    const { data: jobs, error } = await supabase
      .from("pipeline_training_jobs")
      .select("*")
      .eq("model_id", modelId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ training_jobs: jobs });
  } catch (error: any) {
    console.error("Error getting training jobs:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

// Get a specific training job
export async function getTrainingJob(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const { jobId } = req.params;

    // Get team_id from api_key
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from("api_keys")
      .select("team_id")
      .eq("api_key", apiKey)
      .single();

    if (apiKeyError || !apiKeyData) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    // Get job with model verification
    const { data: job, error } = await supabase
      .from("pipeline_training_jobs")
      .select(`
        *,
        pipeline_models!inner(user_id)
      `)
      .eq("id", jobId)
      .eq("pipeline_models.user_id", apiKeyData.user_id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Training job not found" });
      }
      throw error;
    }

    res.json({ training_job: job });
  } catch (error: any) {
    console.error("Error getting training job:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

// Cancel a training job
export async function cancelTrainingJob(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const { jobId } = req.params;

    // Get team_id from api_key
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from("api_keys")
      .select("team_id")
      .eq("api_key", apiKey)
      .single();

    if (apiKeyError || !apiKeyData) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    // Verify job belongs to user
    const { data: job, error: jobError } = await supabase
      .from("pipeline_training_jobs")
      .select(`
        *,
        pipeline_models!inner(user_id)
      `)
      .eq("id", jobId)
      .eq("pipeline_models.user_id", apiKeyData.user_id)
      .single();

    if (jobError || !job) {
      return res.status(404).json({ error: "Training job not found" });
    }

    if (job.status === "completed" || job.status === "failed") {
      return res.status(400).json({ error: "Cannot cancel a completed or failed job" });
    }

    // Update job status
    const { data: updatedJob, error: updateError } = await supabase
      .from("pipeline_training_jobs")
      .update({ status: "cancelled" })
      .eq("id", jobId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // TODO: Actually cancel the training job in the cloud provider

    res.json({ training_job: updatedJob });
  } catch (error: any) {
    console.error("Error cancelling training job:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}


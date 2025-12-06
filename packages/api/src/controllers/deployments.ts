import type { Request, Response } from "express";
import { supabase } from "../utils/supabase";
import { posthogClient } from "../utils/posthog";

// Deploy a model
export async function deployModel(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const { modelId } = req.params;
    const { platform, deployment_config } = req.body;

    if (!platform) {
      return res.status(400).json({ error: "platform is required" });
    }

    const validPlatforms = ["huggingface", "kaggle", "s3", "azure-ml", "custom"];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({ 
        error: `Invalid platform. Must be one of: ${validPlatforms.join(", ")}` 
      });
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

    // Get model
    const { data: model, error: modelError } = await supabase
      .from("pipeline_models")
      .select("*")
      .eq("id", modelId)
      .eq("user_id", apiKeyData.user_id)
      .is("deleted_at", null)
      .single();

    if (modelError || !model) {
      return res.status(404).json({ error: "Model not found" });
    }

    if (model.status !== "completed") {
      return res.status(400).json({ 
        error: "Model must be completed before deployment" 
      });
    }

    // Create deployment record
    const { data: deployment, error: deployError } = await supabase
      .from("pipeline_model_deployments")
      .insert({
        model_id: modelId,
        platform,
        deployment_status: "pending",
        deployment_config: deployment_config || {},
      })
      .select()
      .single();

    if (deployError) {
      throw deployError;
    }

    // Update model status
    await supabase
      .from("pipeline_models")
      .update({ status: "deployed" })
      .eq("id", modelId);

    // TODO: Implement actual deployment logic based on platform
    // - HuggingFace: Upload model using HF API
    // - Kaggle: Create Kaggle dataset/model
    // - S3: Upload to S3 bucket
    // - Azure ML: Deploy to Azure ML workspace
    // - Custom: Use custom deployment script

    posthogClient.capture({
      distinctId: apiKey,
      event: "model_deployment_started",
      properties: { model_id: modelId, platform, deployment_id: deployment.id },
    });

    res.status(201).json({ deployment });
  } catch (error: any) {
    console.error("Error deploying model:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

// Get deployments for a model
export async function getDeployments(req: Request, res: Response) {
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

    const { data: deployments, error } = await supabase
      .from("pipeline_model_deployments")
      .select("*")
      .eq("model_id", modelId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ deployments });
  } catch (error: any) {
    console.error("Error getting deployments:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}


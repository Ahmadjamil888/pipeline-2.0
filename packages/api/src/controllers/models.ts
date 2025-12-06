import type { Request, Response } from "express";
import { supabase } from "../utils/supabase";
import { posthogClient } from "../utils/posthog";

// Get all models for a user
export async function getModels(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
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

    const { data: models, error } = await supabase
      .from("pipeline_models")
      .select("*")
      .eq("user_id", apiKeyData.user_id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    posthogClient.capture({
      distinctId: apiKey,
      event: "models_listed",
    });

    res.json({ models });
  } catch (error: any) {
    console.error("Error getting models:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

// Create a new model
export async function createModel(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const { name, description, base_model, model_type, training_config } = req.body;

    if (!name || !base_model) {
      return res.status(400).json({ error: "Name and base_model are required" });
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

    const { data: model, error } = await supabase
      .from("pipeline_models")
      .insert({
        name,
        description,
        base_model,
        model_type: model_type || "fine-tuned",
        user_id: apiKeyData.user_id,
        training_config: training_config || {},
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    posthogClient.capture({
      distinctId: apiKey,
      event: "model_created",
      properties: { model_id: model.id, base_model, model_type },
    });

    res.status(201).json({ model });
  } catch (error: any) {
    console.error("Error creating model:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

// Get a specific model
export async function getModel(req: Request, res: Response) {
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

    const { data: model, error } = await supabase
      .from("pipeline_models")
      .select("*")
      .eq("id", modelId)
      .eq("user_id", apiKeyData.user_id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Model not found" });
      }
      throw error;
    }

    res.json({ model });
  } catch (error: any) {
    console.error("Error getting model:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

// Update a model
export async function updateModel(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const { modelId } = req.params;
    const updates = req.body;

    // Get team_id from api_key
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from("api_keys")
      .select("team_id")
      .eq("api_key", apiKey)
      .single();

    if (apiKeyError || !apiKeyData) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    const { data: model, error } = await supabase
      .from("pipeline_models")
      .update(updates)
      .eq("id", modelId)
      .eq("user_id", apiKeyData.user_id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Model not found" });
      }
      throw error;
    }

    res.json({ model });
  } catch (error: any) {
    console.error("Error updating model:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

// Delete a model
export async function deleteModel(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const { modelId } = req.params;

    // Get team_id from api_key
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from("api_keys")
      .select("team_id")
      .eq("api_key", apiKey)
      .single();

    if (apiKeyError || !apiKeyData) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    const { error } = await supabase
      .from("pipeline_models")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", modelId)
      .eq("user_id", apiKeyData.user_id);

    if (error) {
      throw error;
    }

    res.json({ message: "Model deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting model:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}


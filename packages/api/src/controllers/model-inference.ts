import type { Request, Response } from "express";
import { supabase } from "../utils/supabase";
import { posthogClient } from "../utils/posthog";
import OpenAI from "openai";

// Run inference on a trained model
export async function runInference(req: Request, res: Response) {
  try {
    const apiKey = req.headers["x-api-key"] as string || req.headers.authorization as string;
    
    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }
    const { modelId } = req.params;
    const { prompt, max_tokens, temperature, stream } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
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

    if (model.status !== "completed" && model.status !== "deployed") {
      return res.status(400).json({ 
        error: `Model is not ready for inference. Current status: ${model.status}` 
      });
    }

    // TODO: Implement actual inference based on deployment platform
    // For now, we'll use OpenAI as a placeholder
    // In production, this should route to the actual deployed model
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: model.base_model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: max_tokens || 1000,
      temperature: temperature || 0.7,
      stream: stream || false,
    });

    posthogClient.capture({
      distinctId: apiKey,
      event: "model_inference",
      properties: { model_id: modelId },
    });

    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      
      // Handle streaming response
      // This is a simplified version - implement proper streaming
      res.json({ response: completion.choices[0]?.message?.content || "" });
    } else {
      res.json({ 
        response: completion.choices[0]?.message?.content || "",
        model: model.name,
        usage: completion.usage,
      });
    }
  } catch (error: any) {
    console.error("Error running inference:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}


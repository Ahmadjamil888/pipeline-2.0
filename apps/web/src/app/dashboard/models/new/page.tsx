"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const BASE_MODELS = {
  "OpenAI": ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"],
  "Anthropic": ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
  "HuggingFace": ["llama-2-7b", "llama-2-13b", "mistral-7b", "mistral-8x7b", "phi-2"],
};

export default function NewModelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    base_model: "",
    model_type: "fine-tuned",
  });
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      const { error } = await supabase
        .from("pipeline_models")
        .insert({
          name: formData.name,
          description: formData.description || null,
          base_model: formData.base_model,
          model_type: formData.model_type,
          user_id: user.id,
          status: "draft",
        });

      if (error) throw error;

      toast.success("Model created successfully");
      router.push("/dashboard/models");
    } catch (error: any) {
      console.error("Error creating model:", error);
      toast.error(error.message || "Failed to create model");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/models">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Model</h1>
          <p className="text-muted-foreground">
            Start training a new AI model from scratch or fine-tune an existing one
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Configuration</CardTitle>
          <CardDescription>
            Configure your model settings before starting training
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Model Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My Custom Model"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this model will be used for..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model_type">Model Type *</Label>
              <Select
                value={formData.model_type}
                onValueChange={(value) => setFormData({ ...formData, model_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fine-tuned">Fine-tuned</SelectItem>
                  <SelectItem value="from-scratch">From Scratch</SelectItem>
                  <SelectItem value="rag">RAG (Retrieval Augmented Generation)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="base_model">Base Model *</Label>
              <Select
                value={formData.base_model}
                onValueChange={(value) => setFormData({ ...formData, base_model: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a base model" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(BASE_MODELS).map(([provider, models]) => (
                    <div key={provider}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                        {provider}
                      </div>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading || !formData.name || !formData.base_model}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Model
              </Button>
              <Link href="/dashboard/models">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


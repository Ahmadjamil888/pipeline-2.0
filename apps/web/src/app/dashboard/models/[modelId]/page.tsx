"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, Upload, Rocket, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Model {
  id: string;
  name: string;
  description: string | null;
  base_model: string;
  model_type: string;
  status: string;
  training_config: any;
  metrics: any;
  created_at: string;
  updated_at: string;
}

interface TrainingJob {
  id: string;
  status: string;
  job_type: string;
  progress: number;
  created_at: string;
  completed_at: string | null;
}

export default function ModelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const modelId = params.modelId as string;
  const [model, setModel] = useState<Model | null>(null);
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (modelId) {
      loadModel();
      loadTrainingJobs();
    }
  }, [modelId]);

  async function loadModel() {
    try {
      const { data, error } = await supabase
        .from("pipeline_models")
        .select("*")
        .eq("id", modelId)
        .is("deleted_at", null)
        .single();

      if (error) throw error;
      setModel(data);
    } catch (error: any) {
      console.error("Error loading model:", error);
      toast.error("Failed to load model");
    } finally {
      setLoading(false);
    }
  }

  async function loadTrainingJobs() {
    try {
      const { data, error } = await supabase
        .from("pipeline_training_jobs")
        .select("*")
        .eq("model_id", modelId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTrainingJobs(data || []);
    } catch (error: any) {
      console.error("Error loading training jobs:", error);
    }
  }

  async function startTraining() {
    try {
      toast.info("Starting training job...");
      // TODO: Implement actual training job creation via API
      toast.success("Training job started");
      loadTrainingJobs();
      loadModel();
    } catch (error: any) {
      toast.error(error.message || "Failed to start training");
    }
  }

  async function deployModel() {
    try {
      toast.info("Starting deployment...");
      // TODO: Implement actual deployment via API
      toast.success("Deployment started");
      loadModel();
    } catch (error: any) {
      toast.error(error.message || "Failed to deploy model");
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "outline",
      training: "secondary",
      completed: "default",
      failed: "destructive",
      deployed: "default",
    };

    return (
      <Badge variant={variants[status] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard/models">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Models
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6">
            <p>Model not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/models">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{model.name}</h1>
            {getStatusBadge(model.status)}
          </div>
          {model.description && (
            <p className="text-muted-foreground mt-1">{model.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          {model.status === "draft" && (
            <Button onClick={startTraining}>
              <Play className="mr-2 h-4 w-4" />
              Start Training
            </Button>
          )}
          {model.status === "completed" && (
            <Button onClick={deployModel}>
              <Rocket className="mr-2 h-4 w-4" />
              Deploy
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="training">Training Jobs</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Model Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="text-sm text-muted-foreground">Base Model</div>
                  <div className="font-medium">{model.base_model}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Model Type</div>
                  <div className="font-medium">{model.model_type}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div>{getStatusBadge(model.status)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="font-medium">
                    {new Date(model.created_at).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {model.metrics && Object.keys(model.metrics).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Training Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(model.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-sm text-muted-foreground">{key}</div>
                        <div className="font-medium">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Jobs</CardTitle>
              <CardDescription>
                Monitor your model training progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trainingJobs.length === 0 ? (
                <p className="text-muted-foreground">No training jobs yet</p>
              ) : (
                <div className="space-y-4">
                  {trainingJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{job.job_type}</div>
                          <div className="text-sm text-muted-foreground">
                            {getStatusBadge(job.status)}
                          </div>
                        </div>
                        <div className="text-right">
                          {job.progress > 0 && (
                            <div className="text-sm text-muted-foreground">
                              {job.progress}% complete
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {new Date(job.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployments</CardTitle>
              <CardDescription>
                Deploy your model to production
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Deployment functionality coming soon. You'll be able to deploy to HuggingFace, Kaggle, or custom endpoints.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


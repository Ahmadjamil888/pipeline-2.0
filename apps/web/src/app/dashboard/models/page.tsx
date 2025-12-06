"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Brain, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Model {
  id: string;
  name: string;
  description: string | null;
  base_model: string;
  model_type: string;
  status: string;
  created_at: string;
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadModels();
  }, []);

  async function loadModels() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get models for user
      const { data: modelsData, error } = await supabase
        .from("pipeline_models")
        .select("*")
        .eq("user_id", user.id)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setModels(modelsData || []);
    } catch (error) {
      console.error("Error loading models:", error);
    } finally {
      setLoading(false);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Models</h1>
          <p className="text-muted-foreground">
            Train, fine-tune, and deploy your AI models
          </p>
        </div>
        <Link href="/dashboard/models/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Model
          </Button>
        </Link>
      </div>

      {models.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              No models yet
            </CardTitle>
            <CardDescription>
              Get started by creating your first AI model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/models/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Model
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Models</CardTitle>
            <CardDescription>
              Manage and monitor your AI models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Base Model</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>{model.base_model}</TableCell>
                    <TableCell>{model.model_type}</TableCell>
                    <TableCell>{getStatusBadge(model.status)}</TableCell>
                    <TableCell>
                      {new Date(model.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/models/${model.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


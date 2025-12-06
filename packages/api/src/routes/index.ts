import type { IRouter } from "express";
import { Router } from "express";
import { uploadFile } from "../controllers/upload-file";
import { uploadText } from "../controllers/upload-text";
import { getEmbeddings } from "../controllers/embeddings";
import { search } from "../controllers/search";
import { chat } from "../controllers/chat";
import { userFiles } from "../controllers/user-files";
import { deleteFile } from "../controllers/delete-file";
import { resyncFile } from "../controllers/resync-file";
import { overwriteText } from "../controllers/overwrite-text";
import { getModels, createModel, getModel, updateModel, deleteModel } from "../controllers/models";
import { createTrainingJob, getTrainingJobs, getTrainingJob, cancelTrainingJob } from "../controllers/training-jobs";
import { runInference } from "../controllers/model-inference";
import { deployModel, getDeployments } from "../controllers/deployments";
import { upload } from "../middleware/upload";
import { apiKeyAuth } from "../middleware/auth";
import { apiUsageLimit } from "../middleware/api-usage-limit";
import { validateRequestMiddleware as validateDeleteRequestMiddleware } from "../middleware/delete-file/validate-request";
import { validateRequestMiddleware as validateResyncRequestMiddleware } from "../middleware/resync-file/validate-request";
import { validateRequestMiddleware as validateOverwriteRequestMiddleware } from "../middleware/overwrite-text/validate-request";
import { validateRequestMiddleware as validateChatRequestMiddleware } from "../middleware/chat/validate-request";
import { validateRequestMiddleware as validateUploadRequestMiddleware } from "../middleware/upload-file/validate-request";
import { validateRequestMiddleware as validateUploadTextRequestMiddleware } from "../middleware/upload-text/validate-request";

export const router: IRouter = Router();

router.post(
  "/upload_file",
  apiKeyAuth(),
  apiUsageLimit(),
  upload.single("file"),
  validateUploadRequestMiddleware(),
  uploadFile,
);
router.post(
  "/upload_text",
  apiKeyAuth(),
  apiUsageLimit(),
  validateUploadTextRequestMiddleware(),
  uploadText,
);
router.post(
  "/resync_file",
  apiKeyAuth(),
  apiUsageLimit(),
  validateResyncRequestMiddleware(),
  resyncFile,
);
router.post(
  "/delete_file",
  apiKeyAuth(),
  apiUsageLimit(),
  validateDeleteRequestMiddleware(),
  deleteFile,
);

router.post("/embeddings", apiKeyAuth(), apiUsageLimit(), getEmbeddings);
router.post("/search", apiKeyAuth(), apiUsageLimit(), search);

router.post("/user_files", apiKeyAuth(), apiUsageLimit(), userFiles);

router.post(
  "/overwrite_text",
  apiKeyAuth(),
  apiUsageLimit(),
  validateOverwriteRequestMiddleware(),
  overwriteText,
);

router.post(
  "/chat",
  apiKeyAuth(),
  apiUsageLimit(),
  validateChatRequestMiddleware(),
  chat,
);

// Model Management Routes
router.get("/models", apiKeyAuth(), getModels);
router.post("/models", apiKeyAuth(), createModel);
router.get("/models/:modelId", apiKeyAuth(), getModel);
router.patch("/models/:modelId", apiKeyAuth(), updateModel);
router.delete("/models/:modelId", apiKeyAuth(), deleteModel);

// Training Job Routes
router.post("/models/:modelId/training-jobs", apiKeyAuth(), createTrainingJob);
router.get("/models/:modelId/training-jobs", apiKeyAuth(), getTrainingJobs);
router.get("/training-jobs/:jobId", apiKeyAuth(), getTrainingJob);
router.post("/training-jobs/:jobId/cancel", apiKeyAuth(), cancelTrainingJob);

// Model Inference Routes
router.post("/models/:modelId/inference", apiKeyAuth(), apiUsageLimit(), runInference);

// Deployment Routes
router.post("/models/:modelId/deploy", apiKeyAuth(), deployModel);
router.get("/models/:modelId/deployments", apiKeyAuth(), getDeployments);

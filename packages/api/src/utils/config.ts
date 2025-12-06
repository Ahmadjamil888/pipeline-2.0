// Cloud Provider Configuration
export const CLOUD_PROVIDERS = {
  AWS: 'aws',
  AZURE: 'azure',
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  HUGGINGFACE: 'huggingface',
  KAGGLE: 'kaggle',
  GOOGLE: 'google',
} as const;

// Model deployment platforms
export const DEPLOYMENT_PLATFORMS = {
  HUGGINGFACE: 'huggingface',
  KAGGLE: 'kaggle',
  S3: 's3',
  AZURE_ML: 'azure-ml',
  CUSTOM: 'custom',
} as const;

// Base models available for fine-tuning
export const BASE_MODELS = {
  OPENAI: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'],
  ANTHROPIC: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
  HUGGINGFACE: ['llama-2-7b', 'llama-2-13b', 'mistral-7b', 'mistral-8x7b', 'phi-2'],
} as const;

/**
 * Get cloud provider API keys from environment
 */
export function getCloudProviderConfig(provider: string) {
  switch (provider) {
    case CLOUD_PROVIDERS.AWS:
      return {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION || 'us-east-1',
      };
    case CLOUD_PROVIDERS.AZURE:
      return {
        subscriptionId: process.env.AZURE_SUBSCRIPTION_ID,
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        tenantId: process.env.AZURE_TENANT_ID,
      };
    case CLOUD_PROVIDERS.OPENAI:
      return {
        apiKey: process.env.OPENAI_API_KEY,
      };
    case CLOUD_PROVIDERS.ANTHROPIC:
      return {
        apiKey: process.env.ANTHROPIC_API_KEY,
      };
    case CLOUD_PROVIDERS.HUGGINGFACE:
      return {
        apiKey: process.env.HUGGINGFACE_API_KEY,
      };
    case CLOUD_PROVIDERS.KAGGLE:
      return {
        username: process.env.KAGGLE_USERNAME,
        key: process.env.KAGGLE_KEY,
      };
    case CLOUD_PROVIDERS.GOOGLE:
      return {
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        serviceAccountKey: process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY,
      };
    default:
      return null;
  }
}

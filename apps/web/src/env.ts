import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    DEMO_SUPA_API_KEY: z.string().min(1),
    LOOPS_API_KEY: z.string().optional(),
    OPENAI_API_KEY: z.string().optional(),
    API_ROUTE_SECRET: z.string().optional(),
    // Cloud Provider API Keys (placeholders - paste your keys)
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_REGION: z.string().optional(),
    AZURE_SUBSCRIPTION_ID: z.string().optional(),
    AZURE_CLIENT_ID: z.string().optional(),
    AZURE_CLIENT_SECRET: z.string().optional(),
    AZURE_TENANT_ID: z.string().optional(),
    ANTHROPIC_API_KEY: z.string().optional(),
    HUGGINGFACE_API_KEY: z.string().optional(),
    KAGGLE_USERNAME: z.string().optional(),
    KAGGLE_KEY: z.string().optional(),
    GOOGLE_CLOUD_PROJECT_ID: z.string().optional(),
    GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .url()
      .refine(
        (url) =>
          url.includes(".supabase.co") || url.startsWith("http://localhost"),
        "NEXT_PUBLIC_SUPABASE_URL must be a valid Supabase URL",
      ),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
    NEXT_PUBLIC_API_URL: z.string().url().optional(),
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    // Stripe (optional - billing removed)
    NEXT_PUBLIC_STRIPE_KEY: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_YEARLY: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PRODUCT_BASIC: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PRODUCT_ENTERPRISE: z.string().optional(),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY,
    NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_YEARLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_YEARLY,
    NEXT_PUBLIC_STRIPE_PRODUCT_BASIC:
      process.env.NEXT_PUBLIC_STRIPE_PRODUCT_BASIC,
    NEXT_PUBLIC_STRIPE_PRODUCT_ENTERPRISE:
      process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ENTERPRISE,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});

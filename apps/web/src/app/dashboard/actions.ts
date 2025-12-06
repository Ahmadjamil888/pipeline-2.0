"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function generateApiKey() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) {
    return;
  }

  // Note: api_keys table still requires team_id in the schema
  // This function may need to be updated when the schema is migrated
  await supabase.from("api_keys").insert({
    user_id: user.id,
    team_id: user.id, // Temporary: using user_id as team_id until schema is updated
    is_unlimited: false,
  });

  revalidatePath("/dashboard");
}

import { createClient } from "@supabase/supabase-js";

function getSupabaseServiceEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    const missing: string[] = [];

    if (!url) {
      missing.push("NEXT_PUBLIC_SUPABASE_URL");
    }

    if (!serviceRoleKey) {
      missing.push("SUPABASE_SERVICE_ROLE_KEY");
    }

    throw new Error(`Missing Supabase environment variables: ${missing.join(", ")}`);
  }

  return { url, serviceRoleKey };
}

export function createAdminClient() {
  const { url, serviceRoleKey } = getSupabaseServiceEnv();

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

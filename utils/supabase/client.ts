import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    const missing: string[] = [];

    if (!url) {
      missing.push("NEXT_PUBLIC_SUPABASE_URL");
    }
    if (!anonKey) {
      missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
    }

    throw new Error(`Missing Supabase environment variables: ${missing.join(", ")}`);
  }

  return createBrowserClient(url, anonKey);
}

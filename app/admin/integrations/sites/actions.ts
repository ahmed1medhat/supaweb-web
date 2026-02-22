"use server";

import { redirect } from "next/navigation";
import { isAdminEmail } from "@/utils/admin";
import { createClient } from "@/utils/supabase/server";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getBoolean(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true";
}

function withQueryParams(pathname: string, params: Record<string, string | undefined>): string {
  const [basePath, existingQuery = ""] = pathname.split("?");
  const searchParams = new URLSearchParams(existingQuery);

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

function redirectWithError(pathname: string, message: string): never {
  redirect(withQueryParams(pathname, { error: message }));
}

function redirectWithSuccess(pathname: string, message: string): never {
  redirect(withQueryParams(pathname, { success: message }));
}

function normalizeDomain(rawDomain: string): string {
  const trimmed = rawDomain.trim().toLowerCase();

  if (!trimmed) {
    return "";
  }

  try {
    const candidate = trimmed.includes("://") ? trimmed : `https://${trimmed}`;
    const url = new URL(candidate);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return trimmed.replace(/^www\./, "").replace(/\/.*$/, "");
  }
}

async function getAdminSupabaseClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/admin");
  }

  return supabase;
}

async function setDefaultSite(supabase: Awaited<ReturnType<typeof createClient>>, siteId: string) {
  const { error: clearError } = await supabase
    .from("sites")
    .update({ is_default: false, updated_at: new Date().toISOString() })
    .eq("is_default", true);

  if (clearError) {
    throw new Error(clearError.message);
  }

  const { error: setError } = await supabase
    .from("sites")
    .update({ is_default: true, updated_at: new Date().toISOString() })
    .eq("id", siteId);

  if (setError) {
    throw new Error(setError.message);
  }
}

export async function createSiteAction(formData: FormData) {
  const pathname = "/admin/integrations/sites";
  const supabase = await getAdminSupabaseClient();
  const name = getString(formData, "name");
  const normalizedDomain = normalizeDomain(getString(formData, "domain"));
  const makeDefault = getBoolean(formData, "make_default");

  if (!name) {
    redirectWithError(pathname, "Site name is required.");
  }

  if (!normalizedDomain) {
    redirectWithError(pathname, "A valid domain is required.");
  }

  const { data, error } = await supabase
    .from("sites")
    .insert({ name, domain: normalizedDomain })
    .select("id")
    .maybeSingle();

  if (error || !data) {
    redirectWithError(pathname, error?.message ?? "Could not create site.");
  }

  if (makeDefault) {
    try {
      await setDefaultSite(supabase, data.id);
    } catch (setDefaultError) {
      const message = setDefaultError instanceof Error ? setDefaultError.message : "Could not mark site as default.";
      redirectWithError(pathname, message);
    }
  }

  redirectWithSuccess(pathname, "Site created.");
}

export async function setDefaultSiteAction(formData: FormData) {
  const pathname = "/admin/integrations/sites";
  const supabase = await getAdminSupabaseClient();
  const siteId = getString(formData, "site_id");

  if (!siteId) {
    redirectWithError(pathname, "Site id is required.");
  }

  try {
    await setDefaultSite(supabase, siteId);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not set default site.";
    redirectWithError(pathname, message);
  }

  redirectWithSuccess(pathname, "Default site updated.");
}

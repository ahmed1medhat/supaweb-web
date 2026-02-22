export const ADMIN_EMAIL = "ahmed@supaweblabs.com";

export function isAdminEmail(email: string | null | undefined): boolean {
  return (email ?? "").trim().toLowerCase() === ADMIN_EMAIL;
}

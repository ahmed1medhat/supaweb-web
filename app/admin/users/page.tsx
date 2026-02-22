import Link from "next/link";
import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import { resolveEffectivePlan } from "@/lib/entitlements";
import { createClient } from "@/utils/supabase/server";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type AdminUsersPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

type UserProfileRow = {
  user_id: string;
  email: string | null;
  plan: string | null;
  subscription_status: string | null;
  admin_plan_override: string | null;
  admin_override_expires_at: string | null;
  updated_at: string;
};

function getString(value: SearchParamValue): string {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value[0] ?? "" : value;
}

function formatDateTime(value: string | null): string {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const query = getString(resolvedSearchParams.q).trim();
  const supabase = await createClient();

  let users: UserProfileRow[] = [];
  let loadError: string | null = null;

  let usersQuery = supabase
    .from("profiles")
    .select("user_id,email,plan,subscription_status,admin_plan_override,admin_override_expires_at,updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);

  if (query) {
    usersQuery = usersQuery.ilike("email", `%${query}%`);
  }

  const { data, error } = await usersQuery;
  if (error) {
    loadError = error.message;
  } else {
    users = (data ?? []) as UserProfileRow[];
  }

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Users</h1>
        <p className="mt-2 text-sm text-slate-400">
          Search users by email from profiles and manage plan overrides.
        </p>
      </header>

      <form method="get" className="flex flex-wrap gap-2">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search email..."
          className="min-w-[260px] rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Search
        </button>
        <Link
          href="/admin/users"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
        >
          Clear
        </Link>
      </form>

      <FlashMessage success={resolvedSearchParams.success} error={resolvedSearchParams.error ?? loadError ?? undefined} />

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-slate-900/90 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Effective Plan</th>
              <th className="px-3 py-2">Base Plan</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Override Expires</th>
              <th className="px-3 py-2">Updated</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-slate-950/30 text-slate-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-slate-400">
                  No matching users found.
                </td>
              </tr>
            ) : (
              users.map((profile) => {
                const { effectivePlan, source } = resolveEffectivePlan(profile);

                return (
                  <tr key={profile.user_id} className="hover:bg-slate-900/50">
                    <td className="px-3 py-2 font-medium text-slate-100">{profile.email ?? profile.user_id}</td>
                    <td className="px-3 py-2 text-slate-200 uppercase">
                      {effectivePlan}
                      {source === "admin_override" ? " (override)" : ""}
                    </td>
                    <td className="px-3 py-2 uppercase text-slate-300">{profile.plan ?? "free"}</td>
                    <td className="px-3 py-2 text-slate-300">{profile.subscription_status ?? "free"}</td>
                    <td className="px-3 py-2 text-slate-400">{formatDateTime(profile.admin_override_expires_at)}</td>
                    <td className="px-3 py-2 text-slate-400">{formatDateTime(profile.updated_at)}</td>
                    <td className="px-3 py-2">
                      <Link
                        href={`/admin/users/${profile.user_id}`}
                        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

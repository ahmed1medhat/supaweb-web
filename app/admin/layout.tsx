import { redirect } from "next/navigation";
import AdminForbidden from "@/app/admin/_components/admin-forbidden";
import AdminNavLink from "@/app/admin/_components/admin-nav-link";
import { isAdminEmail } from "@/utils/admin";
import { createClient } from "@/utils/supabase/server";

const NAV_ITEMS = [
  { href: "/admin", label: "Admin Home" },
  { href: "/admin/campaigns", label: "Campaigns" },
  { href: "/admin/campaigns/templates", label: "Campaign Templates" },
  { href: "/admin/integrations", label: "Integrations" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/courses", label: "Courses" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminEmail(user.email)) {
    return <AdminForbidden email={user.email} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-xl shadow-black/30">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Supaweb Admin</p>
          <p className="mt-1 truncate text-xs text-slate-400">{user.email}</p>
          <nav className="mt-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <AdminNavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </aside>

        <main className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
          {children}
        </main>
      </div>
    </div>
  );
}

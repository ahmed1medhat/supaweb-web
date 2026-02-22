import { ADMIN_EMAIL } from "@/utils/admin";

type AdminForbiddenProps = {
  email?: string | null;
};

export default function AdminForbidden({ email }: AdminForbiddenProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-slate-100">
      <section className="mx-auto max-w-2xl rounded-2xl border border-rose-400/30 bg-slate-900/80 p-8 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-300">403 Forbidden</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Admin Access Required</h1>
        <p className="mt-3 text-sm text-slate-300">
          This area is restricted to <span className="font-semibold text-white">{ADMIN_EMAIL}</span>.
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Signed in as: <span className="font-medium text-slate-200">{email ?? "Unknown user"}</span>
        </p>
      </section>
    </main>
  );
}

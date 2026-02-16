export default function Privacy() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <a href="/" className="text-white/70 hover:text-white">← Back</a>
        <h1 className="mt-8 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-white/70">
          SupaWeb uses Supabase for authentication and account management. The desktop scan agent runs locally.
          Reports are published online for viewing. We do not sell personal data.
        </p>
      </div>
    </main>
  );
}

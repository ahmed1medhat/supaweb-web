export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <a href="/" className="text-white/70 hover:text-white">← Back</a>
        <h1 className="mt-8 text-4xl font-bold">About SupaWeb</h1>
        <p className="mt-4 text-white/70">
          SupaWeb is a Revenue Intelligence platform for websites. We scan performance, UX, content, technical,
          and trust signals to identify revenue leaks and prioritize high-impact fixes.
        </p>
        <p className="mt-4 text-white/70">
          The desktop scan agent runs locally to crawl and compute. Results are published to the online dashboard for review and collaboration.
        </p>
      </div>
    </main>
  );
}

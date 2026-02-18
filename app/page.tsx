import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/30">
              <span className="text-xs font-black">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              SupaWeb
            </span>
          </Link>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-400 md:flex">
            <Link className="transition-colors hover:text-white" href="/about">
              About
            </Link>

            {/* ✅ ADDED HERE */}
            <Link className="transition-colors hover:text-white" href="/how-it-works">
              How It Works
            </Link>

            <Link className="transition-colors hover:text-white" href="/free-tools">
              Free Tools
            </Link>

            <Link className="transition-colors hover:text-white" href="/calculators">
              Calculators
            </Link>

            <Link className="transition-colors hover:text-white" href="/pricing">
              Pricing
            </Link>

            <Link className="transition-colors hover:text-white" href="/download">
              Download
            </Link>

            <Link className="transition-colors hover:text-white" href="/contact">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
            >
              Support
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* باقي الصفحة زي ما هي بدون أي تغيير */}
    </main>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SiteHeader() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const supabase = createClient();

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        setIsLoggedIn(Boolean(data.session));
        setIsReady(true);
      }
    };

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session));
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    if (!isReady) {
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/30">
            <span className="text-sm font-bold leading-none">S</span>
          </div>
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            SupaWeb
          </Link>
        </div>

        <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-400 md:flex">
          <Link href="/how-it-works" className="transition-colors hover:text-white">
            How It Works
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-white">
            Pricing
          </Link>
          <Link href="/free-tools" className="transition-colors hover:text-white">
            Free Tools
          </Link>
          <Link href="/calculators" className="transition-colors hover:text-white">
            Calculators
          </Link>
          <Link href="/download" className="transition-colors hover:text-white">
            Download
          </Link>
          <Link href="/security" className="transition-colors hover:text-white">
            Security
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isReady && isLoggedIn ? (
            <>
              <Link
                href="/app"
                className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const supabase = createClient();

    const finishAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const tokenHash = params.get("token_hash");
      const otpType = params.get("type") as EmailOtpType | null;

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          if (isMounted) {
            setErrorMessage(error.message);
          }
          return;
        }
      } else if (tokenHash && otpType) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: otpType,
        });

        if (error) {
          if (isMounted) {
            setErrorMessage(error.message);
          }
          return;
        }
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        if (isMounted) {
          setErrorMessage(userError?.message ?? "Authentication failed. Please log in.");
        }
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("user_id", user.id)
        .maybeSingle();

      router.replace(profile?.plan ? "/app" : "/select-plan");
    };

    void finishAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (errorMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
        <section className="w-full max-w-md rounded-2xl border border-red-400/40 bg-slate-900/80 p-8 shadow-2xl shadow-black/40">
          <h1 className="text-2xl font-bold text-white">Authentication error</h1>
          <p className="mt-3 text-sm text-red-300">{errorMessage}</p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <p className="text-sm text-slate-400">Completing sign in...</p>
    </main>
  );
}

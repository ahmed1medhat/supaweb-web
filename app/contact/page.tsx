"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    consent: false,
  });

  const canSubmit =
    form.name.trim().length >= 2 &&
    form.email.includes("@") &&
    form.message.trim().length >= 10 &&
    form.consent;

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(
      "Thanks! Please email us directly at support@supaweblabs.com.\n\n(Form backend will be connected soon.)"
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Hero */}
        <header className="mb-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Contact SupaWeb Labs
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            For support, billing, or product inquiries — we’re here to help.
          </p>
          <p className="mt-2 text-sm text-white/50">
            We typically respond within <span className="font-semibold text-white/80">24 hours</span> (Mon–Fri).
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left: Email Info */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-lg font-bold mb-4">Direct Support Email</h2>

            <a
              href="mailto:support@supaweblabs.com"
              className="text-xl font-semibold text-blue-300 hover:text-blue-200"
            >
              support@supaweblabs.com
            </a>

            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              For all inquiries including technical support, account access,
              billing questions, and general product guidance.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/70">
                Company Details
              </h3>
              <div className="mt-4 space-y-2 text-sm text-white/60">
                <p><span className="text-white/80 font-medium">Company:</span> SupaWeb Labs</p>
                <p><span className="text-white/80 font-medium">Website:</span> supaweblabs.com</p>
                <p><span className="text-white/80 font-medium">Location:</span> Remote-first (Global)</p>
                <p><span className="text-white/80 font-medium">Hours:</span> Mon–Fri, 10:00–18:00 EET</p>
              </div>
            </div>
          </section>

          {/* Right: Contact Form */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-lg font-bold mb-6">Send a Message</h2>

            <form onSubmit={onSubmit} className="space-y-5">

              <div>
                <label className="text-xs font-semibold text-white/70">
                  Full name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1224] px-4 py-3 text-sm text-white outline-none focus:border-blue-400/40"
                  placeholder="Ahmed Medhat"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70">
                  Work email
                </label>
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1224] px-4 py-3 text-sm text-white outline-none focus:border-blue-400/40"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70">
                  Company (optional)
                </label>
                <input
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1224] px-4 py-3 text-sm text-white outline-none focus:border-blue-400/40"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1224] px-4 py-3 text-sm text-white outline-none focus:border-blue-400/40"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <label className="flex items-start gap-3 text-xs text-white/60">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                />
                I agree to the{" "}
                <a href="/privacy" className="text-blue-300 hover:text-blue-200 font-semibold">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms" className="text-blue-300 hover:text-blue-200 font-semibold">
                  Terms of Service
                </a>
              </label>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-xl bg-blue-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-400 disabled:opacity-40"
              >
                Send Message
              </button>

              <p className="text-center text-xs text-white/50">
                Or email us directly at{" "}
                <a href="mailto:support@supaweblabs.com" className="text-blue-300 font-semibold">
                  support@supaweblabs.com
                </a>
              </p>
            </form>
          </section>

        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-sm text-white/50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white/80">Privacy Policy</a>
            <a href="/terms" className="hover:text-white/80">Terms of Service</a>
            <a href="/cookies" className="hover:text-white/80">Cookie Policy</a>
          </div>
          <div>© 2026 SupaWeb Labs. All rights reserved.</div>
        </footer>

      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminNavLinkProps = {
  href: string;
  label: string;
};

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminNavLink({ href, label }: AdminNavLinkProps) {
  const pathname = usePathname();
  const active = isRouteActive(pathname, href);

  return (
    <Link
      href={href}
      className={[
        "block rounded-lg border px-3 py-2 text-sm font-medium transition",
        active
          ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-100"
          : "border-white/10 bg-slate-900/50 text-slate-300 hover:border-white/20 hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

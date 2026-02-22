"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CampaignPosition, CampaignType, FrequencyMode } from "@/app/admin/campaigns/types";

type ActiveCampaign = {
  id: string;
  name: string | null;
  type: CampaignType;
  title: string | null;
  message: string | null;
  cta_text: string | null;
  cta_url: string | null;
  primary_color: string | null;
  text_color: string | null;
  background_style: string | null;
  position: CampaignPosition;
  frequency: FrequencyMode;
};

type ApiResponse = {
  campaign: ActiveCampaign | null;
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const DEFAULT_PRIMARY_COLOR = "#22d3ee";
const DEFAULT_TEXT_COLOR = "#f8fafc";
const DEFAULT_BACKGROUND_STYLE = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";

function isAdminPath(pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }

  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function safeHexColor(value: string | null | undefined, fallback: string): string {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function getStorageKey(campaign: ActiveCampaign): string {
  const suffix = campaign.frequency === "daily" ? "daily" : "session";
  return `campaign:dismissed:${suffix}:${campaign.id}`;
}

function isSuppressed(campaign: ActiveCampaign): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const key = getStorageKey(campaign);

  if (campaign.frequency === "session") {
    return sessionStorage.getItem(key) === "1";
  }

  const raw = localStorage.getItem(key);
  if (!raw) {
    return false;
  }

  const timestamp = Number.parseInt(raw, 10);
  if (!Number.isFinite(timestamp)) {
    return false;
  }

  return Date.now() - timestamp < DAY_IN_MS;
}

function persistSuppression(campaign: ActiveCampaign): void {
  if (typeof window === "undefined") {
    return;
  }

  const key = getStorageKey(campaign);

  if (campaign.frequency === "session") {
    sessionStorage.setItem(key, "1");
    return;
  }

  localStorage.setItem(key, String(Date.now()));
}

function getPositionClass(type: CampaignType, position: CampaignPosition): string {
  if (type === "top_bar") {
    return position === "bottom" ? "bottom-0" : "top-0";
  }

  if (type === "modal") {
    if (position === "top") {
      return "top-10";
    }

    if (position === "bottom") {
      return "bottom-10";
    }

    return "top-1/2 -translate-y-1/2";
  }

  if (position === "top") {
    return "top-6";
  }

  if (position === "center") {
    return "top-1/2 -translate-y-1/2";
  }

  return "bottom-6";
}

export default function CampaignWidget() {
  const pathname = usePathname();
  const [campaign, setCampaign] = useState<ActiveCampaign | null>(null);

  useEffect(() => {
    if (!pathname || isAdminPath(pathname)) {
      return;
    }

    const controller = new AbortController();
    let active = true;

    const loadCampaign = async () => {
      try {
        const searchParams = new URLSearchParams({ pathname });
        const response = await fetch(`/api/active-campaign?${searchParams.toString()}`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          if (active) {
            setCampaign(null);
          }
          return;
        }

        const payload = (await response.json()) as ApiResponse;
        const nextCampaign = payload?.campaign ?? null;

        if (active) {
          setCampaign(nextCampaign && !isSuppressed(nextCampaign) ? nextCampaign : null);
        }
      } catch {
        if (active) {
          setCampaign(null);
        }
      }
    };

    void loadCampaign();

    return () => {
      active = false;
      controller.abort();
    };
  }, [pathname]);

  const closeCampaign = () => {
    if (campaign) {
      persistSuppression(campaign);
    }

    setCampaign(null);
  };

  const campaignStyle = useMemo(
    () => ({
      background: campaign?.background_style?.trim() || DEFAULT_BACKGROUND_STYLE,
      color: safeHexColor(campaign?.text_color, DEFAULT_TEXT_COLOR),
      borderColor: `${safeHexColor(campaign?.primary_color, DEFAULT_PRIMARY_COLOR)}66`,
    }),
    [campaign],
  );

  const ctaStyle = useMemo(
    () => ({
      backgroundColor: safeHexColor(campaign?.primary_color, DEFAULT_PRIMARY_COLOR),
      color: "#020617",
    }),
    [campaign],
  );

  if (!pathname || isAdminPath(pathname) || !campaign) {
    return null;
  }

  const title = campaign.title?.trim() || campaign.name?.trim() || "Latest update";
  const message = campaign.message?.trim() || "";
  const ctaText = campaign.cta_text?.trim() || "Learn more";
  const ctaUrl = campaign.cta_url?.trim() || "";
  const showCta = ctaUrl.length > 0;
  const positionClass = getPositionClass(campaign.type, campaign.position);

  if (campaign.type === "top_bar") {
    return (
      <aside className={`fixed inset-x-0 ${positionClass} z-[1000] border-b border-t`} style={campaignStyle}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{title}</p>
            {message ? <p className="truncate text-xs opacity-90">{message}</p> : null}
          </div>
          <div className="flex items-center gap-2">
            {showCta ? (
              <Link href={ctaUrl} className="rounded-md px-3 py-1.5 text-xs font-semibold" style={ctaStyle}>
                {ctaText}
              </Link>
            ) : null}
            <button
              type="button"
              onClick={closeCampaign}
              className="rounded-md border border-white/30 px-2 py-1 text-xs font-semibold text-white/90"
              aria-label="Dismiss campaign"
            >
              X
            </button>
          </div>
        </div>
      </aside>
    );
  }

  if (campaign.type === "modal") {
    return (
      <div className="fixed inset-0 z-[1000]">
        <button
          type="button"
          onClick={closeCampaign}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"
          aria-label="Close campaign modal"
        />
        <aside
          className={`absolute left-1/2 w-[92%] max-w-lg -translate-x-1/2 rounded-2xl border p-5 shadow-2xl ${positionClass}`}
          style={campaignStyle}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-lg font-semibold">{title}</p>
              {message ? <p className="mt-2 text-sm opacity-95">{message}</p> : null}
            </div>
            <button
              type="button"
              onClick={closeCampaign}
              className="rounded-md border border-white/30 px-2 py-1 text-xs font-semibold text-white/90"
              aria-label="Dismiss campaign"
            >
              X
            </button>
          </div>
          {showCta ? (
            <Link href={ctaUrl} className="mt-4 inline-flex rounded-lg px-4 py-2 text-sm font-semibold" style={ctaStyle}>
              {ctaText}
            </Link>
          ) : null}
        </aside>
      </div>
    );
  }

  return (
    <aside
      className={`fixed right-4 z-[1000] w-[92%] max-w-sm rounded-2xl border p-4 shadow-2xl ${positionClass}`}
      style={campaignStyle}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">{title}</p>
          {message ? <p className="mt-1 text-xs opacity-95">{message}</p> : null}
        </div>
        <button
          type="button"
          onClick={closeCampaign}
          className="rounded-md border border-white/30 px-2 py-1 text-xs font-semibold text-white/90"
          aria-label="Dismiss campaign"
        >
          X
        </button>
      </div>
      {showCta ? (
        <Link href={ctaUrl} className="mt-3 inline-flex rounded-lg px-3 py-2 text-xs font-semibold" style={ctaStyle}>
          {ctaText}
        </Link>
      ) : null}
    </aside>
  );
}

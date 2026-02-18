"use client";

import { useState, useEffect } from "react";
import {
  Download, ArrowRight, Shield, Zap, CheckCircle2,
  Clock, Monitor, Globe, BarChart3, Lock, Database,
  Server, Eye, Play, Cpu, Upload, Trash2,
  ChevronDown, Tag, Calendar, Mail, ExternalLink,
} from "lucide-react";

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 24px", height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div style={{
          width: "26px", height: "26px", borderRadius: "7px",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1.5 1.5H5.5V5.5H1.5V1.5Z" fill="white" />
            <path d="M7.5 1.5H11.5V5.5H7.5V1.5Z" fill="white" opacity="0.55" />
            <path d="M1.5 7.5H5.5V11.5H1.5V7.5Z" fill="white" opacity="0.55" />
            <path d="M7.5 7.5H11.5V11.5H7.5V7.5Z" fill="white" />
          </svg>
        </div>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>SupaWeb</span>
      </a>

      <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {[
          { label: "How it Works", href: "#how-it-works" },
          { label: "Security", href: "#security" },
          { label: "Changelog", href: "#release-notes" },
        ].map((l) => (
          <a key={l.label} href={l.href} style={{
            fontSize: "13px", color: "var(--muted)", textDecoration: "none",
            padding: "6px 12px", borderRadius: "6px", transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.background = "var(--surface-2)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.background = "transparent"; }}
          >{l.label}</a>
        ))}
      </nav>

      <a id="nav-download-btn" href="#download" style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
        background: "#fff", color: "#000", textDecoration: "none",
        transition: "all 0.2s ease",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "#e8e8e8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <Download size={13} /> Download
      </a>
    </header>
  );
}

// ─── HERO DASHBOARD PREVIEW ───────────────────────────────────────────────────
const SCAN_ITEMS = [
  { label: "Core Web Vitals", status: "pass", value: "98/100" },
  { label: "Revenue Signals", status: "pass", value: "1,607" },
  { label: "Indexation Gaps", status: "warn", value: "12" },
  { label: "Schema Markup", status: "pass", value: "Validated" },
  { label: "Crawl Depth", status: "pass", value: "4 levels" },
  { label: "Orphan Pages", status: "warn", value: "3 found" },
];

function DashboardPreview() {
  const [progress, setProgress] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 0.5), 40);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveItem(i => (i + 1) % SCAN_ITEMS.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px",
      overflow: "hidden", width: "100%", maxWidth: "640px",
      boxShadow: "0 40px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.04)",
    }}>
      {/* Chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px",
        borderBottom: "1px solid var(--border)", background: "var(--surface-2)",
      }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{ flex: 1, textAlign: "center", fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}>
          SupaWeb Desktop Agent — v2.4.1
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
          <span style={{ fontSize: "10px", color: "#10b981" }}>LIVE</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", height: "300px" }}>
        {/* Sidebar */}
        <div style={{ width: "150px", borderRight: "1px solid var(--border)", padding: "12px 0", background: "var(--surface)", flexShrink: 0 }}>
          {[
            { icon: "⚡", label: "Scan Engine", active: true },
            { icon: "📊", label: "Revenue Map", active: false },
            { icon: "🔒", label: "Security", active: false },
            { icon: "📋", label: "Reports", active: false },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", fontSize: "12px",
              color: item.active ? "var(--foreground)" : "var(--muted)",
              background: item.active ? "var(--surface-3)" : "transparent",
              borderLeft: item.active ? "2px solid #6366f1" : "2px solid transparent",
            }}>
              <span style={{ fontSize: "13px" }}>{item.icon}</span>{item.label}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "14px", overflow: "hidden" }}>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "11px", color: "var(--muted)" }}>Scanning acme-corp.com</span>
              <span style={{ fontSize: "11px", color: "#6366f1", fontFamily: "var(--font-geist-mono)" }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: "3px", background: "var(--surface-3)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#6366f1,#8b5cf6)", transition: "width 0.1s linear" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {SCAN_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "7px 10px", borderRadius: "6px",
                background: i === activeItem ? "var(--surface-3)" : "transparent",
                border: `1px solid ${i === activeItem ? "var(--border-hover)" : "transparent"}`,
                transition: "all 0.3s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: i === activeItem ? "#6366f1" : item.status === "pass" ? "#10b981" : "#f59e0b",
                    boxShadow: i === activeItem ? "0 0 8px #6366f1" : "none",
                  }} />
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>{item.label}</span>
                </div>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: item.status === "pass" ? "#10b981" : "#f59e0b" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "10px", padding: "8px 10px", borderRadius: "6px",
            background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <Zap size={12} color="#6366f1" />
            <span style={{ fontSize: "10px", color: "#6366f1", fontFamily: "var(--font-geist-mono)" }}>
              Local execution · Zero data egress · Encrypted tunnel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ position: "relative", zIndex: 1, paddingTop: "140px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px",
            borderRadius: "100px", fontSize: "12px", fontWeight: 500, letterSpacing: "0.02em",
            border: "1px solid rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.08)", color: "#818cf8",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 6px #6366f1" }} />
            Now available for Windows · v2.4.1
          </div>
        </div>

        <h1 style={{
          textAlign: "center", fontSize: "clamp(36px,6vw,72px)", fontWeight: 700,
          lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 24px",
        }}>
          <span style={{ background: "linear-gradient(135deg,#f0f0f0,#a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Run Enterprise-Grade Revenue Scans
          </span>
          <br />
          <span style={{ background: "linear-gradient(135deg,#818cf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            From Your Desktop
          </span>
        </h1>

        <p style={{
          textAlign: "center", fontSize: "18px", lineHeight: 1.6, color: "var(--muted)",
          maxWidth: "560px", margin: "0 auto 40px",
        }}>
          SupaWeb Desktop Agent executes deep revenue intelligence scans locally — analyzing 1,607 factors —
          while your web dashboard visualizes every insight in real time.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
          <a id="download-windows-btn" href="#download" style={{
            display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px",
            borderRadius: "8px", fontSize: "15px", fontWeight: 600, background: "#fff", color: "#000",
            textDecoration: "none", transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#efefef"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Download size={16} /> Download for Windows
          </a>
          <a href="#how-it-works" style={{
            display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px",
            borderRadius: "8px", fontSize: "15px", fontWeight: 500, background: "transparent",
            color: "var(--muted)", border: "1px solid var(--border)", textDecoration: "none", transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            See how it works <ArrowRight size={16} />
          </a>
        </div>

        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" }}>
          {[
            { icon: <Shield size={13} />, text: "SOC 2 Ready Architecture" },
            { icon: <CheckCircle2 size={13} />, text: "No raw data stored" },
            { icon: <Zap size={13} />, text: "Local execution engine" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--muted)" }}>
              <span style={{ color: "#10b981" }}>{item.icon}</span>{item.text}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

// ─── PLATFORM AVAILABILITY ────────────────────────────────────────────────────
const PLATFORMS = [
  {
    id: "windows", name: "Windows", version: "v2.4.1", size: "84 MB",
    req: "Windows 10 / 11 (64-bit)", available: true, badge: "Stable",
    badgeColor: "#10b981", badgeBg: "rgba(16,185,129,0.1)", badgeBorder: "rgba(16,185,129,0.2)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M2 4.5L13.5 3V14H2V4.5Z" fill="currentColor" />
        <path d="M15 2.8L30 0.5V14H15V2.8Z" fill="currentColor" />
        <path d="M2 16H13.5V27L2 25.5V16Z" fill="currentColor" />
        <path d="M15 16H30V29.5L15 27.2V16Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "macos", name: "macOS", version: "Coming Soon", size: "—",
    req: "macOS 13+ (Apple Silicon & Intel)", available: false, badge: "Q3 2025",
    badgeColor: "var(--muted)", badgeBg: "var(--surface-3)", badgeBorder: "var(--border)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M21.5 4C21.5 4 22.8 1 26 1C26 4.5 23.5 6 21.5 6Z" fill="currentColor" />
        <path d="M16 7C19.5 7 21.5 5 24 5C27 5 30 8 30 14C30 20 27 27 24 27C22 27 21 25.5 18 25.5C15 25.5 14 27 12 27C9 27 6 20 6 14C6 8 9 5 12 5C14.5 5 12.5 7 16 7Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "linux", name: "Linux", version: "Coming Soon", size: "—",
    req: "Ubuntu 20.04+ / Debian 11+", available: false, badge: "Q4 2025",
    badgeColor: "var(--muted)", badgeBg: "var(--surface-3)", badgeBorder: "var(--border)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2C16 2 10 4 10 12C10 16 11 18 11 20C11 22 9 24 9 26C9 28 11 30 14 30C16 30 17 29 17 29C17 29 18 30 20 30C23 30 25 28 25 26C25 24 23 22 23 20C23 18 24 16 24 12C24 4 16 2 16 2Z" fill="currentColor" />
        <circle cx="13" cy="13" r="2" fill="var(--background)" />
        <circle cx="19" cy="13" r="2" fill="var(--background)" />
      </svg>
    ),
  },
];

function PlatformAvailability() {
  return (
    <section id="download" style={{ position: "relative", zIndex: 1, padding: "96px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>Download</p>
          <h2 style={{
            fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px",
            background: "linear-gradient(135deg,#f0f0f0,#a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Choose Your Platform</h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            The Desktop Agent runs natively on your machine. No cloud dependency for execution — only for visualization.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px", maxWidth: "900px", margin: "0 auto" }}>
          {PLATFORMS.map(p => (
            <div key={p.id} id={`platform-${p.id}`} style={{
              background: "var(--surface)",
              border: `1px solid ${p.available ? "rgba(255,255,255,0.1)" : "var(--border)"}`,
              borderRadius: "12px", padding: "28px", position: "relative", overflow: "hidden",
              opacity: p.available ? 1 : 0.6, transition: "all 0.2s ease",
            }}>
              {p.available && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at top left,rgba(99,102,241,0.06) 0%,transparent 60%)",
                  pointerEvents: "none",
                }} />
              )}
              <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                <span style={{
                  fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "100px",
                  background: p.badgeBg, color: p.badgeColor, border: `1px solid ${p.badgeBorder}`,
                }}>{p.badge}</span>
              </div>
              <div style={{ color: p.available ? "var(--foreground)" : "var(--muted)", marginBottom: "16px" }}>{p.icon}</div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 4px", color: p.available ? "var(--foreground)" : "var(--muted)" }}>{p.name}</h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 12px", fontFamily: "var(--font-geist-mono)" }}>
                {p.version}{p.size !== "—" && <span style={{ marginLeft: "8px" }}>· {p.size}</span>}
              </p>
              <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 24px", lineHeight: 1.5 }}>{p.req}</p>
              {p.available ? (
                <a id={`download-${p.id}`} href="#" style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
                  background: "#fff", color: "#000", textDecoration: "none", transition: "all 0.2s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#efefef"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
                >
                  <Download size={15} /> Download for {p.name}
                </a>
              ) : (
                <button disabled style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
                  background: "var(--surface-3)", color: "var(--muted)", border: "1px solid var(--border)", cursor: "not-allowed",
                }}>
                  <Clock size={14} /> Notify Me When Available
                </button>
              )}
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--muted)", marginTop: "32px" }}>
          All releases are signed and SHA-256 verified.{" "}
          <a href="#release-notes" style={{ color: "#6366f1", textDecoration: "none" }}>View checksums →</a>
        </p>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01", icon: <Monitor size={20} />, title: "Install & Configure", tag: "Local Setup",
    desc: "Download the native agent for your OS. Connect it to your SupaWeb account with a single API token. No complex setup — operational in under 3 minutes.",
    detail: "Runs as a background service. Zero browser extension required.",
    emphasis: false,
  },
  {
    num: "02", icon: <Globe size={20} />, title: "Desktop Executes", tag: "Local Execution",
    desc: "Your machine crawls the target domain at full depth. All 1,607 revenue factors are analyzed locally — no raw crawl data ever leaves your network perimeter.",
    detail: "Encrypted scan metadata only is transmitted to Supabase.",
    emphasis: true,
  },
  {
    num: "03", icon: <BarChart3 size={20} />, title: "Web Visualizes", tag: "Cloud Visualization",
    desc: "Structured scan results appear instantly in your SupaWeb cloud dashboard. Share reports with stakeholders, track trends over time, and export to PDF.",
    detail: "Real-time sync via secure WebSocket tunnel.",
    emphasis: false,
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ position: "relative", zIndex: 1, padding: "96px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>Architecture</p>
          <h2 style={{
            fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px",
            background: "linear-gradient(135deg,#f0f0f0,#a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>How It Works</h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            A hybrid architecture designed for enterprise security. Execution stays local. Intelligence goes to the cloud.
          </p>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "16px",
          padding: "16px 24px", borderRadius: "10px",
          background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)",
          maxWidth: "560px", margin: "0 auto 56px", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Monitor size={16} color="var(--foreground)" />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>Desktop executes.</span>
          </div>
          <div style={{ width: "40px", height: "1px", background: "var(--border)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Globe size={16} color="#6366f1" />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#6366f1" }}>Web visualizes.</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2px" }}>
          {STEPS.map((step, i) => (
            <div key={i} id={`step-${i + 1}`} style={{
              position: "relative", padding: "32px",
              background: step.emphasis ? "var(--surface-2)" : "var(--surface)",
              border: `1px solid ${step.emphasis ? "rgba(99,102,241,0.2)" : "var(--border)"}`,
              borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : "0",
              overflow: "hidden",
            }}>
              {step.emphasis && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
              )}
              <div style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: step.emphasis ? "#6366f1" : "var(--muted)", marginBottom: "16px", fontWeight: 600, letterSpacing: "0.08em" }}>{step.num}</div>
              <div style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px", borderRadius: "10px", marginBottom: "16px",
                background: step.emphasis ? "rgba(99,102,241,0.12)" : "var(--surface-3)",
                border: `1px solid ${step.emphasis ? "rgba(99,102,241,0.2)" : "var(--border)"}`,
                color: step.emphasis ? "#6366f1" : "var(--muted)",
              }}>{step.icon}</div>
              <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: step.emphasis ? "#6366f1" : "var(--muted)", marginBottom: "12px" }}>{step.tag}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", color: "var(--foreground)" }}>{step.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.65, margin: "0 0 16px" }}>{step.desc}</p>
              <p style={{ fontSize: "12px", color: step.emphasis ? "#6366f1" : "var(--muted)", fontFamily: "var(--font-geist-mono)", opacity: 0.8 }}>→ {step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── SECURITY ARCHITECTURE ────────────────────────────────────────────────────
const SEC_FEATURES = [
  { icon: <Lock size={16} />, title: "End-to-End Encryption", desc: "All scan metadata transmitted via TLS 1.3. AES-256 at rest in Supabase." },
  { icon: <Database size={16} />, title: "No Raw Data Storage", desc: "Raw crawl data never leaves your machine. Only structured scan results are synced." },
  { icon: <Shield size={16} />, title: "SOC 2 Ready", desc: "Architecture designed to meet SOC 2 Type II compliance requirements." },
  { icon: <Eye size={16} />, title: "Audit Logging", desc: "Every scan, export, and access event is logged with immutable timestamps." },
];

const STACK = [
  { id: "desktop", label: "Desktop Agent", sub: "Your Machine", color: "var(--foreground)", bg: "var(--surface-3)", border: "rgba(255,255,255,0.12)", icon: <Server size={16} /> },
  { id: "supabase", label: "Supabase", sub: "Auth + Database", color: "#3ecf8e", bg: "rgba(62,207,142,0.06)", border: "rgba(62,207,142,0.2)", icon: <Database size={16} /> },
  { id: "polar", label: "Polar.sh", sub: "Billing + Licensing", color: "#818cf8", bg: "rgba(129,140,248,0.06)", border: "rgba(129,140,248,0.2)", icon: <Lock size={16} /> },
  { id: "vercel", label: "Vercel", sub: "Web Dashboard", color: "#f0f0f0", bg: "rgba(240,240,240,0.04)", border: "rgba(240,240,240,0.12)", icon: <Shield size={16} /> },
];

function SecurityArchitecture() {
  return (
    <section id="security" style={{ position: "relative", zIndex: 1, padding: "96px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>Security</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px", background: "linear-gradient(135deg,#f0f0f0,#a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Built for Enterprise Security
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
            Every architectural decision prioritizes data sovereignty. Your crawl data never leaves your perimeter.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
          {/* Stack */}
          <div>
            <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "20px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Technology Stack</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {STACK.map((node, i) => (
                <div key={node.id}>
                  <div id={`stack-${node.id}`} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "10px", background: node.bg, border: `1px solid ${node.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", background: "var(--surface-3)", color: node.color, flexShrink: 0 }}>{node.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: node.color, marginBottom: "2px" }}>{node.label}</div>
                      <div style={{ fontSize: "12px", color: "var(--muted)" }}>{node.sub}</div>
                    </div>
                    {i < STACK.length - 1 && <ArrowRight size={14} color="var(--muted)" />}
                  </div>
                  {i < STACK.length - 1 && <div style={{ width: "1px", height: "8px", background: "var(--border)", margin: "0 auto" }} />}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px", padding: "14px 16px", borderRadius: "10px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "1px" }} />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#10b981", marginBottom: "4px" }}>Zero Raw Data Storage Guarantee</div>
                <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>No raw crawl data is permanently stored on SupaWeb servers. Only structured scan metadata and aggregated metrics are retained.</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "20px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Security Controls</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {SEC_FEATURES.map((f, i) => (
                <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", transition: "border-color 0.2s ease" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", color: "#6366f1", flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px", color: "var(--foreground)" }}>{f.title}</h4>
                      <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["SOC 2 Ready", "GDPR Compliant", "TLS 1.3", "AES-256"].map(b => (
                <span key={b} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 500, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--muted)" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── OPERATIONAL TRANSPARENCY ─────────────────────────────────────────────────
const LIFECYCLE = [
  { id: "init", icon: <Play size={14} />, label: "Scan Initiated", desc: "User triggers scan from web dashboard or CLI. Target URL and scan parameters are sent to the Desktop Agent.", local: true, highlight: false },
  { id: "execute", icon: <Cpu size={14} />, label: "Local Execution", desc: "Desktop Agent crawls the domain entirely on your machine. All 1,607 revenue factors are evaluated locally. No external calls during crawl.", local: true, highlight: true },
  { id: "process", icon: <BarChart3 size={14} />, label: "Results Structured", desc: "Raw crawl data is processed into structured scan metadata. Revenue signals, risk scores, and recommendations are computed locally.", local: true, highlight: false },
  { id: "sync", icon: <Upload size={14} />, label: "Metadata Synced", desc: "Only structured results (not raw data) are transmitted to Supabase via encrypted channel. Typical payload: < 2MB per scan.", local: false, highlight: false },
  { id: "purge", icon: <Trash2 size={14} />, label: "Raw Data Purged", desc: "Raw crawl cache is automatically cleared from local disk after sync. Retention period is configurable (default: 24h).", local: true, highlight: false },
];

function OperationalTransparency() {
  return (
    <section id="transparency" style={{ position: "relative", zIndex: 1, padding: "96px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>Transparency</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px", background: "linear-gradient(135deg,#f0f0f0,#a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            The Scan Lifecycle, Explained
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
            We believe enterprise clients deserve to understand exactly what happens to their data at every step.
          </p>
        </div>

        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "20px", marginBottom: "32px", justifyContent: "center" }}>
            {[{ color: "var(--foreground)", label: "Local (your machine)" }, { color: "#6366f1", label: "Cloud (encrypted)" }].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color }} />
                <span style={{ fontSize: "12px", color: "var(--muted)" }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "19px", top: "20px", bottom: "20px", width: "1px", background: "linear-gradient(180deg,var(--border) 0%,#6366f1 50%,var(--border) 100%)" }} />
            {LIFECYCLE.map(step => (
              <div key={step.id} id={`lifecycle-${step.id}`} style={{ display: "flex", gap: "20px", padding: "20px 0", position: "relative" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0, zIndex: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: step.highlight ? "rgba(99,102,241,0.12)" : step.local ? "var(--surface-2)" : "rgba(99,102,241,0.08)",
                  border: `1px solid ${step.highlight ? "rgba(99,102,241,0.4)" : step.local ? "var(--border)" : "rgba(99,102,241,0.2)"}`,
                  color: step.highlight ? "#6366f1" : step.local ? "var(--muted)" : "#6366f1",
                  boxShadow: step.highlight ? "0 0 16px rgba(99,102,241,0.2)" : "none",
                }}>{step.icon}</div>
                <div style={{ flex: 1, paddingTop: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: 600, margin: 0, color: "var(--foreground)", letterSpacing: "-0.01em" }}>{step.label}</h4>
                    <span style={{
                      fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px",
                      background: step.local ? "var(--surface-3)" : "rgba(99,102,241,0.08)",
                      color: step.local ? "var(--muted)" : "#6366f1",
                      border: `1px solid ${step.local ? "var(--border)" : "rgba(99,102,241,0.2)"}`,
                      letterSpacing: "0.06em", textTransform: "uppercase" as const,
                    }}>{step.local ? "LOCAL" : "CLOUD"}</span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "32px", padding: "20px 24px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 8px", color: "var(--foreground)" }}>What is the &quot;Execution Engine&quot;?</h4>
            <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0, lineHeight: 1.65 }}>
              The Desktop Agent is the <strong style={{ color: "var(--foreground)" }}>Execution Engine</strong> — the component responsible for all crawling, analysis, and computation.
              It is intentionally separated from the web interface to ensure that sensitive domain data never transits through third-party infrastructure.
              The web dashboard is purely a <em>visualization layer</em> that reads structured results from your Supabase instance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── RELEASE NOTES ────────────────────────────────────────────────────────────
const RELEASES = [
  {
    version: "v2.4.1", date: "2026-02-14", tag: "Latest",
    tagColor: "#10b981", tagBg: "rgba(16,185,129,0.08)", tagBorder: "rgba(16,185,129,0.2)",
    notes: [
      { type: "fix", text: "Resolved memory leak in long-running scans (>10k pages)" },
      { type: "fix", text: "Fixed schema markup detection for JSON-LD nested arrays" },
      { type: "improve", text: "Reduced average scan time by 18% via parallel crawl workers" },
      { type: "improve", text: "Improved encrypted tunnel stability on high-latency connections" },
    ],
    sha256: "a3f8c2d1e4b7...9f2a1c3d",
  },
  {
    version: "v2.4.0", date: "2026-01-28", tag: "Feature",
    tagColor: "#6366f1", tagBg: "rgba(99,102,241,0.08)", tagBorder: "rgba(99,102,241,0.2)",
    notes: [
      { type: "new", text: "Added Core Web Vitals v3 signal detection (INP support)" },
      { type: "new", text: "Introduced configurable raw data retention policy (1h–7d)" },
      { type: "new", text: "CLI mode: trigger scans via supaweb scan --url <domain>" },
      { type: "improve", text: "Revenue factor coverage expanded from 1,512 to 1,607 factors" },
    ],
    sha256: "b9e1d4f2a5c8...3e7b2d4f",
  },
  {
    version: "v2.3.2", date: "2026-01-10", tag: "Patch",
    tagColor: "#f59e0b", tagBg: "rgba(245,158,11,0.08)", tagBorder: "rgba(245,158,11,0.2)",
    notes: [
      { type: "fix", text: "Security patch: updated Electron to v28.3.1 (CVE-2025-8821)" },
      { type: "fix", text: "Fixed Windows 10 tray icon rendering on high-DPI displays" },
    ],
    sha256: "c7d3e6f1a2b4...5a9c1e3f",
  },
];
const TYPE_LABEL: Record<string, { color: string; label: string }> = {
  new: { color: "#6366f1", label: "NEW" },
  fix: { color: "#10b981", label: "FIX" },
  improve: { color: "#f59e0b", label: "IMPROVED" },
};

function ReleaseNotes() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="release-notes" style={{ position: "relative", zIndex: 1, padding: "96px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>Changelog</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px", background: "linear-gradient(135deg,#f0f0f0,#a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Release Notes
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
            Every release is signed, versioned, and documented. No silent updates.
          </p>
        </div>

        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          {RELEASES.map((r, i) => (
            <div key={r.version} id={`release-${r.version}`} style={{ background: "var(--surface)", border: `1px solid ${open === i ? "rgba(255,255,255,0.1)" : "var(--border)"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s ease" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                  <Tag size={14} color="var(--muted)" />
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-geist-mono)", letterSpacing: "-0.01em" }}>{r.version}</span>
                  <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", background: r.tagBg, color: r.tagColor, border: `1px solid ${r.tagBorder}`, letterSpacing: "0.06em" }}>{r.tag}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Calendar size={12} color="var(--muted)" />
                  <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}>{r.date}</span>
                </div>
                <ChevronDown size={16} color="var(--muted)" style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }} />
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "16px" }}>
                    {r.notes.map((note, j) => {
                      const s = TYPE_LABEL[note.type] || TYPE_LABEL.improve;
                      return (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: "var(--surface-3)", color: s.color, letterSpacing: "0.08em", flexShrink: 0, marginTop: "2px", fontFamily: "var(--font-geist-mono)" }}>{s.label}</span>
                          <span style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.55 }}>{note.text}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: "20px", padding: "10px 14px", borderRadius: "8px", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>SHA-256:</span>
                    <span style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: "var(--foreground)", opacity: 0.6 }}>{r.sha256}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "0 0 120px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ position: "relative", borderRadius: "20px", padding: "72px 48px", textAlign: "center", background: "var(--surface)", border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 500, border: "1px solid rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.08)", color: "#818cf8", marginBottom: "24px" }}>
              Free to start · No credit card required
            </div>
            <h2 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0 0 16px", lineHeight: 1.1, background: "linear-gradient(135deg,#f0f0f0,#a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Ready to scan your first domain?
            </h2>
            <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.6 }}>
              Download the Desktop Agent, connect your account, and run your first enterprise revenue scan in under 3 minutes.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a id="final-download-btn" href="#download" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, background: "#fff", color: "#000", textDecoration: "none", transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#efefef"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Download size={16} /> Download for Windows
              </a>
              <a href="mailto:enterprise@supaweb.app" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, background: "transparent", color: "var(--muted)", border: "1px solid var(--border)", textDecoration: "none", transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                Talk to Sales <ArrowRight size={16} />
              </a>
            </div>
            <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "24px" }}>
              Enterprise plan?{" "}
              <a href="mailto:enterprise@supaweb.app" style={{ color: "#6366f1", textDecoration: "none" }}>Contact us for custom onboarding, SLA, and DPA →</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  product: [{ label: "Documentation", href: "#" }, { label: "Changelog", href: "#release-notes" }, { label: "Status Page", href: "#" }, { label: "Roadmap", href: "#" }],
  company: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }],
  legal: [{ label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }, { label: "DPA", href: "#" }, { label: "Security Policy", href: "#" }],
};

function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--border)", paddingTop: "64px", paddingBottom: "40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "56px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2H6V6H2V2Z" fill="white" />
                  <path d="M8 2H12V6H8V2Z" fill="white" opacity="0.6" />
                  <path d="M2 8H6V12H2V8Z" fill="white" opacity="0.6" />
                  <path d="M8 8H12V12H8V8Z" fill="white" />
                </svg>
              </div>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>SupaWeb</span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.65, maxWidth: "260px", margin: "0 0 20px" }}>
              Enterprise Revenue Intelligence. 1,607 factors. Local execution. Cloud visualization.
            </p>
            <a id="footer-support-email" href="mailto:support@supaweb.app" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; }}
            >
              <Mail size={13} /> support@supaweb.app
            </a>
          </div>
          {(["product", "company", "legal"] as const).map(col => (
            <div key={col}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "16px" }}>{col.charAt(0).toUpperCase() + col.slice(1)}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {FOOTER_LINKS[col].map(link => (
                  <a key={link.label} href={link.href} style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; }}
                  >{link.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,var(--border),transparent)", marginBottom: "24px" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>© 2026 SupaWeb. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--muted)" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
              All systems operational
            </span>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--muted)", textDecoration: "none" }}>
              Status <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,var(--border),transparent)" }} />
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Divider />
      <PlatformAvailability />
      <Divider />
      <HowItWorks />
      <Divider />
      <SecurityArchitecture />
      <Divider />
      <OperationalTransparency />
      <Divider />
      <ReleaseNotes />
      <FinalCTA />
      <Footer />
    </main>
  );
}

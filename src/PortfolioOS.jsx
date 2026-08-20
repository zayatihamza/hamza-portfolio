import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Folder, FolderOpen, TerminalSquare, User, Wrench, Mail, FileText,
  Settings as SettingsIcon, X, Minus, Square, Maximize2, Wifi, Activity,
  RefreshCw, FilePlus, FileImage, FileJson, FileCode2, ChevronRight,
  Code2 as GithubIcon, Link2 as LinkedinIcon, Send, Download, Sun, Moon, Palette, Server,
  ShieldCheck, GitBranch, Boxes, Cpu, Network, Database, Layers,
  ExternalLink, Home, ArrowLeft, Check, Circle
} from "lucide-react";

/* ============================== THEME ============================== */

const THEMES = {
  dark: {
    bg: "#080b12",
    panel: "rgba(17,22,33,0.72)",
    panelSolid: "#11141f",
    panel2: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.09)",
    borderStrong: "rgba(255,255,255,0.16)",
    text: "#e9eef5",
    textMuted: "#8993a8",
    textFaint: "#5a6478",
    accent: "#5eead4",
    accent2: "#a78bfa",
    accentSoft: "rgba(94,234,212,0.13)",
    danger: "#f87171",
    warn: "#fbbf24",
    dockBg: "rgba(14,17,26,0.55)",
  },
  light: {
    bg: "#eef1f6",
    panel: "rgba(255,255,255,0.78)",
    panelSolid: "#ffffff",
    panel2: "rgba(15,23,42,0.03)",
    border: "rgba(15,23,42,0.09)",
    borderStrong: "rgba(15,23,42,0.16)",
    text: "#101827",
    textMuted: "#5b6577",
    textFaint: "#8891a0",
    accent: "#0d9488",
    accent2: "#7c3aed",
    accentSoft: "rgba(13,148,136,0.10)",
    danger: "#dc2626",
    warn: "#d97706",
    dockBg: "rgba(255,255,255,0.55)",
  },
};

const WALLPAPERS = [
  {
    id: "nebula",
    label: "Nebula",
    dark: "radial-gradient(ellipse 60% 50% at 18% 15%, rgba(94,234,212,0.16) 0%, transparent 60%), radial-gradient(ellipse 55% 55% at 85% 80%, rgba(167,139,250,0.18) 0%, transparent 60%), linear-gradient(180deg, #060810 0%, #0b0f1a 55%, #0a0d16 100%)",
    light: "radial-gradient(ellipse 60% 50% at 18% 15%, rgba(13,148,136,0.14) 0%, transparent 60%), radial-gradient(ellipse 55% 55% at 85% 80%, rgba(124,58,237,0.10) 0%, transparent 60%), linear-gradient(180deg, #eef1f6 0%, #e6ebf3 100%)",
  },
  {
    id: "aurora",
    label: "Aurora",
    dark: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(94,234,212,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 20% 100%, rgba(56,189,248,0.14) 0%, transparent 55%), linear-gradient(160deg, #060a12 0%, #0a1220 60%, #070b14 100%)",
    light: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(56,189,248,0.14) 0%, transparent 55%), linear-gradient(160deg, #eef4f6 0%, #e3edf3 100%)",
  },
  {
    id: "matrix",
    label: "Terminal Green",
    dark: "radial-gradient(ellipse 50% 40% at 80% 10%, rgba(74,222,128,0.10) 0%, transparent 55%), linear-gradient(200deg, #05080a 0%, #060c09 55%, #05080a 100%)",
    light: "radial-gradient(ellipse 50% 40% at 80% 10%, rgba(22,163,74,0.10) 0%, transparent 55%), linear-gradient(200deg, #eef3ee 0%, #e5ede6 100%)",
  },
  {
    id: "dusk",
    label: "Server Rack Dusk",
    dark: "radial-gradient(ellipse 50% 40% at 10% 90%, rgba(251,191,36,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(167,139,250,0.14) 0%, transparent 55%), linear-gradient(170deg, #0a0810 0%, #0e0c16 60%, #08070d 100%)",
    light: "radial-gradient(ellipse 50% 40% at 10% 90%, rgba(217,119,6,0.08) 0%, transparent 55%), linear-gradient(170deg, #f1eef6 0%, #ece7f2 100%)",
  },
];

/* ============================== CONTENT DATA ============================== */

const PROJECTS = [
  {
    slug: "OKD-PaaS-Platform",
    name: "OKD-PaaS-Platform",
    summary: "Self-hosted OpenShift (OKD) cluster on vSphere",
    files: {
      "README.md": `# OKD PaaS Platform

A production-style self-hosted Kubernetes platform built on OKD (community
OpenShift), running on a 3-node vSphere cluster with master/worker co-located
roles.

## Highlights
- Bare-metal-style install on vSphere, 3 control-plane nodes doubling as workers
- etcd quorum recovery runbook after infra incidents (NTP/clock-skew drift)
- CRI-O sandbox + kube-api-access volume troubleshooting at the node level
- SSH-proxied node access via bastion / admin VM
- GitOps-managed cluster add-ons (see Tekton-CICD, Kyverno-GitOps)

## Stack
OKD 4.x - CRI-O - etcd - OVN-Kubernetes - Helm - vSphere CSI

## Status
Actively maintained homelab-grade production platform.`,
      "architecture-diagram.png": "diagram:okd",
      "demo-link.txt": "https://example.com/demos/okd-paas-platform",
      "tech-stack.json": JSON.stringify(
        {
          platform: "OKD 4.x",
          hypervisor: "VMware vSphere",
          nodes: { control_plane: 3, workers: "co-located on control-plane" },
          networking: "OVN-Kubernetes",
          runtime: "CRI-O",
          storage: "vSphere CSI",
          access: "SSH bastion (admin VM)",
        },
        null,
        2
      ),
    },
  },
  {
    slug: "Kyverno-Policy-GitOps",
    name: "Kyverno-Policy-GitOps",
    summary: "Policy-as-code security hardening via GitOps",
    files: {
      "README.md": `# Kyverno Policy-as-Code (GitOps)

ClusterPolicy library for OKD security hardening, version-controlled and
rolled out through a GitOps repository.

## Policy domains
- Pod security standards (restricted profile enforcement)
- Registry allow-listing / image provenance
- Mandatory resource labeling for cost & ownership tracking
- Secrets hygiene (block plaintext secrets in manifests)

## Notable incident
Diagnosed and resolved admission/cleanup controller crash-looping caused by
leader-election lease renewal failures - traced through etcd latency and
clock skew before isolating the root cause to a missing kube-api-access
projected volume linked to a corrupted CRI-O sandbox on a master node.

## Stack
Kyverno - ArgoCD-style GitOps repo - OKD - YAML ClusterPolicies`,
      "architecture-diagram.png": "diagram:kyverno",
      "demo-link.txt": "https://example.com/demos/kyverno-policy-gitops",
      "tech-stack.json": JSON.stringify(
        {
          engine: "Kyverno",
          delivery: "GitOps repository",
          policy_domains: [
            "pod-security",
            "registry-enforcement",
            "resource-labeling",
            "secrets-hygiene",
          ],
          cluster: "OKD",
        },
        null,
        2
      ),
    },
  },
  {
    slug: "Developer-Hub-SSO",
    name: "Developer-Hub-SSO",
    summary: "Red Hat Developer Hub (Backstage) + Keycloak SSO",
    files: {
      "README.md": `# Developer Hub (Backstage) + SSO

Internal developer portal deployed via Helm on OKD, integrated with an
existing Keycloak realm for single sign-on.

## What shipped
- Helm-based deployment of Red Hat Developer Hub (RHDH / Backstage)
- OIDC integration against Keycloak, including TLS and redirect-URI fixes
- User identity resolution mapped from Keycloak claims
- Startup / readiness probe tuning for reliable rollouts

## Outcome
SSO confirmed working end-to-end; developers authenticate against the same
identity provider used across the platform.

## Stack
Red Hat Developer Hub - Helm - Keycloak (OIDC) - OKD`,
      "architecture-diagram.png": "diagram:backstage",
      "demo-link.txt": "https://example.com/demos/developer-hub-sso",
      "tech-stack.json": JSON.stringify(
        {
          app: "Red Hat Developer Hub (Backstage)",
          delivery: "Helm chart",
          auth: "Keycloak (OIDC / SSO)",
          cluster: "OKD",
        },
        null,
        2
      ),
    },
  },
  {
    slug: "Observability-Stack",
    name: "Observability-Stack",
    summary: "Cluster metrics, alerting & capacity signal",
    files: {
      "README.md": `# Observability Stack

Metrics and capacity-planning tooling for a resource-constrained 3-node
cluster, used to catch scheduling and infra failures before they page
someone at 3am.

## What it covers
- Prometheus scheduling made reliable under tight CPU-request headroom
- Diagnosed a machine-config operator degradation traced to intermittent
  filesystem-full errors over an extended window
- Right-sized workload CPU requests cluster-wide to unblock scheduling
- Capacity conclusion: a dedicated worker node was the only durable fix

## Stack
Prometheus - Alertmanager - OKD metrics stack`,
      "architecture-diagram.png": "diagram:observability",
      "demo-link.txt": "https://example.com/demos/observability-stack",
      "tech-stack.json": JSON.stringify(
        {
          metrics: "Prometheus",
          alerting: "Alertmanager",
          focus: ["capacity planning", "scheduling reliability", "node health"],
          cluster: "OKD, 3-node",
        },
        null,
        2
      ),
    },
  },
];

const SKILLS = [
  { category: "Platform / Kubernetes", level: 92, items: ["OpenShift (OKD)", "Kubernetes", "CRI-O", "OVN-Kubernetes", "Helm"] },
  { category: "GitOps & Policy", level: 85, items: ["Kyverno", "GitOps workflows", "ClusterPolicy design", "Config as code"] },
  { category: "CI/CD", level: 78, items: ["Tekton", "Pipelines as code", "Container builds"] },
  { category: "Observability", level: 82, items: ["Prometheus", "Alertmanager", "Capacity planning"] },
  { category: "Identity & Security", level: 80, items: ["Keycloak / OIDC", "SSO integration", "Security hardening"] },
  { category: "Infra & Virtualization", level: 88, items: ["vSphere", "etcd operations", "Linux (RHEL/CoreOS)", "SSH / bastion ops"] },
];

const BIO = {
  name: "Hamza",
  role: "Platform / Infrastructure Engineer",
  tagline: "I keep clusters alive and etcd quorate.",
  location: "Bizerte, Tunisia",
  about: `I run and harden a self-hosted OKD (OpenShift) platform end to end - from
bare-metal-style vSphere installs to GitOps-managed security policy and
day-2 incident response. I like systems that fail loudly in staging and
quietly in production.`,
  facts: [
    { label: "Focus", value: "Kubernetes / OpenShift platform engineering" },
    { label: "Cluster", value: "3-node OKD on vSphere" },
    { label: "Currently", value: "Security hardening with Kyverno + GitOps" },
    { label: "Languages", value: "English, French" },
  ],
};

/* ============================== HELPERS ============================== */

const TOPBAR_H = 34;
const DOCK_W = 68;

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function formatClock(d) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatUptime(ms) {
  const s = Math.floor(ms / 1000);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 800 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

/* ============================== APP REGISTRY ============================== */

const APP_DEFS = {
  files: { title: "Files", icon: Folder, defaultSize: { w: 780, h: 520 } },
  terminal: { title: "Terminal", icon: TerminalSquare, defaultSize: { w: 640, h: 440 } },
  about: { title: "About Me", icon: User, defaultSize: { w: 520, h: 480 } },
  skills: { title: "Skills", icon: Wrench, defaultSize: { w: 560, h: 520 } },
  contact: { title: "Contact", icon: Mail, defaultSize: { w: 520, h: 500 } },
  resume: { title: "Resume", icon: FileText, defaultSize: { w: 620, h: 560 } },
  settings: { title: "Settings", icon: SettingsIcon, defaultSize: { w: 540, h: 460 } },
};

/* ============================== PARTICLE WALLPAPER ============================== */

function ParticleField({ theme, reducedMotion }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles;

    const accentRGB = theme === "dark" ? "94,234,212" : "13,148,136";

    function setup() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      const count = Math.min(55, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        r: (Math.random() * 1.4 + 0.6) * devicePixelRatio,
      }));
    }
    setup();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130 * devicePixelRatio;
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(${accentRGB},${0.09 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = `rgba(${accentRGB},0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reducedMotion) rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [theme, reducedMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ============================== BOOT / LOGIN ============================== */

function BootScreen({ onDone }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const dur = 1500;
    let raf;
    const tick = () => {
      const p = Math.min(100, ((Date.now() - t0) / dur) * 100);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-[#05070c] flex flex-col items-center justify-center gap-8 z-[100]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-2xl border-2 border-[#5eead4]/25" />
        <div className="absolute inset-0 rounded-2xl border-t-2 border-[#5eead4] animate-spin [animation-duration:1.1s]" />
        <div className="absolute inset-[6px] rounded-xl bg-gradient-to-br from-[#5eead4]/20 to-[#a78bfa]/20 flex items-center justify-center">
          <span className="text-[#5eead4] font-mono text-lg font-bold">H</span>
        </div>
      </div>
      <div className="w-52 h-[3px] rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#5eead4] to-[#a78bfa] rounded-full"
          style={{ width: `${pct}%`, transition: "width 60ms linear" }}
        />
      </div>
      <div className="font-mono text-[11px] tracking-[0.25em] text-white/30 uppercase">
        HamzaOS booting
      </div>
    </div>
  );
}

function LoginScreen({ onDone }) {
  const FULL = "hamza";
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState("typing"); // typing -> password -> signing -> done
  const now = useNow();

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(FULL.slice(0, i));
      if (i >= FULL.length) {
        clearInterval(t);
        setTimeout(() => setStage("password"), 350);
      }
    }, 130);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (stage === "password") {
      const t = setTimeout(() => setStage("signing"), 900);
      return () => clearTimeout(t);
    }
    if (stage === "signing") {
      const t = setTimeout(onDone, 750);
      return () => clearTimeout(t);
    }
  }, [stage, onDone]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#070a11] overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <ParticleField theme="dark" reducedMotion={false} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070a11]/40 to-[#070a11]" />

      <div className="relative z-10 pt-10 font-mono text-xs text-white/40 tracking-widest">
        {formatClock(now)}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5eead4]/25 to-[#a78bfa]/25 border border-white/10 flex items-center justify-center text-2xl font-mono text-[#5eead4] shadow-[0_0_40px_rgba(94,234,212,0.15)]">
          H
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="font-mono text-lg text-white/90 h-7">
            {typed}
            <span className="inline-block w-[2px] h-5 bg-[#5eead4] ml-0.5 align-middle animate-pulse" />
          </div>
          <div className="text-[11px] text-white/35 tracking-wide">Platform Engineer</div>
        </div>

        <div className="mt-2 h-9 flex items-center">
          {stage === "password" && (
            <div className="flex gap-1.5 animate-[fadeIn_0.3s_ease]">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/70"
                  style={{ animation: `popIn 0.25s ease ${i * 0.05}s both` }}
                />
              ))}
            </div>
          )}
          {stage === "signing" && (
            <div className="text-[12px] font-mono text-[#5eead4]/80 tracking-wide animate-pulse">
              Signing in&hellip;
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 pb-8 flex flex-col items-center gap-3">
        <button
          onClick={onDone}
          className="text-[11px] text-white/35 hover:text-white/70 transition-colors font-mono tracking-wide underline underline-offset-4 decoration-white/20"
        >
          skip &rarr; enter as guest
        </button>
      </div>
    </div>
  );
}

/* ============================== CONTEXT MENU ============================== */

function ContextMenu({ x, y, items, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("mousedown", h);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("mousedown", h);
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed z-[90] min-w-[190px] rounded-xl overflow-hidden py-1.5 backdrop-blur-xl border shadow-2xl animate-[popIn_0.12s_ease]"
      style={{
        left: x,
        top: y,
        background: "var(--panel)",
        borderColor: "var(--border)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      }}
    >
      {items.map((it, idx) =>
        it.divider ? (
          <div key={idx} className="my-1 h-px" style={{ background: "var(--border)" }} />
        ) : (
          <button
            key={idx}
            onClick={() => {
              it.onClick();
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[13px] hover:bg-[var(--accentSoft)] transition-colors text-left"
            style={{ color: "var(--text)" }}
          >
            <it.icon size={14} style={{ color: "var(--textMuted)" }} />
            {it.label}
          </button>
        )
      )}
    </div>
  );
}

/* ============================== TOASTS ============================== */

function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="fixed top-11 left-1/2 -translate-x-1/2 z-[95] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-xl shadow-xl text-[13px] animate-[slideDown_0.3s_cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: "var(--panel)", borderColor: "var(--border)", color: "var(--text)" }}
        >
          <span>{t.text}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="opacity-40 hover:opacity-80 transition-opacity"
          >
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ============================== TOP BAR ============================== */

function TopBar({ now, uptimeMs, theme, onToggleTheme, isMobile, mobileTitle, onMobileBack }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-between px-3 select-none backdrop-blur-xl border-b"
      style={{ height: TOPBAR_H, background: "var(--panel)", borderColor: "var(--border)", color: "var(--text)" }}
    >
      <div className="flex items-center gap-2 text-[12px] font-medium">
        {isMobile ? (
          mobileTitle ? (
            <button onClick={onMobileBack} className="flex items-center gap-1 opacity-80">
              <ArrowLeft size={14} /> {mobileTitle}
            </button>
          ) : (
            <span className="font-mono tracking-wide opacity-80">HamzaOS</span>
          )
        ) : (
          <span className="font-mono tracking-wide opacity-80">HamzaOS</span>
        )}
      </div>
      <div className="flex items-center gap-3.5 text-[11.5px] font-mono" style={{ color: "var(--textMuted)" }}>
        <div className="flex items-center gap-1.5" title="System uptime">
          <Activity size={13} style={{ color: "var(--accent)" }} />
          <span>{formatUptime(uptimeMs)}</span>
        </div>
        <div className="flex items-center gap-1" title="Connected">
          <Wifi size={13} />
        </div>
        <span style={{ color: "var(--text)" }}>{formatClock(now)}</span>
      </div>
    </div>
  );
}

/* ============================== DOCK ============================== */

function DockIcon({ appId, def, active, running, onClick, isMobile }) {
  const [hover, setHover] = useState(false);
  const Icon = def.icon;
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!isMobile && hover && (
        <div
          className="absolute left-[64px] px-2.5 py-1 rounded-lg text-[12px] whitespace-nowrap backdrop-blur-xl border shadow-lg animate-[fadeIn_0.15s_ease]"
          style={{ background: "var(--panel)", borderColor: "var(--border)", color: "var(--text)" }}
        >
          {def.title}
        </div>
      )}
      <button
        onClick={onClick}
        className="group relative w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
        style={{
          background: active ? "var(--accentSoft)" : "var(--panel2)",
          border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
        }}
      >
        <Icon size={19} style={{ color: active ? "var(--accent)" : "var(--text)" }} strokeWidth={1.8} />
      </button>
      {running && (
        <span
          className="absolute -bottom-[7px] w-1 h-1 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      )}
    </div>
  );
}

function Dock({ apps, windows, onOpen, isMobile }) {
  if (isMobile) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] flex items-center justify-around px-2 py-2 backdrop-blur-xl border-t"
        style={{ background: "var(--panel)", borderColor: "var(--border)" }}
      >
        {apps.map((appId) => (
          <DockIcon
            key={appId}
            appId={appId}
            def={APP_DEFS[appId]}
            active={false}
            running={windows.some((w) => w.appId === appId)}
            onClick={() => onOpen(appId)}
            isMobile
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className="fixed left-2.5 top-1/2 -translate-y-1/2 z-[70] flex flex-col items-center gap-2.5 p-2 rounded-2xl backdrop-blur-xl border shadow-2xl"
      style={{ background: "var(--dockBg)", borderColor: "var(--border)" }}
    >
      {apps.map((appId) => (
        <DockIcon
          key={appId}
          appId={appId}
          def={APP_DEFS[appId]}
          active={windows.some((w) => w.appId === appId && !w.minimized)}
          running={windows.some((w) => w.appId === appId)}
          onClick={() => onOpen(appId)}
        />
      ))}
    </div>
  );
}

/* ============================== WINDOW FRAME ============================== */

const RESIZE_EDGES = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

function WindowFrame({ win, isActive, isMobile, onFocus, onClose, onMinimize, onToggleMaximize, dragRef, resizeRef, setSnapPreview, children }) {
  const def = APP_DEFS[win.appId];
  const Icon = def.icon;

  if (win.minimized) return null;

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-[60] flex flex-col animate-[fadeIn_0.2s_ease]"
        style={{ top: TOPBAR_H, bottom: 58, background: "var(--panelSolid)" }}
      >
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    );
  }

  const startDrag = (e) => {
    onFocus();
    dragRef.current = { id: win.id, offsetX: e.clientX - win.x, offsetY: e.clientY - win.y };
  };

  const startResize = (edge) => (e) => {
    e.stopPropagation();
    onFocus();
    resizeRef.current = {
      id: win.id,
      edge,
      startX: e.clientX,
      startY: e.clientY,
      rect: { x: win.x, y: win.y, w: win.w, h: win.h },
    };
  };

  return (
    <div
      onMouseDown={onFocus}
      className="fixed rounded-2xl overflow-hidden flex flex-col border shadow-2xl animate-[windowOpen_0.22s_cubic-bezier(0.16,1,0.3,1)]"
      style={{
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
        background: "var(--panel)",
        borderColor: isActive ? "var(--borderStrong)" : "var(--border)",
        backdropFilter: "blur(22px)",
        boxShadow: isActive
          ? "0 25px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)"
          : "0 15px 40px rgba(0,0,0,0.35)",
      }}
    >
      {/* resize handles */}
      {!win.maximized &&
        RESIZE_EDGES.map((edge) => (
          <div
            key={edge}
            onMouseDown={startResize(edge)}
            className="absolute z-10"
            style={{
              ...(edge.includes("n") ? { top: 0 } : {}),
              ...(edge.includes("s") ? { bottom: 0 } : {}),
              ...(edge.includes("w") ? { left: 0 } : {}),
              ...(edge.includes("e") ? { right: 0 } : {}),
              ...(edge === "n" || edge === "s" ? { left: 8, right: 8, height: 6 } : {}),
              ...(edge === "e" || edge === "w" ? { top: 8, bottom: 8, width: 6 } : {}),
              ...(edge.length === 2 ? { width: 12, height: 12 } : {}),
              cursor: `${edge}-resize`,
            }}
          />
        ))}

      {/* titlebar */}
      <div
        onMouseDown={startDrag}
        onDoubleClick={onToggleMaximize}
        className="h-10 flex items-center justify-between px-3 shrink-0 cursor-grab active:cursor-grabbing select-none border-b"
        style={{ borderColor: "var(--border)", background: "var(--panel2)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Icon size={13.5} style={{ color: "var(--accent)" }} />
          <span className="text-[12.5px] font-medium truncate" style={{ color: "var(--text)" }}>
            {win.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onMinimize}
            className="w-3 h-3 rounded-full flex items-center justify-center group"
            style={{ background: "#fbbf24" }}
            title="Minimize"
          >
            <Minus size={8} className="opacity-0 group-hover:opacity-70 text-black" />
          </button>
          <button
            onClick={onToggleMaximize}
            className="w-3 h-3 rounded-full flex items-center justify-center group"
            style={{ background: "#34d399" }}
            title="Maximize"
          >
            <Square size={7} className="opacity-0 group-hover:opacity-70 text-black" />
          </button>
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full flex items-center justify-center group"
            style={{ background: "#f87171" }}
            title="Close"
          >
            <X size={8} className="opacity-0 group-hover:opacity-70 text-black" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

/* ============================== FILE EXPLORER ============================== */

function fileIcon(filename) {
  if (filename.endsWith(".png")) return FileImage;
  if (filename.endsWith(".json")) return FileJson;
  if (filename.endsWith(".md")) return FileCode2;
  return FileText;
}

function DiagramMock({ kind }) {
  const boxes = {
    okd: ["LB", "Master-1", "Master-2", "Master-3", "etcd", "CRI-O"],
    kyverno: ["Git Repo", "Sync", "Kyverno", "Admission", "ClusterPolicy"],
    backstage: ["Backstage", "OIDC", "Keycloak", "Users"],
    observability: ["Workloads", "Prometheus", "Alertmanager", "On-call"],
  }[kind] || ["Node A", "Node B", "Node C"];

  return (
    <div
      className="w-full rounded-xl border p-6 flex flex-wrap items-center justify-center gap-4"
      style={{ background: "var(--panel2)", borderColor: "var(--border)" }}
    >
      {boxes.map((b, i) => (
        <React.Fragment key={b}>
          <div
            className="px-3.5 py-2.5 rounded-lg border text-[11.5px] font-mono"
            style={{ borderColor: "var(--accent)", color: "var(--accent)", background: "var(--accentSoft)" }}
          >
            {b}
          </div>
          {i < boxes.length - 1 && (
            <ChevronRight size={16} style={{ color: "var(--textFaint)" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function FilePreview({ project, filename }) {
  const content = project.files[filename];
  if (filename === "architecture-diagram.png") {
    return (
      <div className="p-5">
        <DiagramMock kind={content.split(":")[1]} />
        <p className="mt-3 text-[12px]" style={{ color: "var(--textMuted)" }}>
          Simplified architecture overview for {project.name}.
        </p>
      </div>
    );
  }
  if (filename === "demo-link.txt") {
    return (
      <div className="p-5">
        <div className="text-[12px] mb-2" style={{ color: "var(--textMuted)" }}>demo-link.txt</div>
        <a
          href={content}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-mono px-3 py-2 rounded-lg border hover:bg-[var(--accentSoft)] transition-colors"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          {content} <ExternalLink size={12} />
        </a>
      </div>
    );
  }
  if (filename === "tech-stack.json") {
    return (
      <pre
        className="p-5 text-[12px] font-mono leading-relaxed overflow-auto whitespace-pre-wrap"
        style={{ color: "var(--accent)" }}
      >
        {content}
      </pre>
    );
  }
  // README.md
  return (
    <div className="p-5 text-[13px] leading-relaxed whitespace-pre-wrap font-mono" style={{ color: "var(--text)" }}>
      {content.split("\n").map((line, i) => {
        if (line.startsWith("# "))
          return (
            <div key={i} className="text-[17px] font-bold mb-2 mt-1" style={{ color: "var(--accent)" }}>
              {line.slice(2)}
            </div>
          );
        if (line.startsWith("## "))
          return (
            <div key={i} className="text-[14px] font-bold mt-4 mb-1" style={{ color: "var(--accent2)" }}>
              {line.slice(3)}
            </div>
          );
        if (line.startsWith("- "))
          return (
            <div key={i} className="pl-3 flex gap-2" style={{ color: "var(--textMuted)" }}>
              <span style={{ color: "var(--accent)" }}>&bull;</span>
              <span>{line.slice(2)}</span>
            </div>
          );
        if (!line.trim()) return <div key={i} className="h-2" />;
        return (
          <div key={i} style={{ color: "var(--textMuted)" }}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

function FilesApp({ pushToast }) {
  const [openFolder, setOpenFolder] = useState(null); // project slug
  const [selectedFile, setSelectedFile] = useState(null);

  const project = PROJECTS.find((p) => p.slug === openFolder);

  return (
    <div className="flex h-full text-[13px]" style={{ color: "var(--text)" }}>
      <div
        className="w-[168px] shrink-0 border-r p-2.5 flex flex-col gap-0.5 overflow-auto"
        style={{ borderColor: "var(--border)", background: "var(--panel2)" }}
      >
        <div className="text-[10.5px] uppercase tracking-wider px-2 py-1.5" style={{ color: "var(--textFaint)" }}>
          Places
        </div>
        <button
          onClick={() => {
            setOpenFolder(null);
            setSelectedFile(null);
          }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--accentSoft)] text-left"
        >
          <Home size={14} style={{ color: "var(--textMuted)" }} /> Home
        </button>
        <div className="text-[10.5px] uppercase tracking-wider px-2 pt-3 pb-1.5" style={{ color: "var(--textFaint)" }}>
          Projects
        </div>
        {PROJECTS.map((p) => (
          <button
            key={p.slug}
            onClick={() => {
              setOpenFolder(p.slug);
              setSelectedFile(null);
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--accentSoft)] text-left"
            style={{
              background: openFolder === p.slug ? "var(--accentSoft)" : "transparent",
              color: openFolder === p.slug ? "var(--accent)" : "var(--text)",
            }}
          >
            {openFolder === p.slug ? <FolderOpen size={14} /> : <Folder size={14} />}
            <span className="truncate">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div
          className="px-4 py-2 text-[12px] flex items-center gap-1.5 border-b font-mono"
          style={{ borderColor: "var(--border)", color: "var(--textMuted)" }}
        >
          <span>~/Projects</span>
          {project && (
            <>
              <ChevronRight size={12} />
              <span style={{ color: "var(--accent)" }}>{project.name}</span>
            </>
          )}
          {selectedFile && (
            <>
              <ChevronRight size={12} />
              <span>{selectedFile}</span>
            </>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          {!project && (
            <div className="p-6 grid grid-cols-3 gap-5">
              {PROJECTS.map((p) => (
                <button
                  key={p.slug}
                  onDoubleClick={() => setOpenFolder(p.slug)}
                  onClick={() => setOpenFolder(p.slug)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[var(--accentSoft)] transition-colors"
                >
                  <Folder size={38} strokeWidth={1.3} style={{ color: "var(--accent)" }} />
                  <span className="text-[12px] text-center leading-tight" style={{ color: "var(--text)" }}>
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {project && !selectedFile && (
            <div className="p-6 grid grid-cols-3 gap-5">
              {Object.keys(project.files).map((fname) => {
                const Icon = fileIcon(fname);
                return (
                  <button
                    key={fname}
                    onDoubleClick={() => setSelectedFile(fname)}
                    onClick={() => setSelectedFile(fname)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[var(--accentSoft)] transition-colors"
                  >
                    <Icon size={34} strokeWidth={1.3} style={{ color: "var(--textMuted)" }} />
                    <span className="text-[11.5px] text-center leading-tight font-mono" style={{ color: "var(--text)" }}>
                      {fname}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {project && selectedFile && (
            <FilePreview project={project} filename={selectedFile} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== TERMINAL ============================== */

function buildFsTree() {
  const tree = { Projects: {} };
  for (const p of PROJECTS) {
    tree.Projects[p.name] = { __files: p.files };
  }
  return tree;
}

function resolvePath(cwdArr, arg) {
  if (!arg || arg === ".") return [...cwdArr];
  if (arg === "..") return cwdArr.slice(0, -1);
  if (arg === "~" || arg === "/") return [];
  let base = arg.startsWith("/") ? [] : [...cwdArr];
  const parts = arg.split("/").filter(Boolean);
  for (const part of parts) {
    if (part === "..") base.pop();
    else if (part !== ".") base.push(part);
  }
  return base;
}

function getNode(tree, pathArr) {
  let node = tree;
  for (const seg of pathArr) {
    if (node && typeof node === "object" && seg in node) node = node[seg];
    else return undefined;
  }
  return node;
}

function TerminalApp({ openApp, pushToast }) {
  const fsTree = useMemo(buildFsTree, []);
  const [cwd, setCwd] = useState([]);
  const [lines, setLines] = useState([
    { type: "banner", text: "HamzaOS Terminal v1.0 - type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const prompt = `hamza@platform:~/${cwd.join("/")}$`;

  const print = (text, type = "output") => setLines((l) => [...l, { type, text }]);

  const run = (raw) => {
    const cmdline = raw.trim();
    print(`${prompt} ${cmdline}`, "input");
    if (!cmdline) return;
    setHistory((h) => [...h, cmdline]);
    setHistIdx(-1);

    const [cmd, ...rest] = cmdline.split(" ");
    const arg = rest.join(" ").trim();

    switch (cmd) {
      case "help":
        print(
          "Commands: ls, cd <dir>, cat <file>, pwd, whoami, skills --list, open <app>, clear, contact, resume, help"
        );
        break;
      case "clear":
        setLines([]);
        break;
      case "pwd":
        print("/" + cwd.join("/"));
        break;
      case "whoami":
        print(`${BIO.name} — ${BIO.role}`);
        print(BIO.tagline);
        break;
      case "skills":
      case "skills --list":
        SKILLS.forEach((s) => print(`${s.category.padEnd(26, " ")} ${s.items.join(", ")}`));
        break;
      case "ls": {
        const node = getNode(fsTree, cwd);
        if (!node) print("ls: cannot access directory", "error");
        else {
          const entries = Object.keys(node).filter((k) => k !== "__files");
          const files = node.__files ? Object.keys(node.__files) : [];
          if (!entries.length && !files.length) print("(empty)");
          print([...entries.map((e) => e + "/"), ...files].join("   "));
        }
        break;
      }
      case "cd": {
        const target = resolvePath(cwd, arg || "");
        const node = getNode(fsTree, target);
        if (arg === "" || arg === "~") setCwd([]);
        else if (node && typeof node === "object") setCwd(target);
        else print(`cd: no such directory: ${arg}`, "error");
        break;
      }
      case "cat": {
        if (!arg) {
          print("usage: cat <file>", "error");
          break;
        }
        const dirNode = getNode(fsTree, cwd);
        const filesHere = dirNode && dirNode.__files;
        if (filesHere && arg in filesHere) {
          const content = filesHere[arg];
          if (arg === "architecture-diagram.png") print("[binary file - open in Files app to view]");
          else print(content.split(":")[0] === "diagram" ? "[diagram]" : content);
        } else {
          print(`cat: ${arg}: No such file`, "error");
        }
        break;
      }
      case "open": {
        const map = { files: "files", explorer: "files", about: "about", skills: "skills", contact: "contact", resume: "resume", settings: "settings", terminal: "terminal" };
        if (map[arg]) {
          openApp(map[arg]);
          print(`Opening ${map[arg]}...`);
        } else print(`open: unknown app '${arg}'. Try: files, about, skills, contact, resume, settings`, "error");
        break;
      }
      case "contact":
        print(`Email: hamza@example.com`);
        print(`GitHub: github.com/hamza`);
        openApp("contact");
        break;
      case "resume":
        print("Opening resume...");
        openApp("resume");
        break;
      case "echo":
        print(rest.join(" "));
        break;
      case "date":
        print(new Date().toString());
        break;
      case "sudo":
        print("Nice try. This is a portfolio, not a production cluster. 😄");
        break;
      default:
        print(`command not found: ${cmd} (type 'help')`, "error");
    }
  };

  return (
    <div
      className="h-full flex flex-col font-mono text-[12.5px]"
      style={{ background: "#0a0d13", color: "#c8f5ea" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto px-4 py-3 space-y-0.5">
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.type === "input"
                ? "text-[#8ab4f8]"
                : l.type === "banner"
                ? "text-[#a78bfa] mb-1"
                : l.type === "error"
                ? "text-[#f87171]"
                : "text-[#c8f5ea]/90"
            }
            style={{ whiteSpace: "pre-wrap" }}
          >
            {l.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-2 px-4 py-2.5 border-t border-white/10">
        <span className="text-[#5eead4] shrink-0">{prompt}</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              run(input);
              setInput("");
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              if (history.length) {
                const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
                setHistIdx(idx);
                setInput(history[idx]);
              }
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              if (histIdx !== -1) {
                const idx = histIdx + 1;
                if (idx >= history.length) {
                  setHistIdx(-1);
                  setInput("");
                } else {
                  setHistIdx(idx);
                  setInput(history[idx]);
                }
              }
            }
          }}
          className="flex-1 bg-transparent outline-none text-[#e9eef5] placeholder:text-white/20"
          placeholder="type a command..."
          spellCheck={false}
        />
      </div>
    </div>
  );
}

/* ============================== ABOUT / SKILLS / CONTACT / RESUME ============================== */

function AboutApp() {
  return (
    <div className="h-full overflow-auto p-6" style={{ color: "var(--text)" }}>
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-mono font-bold"
          style={{ background: "var(--accentSoft)", color: "var(--accent)" }}
        >
          {BIO.name[0]}
        </div>
        <div>
          <div className="text-lg font-semibold">{BIO.name}</div>
          <div className="text-[13px]" style={{ color: "var(--textMuted)" }}>{BIO.role}</div>
        </div>
      </div>
      <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: "var(--textMuted)" }}>
        {BIO.about}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {BIO.facts.map((f) => (
          <div
            key={f.label}
            className="rounded-xl border p-3"
            style={{ borderColor: "var(--border)", background: "var(--panel2)" }}
          >
            <div className="text-[10.5px] uppercase tracking-wide mb-1" style={{ color: "var(--textFaint)" }}>
              {f.label}
            </div>
            <div className="text-[13px]">{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsApp() {
  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-4">
      {SKILLS.map((s) => (
        <div key={s.category}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{s.category}</span>
            <span className="text-[11px] font-mono" style={{ color: "var(--textFaint)" }}>{s.level}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: "var(--panel2)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${s.level}%`,
                background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((it) => (
              <span
                key={it}
                className="text-[11px] px-2 py-0.5 rounded-full border"
                style={{ borderColor: "var(--border)", color: "var(--textMuted)" }}
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactApp() {
  const [sent, setSent] = useState(false);
  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-5" style={{ color: "var(--text)" }}>
      <div className="flex gap-3">
        <a
          href="mailto:hamza@example.com"
          className="flex-1 flex items-center gap-2 justify-center py-2.5 rounded-xl border text-[13px] hover:bg-[var(--accentSoft)] transition-colors"
          style={{ borderColor: "var(--border)" }}
        >
          <Mail size={15} /> Email
        </a>
        <a
          href="#"
          className="flex-1 flex items-center gap-2 justify-center py-2.5 rounded-xl border text-[13px] hover:bg-[var(--accentSoft)] transition-colors"
          style={{ borderColor: "var(--border)" }}
        >
          <GithubIcon size={15} /> GitHub
        </a>
        <a
          href="#"
          className="flex-1 flex items-center gap-2 justify-center py-2.5 rounded-xl border text-[13px] hover:bg-[var(--accentSoft)] transition-colors"
          style={{ borderColor: "var(--border)" }}
        >
          <LinkedinIcon size={15} /> LinkedIn
        </a>
      </div>

      <div className="flex flex-col gap-2.5">
        <input
          placeholder="Your name"
          className="px-3 py-2.5 rounded-xl border bg-transparent text-[13px] outline-none focus:border-[var(--accent)]"
          style={{ borderColor: "var(--border)" }}
        />
        <input
          placeholder="Your email"
          className="px-3 py-2.5 rounded-xl border bg-transparent text-[13px] outline-none focus:border-[var(--accent)]"
          style={{ borderColor: "var(--border)" }}
        />
        <textarea
          placeholder="Message"
          rows={4}
          className="px-3 py-2.5 rounded-xl border bg-transparent text-[13px] outline-none focus:border-[var(--accent)] resize-none"
          style={{ borderColor: "var(--border)" }}
        />
        <button
          onClick={() => setSent(true)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium transition-colors"
          style={{ background: "var(--accent)", color: "#04140f" }}
        >
          {sent ? <Check size={15} /> : <Send size={14} />}
          {sent ? "Sent (demo)" : "Send message"}
        </button>
      </div>
    </div>
  );
}

function ResumeApp() {
  const downloadResume = () => {
    const text = `${BIO.name} — ${BIO.role}\n\n${BIO.about}\n\nSKILLS\n${SKILLS.map(
      (s) => `- ${s.category}: ${s.items.join(", ")}`
    ).join("\n")}\n\nPROJECTS\n${PROJECTS.map((p) => `- ${p.name}: ${p.summary}`).join("\n")}\n`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hamza-resume.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-5" style={{ color: "var(--text)" }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[16px] font-semibold">{BIO.name}</div>
          <div className="text-[12.5px]" style={{ color: "var(--textMuted)" }}>{BIO.role}</div>
        </div>
        <button
          onClick={downloadResume}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium"
          style={{ background: "var(--accent)", color: "#04140f" }}
        >
          <Download size={14} /> Download
        </button>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "var(--textFaint)" }}>Experience</div>
        <div className="rounded-xl border p-3.5" style={{ borderColor: "var(--border)", background: "var(--panel2)" }}>
          <div className="text-[13px] font-medium">Platform / Infrastructure Engineer</div>
          <div className="text-[12px] mt-0.5" style={{ color: "var(--textMuted)" }}>
            Own and harden a self-hosted OKD platform: cluster operations, GitOps
            security policy, identity integration, and observability.
          </div>
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "var(--textFaint)" }}>Projects</div>
        <div className="flex flex-col gap-2">
          {PROJECTS.map((p) => (
            <div key={p.slug} className="rounded-xl border p-3" style={{ borderColor: "var(--border)" }}>
              <div className="text-[12.5px] font-medium">{p.name}</div>
              <div className="text-[11.5px]" style={{ color: "var(--textMuted)" }}>{p.summary}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsApp({ theme, setTheme, wallpaper, setWallpaper }) {
  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-6" style={{ color: "var(--text)" }}>
      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2.5" style={{ color: "var(--textFaint)" }}>Appearance</div>
        <div className="flex items-center justify-between rounded-xl border p-3.5" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2.5 text-[13px]">
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-11 h-6 rounded-full relative transition-colors"
            style={{ background: theme === "dark" ? "var(--accent)" : "var(--border)" }}
          >
            <span
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
              style={{ left: theme === "dark" ? 22 : 2 }}
            />
          </button>
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2.5 flex items-center gap-1.5" style={{ color: "var(--textFaint)" }}>
          <Palette size={12} /> Wallpaper
        </div>
        <div className="grid grid-cols-2 gap-3">
          {WALLPAPERS.map((wp, i) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(i)}
              className="relative h-16 rounded-xl border overflow-hidden"
              style={{ borderColor: wallpaper === i ? "var(--accent)" : "var(--border)", borderWidth: wallpaper === i ? 2 : 1 }}
            >
              <div className="absolute inset-0" style={{ background: wp[theme] }} />
              <span className="absolute bottom-1 left-2 text-[10.5px] font-medium text-white/80">{wp.label}</span>
              {wallpaper === i && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/90 flex items-center justify-center">
                  <Check size={11} className="text-black" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="text-[11.5px] leading-relaxed" style={{ color: "var(--textFaint)" }}>
        HamzaOS is a portfolio, not a real operating system — but the windows still drag,
        the terminal still runs, and nothing here will page anyone at 3am.
      </div>
    </div>
  );
}

function renderApp(appId, ctx) {
  switch (appId) {
    case "files":
      return <FilesApp pushToast={ctx.pushToast} />;
    case "terminal":
      return <TerminalApp openApp={ctx.openApp} pushToast={ctx.pushToast} />;
    case "about":
      return <AboutApp />;
    case "skills":
      return <SkillsApp />;
    case "contact":
      return <ContactApp />;
    case "resume":
      return <ResumeApp />;
    case "settings":
      return (
        <SettingsApp
          theme={ctx.theme}
          setTheme={ctx.setTheme}
          wallpaper={ctx.wallpaper}
          setWallpaper={ctx.setWallpaper}
        />
      );
    default:
      return null;
  }
}

/* ============================== DESKTOP / MAIN APP ============================== */

const DOCK_APPS = ["files", "terminal", "about", "skills", "contact", "resume"];

export default function PortfolioOS() {
  const [phase, setPhase] = useState("boot"); // boot -> login -> desktop
  const [theme, setTheme] = useState("dark");
  const [wallpaper, setWallpaper] = useState(0);
  const [bootTime, setBootTime] = useState(null);
  const now = useNow();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const [windows, setWindows] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const zRef = useRef(1);

  const goToLogin = useCallback(() => setPhase("login"), []);
  const goToDesktop = useCallback(() => setPhase("desktop"), []);

  const [mobileAppId, setMobileAppId] = useState(null);

  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(1);
  const pushToast = useCallback((text, delay = 0) => {
    const id = toastIdRef.current++;
    setTimeout(() => {
      setToasts((t) => [...t, { id, text }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5500);
    }, delay);
  }, []);
  const dismissToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const [contextMenu, setContextMenu] = useState(null);
  const [snapPreview, setSnapPreview] = useState(null);

  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  useEffect(() => {
    if (phase === "desktop" && !bootTime) {
      setBootTime(Date.now());
      pushToast("👋 Welcome to HamzaOS — try opening the Terminal", 2200);
      pushToast("💡 Right-click the desktop for quick actions", 9000);
    }
  }, [phase, bootTime, pushToast]);

  const uptimeMs = bootTime ? now.getTime() - bootTime : 0;

  /* ---- window management ---- */
  const openApp = useCallback((appId) => {
    if (isMobile) {
      setMobileAppId(appId);
      return;
    }
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);
      if (existing) {
        zRef.current += 1;
        setActiveId(existing.id);
        return prev.map((w) =>
          w.id === existing.id ? { ...w, minimized: false, z: zRef.current } : w
        );
      }
      const def = APP_DEFS[appId];
      const count = prev.length;
      const id = `${appId}-${Date.now()}`;
      zRef.current += 1;
      const w = {
        id,
        appId,
        title: def.title,
        x: DOCK_W + 40 + (count % 5) * 26,
        y: TOPBAR_H + 30 + (count % 5) * 26,
        w: def.defaultSize.w,
        h: def.defaultSize.h,
        minimized: false,
        maximized: false,
        prevRect: null,
        z: zRef.current,
      };
      setActiveId(id);
      return [...prev, w];
    });
  }, [isMobile]);

  const closeWindow = (id) => setWindows((prev) => prev.filter((w) => w.id !== id));
  const minimizeWindow = (id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveId(null);
  };
  const focusWindow = (id) => {
    zRef.current += 1;
    const z = zRef.current;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)));
    setActiveId(id);
  };
  const toggleMaximize = (id) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized) {
          return { ...w, maximized: false, ...w.prevRect };
        }
        return {
          ...w,
          maximized: true,
          prevRect: { x: w.x, y: w.y, w: w.w, h: w.h },
          x: 0,
          y: TOPBAR_H,
          w: window.innerWidth,
          h: window.innerHeight - TOPBAR_H,
        };
      })
    );
  };

  /* ---- global mouse handlers for drag/resize ---- */
  useEffect(() => {
    const onMove = (e) => {
      if (dragRef.current) {
        const { id, offsetX, offsetY } = dragRef.current;
        const nx = e.clientX - offsetX;
        const ny = Math.max(TOPBAR_H, e.clientY - offsetY);
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x: nx, y: ny, maximized: false } : w)));

        const edgeMargin = 14;
        if (e.clientX < edgeMargin) setSnapPreview({ side: "left" });
        else if (e.clientX > window.innerWidth - edgeMargin) setSnapPreview({ side: "right" });
        else if (e.clientY < TOPBAR_H + edgeMargin) setSnapPreview({ side: "top" });
        else setSnapPreview(null);
      }
      if (resizeRef.current) {
        const { id, edge, startX, startY, rect } = resizeRef.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        let { x, y, w, h } = rect;
        if (edge.includes("e")) w = Math.max(340, rect.w + dx);
        if (edge.includes("s")) h = Math.max(220, rect.h + dy);
        if (edge.includes("w")) {
          w = Math.max(340, rect.w - dx);
          x = rect.x + (rect.w - w);
        }
        if (edge.includes("n")) {
          h = Math.max(220, rect.h - dy);
          y = Math.max(TOPBAR_H, rect.y + (rect.h - h));
        }
        setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, x, y, w, h } : win)));
      }
    };
    const onUp = () => {
      if (dragRef.current && snapPreview) {
        const { id } = dragRef.current;
        const full = { x: 0, y: TOPBAR_H, w: window.innerWidth, h: window.innerHeight - TOPBAR_H };
        setWindows((prev) =>
          prev.map((w) => {
            if (w.id !== id) return w;
            const prevRect = { x: w.x, y: w.y, w: w.w, h: w.h };
            if (snapPreview.side === "left")
              return { ...w, maximized: true, prevRect, x: 0, y: TOPBAR_H, w: window.innerWidth / 2, h: full.h };
            if (snapPreview.side === "right")
              return { ...w, maximized: true, prevRect, x: window.innerWidth / 2, y: TOPBAR_H, w: window.innerWidth / 2, h: full.h };
            if (snapPreview.side === "top")
              return { ...w, maximized: true, prevRect, ...full };
            return w;
          })
        );
      }
      dragRef.current = null;
      resizeRef.current = null;
      setSnapPreview(null);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [snapPreview]);

  const themeVars = THEMES[theme];
  const cssVars = {
    "--bg": themeVars.bg,
    "--panel": themeVars.panel,
    "--panelSolid": themeVars.panelSolid,
    "--panel2": themeVars.panel2,
    "--border": themeVars.border,
    "--borderStrong": themeVars.borderStrong,
    "--text": themeVars.text,
    "--textMuted": themeVars.textMuted,
    "--textFaint": themeVars.textFaint,
    "--accent": themeVars.accent,
    "--accent2": themeVars.accent2,
    "--accentSoft": themeVars.accentSoft,
    "--dockBg": themeVars.dockBg,
  };

  const wallpaperCss = WALLPAPERS[wallpaper][theme];

  const contextItems = [
    { icon: FilePlus, label: "New Folder", onClick: () => pushToast("📁 New folder created (demo mode)") },
    { icon: Palette, label: "Change Wallpaper", onClick: () => setWallpaper((w) => (w + 1) % WALLPAPERS.length) },
    { divider: true },
    { icon: RefreshCw, label: "Refresh", onClick: () => pushToast("Desktop refreshed") },
  ];

  const ctx = { pushToast, openApp, theme, setTheme, wallpaper, setWallpaper };

  return (
    <div
      style={cssVars}
      className="relative w-full h-screen overflow-hidden font-sans antialiased"
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes windowOpen { from { opacity: 0; transform: scale(0.96) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {phase === "boot" && <BootScreen onDone={goToLogin} />}
      {phase === "login" && <LoginScreen onDone={goToDesktop} />}

      {phase === "desktop" && (
        <div
          className="absolute inset-0"
          style={{ background: "var(--bg)" }}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({ x: e.clientX, y: e.clientY });
          }}
          onClick={() => contextMenu && setContextMenu(null)}
        >
          <div className="absolute inset-0" style={{ background: wallpaperCss, transition: "background 0.5s ease" }} />
          <div className="absolute inset-0 opacity-90">
            <ParticleField theme={theme} reducedMotion={reducedMotion} />
          </div>

          <TopBar
            now={now}
            uptimeMs={uptimeMs}
            theme={theme}
            onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
            isMobile={isMobile}
            mobileTitle={mobileAppId ? APP_DEFS[mobileAppId].title : null}
            onMobileBack={() => setMobileAppId(null)}
          />

          <Dock
            apps={DOCK_APPS}
            windows={windows}
            onOpen={openApp}
            isMobile={isMobile}
          />

          {/* mobile home-screen icons */}
          {isMobile && !mobileAppId && (
            <div className="absolute inset-0 pt-16 pb-24 px-6 grid grid-cols-3 gap-6 content-start">
              {DOCK_APPS.map((appId) => {
                const def = APP_DEFS[appId];
                const Icon = def.icon;
                return (
                  <button
                    key={appId}
                    onClick={() => setMobileAppId(appId)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                      style={{ background: "var(--panel)", borderColor: "var(--border)" }}
                    >
                      <Icon size={22} style={{ color: "var(--accent)" }} />
                    </div>
                    <span className="text-[11px]" style={{ color: "var(--text)" }}>{def.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* mobile fullscreen app */}
          {isMobile && mobileAppId && (
            <div
              className="absolute inset-0 animate-[fadeIn_0.2s_ease]"
              style={{ top: TOPBAR_H, bottom: 0, background: "var(--panelSolid)" }}
            >
              {renderApp(mobileAppId, ctx)}
            </div>
          )}

          {/* desktop windows */}
          {!isMobile &&
            windows.map((w) => (
              <WindowFrame
                key={w.id}
                win={w}
                isActive={activeId === w.id}
                isMobile={false}
                onFocus={() => focusWindow(w.id)}
                onClose={() => closeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onToggleMaximize={() => toggleMaximize(w.id)}
                dragRef={dragRef}
                resizeRef={resizeRef}
                setSnapPreview={setSnapPreview}
              >
                {renderApp(w.appId, ctx)}
              </WindowFrame>
            ))}

          {/* snap preview overlay */}
          {!isMobile && snapPreview && (
            <div
              className="fixed z-[65] rounded-xl pointer-events-none border-2"
              style={{
                borderColor: "var(--accent)",
                background: "var(--accentSoft)",
                transition: "all 0.12s ease",
                ...(snapPreview.side === "left" && { left: 0, top: TOPBAR_H, width: "50%", height: `calc(100% - ${TOPBAR_H}px)` }),
                ...(snapPreview.side === "right" && { left: "50%", top: TOPBAR_H, width: "50%", height: `calc(100% - ${TOPBAR_H}px)` }),
                ...(snapPreview.side === "top" && { left: 0, top: TOPBAR_H, width: "100%", height: `calc(100% - ${TOPBAR_H}px)` }),
              }}
            />
          )}

          {!isMobile && contextMenu && (
            <ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextItems} onClose={() => setContextMenu(null)} />
          )}

          <ToastStack toasts={toasts} onDismiss={dismissToast} />
        </div>
      )}
    </div>
  );
}
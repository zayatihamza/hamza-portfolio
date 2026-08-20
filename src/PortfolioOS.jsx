import React, { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from "react";
import {
  Folder, FolderOpen, TerminalSquare, User, Wrench, Mail, FileText,
  Settings as SettingsIcon, X, Minus, Square, Maximize2, Wifi, Activity,
  RefreshCw, FilePlus, FileImage, FileJson, FileCode2, ChevronRight,
  Code2 as GithubIcon, Link2 as LinkedinIcon, Send, Download, Sun, Moon, Palette, Server,
  ShieldCheck, GitBranch, Boxes, Cpu, Network, Database, Layers,
  ExternalLink, Home, ArrowLeft, Check, Circle, Languages
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

const BIO_CONTACT = {
  name: "Hamza Zayati",
  email: "zayatihamza@gmail.com",
  phone: "+216 29 69 96 60",
  linkedin: "https://www.linkedin.com/in/hamza-zayeti-/",
  github: "https://github.com/zayatihamza",
};

const PROJECT_DATA = [
  {
    slug: "Cloud-PaaS-DevSecOps",
    summary: {
      en: "OpenShift PaaS platform with GitOps & DevSecOps hardening (Final-year project)",
      fr: "Plateforme PaaS OpenShift avec GitOps et durcissement DevSecOps (Projet de fin d'études)",
    },
    readme: {
      en: `# Cloud PaaS / DevSecOps Platform

Final-year engineering project (3S Standard Sharing Software, Feb - Jul 2026):
design and deployment of a DevSecOps PaaS platform built on OpenShift.

## Highlights
- Automated integration, validation and deployment of microservices with
  Tekton CI/CD pipelines
- GitOps delivery via ArgoCD to sync and deploy microservices onto the cluster
- Platform hardening with RBAC, SCC, NetworkPolicies, Kyverno and OpenBao
- Full observability stack: Prometheus, Grafana, Jaeger and ELK

## Stack
OpenShift - Tekton - ArgoCD - Kyverno - OpenBao - Prometheus - Grafana - Jaeger - ELK

## Status
Delivered as a final-year engineering project (PFE), ESPRIT.`,
      fr: `# Plateforme Cloud PaaS / DevSecOps

Projet de fin d'études (3S Standard Sharing Software, Fév - Juil 2026) :
conception et déploiement d'une plateforme PaaS DevSecOps basée sur OpenShift.

## Points clés
- Automatisation de l'intégration, de la validation et du déploiement de
  microservices via des pipelines Tekton CI/CD
- Livraison GitOps avec ArgoCD pour synchroniser et déployer les microservices
  sur le cluster
- Durcissement de la plateforme avec RBAC, SCC, NetworkPolicies, Kyverno et OpenBao
- Stack d'observabilité complète : Prometheus, Grafana, Jaeger et ELK

## Stack
OpenShift - Tekton - ArgoCD - Kyverno - OpenBao - Prometheus - Grafana - Jaeger - ELK

## Statut
Livré en tant que Projet de Fin d'Études (PFE), ESPRIT.`,
    },
    diagram: "diagram:paas",
    demoLink: "https://github.com/zayatihamza",
    techStack: {
      platform: "OpenShift",
      cicd: "Tekton",
      gitops: "ArgoCD",
      security: ["RBAC", "SCC", "NetworkPolicies", "Kyverno", "OpenBao"],
      observability: ["Prometheus", "Grafana", "Jaeger", "ELK"],
    },
  },
  {
    slug: "AI-Terraform-Provisioning-Agent",
    summary: {
      en: "RAG-powered AI agent that provisions Cloud infrastructure via Terraform",
      fr: "Agent IA (RAG) qui provisionne l'infrastructure Cloud via Terraform",
    },
    readme: {
      en: `# AI Terraform Provisioning Agent (RAG)

Engineering internship (3S Standard Sharing Software, Jul - Sep 2025):
an AI agent that automates CloudStack resource provisioning through Terraform.

## Architecture
- Ingestion of infrastructure docs with Firecrawl
- Chunking / segmentation with LangChain
- Vector indexing and retrieval with Milvus
- Autonomous Terraform configuration generation via LLaMA3-70B (Groq API)

## Outcome
Reduced deployment time and cut manual-configuration errors by generating
validated Terraform straight from natural-language infrastructure requests.

## Stack
Terraform - CloudStack - LangChain - Firecrawl - Milvus - LLaMA3-70B (Groq)`,
      fr: `# Agent IA de Provisioning Terraform (RAG)

Stage ingénieur (3S Standard Sharing Software, Juil - Sept 2025) :
un agent IA qui automatise le provisioning de ressources CloudStack via Terraform.

## Architecture
- Ingestion des documents d'infrastructure avec Firecrawl
- Segmentation (chunking) avec LangChain
- Indexation et recherche vectorielle avec Milvus
- Génération autonome de configurations Terraform via LLaMA3-70B (API Groq)

## Résultat
Réduction du temps de déploiement et des erreurs de configuration manuelle
grâce à la génération de Terraform validé à partir de requêtes en langage naturel.

## Stack
Terraform - CloudStack - LangChain - Firecrawl - Milvus - LLaMA3-70B (Groq)`,
    },
    diagram: "diagram:rag",
    demoLink: "https://github.com/zayatihamza",
    techStack: {
      target: "CloudStack",
      iac: "Terraform",
      rag_pipeline: { ingestion: "Firecrawl", chunking: "LangChain", vector_store: "Milvus" },
      llm: "LLaMA3-70B via Groq API",
    },
  },
  {
    slug: "Jenkins-K8s-CICD-Pipeline",
    summary: {
      en: "End-to-end CI/CD pipeline with Jenkins, Kubernetes & Helm",
      fr: "Pipeline CI/CD de bout en bout avec Jenkins, Kubernetes et Helm",
    },
    readme: {
      en: `# Jenkins / Kubernetes CI/CD Pipeline

Personal project (Oct 2025): a complete CI/CD pipeline from commit to
production-style deployment.

## Pipeline stages
- Unit testing with JUnit
- Code quality gating with SonarQube
- Artifact management with Nexus
- Multi-stage Docker builds
- Continuous deployment to Kubernetes via Helm
- Infrastructure & pipeline monitoring with Prometheus and Grafana dashboards

## Stack
Jenkins - JUnit - SonarQube - Nexus - Docker - Kubernetes - Helm - Prometheus - Grafana`,
      fr: `# Pipeline CI/CD Jenkins / Kubernetes

Projet personnel (Octobre 2025) : un pipeline CI/CD complet, du commit
jusqu'au déploiement en conditions proches de la production.

## Étapes du pipeline
- Tests unitaires avec JUnit
- Contrôle qualité du code avec SonarQube
- Gestion des artefacts avec Nexus
- Builds Docker multi-stage
- Déploiement continu sur Kubernetes via Helm
- Supervision de l'infrastructure et du pipeline avec des dashboards Prometheus et Grafana

## Stack
Jenkins - JUnit - SonarQube - Nexus - Docker - Kubernetes - Helm - Prometheus - Grafana`,
    },
    diagram: "diagram:cicd",
    demoLink: "https://github.com/zayatihamza",
    techStack: {
      ci: "Jenkins",
      testing: "JUnit",
      quality: "SonarQube",
      artifacts: "Nexus",
      containerization: "Docker (multi-stage)",
      deployment: "Kubernetes via Helm",
      monitoring: ["Prometheus", "Grafana"],
    },
  },
  {
    slug: "OpenStack-Multitenant-SaaS",
    summary: {
      en: "Private cloud (OpenStack) + multi-tenant SaaS application",
      fr: "Cloud privé (OpenStack) + application SaaS multi-tenant",
    },
    readme: {
      en: `# Private Cloud & Multi-tenant SaaS

Personal project (Nov 2024 - May 2025): a private IaaS cloud paired with a
multi-tenant SaaS application built on top of it.

## What shipped
- Multi-node OpenStack deployment (Compute, Storage, Network) automated
  with Ansible
- Multi-tenant SaaS app (Spring Boot / Angular) with Stripe billing and
  real-time features over WebSockets
- Hybrid orchestration extending workloads onto Azure AKS
- Full application-metrics monitoring across the hybrid setup

## Stack
OpenStack - Ansible - Spring Boot - Angular - Stripe - WebSockets - Azure AKS`,
      fr: `# Cloud Privé & SaaS Multi-tenant

Projet personnel (Nov 2024 - Mai 2025) : un cloud privé IaaS associé à une
application SaaS multi-tenant construite par-dessus.

## Réalisations
- Déploiement OpenStack multi-nœuds (Compute, Storage, Network) automatisé
  avec Ansible
- Application SaaS multi-tenant (Spring Boot / Angular) avec facturation
  Stripe et fonctionnalités temps réel via WebSockets
- Orchestration hybride étendant les workloads vers Azure AKS
- Supervision complète des métriques applicatives sur l'ensemble hybride

## Stack
OpenStack - Ansible - Spring Boot - Angular - Stripe - WebSockets - Azure AKS`,
    },
    diagram: "diagram:openstack",
    demoLink: "https://github.com/zayatihamza",
    techStack: {
      iaas: "OpenStack (Compute, Storage, Network)",
      automation: "Ansible",
      app: { backend: "Spring Boot", frontend: "Angular" },
      billing: "Stripe",
      realtime: "WebSockets",
      hybrid_cloud: "Azure AKS",
    },
  },
  {
    slug: "Confera-Conference-Manager",
    summary: {
      en: "Hybrid desktop + web conference management system",
      fr: "Système hybride de gestion de conférences (desktop + web)",
    },
    readme: {
      en: `# Confera - Conference Management System

Academic project (Jan - May 2024): a hybrid conference-management solution
spanning a desktop client and a web application.

## What shipped
- Desktop application built with JavaFX
- Web application built with Symfony
- Shared MySQL database across both clients
- Agile delivery: sprint planning and tracking with Jira, versioning with Git

## Stack
JavaFX - Symfony - MySQL - Jira - Git`,
      fr: `# Confera - Système de Gestion de Conférences

Projet académique (Jan - Mai 2024) : une solution hybride de gestion de
conférences combinant un client desktop et une application web.

## Réalisations
- Application desktop développée avec JavaFX
- Application web développée avec Symfony
- Base de données MySQL partagée entre les deux clients
- Gestion de projet agile : sprints planifiés et suivis avec Jira, versioning avec Git

## Stack
JavaFX - Symfony - MySQL - Jira - Git`,
    },
    diagram: "diagram:confera",
    demoLink: "https://github.com/zayatihamza",
    techStack: {
      desktop: "JavaFX",
      web: "Symfony",
      database: "MySQL",
      workflow: "Agile (Jira, Git)",
    },
  },
];

function getProjects(lang) {
  return PROJECT_DATA.map((p) => ({
    slug: p.slug,
    name: p.slug,
    summary: p.summary[lang],
    files: {
      "README.md": p.readme[lang],
      "architecture-diagram.png": p.diagram,
      "demo-link.txt": p.demoLink,
      "tech-stack.json": JSON.stringify(p.techStack, null, 2),
    },
  }));
}

const EXPERIENCE_DATA = [
  {
    role: { en: "Final-year Project - Cloud PaaS / DevSecOps", fr: "Projet de Fin d'Études - Cloud PaaS / DevSecOps" },
    org: "3S Standard Sharing Software",
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    period: { en: "Feb 2026 - Jul 2026", fr: "Fév 2026 - Juil 2026" },
    bullets: {
      en: [
        "Designed and deployed a DevSecOps PaaS platform on OpenShift",
        "Automated microservice integration, validation and deployment with Tekton CI/CD",
        "Implemented GitOps with ArgoCD to sync and deploy microservices to the cluster",
        "Hardened the platform with RBAC, SCC, NetworkPolicies, Kyverno and OpenBao",
        "Integrated observability with Prometheus, Grafana, Jaeger and ELK",
      ],
      fr: [
        "Conception et déploiement d'une plateforme PaaS DevSecOps basée sur OpenShift",
        "Automatisation de l'intégration, de la validation et du déploiement de microservices avec Tekton CI/CD",
        "Mise en œuvre du GitOps avec ArgoCD pour synchroniser et déployer les microservices sur le cluster",
        "Sécurisation de la plateforme avec RBAC, SCC, NetworkPolicies, Kyverno et OpenBao",
        "Intégration de l'observabilité avec Prometheus, Grafana, Jaeger et ELK",
      ],
    },
  },
  {
    role: { en: "Engineering Intern - Cloud & AI", fr: "Stage Ingénieur - Cloud & IA" },
    org: "3S Standard Sharing Software",
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    period: { en: "Jul 2025 - Sep 2025", fr: "Juil 2025 - Sept 2025" },
    bullets: {
      en: [
        "Designed an AI agent (RAG) automating CloudStack provisioning via Terraform",
        "Built the RAG pipeline: ingestion (Firecrawl), chunking (LangChain), vector indexing (Milvus)",
        "Integrated LLaMA3-70B via the Groq API for autonomous infrastructure config generation",
        "Reduced deployment time and manual configuration errors",
      ],
      fr: [
        "Conception d'un agent IA (RAG) automatisant le provisioning CloudStack via Terraform",
        "Architecture RAG : ingestion (Firecrawl), segmentation (LangChain), indexation vectorielle (Milvus)",
        "Intégration de LLaMA3-70B via l'API Groq pour la génération autonome de configurations d'infrastructure",
        "Optimisation des temps de déploiement et réduction des erreurs de configuration manuelle",
      ],
    },
  },
  {
    role: { en: "Full-stack Intern", fr: "Stage Full-stack" },
    org: "Arabsoft",
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    period: { en: "Jul 2024 - Aug 2024", fr: "Juil 2024 - Août 2024" },
    bullets: {
      en: [
        "Built a full-stack HR portal (employee & process management) with Spring Boot and Angular",
        "Secured auth/authorization with Keycloak and Spring Security (JWT)",
        "Designed REST APIs, automated tests with Postman, collaborative Git workflow",
      ],
      fr: [
        "Développement Full-stack d'un portail RH (gestion employés / processus) avec Spring Boot et Angular",
        "Sécurisation (auth / autorisation) via Keycloak et Spring Security (JWT)",
        "Conception d'API REST, tests automatisés (Postman) et gestion de version collaborative sous Git",
      ],
    },
  },
];

function getExperience(lang) {
  return EXPERIENCE_DATA.map((e) => ({
    role: e.role[lang],
    org: `${e.org} - ${e.location[lang]}`,
    period: e.period[lang],
    bullets: e.bullets[lang],
  }));
}

const EDUCATION_DATA = [
  {
    degree: { en: "Engineering Degree in Computer Science (Cloud Computing)", fr: "Diplôme National d'Ingénieur en Informatique (Cloud Computing)" },
    org: "ESPRIT",
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    period: "2026",
  },
  {
    degree: { en: "Integrated Prep Cycle (Math-Physics-Computer Science)", fr: "Cycle Préparatoire Intégré (Math-Physique-Informatique)" },
    org: "Faculté des Sciences de Tunis",
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    period: "2021 - 2023",
  },
];

function getEducation(lang) {
  return EDUCATION_DATA.map((e) => ({
    degree: e.degree[lang],
    org: `${e.org} - ${e.location[lang]}`,
    period: e.period,
  }));
}

const CERTIFICATIONS = [
  "CCNA: Switching, Routing, and Wireless Essentials",
  "AWS: Cloud Foundations - Cloud Operations",
];

const SKILLS_DATA = [
  { category: { en: "Cloud & IaC", fr: "Cloud & IaC" }, level: 90, items: ["OpenShift", "Microsoft Azure", "OpenStack", "Terraform", "Ansible"] },
  { category: { en: "Containers & Orchestration", fr: "Conteneurs & Orchestration" }, level: 88, items: ["Docker", "Kubernetes (AKS)", "Helm"] },
  { category: { en: "CI/CD & Tooling", fr: "CI/CD & Outils" }, level: 85, items: ["Jenkins", "Tekton", "Maven", "SonarQube"] },
  { category: { en: "Monitoring & Observability", fr: "Supervision & Observabilité" }, level: 82, items: ["Prometheus", "Grafana", "Jaeger", "ELK"] },
  { category: { en: "Security & GitOps", fr: "Sécurité & GitOps" }, level: 84, items: ["RBAC", "SCC", "NetworkPolicies", "Kyverno", "OpenBao", "ArgoCD"] },
  { category: { en: "Languages", fr: "Langages" }, level: 80, items: ["Java", "Python", "Shell", "JavaScript / TypeScript", "C++"] },
  { category: { en: "Frameworks", fr: "Frameworks" }, level: 78, items: ["Spring Boot", "Spring Security", "Angular"] },
  { category: { en: "Databases", fr: "Bases de données" }, level: 75, items: ["MySQL", "Oracle", "MongoDB", "Milvus"] },
];

function getSkills(lang) {
  return SKILLS_DATA.map((s) => ({ category: s.category[lang], level: s.level, items: s.items }));
}

const BIO_DATA = {
  role: { en: "Cloud / DevSecOps Engineer", fr: "Ingénieur Cloud / DevSecOps" },
  tagline: {
    en: "I build and secure the platforms other people ship on.",
    fr: "Je construis et sécurise les plateformes sur lesquelles les autres déploient.",
  },
  location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
  about: {
    en: `Computer engineer specialized in IT Architecture and Cloud Computing, with
hands-on experience automating secure deployments (DevSecOps), hardening
cloud platforms, and integrating AI solutions into cloud infrastructure.`,
    fr: `Ingénieur en informatique, spécialisé en Architectures IT et Cloud Computing,
avec une expérience pratique dans l'automatisation sécurisée des déploiements
(DevSecOps), la sécurisation des plateformes cloud et l'intégration de
solutions IA pour l'infrastructure cloud.`,
  },
  facts: {
    en: [
      { label: "Focus", value: "Cloud / DevSecOps engineering" },
      { label: "Degree", value: "Engineering Degree in Computer Science - ESPRIT, 2026" },
      { label: "Currently", value: "OpenShift PaaS platform - security & GitOps" },
      { label: "Languages", value: "French (fluent), English (fluent)" },
    ],
    fr: [
      { label: "Spécialité", value: "Ingénierie Cloud / DevSecOps" },
      { label: "Diplôme", value: "Diplôme National d'Ingénieur en Informatique - ESPRIT, 2026" },
      { label: "Actuellement", value: "Plateforme PaaS OpenShift - sécurité & GitOps" },
      { label: "Langues", value: "Français (courant), Anglais (courant)" },
    ],
  },
};

function getBio(lang) {
  return {
    name: BIO_CONTACT.name,
    role: BIO_DATA.role[lang],
    tagline: BIO_DATA.tagline[lang],
    location: BIO_DATA.location[lang],
    about: BIO_DATA.about[lang],
    facts: BIO_DATA.facts[lang],
    email: BIO_CONTACT.email,
    phone: BIO_CONTACT.phone,
    linkedin: BIO_CONTACT.linkedin,
    github: BIO_CONTACT.github,
  };
}

/* ============================== UI STRINGS ============================== */

const UI_STRINGS = {
  en: {
    appTitles: { files: "Files", terminal: "Terminal", about: "About Me", skills: "Skills", contact: "Contact", resume: "Resume", settings: "Settings" },
    boot: { booting: "HamzaOS booting" },
    login: { role: "Platform Engineer", signingIn: "Signing in…", skip: "skip → enter as guest" },
    toasts: { welcome: "👋 Welcome to HamzaOS — try opening the Terminal", rightClick: "💡 Right-click the desktop for quick actions", newFolder: "📁 New folder created (demo mode)", refreshed: "Desktop refreshed" },
    contextMenu: { newFolder: "New Folder", changeWallpaper: "Change Wallpaper", refresh: "Refresh" },
    files: { places: "Places", home: "Home", projects: "Projects" },
    terminal: {
      banner: "HamzaOS Terminal v1.0 - type 'help' to get started.",
      help: "Commands: ls, cd <dir>, cat <file>, pwd, whoami, skills --list, open <app>, clear, contact, resume, help",
      emptyDir: "(empty)",
      cdUsage: "usage: cat <file>",
      cdError: (a) => `cd: no such directory: ${a}`,
      catUsage: "usage: cat <file>",
      catBinary: "[binary file - open in Files app to view]",
      catError: (a) => `cat: ${a}: No such file`,
      openError: "open: unknown app 'ARG'. Try: files, about, skills, contact, resume, settings",
      openOpening: (a) => `Opening ${a}...`,
      openingResume: "Opening resume...",
      sudo: "Nice try. This is a portfolio, not a production cluster. 😄",
      notFound: (c) => `command not found: ${c} (type 'help')`,
    },
    contact: { emailBtn: "Email", githubBtn: "GitHub", linkedinBtn: "LinkedIn", namePh: "Your name", emailPh: "Your email", messagePh: "Message", send: "Send message", sent: "Sent (demo)" },
    resume: { experience: "Experience", skills: "Skills", projects: "Projects", education: "Education", certifications: "Certifications", download: "Download" },
    settings: { appearance: "Appearance", dark: "Dark mode", light: "Light mode", wallpaper: "Wallpaper", language: "Language", footer: "HamzaOS is a portfolio, not a real operating system — but the windows still drag, the terminal still runs, and nothing here will page anyone at 3am." },
    brand: "HamzaOS",
  },
  fr: {
    appTitles: { files: "Fichiers", terminal: "Terminal", about: "À propos", skills: "Compétences", contact: "Contact", resume: "CV", settings: "Paramètres" },
    boot: { booting: "Démarrage de HamzaOS" },
    login: { role: "Ingénieur Plateforme", signingIn: "Connexion en cours…", skip: "passer → entrer en invité" },
    toasts: { welcome: "👋 Bienvenue sur HamzaOS — essayez d'ouvrir le Terminal", rightClick: "💡 Clic droit sur le bureau pour les actions rapides", newFolder: "📁 Nouveau dossier créé (mode démo)", refreshed: "Bureau actualisé" },
    contextMenu: { newFolder: "Nouveau dossier", changeWallpaper: "Changer de fond d'écran", refresh: "Actualiser" },
    files: { places: "Emplacements", home: "Accueil", projects: "Projets" },
    terminal: {
      banner: "Terminal HamzaOS v1.0 - tapez 'help' pour commencer.",
      help: "Commandes : ls, cd <dossier>, cat <fichier>, pwd, whoami, skills --list, open <app>, clear, contact, resume, help",
      emptyDir: "(vide)",
      cdUsage: "usage : cat <fichier>",
      cdError: (a) => `cd : dossier introuvable : ${a}`,
      catUsage: "usage : cat <fichier>",
      catBinary: "[fichier binaire - ouvrir dans l'app Fichiers pour visualiser]",
      catError: (a) => `cat : ${a} : fichier introuvable`,
      openError: "open : application inconnue 'ARG'. Essayez : files, about, skills, contact, resume, settings",
      openOpening: (a) => `Ouverture de ${a}...`,
      openingResume: "Ouverture du CV...",
      sudo: "Belle tentative. Ceci est un portfolio, pas un cluster de production. 😄",
      notFound: (c) => `commande introuvable : ${c} (tapez 'help')`,
    },
    contact: { emailBtn: "Email", githubBtn: "GitHub", linkedinBtn: "LinkedIn", namePh: "Votre nom", emailPh: "Votre email", messagePh: "Message", send: "Envoyer", sent: "Envoyé (démo)" },
    resume: { experience: "Expérience", skills: "Compétences", projects: "Projets", education: "Formation", certifications: "Certifications", download: "Télécharger" },
    settings: { appearance: "Apparence", dark: "Mode sombre", light: "Mode clair", wallpaper: "Fond d'écran", language: "Langue", footer: "HamzaOS est un portfolio, pas un vrai système d'exploitation — mais les fenêtres se déplacent, le terminal fonctionne, et rien ici ne réveillera personne à 3h du matin." },
    brand: "HamzaOS",
  },
};

/* ============================== LANGUAGE CONTEXT ============================== */

const LangContext = createContext(null);
function useLang() {
  return useContext(LangContext);
}

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

/* ============================== AVATAR ============================== */

const AVATAR_SRC = "/avatar.jpg";

function Avatar({ initial, rounded = "rounded-full", className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`w-full h-full flex items-center justify-center font-mono font-bold ${className}`}>
        {initial}
      </div>
    );
  }
  return (
    <img
      src={AVATAR_SRC}
      onError={() => setFailed(true)}
      alt="Avatar"
      className={`w-full h-full object-cover ${rounded}`}
    />
  );
}

function BootScreen({ onDone }) {
  const { t } = useLang();
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
        <div className="absolute inset-0 rounded-full border-2 border-[#5eead4]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#5eead4] animate-spin [animation-duration:1.1s]" />
        <div className="absolute inset-[6px] rounded-full overflow-hidden bg-gradient-to-br from-[#5eead4]/20 to-[#a78bfa]/20 flex items-center justify-center">
          <Avatar initial="H" className="text-[#5eead4] text-lg" />
        </div>
      </div>
      <div className="w-52 h-[3px] rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#5eead4] to-[#a78bfa] rounded-full"
          style={{ width: `${pct}%`, transition: "width 60ms linear" }}
        />
      </div>
      <div className="font-mono text-[11px] tracking-[0.25em] text-white/30 uppercase">
        {t.boot.booting}
      </div>
    </div>
  );
}

function LoginScreen({ onDone }) {
  const { t } = useLang();
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
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#5eead4]/25 to-[#a78bfa]/25 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(94,234,212,0.15)]">
          <Avatar initial="H" className="text-2xl text-[#5eead4]" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="font-mono text-lg text-white/90 h-7">
            {typed}
            <span className="inline-block w-[2px] h-5 bg-[#5eead4] ml-0.5 align-middle animate-pulse" />
          </div>
          <div className="text-[11px] text-white/35 tracking-wide">{t.login.role}</div>
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
              {t.login.signingIn}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 pb-8 flex flex-col items-center gap-3">
        <button
          onClick={onDone}
          className="text-[11px] text-white/35 hover:text-white/70 transition-colors font-mono tracking-wide underline underline-offset-4 decoration-white/20"
        >
          {t.login.skip}
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
  const { lang, setLang } = useLang();
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
        <button
          onClick={() => setLang(lang === "en" ? "fr" : "en")}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-[var(--accentSoft)] transition-colors"
          title="Language"
        >
          <Languages size={13} />
          <span className="uppercase tracking-wide" style={{ color: "var(--text)" }}>{lang}</span>
        </button>
        <span style={{ color: "var(--text)" }}>{formatClock(now)}</span>
      </div>
    </div>
  );
}

/* ============================== DOCK ============================== */

function DockIcon({ appId, def, active, running, onClick, isMobile }) {
  const [hover, setHover] = useState(false);
  const { t } = useLang();
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
          {t.appTitles[appId]}
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
  const { t } = useLang();

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
            {t.appTitles[win.appId]}
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
    paas: ["Git", "Tekton", "ArgoCD", "OpenShift", "Kyverno", "OpenBao"],
    rag: ["Docs", "Firecrawl", "LangChain", "Milvus", "LLaMA3-70B", "Terraform"],
    cicd: ["Commit", "Jenkins", "SonarQube", "Nexus", "Docker", "K8s / Helm"],
    openstack: ["Ansible", "OpenStack", "SaaS App", "Azure AKS"],
    confera: ["JavaFX", "MySQL", "Symfony"],
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
  const { t, content } = useLang();
  const [openFolder, setOpenFolder] = useState(null); // project slug
  const [selectedFile, setSelectedFile] = useState(null);

  const project = content.projects.find((p) => p.slug === openFolder);

  return (
    <div className="flex h-full text-[13px]" style={{ color: "var(--text)" }}>
      <div
        className="w-[168px] shrink-0 border-r p-2.5 flex flex-col gap-0.5 overflow-auto"
        style={{ borderColor: "var(--border)", background: "var(--panel2)" }}
      >
        <div className="text-[10.5px] uppercase tracking-wider px-2 py-1.5" style={{ color: "var(--textFaint)" }}>
          {t.files.places}
        </div>
        <button
          onClick={() => {
            setOpenFolder(null);
            setSelectedFile(null);
          }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--accentSoft)] text-left"
        >
          <Home size={14} style={{ color: "var(--textMuted)" }} /> {t.files.home}
        </button>
        <div className="text-[10.5px] uppercase tracking-wider px-2 pt-3 pb-1.5" style={{ color: "var(--textFaint)" }}>
          {t.files.projects}
        </div>
        {content.projects.map((p) => (
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
          <span>~/{t.files.projects}</span>
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
              {content.projects.map((p) => (
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

function buildFsTree(projects) {
  const tree = { Projects: {} };
  for (const p of projects) {
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
  const { t, lang, content } = useLang();
  const fsTree = useMemo(() => buildFsTree(content.projects), [content.projects]);
  const [cwd, setCwd] = useState([]);
  const [lines, setLines] = useState([{ type: "banner", text: t.terminal.banner }]);
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
    const tt = t.terminal;

    switch (cmd) {
      case "help":
        print(tt.help);
        break;
      case "clear":
        setLines([]);
        break;
      case "pwd":
        print("/" + cwd.join("/"));
        break;
      case "whoami":
        print(`${content.bio.name} — ${content.bio.role}`);
        print(content.bio.tagline);
        break;
      case "skills":
      case "skills --list":
        content.skills.forEach((s) => print(`${s.category.padEnd(26, " ")} ${s.items.join(", ")}`));
        break;
      case "ls": {
        const node = getNode(fsTree, cwd);
        if (!node) print("ls: cannot access directory", "error");
        else {
          const entries = Object.keys(node).filter((k) => k !== "__files");
          const files = node.__files ? Object.keys(node.__files) : [];
          if (!entries.length && !files.length) print(tt.emptyDir);
          print([...entries.map((e) => e + "/"), ...files].join("   "));
        }
        break;
      }
      case "cd": {
        const target = resolvePath(cwd, arg || "");
        const node = getNode(fsTree, target);
        if (arg === "" || arg === "~") setCwd([]);
        else if (node && typeof node === "object") setCwd(target);
        else print(tt.cdError(arg), "error");
        break;
      }
      case "cat": {
        if (!arg) {
          print(tt.catUsage, "error");
          break;
        }
        const dirNode = getNode(fsTree, cwd);
        const filesHere = dirNode && dirNode.__files;
        if (filesHere && arg in filesHere) {
          const fileContent = filesHere[arg];
          if (arg === "architecture-diagram.png") print(tt.catBinary);
          else print(fileContent.split(":")[0] === "diagram" ? "[diagram]" : fileContent);
        } else {
          print(tt.catError(arg), "error");
        }
        break;
      }
      case "open": {
        const map = { files: "files", explorer: "files", about: "about", skills: "skills", contact: "contact", resume: "resume", settings: "settings", terminal: "terminal" };
        if (map[arg]) {
          openApp(map[arg]);
          print(tt.openOpening(map[arg]));
        } else print(tt.openError.replace("ARG", arg), "error");
        break;
      }
      case "contact":
        print(`Email: ${content.bio.email}`);
        print(`Phone: ${content.bio.phone}`);
        print(`GitHub: ${content.bio.github}`);
        print(`LinkedIn: ${content.bio.linkedin}`);
        openApp("contact");
        break;
      case "resume":
        print(tt.openingResume);
        openApp("resume");
        break;
      case "echo":
        print(rest.join(" "));
        break;
      case "date":
        print(new Date().toString());
        break;
      case "sudo":
        print(tt.sudo);
        break;
      default:
        print(tt.notFound(cmd), "error");
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
  const { content } = useLang();
  const bio = content.bio;
  return (
    <div className="h-full overflow-auto p-6" style={{ color: "var(--text)" }}>
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center text-xl"
          style={{ background: "var(--accentSoft)", color: "var(--accent)" }}
        >
          <Avatar initial={bio.name[0]} rounded="rounded-2xl" className="text-xl" />
        </div>
        <div>
          <div className="text-lg font-semibold">{bio.name}</div>
          <div className="text-[13px]" style={{ color: "var(--textMuted)" }}>{bio.role}</div>
        </div>
      </div>
      <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: "var(--textMuted)" }}>
        {bio.about}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {bio.facts.map((f) => (
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
  const { content } = useLang();
  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-4">
      {content.skills.map((s) => (
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
  const { t, content } = useLang();
  const bio = content.bio;
  const [sent, setSent] = useState(false);
  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-5" style={{ color: "var(--text)" }}>
      <div className="flex flex-col gap-2 text-[12.5px]" style={{ color: "var(--textMuted)" }}>
        <div className="flex items-center gap-2"><Mail size={13} /> {bio.email}</div>
        <div className="flex items-center gap-2"><span className="w-[13px] text-center">📞</span> {bio.phone}</div>
      </div>

      <div className="flex gap-3">
        <a
          href={`mailto:${bio.email}`}
          className="flex-1 flex items-center gap-2 justify-center py-2.5 rounded-xl border text-[13px] hover:bg-[var(--accentSoft)] transition-colors"
          style={{ borderColor: "var(--border)" }}
        >
          <Mail size={15} /> {t.contact.emailBtn}
        </a>
        <a
          href={bio.github}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center gap-2 justify-center py-2.5 rounded-xl border text-[13px] hover:bg-[var(--accentSoft)] transition-colors"
          style={{ borderColor: "var(--border)" }}
        >
          <GithubIcon size={15} /> {t.contact.githubBtn}
        </a>
        <a
          href={bio.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center gap-2 justify-center py-2.5 rounded-xl border text-[13px] hover:bg-[var(--accentSoft)] transition-colors"
          style={{ borderColor: "var(--border)" }}
        >
          <LinkedinIcon size={15} /> {t.contact.linkedinBtn}
        </a>
      </div>

      <div className="flex flex-col gap-2.5">
        <input
          placeholder={t.contact.namePh}
          className="px-3 py-2.5 rounded-xl border bg-transparent text-[13px] outline-none focus:border-[var(--accent)]"
          style={{ borderColor: "var(--border)" }}
        />
        <input
          placeholder={t.contact.emailPh}
          className="px-3 py-2.5 rounded-xl border bg-transparent text-[13px] outline-none focus:border-[var(--accent)]"
          style={{ borderColor: "var(--border)" }}
        />
        <textarea
          placeholder={t.contact.messagePh}
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
          {sent ? t.contact.sent : t.contact.send}
        </button>
      </div>
    </div>
  );
}

function ResumeApp() {
  const { t, content } = useLang();
  const bio = content.bio;

  const downloadResume = () => {
    const text = `${bio.name} — ${bio.role}
${bio.email} | ${bio.phone} | ${bio.linkedin} | ${bio.github}

${bio.about}

${t.resume.experience.toUpperCase()}
${content.experience.map(
  (e) => `- ${e.role}, ${e.org} (${e.period})\n${e.bullets.map((b) => `    * ${b}`).join("\n")}`
).join("\n\n")}

${t.resume.skills.toUpperCase()}
${content.skills.map((s) => `- ${s.category}: ${s.items.join(", ")}`).join("\n")}

${t.resume.projects.toUpperCase()}
${content.projects.map((p) => `- ${p.name}: ${p.summary}`).join("\n")}

${t.resume.education.toUpperCase()}
${content.education.map((e) => `- ${e.degree}, ${e.org} (${e.period})`).join("\n")}

${t.resume.certifications.toUpperCase()}
${content.certifications.map((c) => `- ${c}`).join("\n")}
`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hamza-zayati-resume.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-5" style={{ color: "var(--text)" }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[16px] font-semibold">{bio.name}</div>
          <div className="text-[12.5px]" style={{ color: "var(--textMuted)" }}>{bio.role}</div>
        </div>
        <button
          onClick={downloadResume}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium"
          style={{ background: "var(--accent)", color: "#04140f" }}
        >
          <Download size={14} /> {t.resume.download}
        </button>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "var(--textFaint)" }}>{t.resume.experience}</div>
        <div className="flex flex-col gap-2.5">
          {content.experience.map((e) => (
            <div key={e.role} className="rounded-xl border p-3.5" style={{ borderColor: "var(--border)", background: "var(--panel2)" }}>
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] font-medium">{e.role}</div>
                <div className="text-[11px] font-mono shrink-0" style={{ color: "var(--textFaint)" }}>{e.period}</div>
              </div>
              <div className="text-[11.5px] mb-1.5" style={{ color: "var(--accent)" }}>{e.org}</div>
              <ul className="flex flex-col gap-0.5">
                {e.bullets.map((b, i) => (
                  <li key={i} className="text-[11.5px] pl-3 relative" style={{ color: "var(--textMuted)" }}>
                    <span className="absolute left-0" style={{ color: "var(--accent)" }}>&bull;</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "var(--textFaint)" }}>{t.resume.projects}</div>
        <div className="flex flex-col gap-2">
          {content.projects.map((p) => (
            <div key={p.slug} className="rounded-xl border p-3" style={{ borderColor: "var(--border)" }}>
              <div className="text-[12.5px] font-medium">{p.name}</div>
              <div className="text-[11.5px]" style={{ color: "var(--textMuted)" }}>{p.summary}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "var(--textFaint)" }}>{t.resume.education}</div>
        <div className="flex flex-col gap-2">
          {content.education.map((e) => (
            <div key={e.degree} className="rounded-xl border p-3" style={{ borderColor: "var(--border)" }}>
              <div className="text-[12.5px] font-medium">{e.degree}</div>
              <div className="text-[11.5px]" style={{ color: "var(--textMuted)" }}>{e.org} &middot; {e.period}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "var(--textFaint)" }}>{t.resume.certifications}</div>
        <div className="flex flex-wrap gap-1.5">
          {content.certifications.map((c) => (
            <span key={c} className="text-[11px] px-2.5 py-1 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--textMuted)" }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsApp({ theme, setTheme, wallpaper, setWallpaper }) {
  const { t, lang, setLang } = useLang();
  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-6" style={{ color: "var(--text)" }}>
      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2.5 flex items-center gap-1.5" style={{ color: "var(--textFaint)" }}>
          <Languages size={12} /> {t.settings.language}
        </div>
        <div className="flex items-center rounded-xl border p-1 gap-1" style={{ borderColor: "var(--border)" }}>
          {["en", "fr"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="flex-1 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors"
              style={{
                background: lang === l ? "var(--accent)" : "transparent",
                color: lang === l ? "#04140f" : "var(--textMuted)",
              }}
            >
              {l === "en" ? "English" : "Français"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide mb-2.5" style={{ color: "var(--textFaint)" }}>{t.settings.appearance}</div>
        <div className="flex items-center justify-between rounded-xl border p-3.5" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2.5 text-[13px]">
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            {theme === "dark" ? t.settings.dark : t.settings.light}
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
          <Palette size={12} /> {t.settings.wallpaper}
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
        {t.settings.footer}
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
  const [lang, setLang] = useState("en");
  const [bootTime, setBootTime] = useState(null);
  const now = useNow();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const t = UI_STRINGS[lang];
  const content = useMemo(
    () => ({
      bio: getBio(lang),
      skills: getSkills(lang),
      projects: getProjects(lang),
      experience: getExperience(lang),
      education: getEducation(lang),
      certifications: CERTIFICATIONS,
    }),
    [lang]
  );
  const langCtxValue = useMemo(() => ({ lang, setLang, t, content }), [lang, t, content]);

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
      pushToast(t.toasts.welcome, 2200);
      pushToast(t.toasts.rightClick, 9000);
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
    { icon: FilePlus, label: t.contextMenu.newFolder, onClick: () => pushToast(t.toasts.newFolder) },
    { icon: Palette, label: t.contextMenu.changeWallpaper, onClick: () => setWallpaper((w) => (w + 1) % WALLPAPERS.length) },
    { divider: true },
    { icon: RefreshCw, label: t.contextMenu.refresh, onClick: () => pushToast(t.toasts.refreshed) },
  ];

  const ctx = { pushToast, openApp, theme, setTheme, wallpaper, setWallpaper };

  return (
    <LangContext.Provider value={langCtxValue}>
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
            mobileTitle={mobileAppId ? t.appTitles[mobileAppId] : null}
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
                    <span className="text-[11px]" style={{ color: "var(--text)" }}>{t.appTitles[appId]}</span>
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
    </LangContext.Provider>
  );
}
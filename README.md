# Rohan Singh

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-built--by--rohan.vercel.app-blue?style=for-the-badge&logo=vercel)](https://built-by-rohan.vercel.app/)

**Computer Science @ UC Irvine | Class of 2027 | Full-Stack Engineer & Product Designer**

> *Products people use, and the AI inside them.*

---

## 🚀 About Me
I own products end to end — from personas and prototypes to the mobile client, the backend, and the models inside it. Alongside that, three years of **Computer Vision** and **Generative AI** research, with two publications.

- **GPA**: 3.92
- **Focus**: Mobile & full-stack product, grounded LLM features, real-time CV pipelines.

## 🛠️ Technical Arsenal

| Category | Skills |
|----------|--------|
| **Languages** | Python, Dart, TypeScript, C++, Java, Kotlin, SQL, C# |
| **AI & Vision** | PyTorch, YOLOv8, OpenCV, RAG, Embeddings, Gemini, Gemma, LangGraph, DINOv2, Faiss, ElevenLabs, Speech-to-Text |
| **Engineering** | Flutter, Next.js, Firebase, Cloud Functions, Docker, AWS, GCP, FastAPI, PostgreSQL, MongoDB |

## 🏆 Featured Projects

### [Behavioral Interview Coach](https://behavioral-interview-coach.vercel.app/) · [source](https://github.com/rohan1234usa/behavioral-coach)
*(Python, FastAPI, Next.js, Docker, AWS S3, Gemini)*  
Soft-skills-first interview simulator that quantifies subconscious cues like facial expression, vocal tone, and pacing to improve delivery. A multimodal pipeline fuses face, voice, and transcript signals into confidence, clarity, resilience, and engagement scores; Gemini streams résumé-tailored questions and builds a coaching plan from past sessions.

### [SikhAI](https://sikhai.vercel.app/) · [source](https://github.com/rohan1234usa/sikh-ai)
*(Next.js, TypeScript, Gemini, Firebase)*  
Full-stack spiritual companion: a scripture-grounded AI chatbot (ten Guru lenses × five response styles × three languages), a Punjabi ↔ English translator, Shabad search across all 1,430 Angs, the daily Hukamnama, and a community seva board.

### Now building
- **Merge** *(Flutter, Dart, Firebase, Cloud Functions, Gemini, Google Maps)* — where plans with friends come together: a social platform built around doing things in real life, covering the logistics that usually stall an outing — timings, carpools and peer-to-peer rides, bring lists, and the expenses that come with them. I originated the product and build it as one of two engineers, owning the plan board, calendar, chat, AI suggester, peer-to-peer rides, and expense surfaces. Launching at UC Irvine; pre-launch, so links land here once it's public.
- **SceneSense** *(Python, Imentiv API, Speech-to-Text, Embeddings)* — an AI scene partner for actors: it scores a take against the script's own emotional arc and separates an improvised line from a forgotten one. Imentiv AI · 2026 internship, in design.
- **Pitch Coach** *(Python, FastAPI, Next.js, PostgreSQL, AWS S3, Gemini, Imentiv API)* — delivery coach for sales reps, built measurement-first: the pipeline computes the evidence and the AI only explains it. One FastAPI pipeline serves three products. Imentiv AI · 2026 internship, pre-launch.
- **Clarity** *(Python, FastAPI, Next.js, LangGraph, Gemma, ElevenLabs, MongoDB, Imentiv API)* — a live AI conversation partner that reads face, voice, and words together, with a streamed peer voice over WebSocket. LA Hacks 2026 team build; I led architecture and the analysis pipelines. Hardening for launch.

### Android Development
- **[Hue Christmas](https://play.google.com/store/apps/details?id=com.asterbyte.huelightshow&hl=en)** *(Kotlin, Jetpack Compose)* — turns Philips Hue lights into holiday light shows. 1K+ downloads on Google Play.
- **[Pitch Prime](https://play.google.com/store/apps/details?id=com.sursadhak.pitchprime&hl=en_US)** *(Java, Android SDK)* — musician's toolkit (real-time tuner, metronome, sound-to-sheet-music transcription), rebuilt from the ground up and localized from Spanish to English.

## 📬 Connect
- [LinkedIn](https://linkedin.com/in/rohan123)
- [Email](mailto:rohans9@uci.edu)
- [GitHub](https://github.com/rohan1234usa)

---

## 🧰 Working on this site

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · Lenis. Text uses the system font stack (SF Pro / Segoe UI / Roboto), so there are no web fonts to load.

```bash
npm install
npm run dev   # http://localhost:3000
```

The contact form sends mail through Gmail SMTP — copy `.env.example` to `.env.local` and fill in `GMAIL_USER` and `GMAIL_APP_PASSWORD` (a Google App Password).

**Where things live**

| To change… | Edit |
|---|---|
| Project copy, links, and tech chips | `FEATURED` / `BUILDING_LEAD` / `BUILDING` / `SHIPPED` in `components/Projects.tsx` |
| A project still being built | Add a `BuildingProject` to `BUILDING` (its interface documents each field) — it renders in the "Now building" band with signal art instead of a screenshot. Launching it means moving it into `FEATURED` with a `frame`; the full checklist is the comment above `BUILDING` |
| The project leading the "Now building" band | `BUILDING_LEAD` — a 0-or-1 array of `FeaturedProject`, so it renders with real art and keeps `prelaunch` while sharing the band rows' column grid. Empty the array to drop the lead; the band self-removes once `BUILDING` is also empty |
| "Now building" signal art | `components/BuildingVisuals.tsx` — one motif per project, shown until there's a real capture |
| Work history | `EXPERIENCE` in `components/Experience.tsx` — array order is display order; `url` is optional |
| Degree, GPA, honors, and coursework | `components/Education.tsx` — each school is a `SchoolCard`: a header plus a bar that opens a panel. The UCI card holds the school, dates, GPA and honor pills, and its panel is `COURSES` (array order is display order, so keep it grouped by department rather than sorted by number); the Monta Vista panel is `AP_GROUPS` (subject → course + score). The bars' counts and teasers derive from those arrays |
| Project screenshots | `public/images/projects/*.webp` — 1920×1080 captures of each live site's hero |
| What fills a project's frame | `frame` on a `FEATURED` or `BUILDING_LEAD` entry — `{ kind: "site", url, shot }` for a browser-framed capture, `{ kind: "mark", src }` for a square app icon (`public/images/projects/*.png`) |
| "Coming soon" state on a project | `prelaunch: { label, pill }` on a `FEATURED` or `BUILDING_LEAD` entry — `pill` is the store pill, and `label` drives the eyebrow dot on `FEATURED` rows only (the band lead hides it). On launch day swap `frame` to `kind: "site"`, delete `prelaunch`, move the object into `FEATURED`, and finish with steps 3–4 of the checklist above `BUILDING` |
| A new tech chip's logo | `TECH` in `components/TechIcon.tsx` — unlisted names fall back to a generic glyph |
| "Open to internships" status (hero, mobile menu, contact) | `AVAILABILITY` in `components/Availability.tsx` |
| GitHub, LinkedIn, email, and résumé links | `lib/links.ts` |
| Link-preview image and favicon | `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` |
| Page title, description, and canonical URL | `metadata` in `app/layout.tsx` |

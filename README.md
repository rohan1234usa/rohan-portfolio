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
| **AI & Vision** | PyTorch, YOLOv8, OpenCV, RAG, Gemini Pro, DINOv2, Faiss |
| **Engineering** | Flutter, Next.js, Firebase, Cloud Functions, Docker, AWS, GCP, FastAPI |

## 🏆 Featured Projects

### Merge — *pre-launch*
*(Flutter, Dart, Firebase, Cloud Functions, Gemini, Google Maps)*  
Where plans with friends come together: a social platform built around real life — find something fun to do, see who’s in, get there together, and split the cost. Launching at UC Irvine. I originated the product and build it as one of two engineers, owning the plan board, calendar, chat, AI suggester, and expense surfaces. *Links will land here once the app is public.*

### [Behavioral Interview Coach](https://behavioral-interview-coach.vercel.app/) · [source](https://github.com/rohan1234usa/behavioral-coach)
*(Python, FastAPI, Next.js, Docker, AWS S3, Gemini)*  
Soft-skills-first interview simulator that quantifies subconscious cues like facial expression, vocal tone, and pacing to improve delivery. A multimodal pipeline fuses face, voice, and transcript signals into confidence, clarity, resilience, and engagement scores; Gemini streams résumé-tailored questions and builds a coaching plan from past sessions.

### [SikhAI](https://sikhai.vercel.app/) · [source](https://github.com/rohan1234usa/sikh-ai)
*(Next.js, TypeScript, Gemini, Firebase)*  
Full-stack spiritual companion: a scripture-grounded AI chatbot (ten Guru lenses × five response styles × three languages), a Punjabi ↔ English translator, Shabad search across all 1,430 Angs, the daily Hukamnama, and a community seva board.

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
| Project copy, links, and tech chips | `FEATURED` / `SHIPPED` in `components/Projects.tsx` |
| Work history | `EXPERIENCE` in `components/Experience.tsx` — array order is display order; `url` is optional |
| Project screenshots | `public/images/projects/*.webp` — 1920×1080 captures of each live site's hero |
| A pre-launch project's app icon | `public/images/projects/*.png` — square, referenced by a project's `mark` |
| "Coming soon" state on a project | `status` on a `FEATURED` entry — drives both the eyebrow dot and the store pill; delete it on launch day |
| A new tech chip's logo | `TECH` in `components/TechIcon.tsx` — unlisted names fall back to a generic glyph |
| "Open to internships" status (hero, mobile menu, contact) | `AVAILABILITY` in `components/Availability.tsx` |
| GitHub, LinkedIn, email, and résumé links | `lib/links.ts` |
| Link-preview image and favicon | `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` |
| Page title, description, and canonical URL | `metadata` in `app/layout.tsx` |

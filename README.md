# Rohan Singh

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-built--by--rohan.vercel.app-blue?style=for-the-badge&logo=vercel)](https://built-by-rohan.vercel.app/)

**Computer Science @ UC Irvine | Class of 2027 | AI & Machine Learning Engineer**

> *Building intelligent systems that see, understand, and scale.*

---

## 🚀 About Me
I specialize in **Computer Vision**, **Generative AI**, and **High-Performance Pipelines**. My work bridges the gap between academic research and scalable, production-ready applications.

- **GPA**: 3.92
- **Focus**: RAG Systems, Real-time Analysis, Full-Stack AI Applications.

## 🛠️ Technical Arsenal

| Category | Skills |
|----------|--------|
| **Languages** | Python, C++, Java, Kotlin, TypeScript, SQL, C# |
| **AI & Vision** | PyTorch, YOLOv8, OpenCV, RAG, Gemini Pro, DINOv2, Faiss |
| **Engineering** | Docker, AWS, GCP, Next.js, FastAPI, Firebase |

## 🏆 Featured Projects

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
| Project screenshots | `public/images/projects/*.webp` — 1920×1080 captures of each live site's hero |
| "Open to internships" status (hero, mobile menu, contact) | `AVAILABILITY` in `components/Availability.tsx` |
| GitHub, LinkedIn, email, and résumé links | `lib/links.ts` |
| Link-preview image and favicon | `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` |
| Page title, description, and canonical URL | `metadata` in `app/layout.tsx` |

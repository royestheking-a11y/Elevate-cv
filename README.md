# 🚀 ElevateCV Premium Platform

ElevateCV is a state-of-the-art, production-ready Resume & CV Building Web Application. Engineered with a powerful absolute-positioned canvas Studio, AI-assisted resume generation, and seamless Google OAuth, ElevateCV sets a new standard for job-seeker tooling.

---

## 🌟 Core Features

### 🎨 Resume Studio (Drag & Drop Canvas)
The heart of ElevateCV is its bespoke design engine, enabling infinite customization entirely in the browser.
*   **Absolute Positioning**: Every text block, skill bar, shape, and image can be dragged pixel-perfectly anywhere on an A4 layout.
*   **Layers Architecture**: Send elements backward, bring them forward, and toggle visibility natively.
*   **Dynamic Properties**: Change fonts, typography weights, letter spacing, shape radiuses, fill colors, strokes, and drop-shadows instantly.
*   **Pro Presets**: 22 native Resume Templates and 6 Cover Letter maps designed explicitly to beat ATS (Applicant Tracking System) software while remaining gorgeous for recruiters.
*   **Theme Engine**: Instantly map primary accent colors across the entire document layout.

### 🤖 AI-Powered Career Tools
*   **Resume Repair**: AI analyzes imported text to fix grammatical errors, enhance impactful action-verbs, and restructure sentences for maximum professional output.
*   **Cover Letter Generator**: Auto-generates fully customized cover letters matching your resume template based on target job titles.
*   **Job Email Writer**: Constructs professional cold-outreach emails intended directly for Hiring Managers.

### 🔐 Secure User Ecosystem (Auth)
*   **JWT Custom Auth**: Salted password hashing and tokenized sessions.
*   **Google OAuth 2.0**: 1-click single-sign-on integration natively wrapping the authentication context.
*   **Progressive Security**: Complete routing logic preventing unauthenticated gateway access to the Studio.

### 👑 Advanced Admin Dashboard
A hidden `/admin/login` portal granting Super-Admins absolute control over the platform.
*   **User Management**: Ban, delete, or inspect user accounts and authentication states.
*   **Asset Management**: Bi-directional integration with Cloudinary to mass-upload imagery directly from the UI.
*   **Live Analytics**: Aggregate tracking of CV downloads and active sessions.
*   **Support Inbox**: Native interface reading Contact Us submissions.

---

## 🛠️ Technology Stack

ElevateCV is built using a decoupled modern Monolith structure, separating the client edge from the stateful database layer.

### Frontend Client (Vercel)
*   **Framework**: React 18 / Vite / TypeScript
*   **Styling**: Tailwind CSS + Custom CSS Variables
*   **Animation**: Motion / React (Framer Motion)
*   **State Management**: Zustand (Persisted Storage & Canvas State)
*   **Routing**: React Router DOM (v6)
*   **Authentication**: `@react-oauth/google`
*   **Export Engine**: `html2canvas` / `jspdf` / `html2pdf` mapping

### Backend API (Render)
*   **Environment**: Node.js / Express.js
*   **Database**: MongoDB / Mongoose ODM
*   **Security**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors`
*   **Storage API**: Cloudinary (`multer-storage-cloudinary`)

---

## 🚀 Deployment Orchestration

The project is natively optimized for split-deployment.
1.  **Frontend**: Deployed as a blazing-fast SPA on **Vercel's Edge CDN**, guarded by a custom `vercel.json` strict-routing protocol.
2.  **Backend**: Hosted as a Web Service on **Render**, bridging `index.js` daemon connections to MongoDB Atlas.

### Native SEO Architecture
Boasts a bespoke React `useSEO()` Hydration Engine explicitly mimicking Next.js SSR tracking metrics for Googlebot, injecting `OG:Tags`, `gtag.js`, native `JSON-LD` schemas, and dynamic Title/Meta properties concurrently across all public viewports.

---

*Product of Rizqara Tech · www.rizqara.tech*
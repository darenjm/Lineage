# Lineage by Legacy

## Overview

Lineage by Legacy is a B2B web application for fertility clinics and reproductive health institutions to browse and procure cryopreserved donor sperm inventory. The app presents a professional, healthcare-grade landing page with donor inventory browsing, filtering, pricing tiers, and a consultation request form. It's a single-page marketing and inventory platform — not a full e-commerce system — focused on driving institutional inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18 with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router) — currently only two routes: Home (`/`) and NotFound
- **State/Data Fetching:** TanStack React Query for server state management
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Styling:** Tailwind CSS with CSS custom properties for theming (light mode, HSL-based color tokens defined in `client/src/index.css`)
- **Typography:** Inter font (Google Fonts), weights 400-700
- **Forms:** React Hook Form with Zod validation via `@hookform/resolvers`
- **Icons:** Lucide React

The frontend is a single-page landing site composed of sections: Header, Hero, WhyLineage (feature grid), InventorySection (filterable donor table), PricingSection (tier cards), ConsultationForm, and Footer. Navigation uses smooth scrolling to anchored sections.

### Backend
- **Runtime:** Node.js with Express
- **Language:** TypeScript, executed via `tsx`
- **API Pattern:** RESTful JSON API under `/api/` prefix
- **Key Endpoints:**
  - `GET /api/donors` — list donors with optional query filters (bloodType, cmvStatus, tier)
  - `GET /api/donors/:id` — get single donor
  - `POST /api/consultation-requests` — submit consultation inquiry
- **Storage:** Currently uses in-memory storage (`MemStorage` class) with seeded donor data. The schema and Drizzle config are set up for PostgreSQL migration but the app runs without a database by default.
- **Build:** Custom build script (`script/build.ts`) uses Vite for client and esbuild for server, outputting to `dist/`

### Database Schema (Drizzle ORM + PostgreSQL)
- **`donors`** — id (varchar PK), age, bloodType, cmvStatus, tier, vialsAvailable
- **`consultation_requests`** — id (varchar PK), name, email, institution (nullable)
- **`users`** — id (varchar PK), username (unique), password

Schema is defined in `shared/schema.ts` using Drizzle's `pgTable` and validated with `drizzle-zod`. The schema is shared between client and server via the `@shared` path alias.

### Shared Code
The `shared/` directory contains the database schema and Zod validation schemas, imported by both frontend and backend via the `@shared` TypeScript path alias.

### Development vs Production
- **Dev:** Vite dev server with HMR proxied through Express (`server/vite.ts`)
- **Prod:** Static files served from `dist/public` with Express fallback to `index.html` for SPA routing

## External Dependencies

- **Database:** PostgreSQL (via Drizzle ORM) — configured in `drizzle.config.ts`, requires `DATABASE_URL` env var. Currently the app falls back to in-memory storage if no DB is connected.
- **Session Store:** `connect-pg-simple` is listed as a dependency for PostgreSQL-backed sessions (not yet actively used in visible code).
- **Google Fonts:** Inter font loaded via CDN in `client/index.html`
- **No external APIs currently active** — consultation notification is logged to console with a placeholder for email sending (mentions `lineage@givelegacy.com`)
- **Replit Plugins:** `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` used in development
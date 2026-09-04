# OrigoHOST Technology-Community Ecosystem

The production-grade technology-community platform powering OrigoHOST — an ecosystem of developers, builders, researchers, and enterprise tech partners. Built for speed, scale, multidimensional taxonomy discovery, and seamless community operations.

---

## 🏗️ Core Architecture & Features

- **3-Tier Multidimensional Taxonomy Engine**: Categorization Matrix (`EVENT FORMAT` × `TECHNOLOGY DOMAIN` × `REAL-WORLD INDUSTRY`).
- **Domain-Driven Service Layer (`src/domains/`)**:
  - `taxonomy.service.ts`: Multidimensional taxonomy filtering & indexing.
  - `event.service.ts`: Event lifecycle management, multi-tier tagging, & outbox event publishing.
  - `registration.service.ts`: Outbox-backed transactional registrations, capacity limits, and ticket signature emission.
  - `crm.service.ts`: Pipeline tracking, contact syncing, and activity audit logging.
  - `admin-workspace.service.ts`: Operational management across admin workspace routes.
- **Dedicated CRM Portal (`src/routes/crm.index.tsx`)**: Outbox activity monitoring, lead pipeline tracking (`Lead`, `Contacted`, `Qualified`, `Proposal`, `Won`, `Lost`), and contact/organization directories.
- **14-Section Ecosystem Homepage**: Composability model powered by `HomepageViewModel` and validated via Zod schemas.
- **Official Brand Assets**: Interactive 3D tilt hero featuring the official OrigoHOST monogram (`/origohost-monogram.png`).

---

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/origohost/origohost_repo.git
   cd origohost_repo
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   # Populate .env with your Supabase credentials
   ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) / React 19
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: Tailwind CSS v4 & Framer Motion
- **Database / Outbox / Auth**: [Supabase](https://supabase.com)
- **Validation & CMS**: Zod & Payload CMS Architecture

---

## 📖 Documentation

- [Contributing Guidelines](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)
- [Code of Conduct](./src/routes/code-of-conduct.tsx)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

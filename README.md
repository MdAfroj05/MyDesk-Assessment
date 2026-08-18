# MyDesk

**Ship software without the chaos.**

MyDesk is a modern developer workspace that helps developers organize projects, manage tasks, review development progress, and understand deployments from one focused interface.

---

## Live Demo

> Run locally — see setup instructions below.

**Default credentials**
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin@123` |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| Lucide React | Icon library |

---

## Features

### Landing Page
- **Hero section** — clear value proposition with animated entrance, product preview dashboard
- **Interactive product showcase** — fully working sidebar with 6 navigable views (Overview, Projects, Sprint Board, Deployments, Test Results, Insights)
- **Features section** — Plan, Build, Review, Deploy capabilities
- **Deployment micro-interaction** — live deploy simulation with step-by-step pipeline animation
- **Workflow timeline** — visual 5-step development loop
- **Final CTA** — conversion-focused section
- **Responsive navbar** — mobile hamburger menu, smooth scroll links
- **Footer** — all links open relevant info modals (Changelog, Roadmap, Docs, API, Status, Blog, Privacy, Terms, Security)

### Authentication
- **Sign In** — validates against stored credentials, wrong password shows inline error
- **Sign Up** — full form validation, live password strength meter (Weak / Fair / Strong / Great)
- **Password Change** — current password verification, real-time requirements checklist, match indicator

### Dashboard (post-login)
After signing in, a full workspace dashboard opens with a working left sidebar:

| View | What it does |
|---|---|
| **Overview** | Sprint KPIs, task board, git activity, deployment health, Desk AI assistant |
| **Projects** | 4 project cards with drill-down detail view, team members, progress |
| **Sprint Board** | Live 4-column kanban — click cards to advance status (To Do → In Progress → Review → Done) |
| **Deployments** | Environment summary, deployment log with expandable commit details, Redeploy button |
| **Test Results** | Suite breakdown, coverage bar, expandable test cases with pass/fail/skip |
| **Insights** | Velocity, cycle time, team throughput bars, sprint burndown chart, code health signals |
| **Settings → Profile** | Account info display |
| **Settings → Password** | Full change-password flow with validation |

### Password Management
- Change password from Settings inside the dashboard
- New password validates against current password
- Changes persist for the session — sign out and sign back in with the new password

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/MdAfroj05/MyDesk-Assessment.git

# Navigate into the project
cd MyDesk-Assessment

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── App.tsx                          # Root component with providers
├── main.tsx                         # Entry point
├── index.css                        # Global styles & Tailwind directives
│
├── context/
│   ├── AuthContext.tsx              # Auth state — login, logout, changePassword
│   └── ModalContext.tsx             # Global modal state manager
│
├── hooks/
│   └── useInView.ts                 # Intersection Observer scroll-reveal hook
│
├── components/
│   ├── Navbar.tsx                   # Fixed navbar with mobile menu
│   ├── Hero.tsx                     # Hero section with dashboard preview
│   ├── ProductShowcase.tsx          # Interactive product demo with 6 nav views
│   ├── Features.tsx                 # Feature cards (Plan/Build/Review/Deploy)
│   ├── ProductInteraction.tsx       # Deployment pipeline micro-interaction
│   ├── Workflow.tsx                 # Development loop timeline
│   ├── FinalCTA.tsx                 # Bottom CTA section
│   ├── Footer.tsx                   # Footer with all working links
│   │
│   ├── dashboard/                   # Dashboard sidebar view components
│   │   ├── OverviewView.tsx
│   │   ├── ProjectsView.tsx
│   │   ├── SprintBoardView.tsx
│   │   ├── DeploymentsView.tsx
│   │   ├── TestResultsView.tsx
│   │   └── InsightsView.tsx
│   │
│   └── modals/                      # Modal components
│       ├── ModalHub.tsx             # Renders active modal
│       ├── ModalBase.tsx            # Shared overlay + panel wrapper
│       ├── SignInModal.tsx          # Login form with validation
│       ├── SignUpModal.tsx          # Registration form with strength meter
│       ├── DashboardModal.tsx       # Full dashboard app shell
│       ├── ChangePasswordPanel.tsx  # Password change form
│       ├── PricingModal.tsx         # Pricing plans
│       └── InfoModal.tsx            # All content pages (docs, blog, legal, etc.)
```

---

## Design Decisions

- **Dark-only UI** — consistent dark theme throughout, no partial dark mode
- **No fake social proof** — no fabricated testimonials, user counts, or company logos
- **Restrained animation** — entrance animation on hero, scroll reveals on sections, one meaningful micro-interaction (deployment pipeline)
- **Accessible** — semantic HTML, correct heading hierarchy, ARIA labels, keyboard navigation, visible focus states
- **Responsive** — tested at 390px (mobile) and 1440px (desktop), no horizontal scroll

---

## Assessment Context

This project was built as Part 2 of a frontend hiring assessment. The product (MyDesk) is fictional and all data shown is for demonstration purposes only.

---

## License

MIT

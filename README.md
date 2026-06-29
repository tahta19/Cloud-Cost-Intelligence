# Cloud Cost Intelligence

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cloud-cost-intelligence-sooty.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Overview

Cloud Cost Intelligence is a real-time resource monitoring dashboard that displays cloud cluster costs, efficiency scores, and resource allocation metrics. Built as part of the **Atomity Frontend Engineering Challenge**.

**Live Demo:** [https://cloud-cost-intelligence-sooty.vercel.app/](https://cloud-cost-intelligence-sooty.vercel.app/)

## 🎯 Feature Selection

**Option A** (0:30–0:40 in the video) - Cloud cost monitoring dashboard with cluster cards showing:
- Real-time cost tracking with counting animation
- Efficiency scores with animated progress bars
- Resource utilization metrics (CPU, RAM, Storage, Network, GPU)
- Status indicators (Active, Warning, Critical)
- Interactive filtering and sorting
- Infinite scroll for seamless browsing
- Detailed modal view with cost breakdown

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + TypeScript + Vite |
| **Styling** | Tailwind CSS + CSS Variables (Design Tokens) |
| **Animation** | Framer Motion + Intersection Observer |
| **Data Fetching** | React Query + JSONPlaceholder API |
| **Modern CSS** | Nesting, :has(), Container Queries, color-mix() |
| **Deployment** | Vercel |

## 🎨 Design Token Approach

All colors are defined as CSS variables with light/dark mode support:

```css
:root {
  --color-bg-card: #ffffff;
  --color-text-primary: #111827;
  --color-accent-primary: #2563eb;
}

.dark {
  --color-bg-card: #1E1F23;
  --color-text-primary: #E3E2E4;
}
Tailwind is configured to use these tokens via tailwind.config.js, ensuring consistency across all components.

📁 Project Structure
text
src/
├── components/
│   ├── FeatureSection.tsx      # Main container with infinite scroll
│   ├── ClusterCard.tsx          # Individual cluster card with animations
│   ├── StatusBadge.tsx          # Status indicator
│   ├── EfficiencyBar.tsx        # Animated efficiency bar
│   ├── MetricItem.tsx           # Resource metric display
│   ├── AnimatedNumber.tsx       # Scroll-triggered counting animation
│   ├── FilterTabs.tsx           # Status filter tabs
│   ├── SortDropdown.tsx         # Sort options
│   ├── Modal.tsx                # Detail modal
│   └── MaterialIcon.tsx         # Google Material Icons wrapper
├── hooks/
│   └── useClusterData.ts        # React Query data fetching
├── types/
│   └── cluster.ts               # TypeScript interfaces
├── tokens/
│   ├── colors.ts                # Color tokens
│   ├── spacing.ts               # Spacing tokens
│   └── typography.ts            # Typography tokens
└── index.css                    # CSS variables + Modern CSS

Animation Approach
Card Entrance: Spring animation with staggered delay (0.15s per card)

Number Counting: Scroll-triggered counting from 0 to final value using requestAnimationFrame

Hover Effects: Smooth scale, shadow, and border transitions

Infinite Scroll: Intersection Observer with loading spinner

Reduced Motion: Respects prefers-reduced-motion media query

Data Fetching & Caching
API: JSONPlaceholder (https://jsonplaceholder.typicode.com/posts?_limit=10)

Library: React Query with caching strategy

Stale Time: 5 minutes

Garbage Collection: 10 minutes

Fallback: Mock data when API fails

Modern CSS Features Used
CSS Nesting

:has() Selector

Container Queries

color-mix()

prefers-reduced-motion

CSS Variables (Design Tokens)

Responsive Design
Desktop (1280px+): 4 columns

Tablet (768px): 2 columns

Mobile (375px): 1 column

Accessibility
Semantic HTML

ARIA labels on interactive elements

Keyboard navigation (tabIndex={0})

Focus indicators

prefers-reduced-motion support

Dark Mode
Toggle via .dark class on HTML element

CSS variables automatically switch

System preference detection fallback

Performance Optimizations
React Query caching

useMemo for filtered and paginated data

useCallback for loadMore function

Intersection Observer for efficient scroll detection

Lazy loading via infinite scroll

Tradeoffs & Decisions
Infinite Scroll over Pagination: Better UX, demonstrates Intersection Observer, fits "scroll-triggered" requirement

CSS Variables over Tailwind only: Better for theming, enables modern CSS features, easier to maintain tokens

React Query: Built-in caching, automatic refetching, shows modern React ecosystem knowledge

JSONPlaceholder: Public API, sufficient data, easy to transform

Getting Started
bash
# Clone repository
git clone https://github.com/tahta19/Cloud-Cost-Intelligence.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
📝 Submission Details
Challenge: Atomity Frontend Engineering Challenge

Feature: Option A (Cloud Cost Monitoring)

Estimated Time: ~8 hours

Live Demo: https://cloud-cost-intelligence-sooty.vercel.app/

Repository: https://github.com/tahta19/Cloud-Cost-Intelligence

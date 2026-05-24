# Futuristic Student Dashboard

A high-fidelity student dashboard prototype built using Next.js App Router, Supabase, Tailwind CSS, and Framer Motion. The application focuses on smooth interactions, responsive Bento layouts, server-rendered data, and a premium animated user experience.

---

## Live Demo

dashboard-seven-iota-60.vercel.app

## GitHub Repository

https://github.com/sankalp04841/dashboard

---

## Tech Stack

* Next.js (App Router)
* TypeScript
* Supabase
* Tailwind CSS
* Framer Motion
* Lucide React

---

## Features

* Responsive Bento-grid dashboard layout
* Dynamic course cards fetched from Supabase
* Hero section with learning streak display
* Activity heatmap visualization
* Animated progress bars
* Sidebar with animated navigation states
* Skeleton loading states
* Smooth micro-interactions
* Dark futuristic UI with ambient effects

---

## Architectural Choices

The project follows a modular component architecture with clear separation of concerns.

### Folder Structure

app/

* Dashboard routes
* Loading UI
* Error handling

components/

* Hero tile
* Sidebar
* Activity tile
* Course cards
* Shared UI components

lib/

* Supabase client configuration
* Utility functions

types/

* Shared interfaces and type definitions

This structure improves maintainability and keeps components reusable and isolated.

---

## Server / Client Component Split

The application uses Next.js App Router with both Server Components and Client Components.

### Server Components

Server Components were used for:

* Fetching course data from Supabase
* Initial page rendering
* Database communication
* Reducing unnecessary client-side requests

Reasoning:

Fetching data on the server improves performance and reduces browser-side processing while keeping credentials handled securely.

---

### Client Components

Client Components were used only where interactivity was required:

* Framer Motion animations
* Sidebar interactions
* Hover states
* Activity heatmap interactions
* Animated counters
* Dynamic UI states

Reasoning:

Animations and interactive behavior require browser APIs and state management, making Client Components more appropriate.

---

## Loading Strategy

Loading states were implemented through:

* React Suspense boundaries
* Skeleton placeholders
* Pulse animations

Skeleton components closely match final content dimensions to avoid visual jumps and layout shifts.

---

## Performance Considerations

To maintain smooth performance:

* Transform and opacity animations were used instead of width/height changes
* Spring physics were implemented with Framer Motion
* Hardware accelerated animation techniques were preferred
* Components were separated to minimize unnecessary re-renders
* Layout-shifting animations were avoided

---

## Challenges Faced

### Integrating Supabase with App Router

A challenge was configuring Supabase correctly within Next.js Server Components while maintaining secure environment variable handling.

### Framer Motion + TypeScript Compatibility

Production builds introduced stricter TypeScript checks around Framer Motion variants and transition definitions. Variant definitions were adjusted to maintain compatibility during production builds.

### Preventing Layout Shifts

Heavy animation effects can unintentionally affect layout stability. Transform-based animations and controlled positioning were used to preserve a smooth experience.

### Responsive Bento Layout

Maintaining a consistent layout hierarchy across desktop, tablet, and mobile devices required balancing grid spans and component behavior while preserving usability.

---

## Environment Variables

Create a `.env.local` file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

---

## Run Locally

Install dependencies:

npm install

Run development server:

npm run dev

Build production version:

npm run build

---

## Author

Sankalp Mourya

# replit.md

## Overview

This is a full-stack TypeScript application built for Colégio Narfive, an educational institution in Angola. The application serves as a modern school website featuring an interactive landing page with sections for about, programs, faculty, student life, and contact information. It includes a contact form system that allows visitors to submit inquiries which are stored in a database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth transitions and scroll animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

### Database & ORM
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Schema**: Shared schema definitions using drizzle-zod for validation
- **Storage**: Dual implementation with in-memory storage for development and PostgreSQL for production

## Key Components

### Data Layer
- **Schema Definition**: Centralized in `shared/schema.ts` with tables for users and contact messages
- **Validation**: Zod schemas generated from Drizzle schema for type-safe validation
- **Storage Interface**: Abstract `IStorage` interface with concrete implementations for memory and database storage

### API Layer
- **Routes**: RESTful API endpoints in `server/routes.ts`
- **Contact API**: POST `/api/contact` for form submissions, GET `/api/contact` for retrieving messages
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: Input validation using Zod schemas

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Components**: Contact forms, navigation, scroll animations
- **UI Components**: Comprehensive set of reusable components using shadcn/ui
- **Performance**: Optimized with React Query for caching and Framer Motion for smooth animations

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form with name, email, phone, subject, and message
   - Form data is validated client-side using React Hook Form with Zod resolvers
   - Data is submitted via POST request to `/api/contact`
   - Server validates data using shared Zod schemas
   - Valid data is stored in database via storage interface
   - Success/error feedback is displayed to user via toast notifications

2. **Content Rendering**:
   - Static content is rendered from components
   - Images are loaded from Unsplash CDN
   - Animations are triggered by scroll intersection observers
   - Navigation uses smooth scrolling to page sections

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- Vite with React plugin for development and building
- TypeScript for type safety

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible components
- Framer Motion for animations
- Lucide React for icons

### Backend Dependencies
- Express.js for server framework
- Drizzle ORM for database operations
- Neon Database serverless driver
- Zod for runtime validation

### Development Tools
- tsx for TypeScript execution
- esbuild for production building
- PostCSS with Autoprefixer

## Deployment Strategy

### Development
- **Server**: tsx runs TypeScript directly with hot reloading
- **Client**: Vite dev server with HMR and React Fast Refresh
- **Database**: In-memory storage for rapid development
- **Build**: No build step required for development

### Production
- **Build Process**: 
  - Frontend: Vite builds React app to `dist/public`
  - Backend: esbuild bundles server to `dist/index.js`
- **Server**: Node.js runs the bundled Express server
- **Database**: PostgreSQL via Neon Database with connection pooling
- **Static Assets**: Served by Express from build directory

### Environment Configuration
- **Database URL**: Required `DATABASE_URL` environment variable
- **Development Detection**: Uses `NODE_ENV` and `REPL_ID` for environment-specific behavior
- **Vite Integration**: Development server integrates Vite middleware for SSR-like experience

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and optimized for both development experience and production performance.
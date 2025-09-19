# TickPay

## Overview

TickPay is a modern event ticketing platform designed specifically for Tanzania. The application allows users to discover, browse, and book tickets for various events including concerts, sports, food festivals, comedy shows, and business events. Built with a focus on premium user experience, the platform features a dark-themed UI with artistic visual elements and comprehensive event management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Component Structure**: Modular component architecture with reusable UI components
- **Design System**: Custom design tokens with dark theme support and artistic background elements

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful API design with `/api` prefix for all endpoints
- **Middleware**: Express middleware for request logging, JSON parsing, and error handling
- **Development**: Hot module replacement with Vite integration for development mode

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple
- **Development Storage**: In-memory storage interface for development and testing

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **User Schema**: Basic user model with username and password fields
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
- **Security**: Placeholder for secure authentication implementation

### External Dependencies

#### Core Dependencies
- **Database**: @neondatabase/serverless, drizzle-orm, drizzle-zod
- **UI Components**: @radix-ui component primitives, tailwindcss, class-variance-authority
- **State Management**: @tanstack/react-query for server state
- **Forms**: @hookform/resolvers, react-hook-form
- **Styling**: Tailwind CSS with custom design tokens and shadcn/ui components

#### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Replit Integration**: @replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer

#### Third-party Integrations
- **Maps**: Leaflet for interactive event location mapping
- **Date Handling**: date-fns for date manipulation and formatting
- **Fonts**: Google Fonts integration (Inter, Poppins, Geist Mono, DM Sans, Architects Daughter)
- **Icons**: Lucide React for consistent iconography

#### Geographic Features
- **Location Services**: Integrated mapping with event coordinates
- **Transport Information**: Dala-dala routes, boda-boda timing, and walking distance data
- **Weather Integration**: Weather condition support for outdoor events

The application follows a monorepo structure with shared TypeScript schemas between client and server, ensuring type safety across the full stack. The architecture supports both development with hot reloading and production deployment with optimized builds.
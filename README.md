# Work Hours Calculator

A modern web application for calculating and managing work schedules across different time zones. This tool helps users define their working hours and visualize availability in their manager's time zone, making remote work coordination easier.

Available online [here](https://my-working-hours.vercel.app/)

## Purpose

This application allows users to:
- Define their weekly work schedule with flexible start and end times
- Search and select their manager's city/timezone
- View real-time clocks for both local time and manager's time
- See an availability summary showing overlap between work schedules
- Switch between multiple languages
- Toggle between light and dark themes

## Tech Stack

### Core Framework
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### State Management
- **Redux Toolkit** - Predictable state management
- **React Redux** - React bindings for Redux

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Ark UI** - Headless component library
- **clsx** - Conditional class name utility

### Forms & Validation
- **React Hook Form** - Performant form library
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React integration for i18next
- **i18next-browser-languagedetector** - Automatic language detection
- **i18next-http-backend** - HTTP backend for loading translations

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite React Plugin** - React support for Vite

## Getting Started

### Prerequisites
- Node.js (latest LTS recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/arturgomes/my-working-hours.git
cd my-working-hours

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features

### Work Schedule Management
- Define work hours for each day of the week
- Flexible time input with validation
- Real-time schedule updates

### Time Zone Support
- City search with timezone detection
- Real-time clock displays
- Automatic time conversion

### Internationalization
- Multi-language support
- Automatic language detection
- Easy language switching

### Theme Support
- Light and dark mode
- Smooth theme transitions
- System preference detection

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interface

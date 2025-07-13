# AI Agent Context for Adapta Midia

This document provides essential information for an AI agent to effectively work with the Adapta Midia codebase.

## Project Overview

This is a [Next.js](https://nextjs.org/) project created using the `shadcn` package, as indicated in the `README.md`. It uses TypeScript for type safety and Tailwind CSS for styling. The project is configured with internationalization (i18n) using `typesafe-i18n`.

The application follows a modern feature-based architecture with centralized state management using React Context.

## Key Technologies

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Internationalization (i18n):** [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n)
- **State Management:** React Context API
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting:** [ESLint](https://eslint.org/)
- **Formatting:** [Prettier](https://prettier.io/)
- **Git Hooks:** [Husky](https://typicode.github.io/husky/)

## Directory Structure

### Core Application

- `app/`: Contains the core application logic, following the Next.js App Router structure.
- `components/`: Shared UI components, global providers, and reusable elements.
- `contexts/`: React Context providers for global state management.
- `hooks/`: Custom React hooks for shared logic.
- `lib/`: Utility functions, shared business logic, and helper functions.

### Feature-Based Organization

- `features/`: Feature-specific modules organized by domain:
  - `features/{feature}/api/`: API calls and data fetching logic
  - `features/{feature}/components/`: Feature-specific React components
  - `features/{feature}/hooks/`: Feature-specific custom hooks
  - `features/{feature}/types/`: Feature-specific TypeScript type definitions

### Configuration & Assets

- `i18n/`: Internationalization files for different languages.
- `public/`: Static assets like images and fonts.
- `types/`: Global TypeScript type definitions.

## Development Workflow

### Prerequisites

Ensure you have [pnpm](https://pnpm.io/installation) installed.

### Installation

Install project dependencies with:

```sh
pnpm install
```

### Running the Development Server

To start the development server, run:

```sh
pnpm dev
```

### Building for Production

To create a production build, use:

```sh
pnpm build
```

### Running Tests

Execute the test suite with:

```sh
pnpm test
```

For an interactive test UI, run:

```sh
pnpm test:ui
```

### Linting and Formatting

To check for linting errors, run:

```sh
pnpm lint
```

To automatically format the code, use:

```sh
pnpm format
```

## Architecture Patterns

### Feature-Based Structure

- Each feature is self-contained within `features/{feature}/`
- Components, hooks, types, and API logic are co-located by feature
- Shared utilities and components remain in global directories

### State Management

- **Global State:** React Context providers in `contexts/` (e.g., `TabContext`, `LanguageProvider`)
- **Local State:** Feature-specific hooks in `features/{feature}/hooks/`
- **Server State:** API functions in `features/{feature}/api/`

### Import Conventions

- Use named exports for better tree-shaking: `export function Component() {}`
- Import hooks from their source: `import { useLanguage } from "@/components/LanguageProvider"`
- Feature imports: `import { useAds } from "@/features/ads/hooks/useAds"`

## Current State & Opportunities

### ✅ Implemented

- Feature-based architecture with proper separation of concerns
- Context-based state management for tab navigation
- Centralized utility functions (e.g., `getStatusColor` in `lib/utils.ts`)
- Consistent import paths and component organization
- TypeScript types properly scoped to features
- Co-located test files next to their corresponding source files
- Test import paths updated to match new feature structure

### 🚀 Improvement Opportunities

- **Utility Functions:** Move `formatNumber` and `formatCurrency` from components to `lib/utils.ts` (duplicated in AdCard, AdsList, AdDetails)
- **Type Safety:** Replace `string` with union types for better type safety (e.g., `TabId = "ads" | "chat" | "preview"` in TabContext)
- **URL Persistence:** Sync tab state with URL parameters for better UX
- **Cleanup:** Empty component folders exist (`components/ads/`, `components/chat/`, `components/preview/`)
- **Performance:** Add memoization for expensive operations and component re-renders (no `React.memo`, `useMemo`, or `useCallback` in custom components)

### 📋 Missing Features

- **Error Boundaries:** No error boundaries implemented for error handling
- **Loading States:** Missing loading and error states throughout the application
- **Test Coverage:** Limited test coverage - only API functions tested, no component or hook tests
- **Accessibility:** Basic ARIA support only in shadcn/ui components, custom components lack accessibility features
- **SEO & Meta Tags:** No dynamic meta tag management or SEO optimizations

## Coding Style and Conventions

- Follow the existing coding style and conventions.
- Use the provided UI components from `shadcn/ui` and Radix UI.
- Ensure all new code is properly typed with TypeScript.
- Add test files next to their corresponding source files using `{filename}.test.ts` pattern.
- Keep the i18n files in `i18n/` updated with any new text.
- Place feature-specific code in the appropriate `features/{feature}/` directory.
- Use React Context for global state, custom hooks for feature logic.

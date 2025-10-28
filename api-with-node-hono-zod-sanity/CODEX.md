# Context for Codex

This project uses Bun for package management and runtime.

## Development Commands

- Use `bun run dev` to start the development server
- Use `bun test` to run tests in watch mode with Bun's test runner
- Use `bun run test:run` to run tests once
- Use `bun install` to install dependencies

## Testing

Use Bun's built-in test runner:

```ts
import { describe, it, expect } from 'bun:test'

describe('example test', () => {
  it('should work', () => {
    expect(1).toBe(1)
  })
})
```

- Bun test runner is configured; co-locate tests with `*.test.ts` suffix.
- Run interactively: `bun test`.
- Single pass CI run: `bun run test:run`.

## Architecture

This API follows a repository pattern:

- `models/` - TypeScript interfaces and types
- `repositories/` - Data access layer (will connect to Sanity CMS)
- `data/` - Static data for development
- Tests are co-located with source files using `.test.ts` suffix

## Deployment

This project is designed to be deployable as a container to a cloud environment like GCP.

## Project Snapshot

- **Stack**: Bun + TypeScript, Hono HTTP framework, Zod for input validation, Sanity CMS as content backend.
- **Entry**: `index.ts` defines the Hono app and bootstraps the server with `Bun.serve()`.
- **Domain**: Localization strings fetched from Sanity and exposed via `/api/:id`.

## Key Modules

- `sanity/sanityClient.ts` — wraps `@sanity/client` and provides typed helpers `getById` / `getAll`.
- `localization/localizationService.ts` — coordinates Sanity lookups and transforms into `LocalizationModel`.
- `sanity.types.ts` — generated types mirroring the Sanity schema; refresh when the CMS schema changes.

## Environment & Config

- Required vars: `SANITY_PROJECT_ID`, `SANITY_DATASET` (Bun automatically loads `.env` files).
- Default dataset falls back to `production`; missing IDs return empty Sanity responses, so verify env first.
- Toggle `useCdn` in `sanityClient` when debugging stale data.

## Dev Workflow

- Install deps: `bun install`.
- Start server: `bun run dev` (uses Bun's watch mode with hot reload).
- Direct run: `bun index.ts` or `bun --watch index.ts` for watch mode.

## Debug Tips

- Add temporary `console.dir({ query, params, result })` inside `SanityClient` methods to inspect GROQ calls.
- Use Sanity Vision to reproduce queries before suspecting API issues.
- Bun's native server runs synchronously with `Bun.serve()`.

## Deployment Notes

- Designed for serverless targets (e.g., Azure Functions); keep side effects within request handlers.
- Keep all new code TypeScript strict-friendly; prefer explicit types on public functions.

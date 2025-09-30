---

This project uses Node.js with npm for package management.

## Development Commands

- Use `npm run dev` to start the development server
- Use `npm test` to run tests in watch mode with Vitest
- Use `npm run test:run` to run tests once
- Use `npm install` to install dependencies

## Testing

Use Vitest for testing:

```ts
import { describe, it, expect } from 'vitest'

describe('example test', () => {
  it('should work', () => {
    expect(1).toBe(1)
  })
})
```

- Vitest is configured; co-locate tests with `*.test.ts` suffix.
- Run interactively: `npm test`.
- Single pass CI run: `npm run test:run`.

## Architecture

This API follows a repository pattern:

- `models/` - TypeScript interfaces and types
- `repositories/` - Data access layer (will connect to Sanity CMS)
- `data/` - Static data for development
- Tests are co-located with source files using `.test.ts` suffix

## Deployment

This project is designed to be deployable to Azure Functions or other Node.js serverless platforms.

## Project Snapshot

- **Stack**: Node.js + TypeScript, Hono HTTP framework, Zod for input validation, Sanity CMS as content backend.
- **Entry**: `index.ts` defines the Hono app and bootstraps the server with `@hono/node-server`.
- **Domain**: Localization strings fetched from Sanity and exposed via `/api/:id`.

## Key Modules

- `sanity/sanityClient.ts` — wraps `@sanity/client` and provides typed helpers `getById` / `getAll`.
- `localization/localizationService.ts` — coordinates Sanity lookups and transforms into `LocalizationModel`.
- `sanity.types.ts` — generated types mirroring the Sanity schema; refresh when the CMS schema changes.

## Environment & Config

- Required vars: `SANITY_PROJECT_ID`, `SANITY_DATASET` (loaded via `dotenv/config`).
- Default dataset falls back to `production`; missing IDs return empty Sanity responses, so verify env first.
- Toggle `useCdn` in `sanityClient` when debugging stale data.

## Dev Workflow

- Install deps: `npm install`.
- Start server: `npm run dev` (uses Hono with the Vite-style dev server).
- Direct run: `node index.ts` or `tsx watch index.ts` depending on context.

## Debug Tips

- Add temporary `console.dir({ query, params, result })` inside `SanityClient` methods to inspect GROQ calls.
- Use Sanity Vision to reproduce queries before suspecting API issues.
- Ensure `serve` usage leverages the callback signature (`serve(options, onListen)`)—no promises returned.

## Deployment Notes

- Designed for serverless targets (e.g., Azure Functions); keep side effects within request handlers.
- Keep all new code TypeScript strict-friendly; prefer explicit types on public functions.


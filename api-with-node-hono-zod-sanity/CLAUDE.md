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

## Architecture

This API follows a repository pattern:

- `models/` - TypeScript interfaces and types
- `repositories/` - Data access layer (will connect to Sanity CMS)
- `data/` - Static data for development
- Tests are co-located with source files using `.test.ts` suffix

## Deployment

This project is designed to be deployable to Azure Functions or other Node.js serverless platforms.

# hono-zod-sanity-api

A web API built with Hono, Zod validation, and TypeScript, designed to integrate with Sanity CMS for localized content.

## Installation

Copy `.env.example` to create a `.env` file in the root directory with the following content:

```plaintext
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=your_sanity_dataset
```

To install dependencies:

```bash
bun install
```

## Development

To run the development server:

```bash
bun run dev       # Run api with watch
```

## Testing

To run tests:

```bash
bun test          # Run tests in watch mode
bun run test:run  # Run tests once
```

This project uses Bun test for testing.

## API

- `GET /api/:id` - Returns localized content for the given ID

Example response:

```json
{
  "id": "mykey",
  "nb-NO": "Min nøkkel",
  "nn-NO": "Mi nykjel", 
  "en-GB": "My key"
}
```

## Sanity

This project uses the Sanity definition from headless-cms-api project:
<https://github.com/statens-pensjonskasse/headless-cms-api>

The type definitions for Sanity are copied from this file:
<https://github.com/statens-pensjonskasse/headless-cms-api/blob/main/sanity/sanity.types.ts>

When there are changes in the Sanity schema, you need to regenerate sanity.types.ts and copy it to this project.

Sanity Studio: Create and edit translations, "locales":
<https://www.sanity.io/@oNjtJStyK/studio/vqb0f7zjothq3253d8o7hk2u/production/structure>

Sanity Vision: Try GROQ queries directly:
<https://www.sanity.io/@oNjtJStyK/studio/vqb0f7zjothq3253d8o7hk2u/production/vision>

## Container, Podman

Build container

```bash
podman build --secret id=env,src=.env --pull -t my-bun-demo .
# -t Tag
# --secret Read env vars from .env to run tests
```

Run container

```bash
# Apple env vars with parameters
podman run -e SANITY_PROJECT_ID=xyz -e SANITY_DATASET=production -d -p 3000:3000 my-bun-demo
# Alternatively read env vars from .env
podman run --env-file .env -d -p 3000:3000 my-bun-demo
# -e Environment variables
# -d Detached (open Podman or run `podman logs <container-id>` to see logs)
# -p Port numbers
```

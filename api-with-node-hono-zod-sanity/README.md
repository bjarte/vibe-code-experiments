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
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

## Testing

To run tests:

```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once
```

This project uses Vitest for testing.

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

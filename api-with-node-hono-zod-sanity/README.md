# hono-zod-sanity-api

A web API built with Hono, Zod validation, and TypeScript, designed to integrate with Sanity CMS for localized content.

## Installation

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
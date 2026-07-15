# Tracy Smog Center

The public Tracy Smog Center business website, built with Next.js and deployed
to a privately managed VPS with Docker Compose.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Verification

- `npm run lint`: run strict ESLint checks
- `npm run typecheck`: run strict TypeScript checks
- `npm test`: build and verify the rendered production site
- `npm run verify`: run the complete CI verification suite

## Deployment

GitHub Actions verifies pull requests and deploys successful pushes to `main`
to the production VPS. See [docs/deployment.md](docs/deployment.md) for setup.

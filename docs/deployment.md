# Production deployment checklist

## GitHub CI/CD

Pull requests and pushes to `main` run strict linting, TypeScript checks, the
rendered-site tests, and a production build. A successful push to `main` then
builds and deploys the standalone Next.js Docker image to the production VPS.

Configure the GitHub `production` environment with these secrets:

- `VPS_HOST`: VPS hostname or IP address
- `VPS_USER`: SSH user allowed to run Docker Compose
- `VPS_SSH_KEY`: private SSH key for that user

Optional repository or environment variables are:

- `VPS_PORT` (default `22`)
- `DEPLOY_PATH` (default `/opt/tracy-smog-center`)
- `APP_PORT` (default `3012`)

The VPS must have Docker with Compose and the external `npm_default` network
used by the reverse proxy. Point that proxy at the `web` service on port `3000`,
or at the host's configured `APP_PORT`.

## Release gate

Run `npm run verify` locally before merging. Confirm the phone, directions,
coupon, map, and customer-facing links against production after deployment.

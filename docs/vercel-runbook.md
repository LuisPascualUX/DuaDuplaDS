# Vercel Deployment Runbook

## Prerequisites

- GitHub repository connected to Vercel.
- Correct framework preset selected.
- Build and output settings validated.

## Environment configuration

- Define required environment variables for preview and production.
- Keep secrets in Vercel project settings only.

## Deployment flow

1. Open a pull request and verify preview URL.
2. Run smoke tests on preview deployment.
3. Merge to main.
4. Verify production deployment status.

## Smoke test checklist

- [ ] Home/docs index page loads.
- [ ] Storybook navigation works.
- [ ] Static assets load correctly.
- [ ] No console errors on primary docs pages.

## Rollback

- Promote previous successful deployment if current one fails.
- Log incident with cause, impact, and fix.

## Ownership

- Primary owner: Design System maintainer.
- Backup owner: Frontend platform maintainer.

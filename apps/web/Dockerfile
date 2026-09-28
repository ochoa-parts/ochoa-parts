# syntax=docker/dockerfile:1.7

# ---------- Stage 1: Build ----------
FROM node:24-alpine AS builder

WORKDIR /app

# Install deps from the lockfile for reproducible builds. This layer is only
# rebuilt when the lockfile changes, not on every source edit.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build the production SSR bundle
# (browser assets + server bundle + prerendered routes).
COPY . .
RUN npm run build

# ---------- Stage 2: Runtime ----------
FROM node:24-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /app

# The Angular application builder bundles every server dependency
# (express, @angular/ssr, ...) into dist/**/server/server.mjs, so the
# runtime image only needs the build output, not node_modules.
COPY --from=builder --chown=node:node /app/dist/ochoa-parts-web ./dist/ochoa-parts-web

# Run as the unprivileged user shipped with the official Node image.
USER node

# Railway injects PORT at runtime; src/server.ts falls back to 4000 when unset.
EXPOSE 4000

CMD ["node", "dist/ochoa-parts-web/server/server.mjs"]

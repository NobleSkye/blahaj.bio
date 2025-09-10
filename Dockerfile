FROM node:20-alpine
WORKDIR /workspaces/blahaj.bio
COPY . .
RUN corepack enable && corepack prepare pnpm@9.11.0 --activate
RUN pnpm install --frozen-lockfile
CMD ["pnpm", "run", "dev"]

# blahaj.bio

A community-driven bio site where users sign in with GitHub, edit their own profile/bio, and have their changes committed back to the repository as Markdown files.

## Features
- Astro static site with SSR (Node adapter)
- Better Auth (GitHub OAuth, SQLite)
- GitHub sign-in and commit
- Bio editing with Markdown
- Tailwind CSS
- Content collections for bios
- Live preview

## Getting Started

1. Copy `.env.example` to `.env` and fill in secrets.
2. Run `docker compose up --build` to start the site and SQLite DB.
3. Visit [http://localhost:4321](http://localhost:4321)

## Environment Variables
See `.env.example` for required variables.

## License
MIT

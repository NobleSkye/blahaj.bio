# 🚀 Clerk + Convex Setup Guide for Astro

Complete guide to set up authentication with Clerk and database with Convex in your Astro project.

## 📋 Prerequisites

- Node.js 18+ installed
- Astro project initialized
- GitHub account (for Clerk OAuth)

## 🔐 Clerk Authentication Setup

### 1. Install Clerk

```bash
pnpm add @clerk/astro
```

### 2. Create Clerk Account & Application

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Choose your authentication providers (GitHub, Google, etc.)
4. Get your API keys from the dashboard

### 3. Environment Variables

Create `.env` file in your project root:

```bash
# Clerk Authentication
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
```

**Key Types:**
- `pk_test_*` - Test keys (work with localhost)
- `pk_live_*` - Live keys (require domain configuration)

### 4. Configure Astro Integration

Add to `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import clerk from '@clerk/astro';

export default defineConfig({
  integrations: [clerk()],
  output: 'server', // Required for Clerk
});
```

### 5. Create Middleware

Create `src/middleware.ts`:

```typescript
import { clerkMiddleware } from "@clerk/astro/server";

export const onRequest = clerkMiddleware({
  authorizedParties: [
    'https://yourdomain.com',
    'https://www.yourdomain.com', 
    'http://localhost:4321'
  ],
});
```

### 6. Basic Usage

```astro
---
// src/pages/login.astro
import { SignIn } from "@clerk/astro/components";
---

<html>
  <body>
    <SignIn />
  </body>
</html>
```

```astro
---
// Protected page
import { Protect } from "@clerk/astro/components";
---

<html>
  <body>
    <Protect>
      <h1>This content requires authentication</h1>
    </Protect>
  </body>
</html>
```

## 💾 Convex Database Setup

### 1. Install Convex

```bash
pnpm add convex
npx convex dev --configure
```

### 2. Initialize Convex Project

The CLI will:
- Create `convex/` folder
- Generate `convex.json` config
- Set up your deployment

### 3. Environment Variables

Add to your `.env`:

```bash
# Convex Database
PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### 4. Define Schema

Create `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bios: defineTable({
    username: v.string(),
    display_name: v.string(),
    bio: v.string(),
    pronouns: v.optional(v.string()),
    links: v.optional(v.string()),
    profile_image: v.optional(v.string()),
    full_name: v.optional(v.string()),
    updated_at: v.number(),
  }).index("by_username", ["username"]),
});
```

### 5. Create Functions

Create `convex/bios.ts`:

```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveBio = mutation({
  args: {
    username: v.string(),
    display_name: v.string(),
    bio: v.string(),
    pronouns: v.optional(v.string()),
    links: v.optional(v.string()),
    profile_image: v.optional(v.string()),
    full_name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("bios")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    const bioData = {
      ...args,
      updated_at: Date.now(),
    };

    if (existing) {
      return await ctx.db.patch(existing._id, bioData);
    } else {
      return await ctx.db.insert("bios", bioData);
    }
  },
});

export const getBio = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bios")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
  },
});
```

### 6. Using Convex in Astro

```javascript
// Frontend API calls
async function callConvexMutation(functionName, args = {}) {
  const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL;
  
  const response = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: functionName,
      args,
    }),
  });

  const result = await response.json();
  return result.value;
}

async function callConvexQuery(functionName, args = {}) {
  const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL;
  
  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: functionName,
      args,
    }),
  });

  const result = await response.json();
  return result.value;
}

// Usage
const bio = await callConvexQuery('bios:getBio', { username: 'john' });
const result = await callConvexMutation('bios:saveBio', bioData);
```

## 🔧 Integration Example

```astro
---
// src/pages/dashboard.astro
import { Protect } from "@clerk/astro/components";
---

<html>
  <body>
    <Protect>
      <form id="bioForm">
        <input name="display_name" placeholder="Display Name" />
        <textarea name="bio" placeholder="Your bio"></textarea>
        <button type="submit">Save Bio</button>
      </form>

      <script>
        // Wait for Clerk to load
        const waitForClerk = () => {
          return new Promise((resolve) => {
            if (window.Clerk && window.Clerk.user) {
              resolve(window.Clerk);
            } else {
              setTimeout(() => resolve(waitForClerk()), 100);
            }
          });
        };

        document.getElementById('bioForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const clerk = await waitForClerk();
          const user = clerk.user;
          
          const formData = new FormData(e.target);
          const bioData = {
            username: user.username,
            display_name: formData.get('display_name'),
            bio: formData.get('bio'),
          };

          // Save to Convex
          await callConvexMutation('bios:saveBio', bioData);
        });
      </script>
    </Protect>
  </body>
</html>
```

## 🛠️ Common Issues & Solutions

### Clerk Issues

1. **Blank login page**: Use test keys for localhost development
2. **Domain errors**: Configure allowed domains in Clerk dashboard
3. **Middleware errors**: Ensure proper export syntax

### Convex Issues

1. **CORS errors**: Use official Convex endpoints (`/api/query`, `/api/mutation`)
2. **Schema errors**: Run `npx convex dev` to sync schema changes
3. **Environment variables**: Ensure `PUBLIC_CONVEX_URL` is set

## 📁 Project Structure

```
src/
├── middleware.ts           # Clerk middleware
├── pages/
│   ├── login.astro        # Login page with SignIn
│   ├── dashboard.astro    # Protected dashboard
│   └── index.astro        # Public home page
└── layouts/
    └── SiteLayout.astro   # Base layout with Clerk

convex/
├── schema.ts              # Database schema
├── bios.ts               # Bio CRUD functions
└── _generated/           # Auto-generated files

.env                      # Environment variables
astro.config.mjs         # Astro + Clerk config
```

## 🚀 Deployment

### Development
```bash
npx convex dev  # Start Convex development
pnpm dev        # Start Astro development
```

### Production
1. Deploy Convex: `npx convex deploy`
2. Update `PUBLIC_CONVEX_URL` with production URL
3. Configure live Clerk keys with your domain
4. Deploy Astro to your hosting platform

## ✅ Current Working Setup

Your project currently has:
- ✅ Clerk authentication with test keys
- ✅ Convex database connected to production
- ✅ Protected dashboard functionality
- ✅ Bio creation and storage
- ✅ Proper middleware configuration

## 🔗 Useful Links

- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Astro Clerk Integration](https://docs.astro.build/en/guides/authentication/#clerk)

# Car Dealership CRM

A modern CRM application for car dealerships built with Next.js, featuring authentication, contact management, vehicle inventory, and image uploads with Vercel Blob.

## Features

- 🔐 Authentication (NextAuth, credentials)
- 👥 Contact Management (CRUD)
- 🚗 Vehicle Inventory (CRUD for American and European brands)
- �️ Image uploads via Vercel Blob + Next/Image
- 🛡️ Server-side rate limiting for sensitive routes
- 🎨 Tailwind CSS v4 (CSS-first)
- �️ PostgreSQL + Prisma ORM

## Tech Stack (current)

- Framework: Next.js 15 (App Router)
- Language: TypeScript 5.9
- React 19
- Auth: NextAuth v4 (Credentials Provider)
- ORM/DB: Prisma 6 + PostgreSQL
- CSS: Tailwind CSS v4 with `@tailwindcss/postcss` + `autoprefixer`
- Linting: ESLint 9 (flat config)
- Deploy: Vercel

## Supported Vehicle Brands

### American Brands
Ford, Chevrolet, Dodge, RAM, Jeep, GMC, Cadillac, Lincoln, Buick, Chrysler, Tesla

### European Brands
BMW, Mercedes-Benz, Audi, Volkswagen, Porsche, Volvo, Jaguar, Land Rover, Mini, Fiat, Alfa Romeo, Maserati, Ferrari, Lamborghini, Bentley, Rolls-Royce, Aston Martin, McLaren

## Getting Started

### Prerequisites

- Node.js 18.17+ (Node 20 LTS recommended)
- A PostgreSQL database
- npm

### Install & Run (local)

1) Install dependencies
```bash
npm install
```

2) Create a `.env` file in the project root
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/crm_app?schema=public"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-a-32+ char random string"

# File storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=""
```

Generate a secure secret:
- macOS/Linux: `openssl rand -base64 32`
- Windows PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Max 256}))`

3) Prepare the database
```bash
npx prisma generate
npx prisma db push
```

4) Start the dev server
```bash
npm run dev
```

Open http://localhost:3000

### First user
Register from the login page; the app auto-signs in after successful registration.

## Deployment (Vercel)

1) Import the repo into Vercel

2) Settings → General → Root Directory
   - Set to the repository root (the folder that contains `package.json`).

3) Settings → Environment Variables (set for Development/Preview/Production)
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (e.g., `https://<your-project>.vercel.app`)
   - `NEXTAUTH_SECRET`
   - `BLOB_READ_WRITE_TOKEN`

   Note: The project also contains `vercel.json` with an `env` mapping using the `@alias` style. You can either:
   - define variables directly with the exact names above, or
   - create Vercel “Environment Variable Namespaces” matching the aliases in `vercel.json` (e.g., `@database_url`). Direct definition is usually simpler.

4) Build settings
   - Framework Preset: Next.js
   - Build Command: leave empty (Vercel auto-detects) or set `next build`
   - Output Directory: `.next`

5) Redeploy

### Troubleshooting

- **Build Error: "No Next.js version detected…"** → Your Vercel Root Directory points to the wrong folder. Set it to the repository root that contains `package.json` and redeploy.

- **Login fails on Vercel (works locally)** → Check that `NEXTAUTH_URL` is set to your production URL (e.g., `https://your-project.vercel.app`), NOT `http://localhost:3000`. Update the environment variable and redeploy.

- **Need to check if users exist?** → Run `npx tsx scripts/check-users.ts` locally to see registered users in your database.

## Project Structure (key files)

```
crm-app/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── global.css
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── authOptions.ts
│   ├── middleware.ts
│   └── global.d.ts
├── next.config.mjs
├── postcss.config.js
├── vercel.json
├── package.json
└── README.md
```

## API Routes (high level)

- Auth: `POST /api/auth/register`, `/api/auth/[...nextauth]`
- Contacts: `GET/POST /api/contacts`, `GET/PATCH/DELETE /api/contacts/[id]`
- Vehicles: `GET/POST /api/vehicles`, `GET/PATCH/DELETE /api/vehicles/[id]`

## Security & Quality

- Rate limiting on auth/register/upload routes
- ESLint 9 flat config; unused underscore-prefixed vars ignored intentionally
- Snyk scans clean at time of writing

## License

MIT

## Support

For issues or questions, please open an issue in the repository.

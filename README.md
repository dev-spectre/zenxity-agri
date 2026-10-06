# Zenxity Agri

A managed-farmland platform where landowners track their plots, project progress, documents and earnings, and admins review land-development requests.

> **Note:** screenshots below show a local instance seeded with **fictional demo data**. No real user or land information is included.

## Screenshots

### Landing Page

![Landing page](screenshots/home.png)

### Login

![Login](screenshots/login.png)

### Farmer Dashboard

Total land, total earnings, active projects, and recent field updates.

![Dashboard](screenshots/dashboard.png)

### My Land

Every registered plot with its development status.

![My Land](screenshots/land.png)

### Earnings

Income and expense ledger with a running balance.

![Earnings](screenshots/earnings.png)

### Live Updates

Field activity timeline — plantation, irrigation, inspections, harvest.

![Live Updates](screenshots/updates.png)

### Profile

Account details and saved bank information.

![Profile](screenshots/profile.png)

### Support

Contact form for raising issues with the Zenxity team.

![Support](screenshots/support.png)

## Features

- **Land registration** — farmers submit a plot (size, address, survey/patta numbers, legal info, preferred language) for review
- **Request workflow** — requests move through *Pending → Approved / Rejected* with a progress percentage and milestone tracking
- **Admin review console** — admins inspect, approve or reject requests and monitor all users
- **Live field updates** — dated activity posts per project (plantation, irrigation, pest checks, harvest) with optional images/video
- **Document vault** — per-user and per-request documents with a *Pending Verification → Verified* status
- **Earnings ledger** — income and expense records per user, aggregated into total earnings and seasonal profit
- **Offers** — time-boxed promotions surfaced on the dashboard
- **Auth** — email/password credentials plus Google OAuth, with bcrypt hashing and JWT sessions
- **Password recovery** — email-based reset tokens via Gmail OAuth2 (nodemailer)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma (with `@prisma/adapter-pg`)
- **Auth:** NextAuth (Credentials + Google), bcryptjs, JWT
- **Styling:** TailwindCSS + shadcn/ui
- **Email:** nodemailer over Gmail OAuth2
- **UI extras:** sonner (toasts), lucide-react (icons)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` in the project root:

```env
DATABASE_URL="postgresql://user:password@127.0.0.1:5432/zenxity_agri?schema=public"
DIRECT_URL="postgresql://user:password@127.0.0.1:5432/zenxity_agri?schema=public"

AUTH_SECRET="<a-long-random-string>"
NEXTAUTH_SECRET="<a-long-random-string>"
NEXTAUTH_URL="http://localhost:3000"
CLIENT_URL="http://localhost:3000"

JWT_SECRET="<a-long-random-string>"
JWT_REFRESH_SECRET="<another-long-random-string>"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"

# Admin (credentials provider)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="<admin-password>"

# Google OAuth (login + Gmail sending)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REFRESH_TOKEN=""
EMAIL_USER=""
EMAIL_FROM=""
```

### 3. Create the schema

```bash
npx prisma db push
```

### 4. Run

```bash
npm run dev                   # development
npm run build && npm start    # production
```

Open <http://localhost:3000>. Admin console is at `/admin/login`.

## Project Structure

```
├── app/
│   ├── api/                 # Route handlers (auth, land-requests, updates, documents,
│   │                        #   financial-records, offer, user)
│   ├── dashboard/           # Farmer area
│   │   ├── land/            # Plot list, detail, add
│   │   ├── earnings/        # Income / expense ledger
│   │   ├── updates/         # Field activity feed
│   │   ├── profile/         # Account + bank details
│   │   └── support/
│   ├── admin/               # Admin login, dashboard, request review
│   ├── login/               # User login
│   ├── privacy/  terms/
│   └── page.tsx             # Landing page
├── components/              # UI components (shadcn/ui based)
├── lib/                     # auth, auth-utils, auth-fallback, prisma client
├── prisma/
│   └── schema.prisma        # User, Offer, FarmingRequest, FarmingUpdates,
│                            #   Document, FinancialRecord
└── shell.nix                # Nix development shell
```

## Data Model

- **User** — name, email, hashed password, mobile, Google OAuth fields, verification/reset tokens, bank details
- **FarmingRequest** — a plot under management: status, land size, address, survey/patta numbers, legal info, milestones, progress
- **FarmingUpdates** — dated field activity posts attached to a request (title, content, image/video, activity date/time)
- **Document** — user/request documents with a verification status
- **FinancialRecord** — per-user income/expense entries (description, amount, date)
- **Offer** — promotional offers with a validity date and image

## License

MIT

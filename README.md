# Car Dealership CRM

A modern CRM application for car dealerships built with Next.js, featuring authentication, contact management, and vehicle inventory management for American and European brand vehicles.

## Features

- 🔐 **Authentication**: Secure login and registration with NextAuth.js
- 👥 **Contact Management**: Add, edit, and manage customer contacts
- 🚗 **Vehicle Inventory**: Manage inventory for American and European brand vehicles
- 📊 **Dashboard**: Overview of contacts and inventory statistics
- 🎨 **Modern UI**: Built with Tailwind CSS for a responsive design
- 🔒 **Database**: PostgreSQL with Prisma ORM

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Supported Vehicle Brands

### American Brands
Ford, Chevrolet, Dodge, RAM, Jeep, GMC, Cadillac, Lincoln, Buick, Chrysler, Tesla

### European Brands
BMW, Mercedes-Benz, Audi, Volkswagen, Porsche, Volvo, Jaguar, Land Rover, Mini, Fiat, Alfa Romeo, Maserati, Ferrari, Lamborghini, Bentley, Rolls-Royce, Aston Martin, McLaren

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crm-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.custom .env
```

Edit `.env` and add your database connection string and NextAuth secret:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/crm_app?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-after rand gen"
```
** # openssl rand -base64 32 **

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Creating Your First User

1. Navigate to http://localhost:3000
2. Click "Register here"
3. Fill in your details and create an account
4. Sign in with your credentials

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project on [Vercel](https://vercel.com)

3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

4. Deploy!

## Database Schema

### User
- Email, name, password (hashed)
- Role-based access

### Contact
- Personal information (name, email, phone)
- Address details
- Status tracking
- Notes

### Vehicle
- Brand, model, year
- VIN, color, mileage
- Price and status (Available, Sold, Reserved, In Service)
- Description and features

## Project Structure

```
crm-app/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── layout.tsx      # Root layout
│   ├── lib/
│   │   └── prisma.ts       # Prisma client
│   └── middleware.ts       # Auth middleware
├── .env.custom            # Environment variables template
├── package.json
└── README.md
```

## API Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create contact
- `GET /api/contacts/[id]` - Get contact by ID
- `PATCH /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/vehicles/[id]` - Get vehicle by ID
- `PATCH /api/vehicles/[id]` - Update vehicle
- `DELETE /api/vehicles/[id]` - Delete vehicle

## License

MIT

## Support

For issues or questions, please open an issue in the repository.

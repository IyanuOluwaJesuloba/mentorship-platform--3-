# Mentorship Platform

A Next.js-based mentorship platform that connects mentors and mentees.

## Setup

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
bun install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

# JWT Secret (for session management)
JWT_SECRET=your_jwt_secret_key
```

3. Set up the database:
Run the SQL scripts in the `scripts/` directory to create the necessary tables:
```bash
# Run these in your Supabase SQL editor
scripts/01-create-tables.sql
scripts/02-seed-data.sql
```

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

## API Routes

The following API routes are available:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user session

### Dashboard
- `GET /api/mentor/dashboard` - Get mentor dashboard data
- `GET /api/mentee/dashboard` - Get mentee dashboard data
- `GET /api/admin/stats` - Get admin statistics

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Mentors
- `GET /api/mentors` - Get list of available mentors

### Requests
- `GET /api/requests` - Get mentorship requests
- `POST /api/requests` - Create mentorship request

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   └── ...
├── components/           # React components
├── lib/                 # Utility libraries
├── scripts/             # Database setup scripts
└── ...
```

## Features

- User authentication and authorization
- Role-based access control (Admin, Mentor, Mentee)
- Mentorship request system
- Session management
- User profiles
- Dashboard for different user roles 

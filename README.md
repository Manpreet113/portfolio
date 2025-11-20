# Portfolio Frontend

Modern portfolio website built with React, TypeScript, and Tailwind CSS. Features dynamic content management through an admin dashboard connected to a Rust backend.

## Tech Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: React Query
- **Routing**: React Router v6
- **API Client**: Axios
- **Deployment**: Cloudflare Pages

## Features

- 🎨 Modern, responsive design with dark mode support
- 🔐 Admin authentication with JWT
- 📝 Admin dashboard for content management
- 🚀 Dynamic Skills and Projects from database
- 📧 Contact form with backend integration
- ⚡ Fast performance with Vite

## Project Structure

```
src/
├── pages/
│   ├── Index.tsx        # Homepage
│   ├── Login.tsx        # Admin login
│   ├── Admin.tsx        # Admin dashboard
│   └── NotFound.tsx     # 404 page
├── components/
│   ├── Skills.tsx       # Dynamic skills display
│   ├── Projects.tsx     # Dynamic projects display
│   ├── Contact.tsx      # Contact form
│   ├── ProtectedRoute.tsx
│   └── ui/              # shadcn/ui components
├── context/
│   └── AuthContext.tsx  # Authentication state
├── lib/
│   └── api.ts           # Axios client with JWT
└── hooks/               # Custom React hooks
```

## Local Development

```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

For local development, the API defaults to `http://localhost:3001/api`.

For production (Cloudflare Pages), set:
```env
VITE_API_URL=https://your-backend.railway.app/api
```

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- ✏️ Add, edit, and delete skills
- 📁 Manage projects
- 🎯 Update portfolio content dynamically

**Login**: Navigate to `/login` and use your admin credentials.

## API Integration

The frontend connects to a Rust backend (Railway) for:
- User authentication (JWT)
- Skills CRUD operations
- Projects CRUD operations
- Contact form submissions

See [folio-backend](https://github.com/Manpreet113/folio-backend) for backend details.

## Deployment

Deployed on Cloudflare Pages with automatic deployments on push to `master`.

**Cloudflare Pages Environment Variables:**
- `VITE_API_URL` - Backend API URL

## Routes

- `/` - Homepage with skills and projects
- `/login` - Admin login page
- `/admin` - Admin dashboard (protected)
- `*` - 404 Not Found page

## Development Notes

- Uses React Router for client-side routing
- Protected routes require JWT authentication
- Axios interceptor automatically adds JWT to requests
- shadcn/ui components for consistent design system

# TEOMax Toys

TEOMax is a full-stack toy e-commerce demo built with separate frontend and backend folders.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Framer Motion, Lucide icons
- Backend: Node.js, Express, MongoDB/Mongoose, JWT auth, bcrypt
- Dev mode: works with MongoDB when `MONGO_URI` is set, and falls back to in-memory seed data without MongoDB

## Folder Structure

```text
TEOMax/
  frontend/   React + Tailwind customer store and admin portal
  backend/    Express API, auth, product, order, and admin routes
```

## Run Locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

Health check: `http://localhost:5000/api/health`

## Demo Accounts

Customer:

```text
aarav@example.com
demo123
```

Admin:

```text
admin@teomax.com
admin123
```

## MongoDB Setup

Copy `backend/.env.example` to `backend/.env` and set:

```text
MONGO_URI=mongodb://127.0.0.1:27017/teomax
JWT_SECRET=your-secret
```

If `MONGO_URI` is not set, the backend runs with in-memory seed data for fast development.

## Deploy

Deploy the backend first on Render, then deploy the frontend on Vercel.

### Render Backend

Use the included `render.yaml` blueprint, or create a Web Service manually with:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Set these Render environment variables:

```text
MONGO_URI=your-mongodb-uri
CLIENT_URLS=https://your-vercel-domain.vercel.app
JWT_SECRET=your-long-random-secret
```

If you deploy Vercel preview URLs, add them to `CLIENT_URLS` as a comma-separated list.

### Vercel Frontend

Create a Vercel project from this GitHub repo and set:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Set this Vercel environment variable:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```

Redeploy both services after the final Render and Vercel URLs are known, so CORS and API URLs match.

## Features

- Sticky navbar with search, cart, favorites, account, and admin links
- Animated homepage with featured toys and category sections
- Product catalog with category, age, sort, search, add to cart, favorites, and buy-now
- Cart quantity management and checkout with address and payment mode
- Customer account with order history
- Admin dashboard with catalog management, users, orders, and revenue summary
- Backend APIs for auth, products, orders, and admin summary

# 📦 Frontend (React + TypeScript + Vite)

This is a simple frontend built to demonstrate communication with a Node.js backend using:

- HTTP-only cookies for authentication
- Express REST API
- CORS configuration
- Role-based endpoints (admin/user)
- Minimal auth UI state (visual only)

The focus of this project is **backend integration and auth flow demonstration**, not production-grade frontend architecture.

---

# 🚀 Tech Stack

- React + TypeScript
- Vite
- React Router
- Axios
- HTTP-only cookie authentication
- Express backend (separate service)

---

# 🧠 Architecture Overview

Authentication flow:

```
Login request
→ Backend validates credentials
→ Backend sets HTTP-only cookie (JWT)
→ Browser stores cookie automatically
→ Frontend calls /users/profile to verify session
→ UI updates (logged in / logged out)
```

Important:

> The frontend does NOT store or read JWT tokens directly.

---

# 📁 Project Structure

```
src/
├── api/
│   └── axios.ts
├── components/
│   ├── Navbar.tsx
│   └── LogoutButton.tsx
├── context/
│   ├── AuthContext.ts
│   └── AuthProvider.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ProfilePage.tsx
│   ├── AdminToolsPage.tsx
│   └── NotFoundPage.tsx
├── routes/
│   └── AppRoutes.tsx
└── main.tsx
```

---

# ⚙️ Setup

## 1. Install dependencies

```bash
npm install
```

---

## 2. Environment variables

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:3000
```

For Vite proxy mode (optional dev setup):

```env
VITE_BACKEND_URL=
```

---

## 3. Run development server

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔗 Backend Integration

The frontend expects these backend routes:

## Auth routes

```
POST /api/v1/users/register
POST /api/v1/users/login
POST /api/v1/users/logout
GET  /api/v1/users/profile
GET  /api/v1/users/admin-tools
```

---

# 🍪 Authentication Model

This project uses:

### ✅ HTTP-only cookies

- JWT is stored in cookie (not localStorage)
- Frontend cannot read token directly

### ✅ Session check

Frontend determines auth state via:

```
GET /users/profile
```

If successful → user is logged in
If failed → user is logged out

---

# 🔐 Auth State (Frontend)

A minimal boolean-based context is used:

```ts
isSignedIn: boolean;
```

Updated via:

- login → `signIn()`
- logout → `signOut()`
- app load → `/users/profile` check
- Will not support multi tabs or windwos, simple UI representation.

---

# 🧭 Features

## Public

- Register
- Login
- Home page
- 404 page

## Authenticated

- Profile page
- Logout button
- Conditional navbar rendering

## Protected (backend enforced)

- Admin tools route (`/admin-tools`)

---

# 🧪 Example Flow

### Register

```
POST /users/register
→ user created
```

### Login

```
POST /users/login
→ cookie set (JWT)
→ frontend sets isSignedIn = true
```

### Profile

```
GET /users/profile
→ requires cookie
→ returns user data
```

### Logout

```
POST /users/logout
→ clears cookie
→ frontend sets isSignedIn = false
```

---

# ⚠️ Notes

### 1. No token handling in frontend

All authentication is handled via cookies.

### 2. CORS must be configured correctly in backend:

```js
cors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### 3. Axios must use:

```ts
withCredentials: true;
```

---

# 🧱 Design Philosophy

This frontend is intentionally:

- minimal
- backend-driven
- state-light
- not production-auth heavy

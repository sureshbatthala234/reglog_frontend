# RegLog Frontend — Sunshine Classmorphism React Interface

A modern, responsive React.js frontend for user registration, login, OTP-based password recovery, and secure JWT session management. Features a warm "Sunshine Classmorphism" design with glowing sun orbs, frosted glass cards, and golden accents.

> **Quick Access:**
> - 🌐 **Open in browser:** `http://localhost:8080/auth`
> - 🔌 **API base (not a page):** `http://localhost:8080/api/auth`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Routing | React Router DOM v6 |
| HTTP Client | Native `fetch` API |
| Styling | Custom CSS (Sunshine Classmorphism) |
| Auth Storage | `localStorage` (JWT token) |
| Build Tool | Create React App (`react-scripts` 5.0.1) |

---

## Project Structure

```
reglog_frontend/
├── public/
│   └── index.html                        # CRA public HTML template
├── src/
│   ├── App.js                            # Root component — React Router setup
│   ├── index.js                          # React DOM entry point
│   ├── components/
│   │   ├── Login.js                      # Login page (email or mobile + password)
│   │   ├── Register.js                   # Registration page (full form + validation)
│   │   ├── Home.js                       # Protected blank white home page
│   │   └── ForgotPassword.js             # 3-step OTP password recovery
│   ├── services/
│   │   └── api.js                        # Centralized API service (fetch wrapper + token management)
│   └── styles/
│       └── sunshine-classmorphism.css    # Custom Sunshine Classmorphism theme
├── index.html                            # Standalone single-file version (no build needed)
├── package.json
└── .gitignore
```

---

## Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Redirect | Auto-redirects to `/login` |
| `/login` | `<Login />` | Login with email or 10-digit mobile + password |
| `/register` | `<Register />` | New user registration |
| `/home` | `<Home />` | Protected blank white page — shown after login |
| `/forgot-password` | `<ForgotPassword />` | 3-step OTP password recovery |
| `/reset-password` | `<ForgotPassword />` | Same component as forgot-password |
| `*` | Redirect | Any unknown route redirects to `/login` |

---

## Features

### Login (`/login`)
- Accepts **Email Address** or **10-digit Mobile Number** as identifier
- Secure JWT token stored in `localStorage` on success
- Navigates to `/home` after successful login
- Generic `"Invalid credentials."` error prevents user enumeration

### Register (`/register`)
- Fields: Full Name, Email, Mobile Number, Password, Confirm Password
- Client-side validation:
  - Valid email format
  - Mobile: exactly 10 digits
  - Password: min 8 chars, uppercase, lowercase, digit, and special character
  - Passwords must match
- Auto-navigates to `/login` after 1.5 seconds on success

### Home (`/home`) — Protected
- Pure white screen (`#FFFFFF`) — intentionally blank
- **Authentication guard**: checks JWT token and verifies with backend `/api/auth/me` on load
- Expired/revoked tokens auto-redirect to `/login`
- **Invisible logout** (no visible button):
  - Press `Escape` key
  - Press `Alt + L`
  - Press `Q` key
  - Double-click anywhere on the screen

### Forgot Password (`/forgot-password`) — 3-Step Flow
1. **Step 1 — Request OTP**: Enter registered email or mobile → receive 6-digit OTP
2. **Step 2 — Verify OTP**: Enter the OTP code from server console (dev mode)
3. **Step 3 — Reset Password**: Set and confirm a new password (same complexity rules as registration)

---

## Prerequisites

- **Node.js** (v16+) and **npm** (for React development server)
- **reglog_backend** running on `http://localhost:8080`

---

## How to Run

### Method 1 — Via Java Backend (Recommended — No Node.js needed)

Start the `reglog_backend` server, then open in browser:

```
http://localhost:8080/auth
```

> ✅ This is the correct URL to open the app in your browser.
> ❌ Do NOT open `http://localhost:8080/api/auth` — that is the API path, not a page.

Run the backend with:
```cmd
cd reglog_backend
run.bat
```
Or:
```powershell
java -cp "bin;lib/*" com.reglog.ReglogServer
```

### Method 2 — React Development Server (Requires Node.js)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

Opens at **`http://localhost:3000`** — make sure `reglog_backend` is also running on port `8080`.

### Method 3 — Instant Preview (No Build Required)

Open the standalone [`index.html`](index.html) directly in any browser. It uses embedded React + Babel CDN and connects directly to `http://localhost:8080/api/auth`.

---

## Environment Variables

Create a `.env` file in the `reglog_frontend/` root to override the API base URL:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/auth
```

Default (if `.env` is absent): `http://localhost:8080/api/auth`

---

## API Integration

All API calls are centralized in [`src/services/api.js`](src/services/api.js):

| Function | Method | Endpoint |
|----------|--------|----------|
| `authApi.register(payload)` | POST | `/api/auth/register` |
| `authApi.login(payload)` | POST | `/api/auth/login` |
| `authApi.logout()` | POST | `/api/auth/logout` |
| `authApi.getMe()` | GET | `/api/auth/me` |
| `authApi.forgotPassword(identifier)` | POST | `/api/auth/forgot-password` |
| `authApi.verifyOtp(identifier, otp)` | POST | `/api/auth/verify-otp` |
| `authApi.resetPassword(payload)` | POST | `/api/auth/reset-password` |
| `authApi.changePassword(payload)` | PUT | `/api/auth/change-password` |

JWT token helpers:
- `setAuthToken(token)` — saves token to `localStorage`
- `getAuthToken()` — retrieves token from `localStorage`
- `removeAuthToken()` — deletes token from `localStorage`
- `isAuthenticated()` — returns `true` if token exists

---

## Design — Sunshine Classmorphism

The theme uses warm golden tones with glassmorphism-style cards:

- **Colors**: `#f59e0b` (amber), `#fbbf24` (yellow), warm gradient backgrounds
- **Cards**: `backdrop-filter: blur(24px)` frosted glass effect
- **Orbs**: Three animated glowing sun orbs as ambient background elements
- **Typography**: Rounded, clean, modern sans-serif
- **Buttons**: Gradient golden with hover glow effects

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error on API calls | Ensure `reglog_backend` is running on port `8080` |
| Cannot connect to backend | Verify backend started with `run.bat` or `java -cp "bin;lib/*" com.reglog.ReglogServer` |
| Blank white screen on `/home` | This is **intentional** — it's the protected home page. Double-click or press `Escape` to logout. |
| `npm start` fails | Run `npm install` first, then `npm start` |
| Login always says "Invalid credentials" | Ensure MySQL is running and the user is registered in `reglog_db` |

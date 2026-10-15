# RegLog Frontend — Sunshine Classmorphism React Interface

A modern, responsive, sunshine-themed classmorphism user interface for user registration, authentication, OTP password recovery, and secure sessions. Built with React.js, React Router, and standard modern CSS.

---

## 1. Features & Design Highlights

- **Sunshine Classmorphism Theme**: Warm golden accents (`#f59e0b`, `#fbbf24`), glowing ambient sun orbs, frosted glass blur (`backdrop-filter: blur(24px)`), smooth rounded components, and elegant typography.
- **Registration Page (`/register`)**:
  - Full Name, Email Address, Mobile Number (10 digits), Password, and Confirm Password.
  - Client-side and server-side validation (email format, 10 mobile digits, password complexity: 8+ characters, upper, lower, digit, special character).
  - Automatically navigates to `/login` upon successful registration.
- **Login Page (`/login`)**:
  - Accepts either Email Address or 10-digit Mobile Number + Password.
  - Generic invalid-credentials feedback preventing user enumeration.
  - Navigates to `/home` upon successful authentication with JWT token storage.
- **Home Page (`/home`) — Pure Blank White**:
  - Route: `/home`.
  - Color: `#FFFFFF`.
  - Intentionally renders zero visible elements (no navbar, buttons, headings, or cards) as per specification.
  - Protected: Unauthenticated or expired sessions automatically redirect to `/login`.
  - Invisible Logout Handler: Double-click anywhere on the screen or press `Escape` / `Alt+L` to securely log out and revoke the session on the backend.
- **Forgot & Reset Password (`/forgot-password`)**:
  - 3-step recovery: Request OTP → Verify OTP → Reset Password.

---

## 2. Prerequisites

- Any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
- Node.js & npm (optional, if running via `npm start`).

---

## 3. How to Run the Frontend

### Method 1: Instant Browser Preview (Zero Installation)
Simply double-click [`index.html`](index.html) or open it in your browser:
- Path: `reglog_frontend/index.html`
- Uses standalone React 18 & Babel embedded runtime that connects directly to the Java backend at `http://localhost:8080/api/auth`.

### Method 2: Standard React Development Server
If Node.js and npm are installed:
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
```
The application will launch at `http://localhost:3000`.

---

## 4. Environment Variables

You can configure the backend API endpoint by creating a `.env` file in the root of `reglog_frontend`:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/auth
```

---

## 5. Application Routes

| Route | Component | Description |
| :--- | :--- | :--- |
| `/register` | `<Register />` | User registration with Sunshine classmorphism styling |
| `/login` | `<Login />` | Login with email or 10-digit mobile number |
| `/home` | `<Home />` | Protected pure blank white canvas (`#FFFFFF`) with invisible logout |
| `/forgot-password` | `<ForgotPassword />` | OTP generation, verification, and password reset |
| `/` | Redirect | Automatically redirects to `/login` |

---

## 6. Troubleshooting

- **CORS Error**: Ensure the backend server (`reglog_backend`) is running on port 8080.
- **Cannot connect to backend**: Verify `application.properties` in `reglog_backend` has database credentials and server port 8080 active.
- **Blank white screen on Home**: This is intentional! The Home page is designed to be completely blank white (`#FFFFFF`) with invisible logout (`Escape` key or double-click).

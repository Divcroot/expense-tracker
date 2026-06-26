# Expense Tracker

A full-stack expense tracking application built with React, Tailwind CSS, Express, and MongoDB. The project includes user authentication, dashboard analytics, income and expense management, file upload support, and Excel export for transaction history.

## 🚀 Features

- User authentication with email/password and JWT
- Profile image upload for user accounts
- Dashboard with total balance, income, and expenses
- Recent transactions, income analytics, and 30-day expense insights
- CRUD support for income and expense entries
- Download transaction history as Excel files
- Protected backend routes with middleware
- Responsive React UI driven by Vite and Tailwind CSS

## 🧱 Architecture

- `backend/`
  - `server.js` — Express server setup and route registration
  - `config/db.js` — MongoDB connection utility
  - `controllers/` — Route handlers for auth, income, expense, and dashboard
  - `models/` — Mongoose schemas for `User`, `Income`, and `Expense`
  - `middlewares/` — JWT auth guard and file upload handling
  - `routes/` — Express routers for API endpoints

- `client/`
  - `src/` — React app source
  - `src/App.jsx` — Route configuration with React Router
  - `src/context/UserContext.jsx` — Global user state
  - `src/hooks/useUserAuth.jsx` — Protected user session logic
  - `src/utils/` — API paths, axios setup, and helper utilities
  - `src/components/` — UI components for dashboard, forms, modals, charts, and navigation

## 📦 Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following keys:
   ```ini
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

## ⚛️ Frontend Setup

1. Open another terminal and navigate to the client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open the application in the browser at the URL shown by Vite, usually:
   ```bash
   http://localhost:5173
   ```

## 🔧 Environment Variables

### Backend
- `PORT`: Server port (default `5000`)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWTs
- `CLIENT_URL`: Frontend origin for CORS

### Frontend
No additional environment variables are required for the client if the backend is available at `http://localhost:5000`.

## 🧪 API Endpoints

### Authentication
- `POST /api/v1/auth/register` — Register a new user
- `POST /api/v1/auth/login` — Login and receive a JWT
- `GET /api/v1/auth/getUser` — Fetch current user profile (protected)
- `POST /api/v1/auth/upload-image` — Upload profile image

### Income
- `POST /api/v1/income/add` — Add income entry
- `GET /api/v1/income/get` — Get all income entries
- `DELETE /api/v1/income/:id` — Delete an income entry
- `GET /api/v1/income/downloadexcel` — Download income entries as Excel

### Expense
- `POST /api/v1/expense/add` — Add expense entry
- `GET /api/v1/expense/get` — Get all expense entries
- `DELETE /api/v1/expense/:id` — Delete an expense entry
- `GET /api/v1/expense/downloadexcel` — Download expense entries as Excel

### Dashboard
- `GET /api/v1/dashboard` — Dashboard aggregate metrics and recent transactions

## 🧠 Notable Implementation Details

- `axiosInstance` automatically injects JWT token on all requests and handles 401 responses by clearing auth state.
- `useUserAuth` protects dashboard and data pages by validating the user session on load.
- Backend uses Multer for profile image uploads and serves images from `/uploads`.
- Excel export uses `xlsx` and exposes separate download endpoints for income and expense data.
- The dashboard aggregates total balance, total income, total expenses, and transaction summaries for recent data.

## ✅ Recommended Improvements

- Add password reset flow
- Add client-side route guards for unauthenticated users
- Add transaction categories and filters
- Improve error handling and validation feedback
- Secure file uploads with size limits and storage policies

## 📁 Folder Summary

- `backend/`: API server, authentication, MongoDB models, and file upload middleware
- `client/`: React app, routing, pages for login/signup/dashboard/income/expense
- `client/src/utils/axiosInstance.js`: API client with auth interceptors
- `client/src/context/UserContext.jsx`: Auth user provider
- `client/src/hooks/useUserAuth.jsx`: User session bootstrapping

## 💡 Usage Flow

1. Register or login
2. Upload profile image (optional)
3. Add income and expense entries
4. View dashboard analytics and charts
5. Download transaction history as Excel files
6. Delete outdated or incorrect entries

---

If you want, I can also add a `frontend` and `backend` README inside each folder for better repo organization.
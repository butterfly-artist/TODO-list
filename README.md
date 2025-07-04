# Todo List Fullstack App

A fullstack Todo List application built with React, TypeScript, Vite, Tailwind CSS (frontend), Node.js/Express (backend), and MongoDB (database). Includes JWT-based authentication and a REST API.

---

## Features
- User authentication (sign up, sign in, JWT-based)
- Add, edit, delete, and filter todos
- Search todos by title or description
- Priority, category, and due date support
- Responsive, modern UI with Tailwind CSS
- Secure backend with Express and MongoDB

---

## Project Structure

```
project/
├── .env                # Backend environment variables
├── package.json        # Project scripts and dependencies
├── server/             # Express backend
│   ├── index.js        # Main server entry
│   ├── models/         # Mongoose models (User.js, Todo.js)
│   ├── routes/         # API routes (auth.js, todos.js)
│   └── middleware/     # Auth middleware
├── src/                # React frontend
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point, wraps app in BrowserRouter
│   ├── components/     # UI components (Auth, TodoForm, etc.)
│   ├── hooks/          # Custom hooks (useAuth, useTodos)
│   ├── lib/            # API utilities (api.ts)
│   └── types/          # TypeScript types
└── ...
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd project
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root with:
```
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5001
```

### 4. Start the backend and frontend
```sh
npm run dev
```
- This runs both the backend (Express) and frontend (Vite) concurrently.
- The backend API will be at `http://localhost:5001/api`
- The frontend will be at `http://localhost:5173/` (or next available port)

---

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register a new user `{ email, password }`
- `POST /api/auth/signin` — Login `{ email, password }` (returns JWT token)

### Todos (all require JWT in `Authorization: Bearer <token>` header)
- `GET /api/todos` — Get all todos for the logged-in user
- `POST /api/todos` — Create a new todo
- `PUT /api/todos/:id` — Update a todo
- `DELETE /api/todos/:id` — Delete a todo
- `GET /api/todos/search?q=term` — Search todos by text

---

## Frontend Usage
- Sign up or sign in to create an account
- Add, edit, delete, and filter your todos
- Use the search bar to find todos by title or description
- All actions are protected by JWT authentication

---

## Customization
- Update styles in `src/index.css` and Tailwind config
- Add more fields to the Todo model as needed
- Extend authentication (e.g., password reset, OAuth)

---

## Troubleshooting
- **Port in use:** Change `PORT` in `.env` or kill the process using the port
- **Blank page:** Make sure backend is running and frontend is wrapped in `<BrowserRouter>`
- **API errors:** Check backend logs and ensure MongoDB is running

---

## License
MIT

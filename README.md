# FocusBoard

Full Stack task management application built with React and Flask.

Live Demo: https://focusboard-fullstack.vercel.app  
Backend API: https://focusboard-fullstack.onrender.com

---

## Tech Stack

### Frontend
- React (Hooks, Context API)
- React Router
- Custom Hooks
- Fetch API
- CSS modular styling
- Vite

### Backend
- Flask (App Factory pattern)
- Flask-JWT-Extended
- Flask-SQLAlchemy
- PostgreSQL (Production)
- SQLite (Development)
- CORS configuration
- Gunicorn

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## Authentication

- JWT-based authentication
- Protected routes
- Token persistence via localStorage
- Auto logout on token expiration
- Secure password hashing

---

## Features

- User registration & login
- Persistent sessions
- Create tasks
- Toggle completion
- Delete tasks
- User-specific task isolation
- Demo account available
- Floating GitHub profile button

---

## Demo User

- Email: demo@focusboard.com
- Password: demo123
> Note: Backend may take up to 60 seconds to wake up on first request (Render free tier).

---

## Project Architecture

### Backend
- App Factory pattern
- Blueprints (auth, tasks)
- Service layer abstraction
- Environment-based configuration

### Frontend
- API layer separation
- Custom hook (`useTasks`)
- Context-based authentication
- ProtectedRoute component
- Reusable UI components

---

## Running Locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
flask run
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Purpose of the project
This project was built as part of my transition into Full Stack Web Development.
It demonstrates production-ready authentication, REST API design, and deployment workflows.

## Author

F. Pedro Delgado
GitHub: https://github.com/PedroDelgado4


## Screenshots

### Login
![Login](/screenshots/login-focusboard.png)

### Dashboard
![Dashboard](/screenshots/focusboard.png)



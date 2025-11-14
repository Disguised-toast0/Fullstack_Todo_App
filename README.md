
# fullstack Todo Application

This project is a full stack Todo application built with Reactjs, typeScript, Nodejs, Express, and MongoDB. It includes authentication, protected route, error logging, and clean ui built with Tailwind CSS.

## Features

### authentication
- user registration
- user login
- protected routes using JWT
- forgot and reset password functionality

### todo Management
- create new todos
- edit existing todos
- delete todos
- mark todos as completed or not completed
- todos stored in MongoDB per user

### Backend
- Node.js and Express with TypeScript
- MongoDB with Mongoose
- Centralized error handling and logging into a dedicated logs collection
- Separation of controllers, routes, models, and middleware
- CORS enabled for frontend communication
- Password hashing using bcrypt
- JWT token generation with expiration settings

### Frontend
- React with TypeScript and Vite
- Zustand for global state management
- React Query for API requests and caching
- React Hook Form with Zod for form validation
- Tailwind CSS for UI layout and styling
- Axios for API communication
- Protected routes based on authentication state

## Project Structure

### Backend
- controllers – Logic for authentication and todo management  
- middlewares – Authentication and error logging handlers  
- models – Mongoose schemas for User, Todo, and Logs  
- routes – API endpoint definitions  
- utils – Utility functions such as DB connection  

### Frontend
- store – Zustand stores for authentication and todos  
- pages – Login, Register, and Todos pages  
- components – TodoInput, TodoItems, and UI components  
- api – Axios instance configuration  
- types – TypeScript interfaces  

## Workflow
1. Register a new user  
2. Login with your credentials  
3. Create, edit, delete, and complete todos  
4. Logout when finished  

## notes
- All backend errors are logged in logs collection  
- Protected routes require a valid JWT stored in cookies  
- The project follows a clear folder structure for maintainability  

## additional feature

- added react hot toast for good ui.

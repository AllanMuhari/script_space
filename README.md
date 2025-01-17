Sure! Below is a comprehensive README for your blogging application. This README covers the project overview, setup instructions, and more.

---

# Blogging Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This Blogging Application is a full-stack web application that allows users to create, view, edit, and delete blog posts. It includes user authentication and authorization, ensuring that only authenticated users can manage their own blogs. The application is built using modern web technologies including React for the frontend and Express with MongoDB for the backend.

## Features

- User Authentication (Login and Registration)
- Create, Read, Update, and Delete (CRUD) Operations for Blogs
- View All Blogs or User-Specific Blogs
- Secure API Endpoints with JWT-based Authorization
- Responsive UI with Tailwind CSS
- Error Handling and Notifications

## Technology Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Tooling**: Vite, Babel, ESLint

## Installation

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (running locally or accessible via a URI)

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/blogging-app.git
   cd blogging-app
   ```

2. **Navigate to the backend directory**:

   ```bash
   cd server
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env` file in the `server` directory and add the following environment variables**:

   ```bash
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blogsDB
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the backend server**:
   ```bash
   npm start
   ```
   The server should now be running at `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file in the `client` directory and add the following environment variable**:

   ```bash
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start the frontend development server**:
   ```bash
   npm run dev
   ```
   The application should now be running at `http://localhost:5173`.

## Running the Application

To run the application, follow these steps:

1. **Start the backend server**:

   ```bash
   cd server
   npm start
   ```

2. **Start the frontend development server**:

   ```bash
   cd client
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`.

## Project Structure

### Backend (`/server`)

```
/server
│
├── config/             # Configuration files (DB, JWT)
├── controllers/        # Controllers for handling requests
├── middlewares/        # Custom middleware (auth, error handling)
├── models/             # Mongoose models
├── routes/             # API routes
├── utils/              # Utility functions
├── app.js              # Main application file
├── server.js           # Server entry point
└── .env.example        # Example environment variables
```

### Frontend (`/client`)

```
/client
│
├── public/             # Static files (index.html, favicon, etc.)
├── src/
│   ├── assets/         # Static assets (images, styles)
│   ├── components/     # React components
│   ├── context/        # Context providers (UserContext)
│   ├── pages/          # Page components
│   ├── App.jsx         # Main App component
│   ├── index.jsx       # Entry point for React
│   └── styles/         # Global and component styles
└── vite.config.js      # Vite configuration
```

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login an existing user

### Blogs

- **GET** `/api/blogs` - Get all blogs
- **GET** `/api/blogs/:blogId` - Get a single blog by ID
- **POST** `/api/blogs` - Create a new blog (requires authentication)
- **PUT** `/api/blogs/:blogId` - Update a blog by ID (requires authentication)
- **DELETE** `/api/blogs/:blogId` - Delete a blog by ID (requires authentication)

### User Blogs

- **GET** `/api/blogs/myblogs` - Get blogs of the authenticated user

## Environment Variables

### Backend (`/server`)

- **`PORT`**: Port number for the server to run on.
- **`MONGODB_URI`**: MongoDB connection URI.
- **`JWT_SECRET`**: Secret key for JWT authentication.

### Frontend (`/client`)

- **`VITE_API_BASE_URL`**: Base URL for the backend API.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your branch and create a pull request.

Please make sure to update tests as appropriate and follow the existing coding style.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify and expand this README to better suit your project’s needs.

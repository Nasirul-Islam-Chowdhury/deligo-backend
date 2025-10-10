# Deligo

Deligo is a full-stack food menu and ordering system designed for restaurants or food vendors, with role-based authentication, admin management, cloud image upload, and a modern, responsive frontend.

---

## 🚨 **Demo Admin Account** 🚨

> 💡 **Try out Deligo as an admin!**

| **Admin Email**               | ** Password** |
|-------------------------------|:-----------------:|
| `nasirchy252@gmail.com`       |   `12121212`      |

> ⚡ **Use these credentials on the live site for admin access!**

---

## Project Overview

This repository contains both the backend (Node.js/Express/MongoDB) and frontend (Next.js/React/Redux) applications.  
- **Backend**: REST API providing user authentication, food menu management, order processing, and secure role-based access.
- **Frontend**: User-friendly web application for browsing menus, placing orders, and managing the restaurant dashboard.

## Technologies Used

- **Backend**
  - Node.js, Express.js, TypeScript
  - MongoDB, Mongoose
  - JWT Authentication, Bcrypt
  - Cloudinary (Image upload)
  - Multer (File upload middleware)
- **Frontend**
  - Next.js, React.js, Redux Toolkit
  - Axios (API requests)
  - Tailwind CSS
- **Other**
  - ESLint, Prettier (Code quality)

## Setup Instructions

### 1. Backend

1. Clone this repository and install dependencies:
    ```bash
    cd deligo-backend
    npm install
    ```

2. Create a `.env` file (see `.env.example` for guide) containing your MongoDB URI, JWT secrets, Cloudinary credentials, etc.

3. Start the backend server:
    ```bash
    npm run dev
    ```
    The server will run (by default) on `http://localhost:5000`.

### 2. Frontend

1. Open a new terminal and navigate to the frontend:
    ```bash
    cd deligo-frontend
    npm install
    ```

2. Update the environment variables (`.env.local`) for the frontend (backend API URL, etc).

3. Start the frontend app:
    ```bash
    npm run dev
    ```
    The app runs by default on `http://localhost:3000`.

## API Documentation (Summary)

- **Authentication:**  
  - `POST /api/v1/auth/login` - User login  
  - `POST /api/v1/auth/register` - User registration  
  - `POST /api/v1/auth/refresh-token` - Refresh JWT token  
  - `POST /api/v1/auth/forgot-password` - Password reset flow

- **Menu Management:**  
  - `GET /api/v1/menus` - List all menus  
  - `GET /api/v1/menus/:id` - Get menu by ID  
  - `POST /api/v1/menus` - Create a new menu  
  - `PATCH /api/v1/menus/:id` - Update menu  
  - `POST /api/v1/menus/:id/items` - Add menu item  
  - `DELETE /api/v1/menus/:id/items/:itemId` - Remove menu item  

- **Order Management:**  
  - `GET /api/v1/orders` - List all orders  
  - `POST /api/v1/orders` - Create order

- **Admin Features:**  
  - User role/permission management
  - Block/delete users

*All endpoints use JWT authentication (except login/register/forgot password). For full details, refer to the API source code.*

## Demo Link

[🚀 **Live Demo (Click Here!)**](https://deligo-backend-p3jo.onrender.com/api/v1)

---

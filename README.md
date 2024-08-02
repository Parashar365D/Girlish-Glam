# Girlish Glam

Girlish Glam is a beauty product e-commerce website. It is made using MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS). User can view, search and buy products whereas admin will be able to manage the listing of products.

## Features

- User registration and login
- Add products to a shopping cart
- Admin panel for managing products

## Tech Stack

- **Frontend**: React, Redux, Axios, React Router, Material-UI
- **Backend**: Node.js, Express.js, Mongoose, JWT
- **Database**: MongoDB
- **Deployment**: Heroku, Vercel, MongoDB Atlas

## Getting Started

### Prerequisites

Before you start, make sure you have:

- Node.js
- npm (or yarn)
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Parashar365D/Girlish-Glam.git
   cd girlish-glam
   ```

2. **Install dependencies:**
   ```bash
   # For the Backend
   cd Backend
   npm install

   # For the Frontend
   cd ../Frontend
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the Project

1. **Start the backend server:**
   ```bash
   cd Backend
   npm start
   ```

2. **Start the frontend server:**
   ```bash
   cd ../Frontend
   npm start
   ```

3. **Open the app in your browser:**
   Go to `http://localhost:3000`

## API Endpoints

### User Routes
- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`
- **Get Profile**: `GET /api/users/profile`
- **Update Profile**: `PUT /api/users/profile`

### Product Routes
- **Get Products**: `GET /api/products`
- **Get Product by ID**: `GET /api/products/:id`
- **Add Product** (Admin): `POST /api/products`
- **Update Product** (Admin): `PUT /api/products/:id`
- **Delete Product** (Admin): `DELETE /api/products/:id`

### Order Routes
- **Place Order**: `POST /api/orders`
- **Get User Orders**: `GET /api/orders`
- **Get Order by ID**: `GET /api/orders/:id`

## Project Structure

```
girlish-glam/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── actions/
    │   ├── components/
    │   ├── constants/
    │   ├── reducers/
    │   ├── screens/
    │   ├── store/
    │   ├── App.js
    │   ├── index.js
    │   └── package.json
```

## Contributing

We welcome contributions! Here’s how you can help:

1. **Fork the repository**: Click the "Fork" button at the top right of this page.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/Parashar365D/Girlish-Glam.git
   cd girlish-glam
   ```

3. **Create a branch**:
   ```bash
   git checkout -b feature/YourFeature
   ```

4. **Make your changes** and **commit**:
   ```bash
   git commit -m 'Add some feature'
   ```

5. **Push to the branch**:
   ```bash
   git push origin feature/YourFeature
   ```

6. **Open a pull request**: Describe your changes and submit!

---
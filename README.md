# Girlish Glam

## Table of Contents
- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project
Girlish Glam is an e-commerce platform dedicated to beauty and fashion products exclusively for girls. It provides a user-friendly interface to explore and purchase trendy items, fostering an enjoyable shopping experience.

## Technologies Used
List of technologies and tools used in the project:
- **Frontend**: React, Redux, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Other Tools**: JWT for authentication, Razorpay for payment processing

## Features
Key features of the project:
- User authentication and authorization
- Product reviews and ratings
- Dynamic product management
- Payment integration with Razorpay
- Order tracking and management

## Installation
### Prerequisites
- Node.js installed
- MongoDB running locally or using a cloud service (e.g., MongoDB Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/https://github.com/Parashar365D/Girlish-Glam.git.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Girlish Glam
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following keys:
     ```env
     JWT_SECRET=your_jwt_secret
     MONGO_URI=your_mongo_uri
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
### Running the Frontend
Navigate to the `client` folder and start the frontend development server:
```bash
cd client
npm start
```

### Running the Backend
Navigate to the `server` folder and start the backend server:
```bash
cd server
npm start
```

## API Endpoints
### Authentication
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login a user

### Products
- **GET** `/products` - Fetch all products
- **POST** `/products/review` - Submit a product review

### Orders
- **POST** `/orders` - Place a new order
- **GET** `/orders/:id` - Fetch order details

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.

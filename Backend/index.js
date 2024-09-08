import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from './config/db.js';
import products from './routes/products.js';
import user from './routes/users.js';
import cart from './routes/cart.js'

dotenv.config();

// Connect to the database
connectToDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/product', products);
app.use('/user', user);
app.use('/cart', cart);

app.get('/', (req, res) => {
    res.send('Hello');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

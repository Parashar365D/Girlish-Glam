import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import databaseConnect from "./config/database.js";
import user from "./routes/user/user-routes.js";
import product from "./routes/admin/products-routes.js";
import cart from "./routes/cart/cart-routes.js";
import address from "./routes/address/address-routes.js";
import order from "./routes/order/order-routes.js";
import user_orders from "./routes/admin/adminOrders-routes.js";
import search_products from "./routes/search/search-routes.js";
import review_products from "./routes/review/review-routes.js";


const app = express();
dotenv.config();

databaseConnect();

app.use(cors({origin: process.env.WEB_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser()); 

app.use('/user', user);
app.use('/admin/products', product);
app.use('/admin/order', user_orders);
app.use('/cart', cart);
app.use('/address', address);
app.use('/order', order);
app.use('/search', search_products);
app.use('/review', review_products);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
import express from 'express';
import { UsersAllOrder, getOrderDetailsForAdmin, updateOrderStatus } from './adminOrders-controller.js';

const router = express.Router();

// Route to get all user orders: http://localhost:5000/admin/order/user-orders
router.get('/user-orders', UsersAllOrder);

// Route to get order details for admin: http://localhost:5000/admin/order/details-order/:id
router.get('/details-order/:id', getOrderDetailsForAdmin);

// Route to update order status for user: http://localhost:5000/admin/order/details-order/:id
router.post('/update-order/:id', updateOrderStatus);

export default router;

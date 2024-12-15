import razorpay from "./payment.js";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import crypto from "crypto";

const createOrder = async (req, res) => {
    try {
        const { userId, cartId, cartItems, addressInfo, paymentMethod, orderStatus } = req.body;

        if (!userId || !cartId || !cartItems?.length || !addressInfo || !paymentMethod) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const finalAmount = cartItems.reduce((total, item) => total + (item.salePrice * item.quantity), 100);

        let razorpayOrder;
        try {
            razorpayOrder = await razorpay.orders.create({
                amount: finalAmount * 100,
                currency: "INR",
                receipt: `receipt_order_${Date.now()}`
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Failed to create Razorpay order" });
        }

        const newOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            paymentMethod,
            paymentStatus: 'Unpaid',
            totalAmount: finalAmount,
            paymentId: razorpayOrder.id,
            orderStatus: orderStatus,
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            orderId: newOrder.id,
            paymentId: razorpayOrder.id,
            currency: "INR",
            finalAmount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


const capturePayment = async (req, res) => {
    try {
      const { paymentId, orderId, paymentSignature } = req.body;
      const order = await Order.findOne({ paymentId: orderId });;
  
      if (!order) {
        return res.status(404).json({ success: false, error: "Order not found" });
      }
  
      const generatedSignature = crypto.createHmac('sha256', process.env.PAYMENT_API_SECRET).update(order.paymentId + "|" + paymentId).digest('hex');
  
      if (generatedSignature !== paymentSignature) {
        return res.status(400).json({ success: false, error: "Payment signature mismatch" });
      }
  
      order.paymentStatus = 'Paid';
      order.orderStatus = 'Confirmed';
      order.paymentId = paymentId;
  
      if (order.cartId) {
        await Cart.findByIdAndUpdate(order.cartId, { items: [] });
      }
      await order.save();
      res.status(200).json({ success: true, message: "Order payment captured successfully", data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };

const getUserAllOrder = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        if (!orders.length) {
            return res.status(404).json({ success: false, error: "No orders found for this user" });
        }

        res.status(200).json({ success: true, message: "Orders retrieved successfully", data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order details retrieved successfully", data: order });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export { createOrder, capturePayment, getUserAllOrder, getOrderDetails };
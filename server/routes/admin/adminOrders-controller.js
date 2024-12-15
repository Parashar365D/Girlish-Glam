import Order from "../../models/Order.js";

const UsersAllOrder = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        if (!orders.length) {
            return res.status(404).json({ success: false, error: "No orders found" });
        }

        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
            pagination: {
                currentPage: page,
                totalOrders: await Order.countDocuments(),
                totalPages: Math.ceil(await Order.countDocuments() / limit),
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const getOrderDetailsForAdmin = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        if (!orderStatus) {
            return res.status(400).json({ success: false, error: "Order status is required" });
        }

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });

        res.status(200).json({ success: true, message: "Order status updated successfully!", data: updatedOrder});
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



export { UsersAllOrder, getOrderDetailsForAdmin, updateOrderStatus };
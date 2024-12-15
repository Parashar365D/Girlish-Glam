import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import Review from "../../models/Review.js";

const reviewProducts = async (req, res) => {
    try {
        const { productId, userId, name, message, rating } = req.body;

        const order = await Order.findOne({ userId, 'cartItems.productId': productId, orderStatus: 'Confirmed'});
        
        if (!order) {
            return res.status(403).json({ success: false, error: 'You have not purchased this product' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, error: 'Rating should be between 1 and 5' });
        }

        const findReview = await Review.findOne({ productId, userId });
        if (findReview) {
            return res.status(409).json({ success: false, error: 'You already reviewed this product!' });
        }

        const newReview = new Review({ productId, userId, name, message, rating });
        await newReview.save();

        const reviews = await Review.find({ productId });
        const reviewLength = reviews.length;
        const averageReview = reviews.reduce((sum, review) => sum + review.rating, 0) / reviewLength;

        await Product.findByIdAndUpdate(productId, { averageReview });

        return res.status(201).json({ success: true, data: newReview });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const getProductsReview = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({ success: false, error: 'Product ID is required' });
        }
        const reviews = await Review.find({ productId });
        if (!reviews.length) {
            return res.status(404).json({ success: false, error: 'No reviews found for this product' });
        }
        return res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export { reviewProducts, getProductsReview };

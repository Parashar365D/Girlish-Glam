import express from "express";
import { getProductsReview, reviewProducts } from "./review-controller.js";

const router = express.Router();

// Route to review a product: http://localhost:5000/review/add-review
router.post('/add-review', reviewProducts);

// Route to get review of a product: http://localhost:5000/review/:productId
router.get('/:productId', getProductsReview);


export default router;
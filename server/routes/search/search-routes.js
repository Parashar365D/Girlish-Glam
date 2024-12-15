import express from "express";
import { searchProducts } from "./search-controller.js";

const router = express.Router();

// Route to search a product: http://localhost:5000/search/:keyword
router.get('/:keyword', searchProducts);

export default router;
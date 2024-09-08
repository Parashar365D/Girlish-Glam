import express from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product.js';
import { fileURLToPath } from 'url';

const router = express.Router();

// Set up storage configuration for multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer to use the defined upload directory
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../upload/images'),
    filename: (file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the upload directory
router.use('/images', express.static(path.join(__dirname, '../upload/images')));

// Upload image using api http://localhost:5000/product/upload
router.post('/upload', upload.single('product'), (req, res) => {
    const port = process.env.PORT
    res.json({
        success: 1,
        image_url: `https://girlish-glam-server.onrender.com/product/images/${req.file.filename}`,
    });
});

// Route to add a product using api http://localhost:5000/product/addproduct
router.post('/addproduct', upload.single('image'), async (req, res) => {
    try {
        const { title, description, category, image, oldprice, newprice, instock } = req.body;

        // Find the highest product ID and increas it for the new product
        const lastProduct = await Product.findOne({}).sort({ id: -1 }).exec();
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const product = new Product({
            id: newId,
            title,
            description,
            category,
            image,
            oldprice,
            newprice,
            instock,
        });
        await product.save();

        res.status(201).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Route to fetch all products using api http://localhost:5000/product/fetchproduct
router.get('/fetchproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching products:', error); 
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// Route to fetch all products using api http://localhost:5000/product/removeproduct/:id
router.delete('/removeproduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const product = await Product.findOneAndDelete({ id: productId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;

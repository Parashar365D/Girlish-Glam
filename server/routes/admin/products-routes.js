import express from 'express';
import { upload } from './cloudinary.js';
import { handleImgUpload, addProduct, fetchProduct, deleteProduct, updateProduct } from './product-controller.js';

const router = express.Router();

// Route to upload product image using API endpoint: http://localhost:5000/admin/products/upload-image
router.post('/upload-image', upload.single('image'), handleImgUpload);

// Route to add product using API endpoint: http://localhost:5000/admin/products/add
router.post('/add', addProduct);

// Route to update product using API endpoint: http://localhost:5000/admin/products/update/:id
router.put('/update/:id', updateProduct);

// Route to fetch all products using API endpoint: http://localhost:5000/admin/products/fetch
router.get('/fetch', fetchProduct);

// Route to delete product using API endpoint: http://localhost:5000/admin/products/delete/:id
router.delete('/delete/:id', deleteProduct);

export default router;

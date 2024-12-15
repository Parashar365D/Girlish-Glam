import Product from "../../models/Product.js";
import { imgUpload } from "./cloudinary.js";

// upload image
const handleImgUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imgUpload(url);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


// add product
const addProduct = async (req, res) => {
    try {
      const { image, title, description, category, price, salePrice, totalStock } = req.body;
  
      // Validate input fields
      if (!image || !title || !description || !category || !price || !salePrice || !totalStock) {
        return res.status(400).json({ success: false, error: "All required fields must be provided." });
      }

      const lastProduct = await Product.findOne().sort({ id: -1 });
      const newId = lastProduct ? lastProduct.id + 1 : 1;
  
      const product = new Product({
        id: newId,
        image,
        title,
        description,
        category,
        price,
        salePrice,
        totalStock,
      });
      await product.save();
      res.status(201).json({ success: true, data: product, message:"Product Added Successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };
  

// update product
const updateProduct = async (req, res) => {
    try {
        const { image, title, description, category, price, salePrice, totalStock } = req.body;
        const { id } = req.params;

        // Find the product by ID
        const findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update the product details
        findProduct.title = title || findProduct.title;
        findProduct.image = image || findProduct.image;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.price = price || findProduct.price;
        findProduct.salePrice = salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        // Save the updated product
        const updatedProduct = await findProduct.save();
        res.status(200).json({ success: true, product: updatedProduct });
        
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


// fetch Product
const fetchProduct = async (req, res) => {
    try {
        const productList = await Product.find({});
        res.status(200).json({ success: true, data: productList });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await Product.findOneAndDelete({ id });

        if (!deleteProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        if (!deleteProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export { handleImgUpload, addProduct, fetchProduct, deleteProduct, updateProduct };
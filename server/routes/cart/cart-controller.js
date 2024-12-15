import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

// add item in the cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ success: false, error: 'Invalid Data Provided!' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product Not Found' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (productIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[productIndex].quantity += quantity;
        }

        await cart.save();
        res.status(200).json({ success: true, data: cart });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// update item in cart
const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ success: false, error: 'Invalid Data Provided!' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, error: 'Cart not found' });
        }

        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, error: 'Item not present!' });
        }

        cart.items[productIndex].quantity = quantity;
        await cart.save();

        await cart.populate({ path: 'items.productId', select: 'image title price salePrice' });

        const populateItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : 'Product not found',
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({ success: true, data: { ...cart._doc, items: populateItems } });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// fetch items from cart
const fetchCart = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ success: false, error: "User ID is required" });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({ success: false, error: "Cart not found" });
        }

        const validItems = cart.items.filter((productItem) => productItem.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populateItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populateItems,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



// remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        
        if (!userId || !productId) {
            return res.status(400).json({ success: false, error: 'Invalid Data Provided!' });
        }

        const cart = await Cart.findOne({ userId }).populate({ path: 'items.productId', select: 'image title price salePrice' });
        if (!cart) {
            return res.status(404).json({ success: false, error: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
        await cart.save();

        await cart.populate({ path: 'items.productId', select: 'image title price salePrice' });

        const populateItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : 'Product not found',
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({ success: true, data: { ...cart._doc, items: populateItems } });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


export { addToCart, updateCart, fetchCart, removeFromCart };
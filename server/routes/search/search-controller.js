import Product from "../../models/Product.js";

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        
        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({ success: false, error: 'Keyword is required for search' });
        }

        const regEx = new RegExp(keyword, 'i');
        const createSearchQuery = {
            $or: [
                { title: regEx },
                { category: regEx },
                { description: regEx }
            ]
        };

        const searchResult = await Product.find(createSearchQuery);
        res.status(200).json({ success: true, data: searchResult });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export { searchProducts };

import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    oldprice: {
        type: Number,
        required: true
    },
    newprice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    instock: {
        type: Boolean,
        default: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;

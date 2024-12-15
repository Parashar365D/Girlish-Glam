import mongoose  from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
    
},{timestamps:true});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
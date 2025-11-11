import mongoose from "mongoose";


const ProductRatingSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    averageRating: 4.2,
    reviewCount: 24
}, { timestamps: true })

export default mongoose.models.ProductRating || mongoose.model("ProductRating", ProductRatingSchema)
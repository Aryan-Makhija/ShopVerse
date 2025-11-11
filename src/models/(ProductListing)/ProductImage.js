import mongoose from "mongoose";

const ProductImageSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInfo",
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    image: [{ type: String }],
    color: { type: String, },
    size: { type: String }

}, { timestamps: true })

export default mongoose.models.ProductImage || mongoose.model("ProductImage", ProductImageSchema)
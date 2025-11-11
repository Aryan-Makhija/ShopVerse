import mongoose from "mongoose";

const BrandShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInfo",
        required: true
    },
}, { timestamps: true })

export default mongoose.models.Brand || mongoose.model("Brand", BrandShema)
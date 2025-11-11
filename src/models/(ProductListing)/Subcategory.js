import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInfo",
        required: true
    },
}, { timestamps: true })

export default mongoose.models.SubCategory || mongoose.model('SubCategory', SubcategorySchema)
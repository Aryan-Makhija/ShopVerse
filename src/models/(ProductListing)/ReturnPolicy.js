import mongoose from "mongoose";

const ReturnPolicySchema = new mongoose.Schema({
    returnabel: {
        type: String,
        required: true,
    },
    exchangeabel: {
        type: String,
        required: true
    },
    exchangewithin: {
        type: String,
        required: true
    },
    // returnWindowsDays: 7,
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInfo",
        required: true
    },
}, { timestamps: true })

export default mongoose.models.ReturnPolicy || mongoose.model("ReturnPolicy", ReturnPolicySchema)
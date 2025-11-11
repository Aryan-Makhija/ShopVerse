import mongoose from "mongoose";

const MaterialCareSchema = new mongoose.Schema({

    material: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required:true
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


export default mongoose.models.Materialcare || mongoose.model("Materialcare", MaterialCareSchema)
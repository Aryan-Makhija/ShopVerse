const mongoose = require("mongoose")


const CartItemsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    productCode: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // subcategory: {
    //     type: String,
    //     required: true
    // },
    description: {
        type: String,
        required: true
    }




}, { timestamps: true })



export default mongoose.models.CartItems || mongoose.model("CartItems", CartItemsSchema)
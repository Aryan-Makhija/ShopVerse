// // models/VendorInventory.js
// const mongoose = require('mongoose');

// const VariantInventorySchema = new mongoose.Schema({
//     size: String,
//     color: String,
//     quantity: { type: Number, default: 0 }
// }, { _id: false });

// const ProductInventorySchema = new mongoose.Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     productName: String,

//     totalQuantity: {
//         type: Number,
//         default: 0
//     },

//     variants: [VariantInventorySchema]
// }, { _id: false });

// const SubcategoryInventorySchema = new mongoose.Schema({
//     subcategoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Subcategory',
//         required: true
//     },
//     subcategoryName: String,

//     products: [ProductInventorySchema]
// }, { _id: false });

// const CategoryInventorySchema = new mongoose.Schema({
//     categoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     categoryName: String,

//     subcategories: [SubcategoryInventorySchema]
// }, { _id: false });

// const VendorInventorySchema = new mongoose.Schema({
//     vendorId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Vendor',
//         required: true,
//         unique: true
//     },

//     categories: [CategoryInventorySchema],

//     lastUpdated: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('VendorInventory', VendorInventorySchema);






import mongoose from "mongoose"


const inventorySchema = new mongoose.Schema({
    vendorname: {
        type: String,
        required: true
    },
    adminId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }],
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInfo",
        required: true
    }],
    // Product Classification
    productType: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    subcategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    }],
    brand: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    }],

    // Product Variants & Attributes
    productVariant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true
    }],
    attributes: [{
        attribute: { type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' },
        value: { type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue' }
    }],
 




}, { timestamps: true });



export default mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema)

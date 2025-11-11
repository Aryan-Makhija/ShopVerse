// models/Vendor.js
const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required:true
    },
    // gstNumber: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // rating: {
    //     type: Number,
    //     default: 0,
    // },
    // totalProducts: {
    //     type: Number,
    //     default: 0,
    // },
    // verified: {
    //     type: Boolean,
    //     default: false,
    // },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    }

}, { timestamps: true });



export default mongoose.models.VendorDetails || mongoose.model("VendorDetails", VendorSchema)

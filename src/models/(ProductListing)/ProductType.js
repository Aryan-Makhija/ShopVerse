
import mongoose from 'mongoose';


const ProductTypeSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    slug: { type: String },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInfo",
        required: true
    },

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    }
    // e.g., Clothing, Electronics
}, { timestamps: true });

ProductTypeSchema.pre('save', function (next) {
    if (!this.slug && this.name) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
    }
    next();
});

export default mongoose.models.ProductType || mongoose.model("ProductType", ProductTypeSchema);

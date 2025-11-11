// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    productCode: { type: String },
    slug: { type: String, unique: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType', required: true },
    materialCareid: { type: mongoose.Schema.Types.ObjectId, ref: 'Materialcare', required: true },
    ProductVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
    ReturnPolicyId: { type: mongoose.Schema.Types.ObjectId, ref: 'ReturnPolicy', required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', required: true }, // admin who added the product
    status: { type: Boolean, default: true }, // active/inactive
    isReturnable: { type: Boolean, default: true }, // returnable or not

}, { timestamps: true });


// ProductSchema.pre('save', function (next) {
//     if (!this.slug && this.name) {
//         this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
//     }
//     next();



function generate8DigitCode() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}


// Pre-save hook to auto-generate slug and productCode
ProductSchema.pre('save', async function (next) {
    // Auto-generate slug
    if (!this.slug && this.name) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    // Auto-generate productCode if not already set
    if (!this.productCode) {
        let isUnique = false;
        let code;

        while (!isUnique) {
            code = generate8DigitCode();
            const existing = await mongoose.models.Product.findOne({ productCode: code });
            if (!existing) {
                isUnique = true;
            }
        }

        this.productCode = code;
    }

    next();
});
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

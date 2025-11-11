// models/Category.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    // slug: {
    //     type: String,
    //     unique: true
    // },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
    productTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductType",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInfo",
        required: true
    },
}, { timestamps: true });


// CategorySchema.pre('save', function (next) {
//     if (this.isModified('name')) {
//         this.slug = this.name, { lower: true, strict: true };
//     }
//     next();
// });
export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

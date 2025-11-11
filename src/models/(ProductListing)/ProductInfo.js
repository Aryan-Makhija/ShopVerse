import mongoose from "mongoose";


const ProductInfoSchema = new mongoose.Schema({
    producttype: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    productCode: {
        type: String
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },


}, { timestamps: true })



function generate8DigitCode() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}


ProductInfoSchema.pre('save', async function (next) {


    if (!this.productCode) {
        let isUnique = false;
        let code;

        while (!isUnique) {
            code = generate8DigitCode();
            const existing = await mongoose.models.ProductInfo.findOne({ productCode: code });
            if (!existing) {
                isUnique = true;
            }
        }

        this.productCode = code;
    }

    next();
});
export default mongoose.models.ProductInfo || mongoose.model("ProductInfo", ProductInfoSchema)
// models/ProductVariant.js
import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({

  // sku: { type: String, unique: true },
  price: { type: String, required: true },
  discountPrice: {
    type: String,
    required: true
  },

  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute',
    required: true
  },
  // value: { type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue' }

  currency: { type: String, default: "INR", required: true },
  image: [{ type: String }],


  isAvailable: {
    type: String,
    default: "Yes"
  },
  quantity: {
    type: String,
    required: true,
    default: "0" // optional default
  },

  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,

  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductInfo",
    required: true
  },

}, { timestamps: true });

// VariantSchema.pre('save', async function (next) {
//   if (!this.sku) {
//     const ProductInfo = mongoose.model('ProductInfo');
//     // const AttributeValue = mongoose.model('AttributeValue');

//     const product = await ProductInfo.findById(this.productId);
//     if (!product) return next(new Error('Invalid product ID'));

//     const attrValues = [];

//     for (const attr of this.attributes) {
//       const val = await AttributeValue.findById(attr.value);
//       if (val?.name) {
//         attrValues.push(val.name.replace(/\s+/g, '').toUpperCase());
//       }
//     }

//     const random = Math.floor(1000 + Math.random() * 9000);
//     const base = product.producttype || "VARIANT";

//     this.sku = `${base.toUpperCase()}-${attrValues.join('-')}-${random}`;
//   }

//   next();
// });


// VariantSchema.pre('save', async function (next) {
//   if (!this.isModified('')) return next(); // only run if name is modified

//   const baseSlug = this.size.toLowerCase().trim().replace(/\s+/g, '-');
//   let slug = baseSlug;
//   let counter = 0;

//   // Check if slug exists, and if so, append a random 4-digit number
//   while (await mongoose.models.Attribute.findOne({ slug })) {
//     const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
//     slug = `${baseSlug}-${randomNum}`;

//     // Safety valve to avoid infinite loop
//     if (++counter > 5) {
//       return next(new Error('Unable to generate a unique slug'));
//     }
//   }

//   this.slug = slug;
//   next();
// });
export default mongoose.models.ProductVariant || mongoose.model('ProductVariant', VariantSchema);

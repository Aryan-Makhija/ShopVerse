// models/Attribute.js
import mongoose from 'mongoose';


// defines the size and color of the product 
const AttributeSchema = new mongoose.Schema({
    // e.g., Size, Color
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },

    slug: { type: String, unique: true },
    Type: {
        type: String,
        enum: ['dropdown', 'color', 'text', 'image'],
        default: 'dropdown',
    },

    // isVariant: {
    //     type: String,
    //     // only true for variant-defining attributes
    //     default: "Yes",
    // },
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

}, { timestamps: true });


// AttributeSchema.pre('save', function (next) {
//     if (!this.slug && this.name) {
//         this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
//     }
//     next();
// });



AttributeSchema.pre('save', async function (next) {
  if (!this.isModified('size')) return next(); // only run if name is modified

  const baseSlug = this.size.toLowerCase().trim().replace(/\s+/g, '-');
  let slug = baseSlug;
  let counter = 0;

  // Check if slug exists, and if so, append a random 4-digit number
  while (await mongoose.models.Attribute.findOne({ slug })) {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    slug = `${baseSlug}-${randomNum}`;
    
    // Safety valve to avoid infinite loop
    if (++counter > 5) {
      return next(new Error('Unable to generate a unique slug'));
    }
  }

  this.slug = slug;
  next();
});
export default mongoose.models.Attribute || mongoose.model('Attribute', AttributeSchema);


// {
//   "name": "Size",
//   "slug": "size",
//   "type": "dropdown",
//   "isVariant": true
// }
// {
//   "name": "Color",
//   "slug": "color",
//   "type": "color",
//   "isVariant": true
// }

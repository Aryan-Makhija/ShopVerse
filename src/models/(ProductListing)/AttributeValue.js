// models/AttributeValue.js
import mongoose from 'mongoose';

// containes the product color code and  and value example  the size  xl , or red 
const AttributeValueSchema = new mongoose.Schema({
  sizevalue: { type: String, required: true },
  colorvalue: { type: String, required: true },

  slug: { type: String },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true
  },
  attributeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attribute",
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductInfo",
    required: true
  },
}, { timestamps: true });


AttributeValueSchema.pre('save', function (next) {
  if (!this.slug && this.value) {
    this.slug = this.value.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});


export default mongoose.models.AttributeValue || mongoose.model('AttributeValue', AttributeValueSchema);

// Ensure uniqueness per attribute
// AttributeValueSchema.index({ attribute: 1, value: 1 }, { unique: true });
//  this is how the hexcode is handeled in frontend
// const colorMap = {
//   Red: "#FF0000",
//   Blue: "#0000FF",
//   Green: "#00FF00",
//   Black: "#000000",
//   White: "#FFFFFF",
//   Yellow: "#FFFF00",
//   // ... extend as needed
// };


// for size
// [
//   {
//     "attribute": "64fcab3bdc96eaa4f6e1b2b2",  // Replace with actual _id of "Size" attribute
//     "value": "S",
//     "slug": "s"
//   },
//   {
//     "attribute": "64fcab3bdc96eaa4f6e1b2b2",
//     "value": "M",
//     "slug": "m"
//   },
//   {
//     "attribute": "64fcab3bdc96eaa4f6e1b2b2",
//     "value": "L",
//     "slug": "l"
//   },
//   {
//     "attribute": "64fcab3bdc96eaa4f6e1b2b2",
//     "value": "XL",
//     "slug": "xl"
//   }
// ]


// for color
// [
//   {
//     "attribute": "64fcab3bdc96eaa4f6e1a1a1",  // Replace with actual _id of "Color" attribute
//     "value": "Red",
//     "slug": "red",
//     "hexCode": "#FF0000"
//   },
//   {
//     "attribute": "64fcab3bdc96eaa4f6e1a1a1",
//     "value": "Blue",
//     "slug": "blue",
//     "hexCode": "#0000FF"
//   },
//   {
//     "attribute": "64fcab3bdc96eaa4f6e1a1a1",
//     "value": "Green",
//     "slug": "green",
//     "hexCode": "#00FF00"
//   }
// ]

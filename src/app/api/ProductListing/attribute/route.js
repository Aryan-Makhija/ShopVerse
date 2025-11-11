import { connectToDb } from "@/db/db";
import adminSessionModel from "@/models/adminSessionModel";
import Attribute from "@/models/(ProductListing)/Attribute";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";

export async function POST(request) {
    await connectToDb()

    try {

        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await adminSessionModel.findOne({ token })
        const adminId = admin.adminId

        const productid = await ProductInfo.findOne({ adminId }).sort({ createdAt: -1 })
        const productId = productid._id


        const { size, color } = await request.json()

        await Attribute.create({ size, color, adminId, productId })
        return NextResponse.json({ message: "attribute added successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong " }, { status: 400 })
    }
}



// pages/api/products/[productId]/variants/bulk.js
// import dbConnect from '@/lib/dbConnect'; // Your MongoDB connection helper
// import Attribute from '@/models/Attribute';
// import AttributeValue from '@/models/AttributeValue';
// import ProductVariant from '@/models/ProductVariant';

// export default async function handler(req, res) {
//   const { method } = req;
//   const { productId } = req.query;

//   await dbConnect();

//   if (method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const { adminId, attributes, variants } = req.body;

//     if (!adminId || !attributes || !variants || !productId) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const attributeMap = {};
//     const attributeValueMap = {};

//     // Step 1: Create or get Attributes (Size, Color)
//     for (const attr of attributes) {
//       let attribute = await Attribute.findOne({
//         name: attr.name,
//         productId,
//         adminId,
//       });

//       if (!attribute) {
//         attribute = await Attribute.create({
//           name: attr.name,
//           Type: attr.type || 'dropdown',
//           isVariant: true,
//           adminId,
//           productId,
//         });
//       }

//       attributeMap[attr.name] = attribute;
//     }

//     // Step 2: Create or get AttributeValues (M, L, Red, Blue)
//     for (const attr of attributes) {
//       const attribute = attributeMap[attr.name];
//       attributeValueMap[attr.name] = {};

//       for (const val of attr.values) {
//         let attrValue = await AttributeValue.findOne({
//           value: val,
//           attributeId: attribute._id,
//           productId,
//         });

//         if (!attrValue) {
//           attrValue = await AttributeValue.create({
//             value: val,
//             attributeId: attribute._id,
//             adminId,
//             productId,
//           });
//         }

//         attributeValueMap[attr.name][val] = attrValue;
//       }
//     }

//     // Step 3: Create Variants
//     const createdVariants = [];

//     for (const variant of variants) {
//       const variantAttributes = [];

//       for (const [attrName, valName] of Object.entries(variant.attributes)) {
//         const attr = attributeMap[attrName];
//         const val = attributeValueMap[attrName][valName];

//         if (!attr || !val) {
//           return res.status(400).json({
//             message: `Invalid attribute or value: ${attrName} - ${valName}`,
//           });
//         }

//         variantAttributes.push({
//           attribute: attr._id,
//           value: val._id,
//         });
//       }

//       const newVariant = await ProductVariant.create({
//         sku: variant.sku, // Optional; will auto-generate if not provided
//         price: variant.price,
//         discountPrice: variant.discountPrice,
//         image: variant.image || [],
//         attributes: variantAttributes,
//         adminId,
//         productId,
//       });

//       createdVariants.push(newVariant);
//     }

//     res.status(201).json({
//       message: 'Variants created successfully',
//       variants: createdVariants,
//     });
//   } catch (err) {
//     console.error('[Bulk Variant Error]', err);
//     res.status(500).json({ message: 'Internal Server Error', error: err.message });
//   }
// }

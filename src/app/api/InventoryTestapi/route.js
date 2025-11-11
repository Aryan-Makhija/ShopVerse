import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ProductType from "@/models/(ProductListing)/ProductType";
import Category from "@/models/(ProductListing)/Category";
import Subcategory from "@/models/(ProductListing)/Subcategory";
import Brand from "@/models/(ProductListing)/Brand";
import Attribute from "@/models/(ProductListing)/Attribute";
import ProductVariant from "@/models/(ProductListing)/ProductVariant";
import AdminSessionModel from "@/models/adminSessionModel";
import { connectToDb } from "@/db/db";


export async function GET() {
    await connectToDb()
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admintoken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const admin = await AdminSessionModel.findOne({ token });
        if (!admin) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        const adminId = admin.adminId;

        // Step 1: Get all products for the admin
        // const productInfos = await ProductInfo.find({ adminId });

        // const allFlattenedProducts = [];

        // for (const product of productInfos) {
        //   const productId = product._id;

        //   // Step 2: Fetch related models
        //   const [type, category, subcategory, brand] = await Promise.all([
        //     ProductType.findOne({ productId }),
        //     Category.findOne({ productId }),
        //     Subcategory.findOne({ productId }),
        //     Brand.findOne({ productId }),
        //   ]);

        //   const attributes = await Attribute.find({ adminId, productId }).lean();
        //   const variants = await ProductVariant.find({ adminId, productId }).lean();

        //   // Map attributes by _id for easy lookup
        //   const attrMap = {};
        //   for (const attr of attributes) {
        //     attrMap[attr._id.toString()] = attr;
        //   }

        //   // Flattened array for this product
        //   for (const variant of variants) {
        //     const attrId = variant.attribute?.toString();

        //     if (!attrId || !attrMap[attrId]) continue;

        //     const attrName = attrMap[attrId]?.name?.toLowerCase();
        //     const attrValue = variant.value;

        //     const baseProductInfo = {
        //       productCode: product.productCode,
        //       type: type?.name || "",
        //       category: category?.name || "",
        //       subcategory: subcategory?.name || "",
        //       brand: brand?.name || "",
        //       quantity: variant.quantity || "0"
        //     };

        //     // Dynamically add attribute (like size/color)
        //     const fullProduct = {
        //       ...baseProductInfo,
        //       [attrName]: attrValue
        //     };

        //     allFlattenedProducts.push(fullProduct);


        const productInfos = await ProductInfo.find({ adminId });

        const result = [];

        for (const product of productInfos) {
            const productId = product._id;

            // Fetch product-related meta info
            const [type, category, subcategory, brand] = await Promise.all([
                ProductType.findOne({ productId }),
                Category.findOne({ productId }),
                Subcategory.findOne({ productId }),
                Brand.findOne({ productId })
            ]);

            // Fetch all variants and populate their attributes
            const variants = await ProductVariant.find({ productId, adminId })
                .populate("attribute") // 👈 populates size + color
                .lean();

            // Construct response objects
            for (const variant of variants) {
                const attr = variant.attribute;

                if (!attr) continue; // skip if attribute missing

                result.push({
                    productCode: product.productCode,
                    type: type?.name || "",
                    category: category?.name || "",
                    subcategory: subcategory?.name || "",
                    brand: brand?.name || "",
                    size: attr.size || "",
                    color: attr.color || "",
                    quantity: variant.quantity || "0",
                    // price: variant.price || "0",
                    // discountPrice: variant.discountPrice || "0",
                    // currency: variant.currency || "INR",
                    availability: variant.isAvailable || ""
                });
            }
        }

        return NextResponse.json(result, { status: 200 });

    }


    catch (error) {
        console.log(error.message)
        console.error("API_ERROR:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

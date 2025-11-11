import { connectToDb } from "@/db/db";
import Attribute from "@/models/(ProductListing)/Attribute";

import Brand from "@/models/(ProductListing)/Brand";
import Category from "@/models/(ProductListing)/Category";
import MaterialCare from "@/models/(ProductListing)/MaterialCare";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ProductType from "@/models/(ProductListing)/ProductType";
import ProductVariant from "@/models/(ProductListing)/ProductVariant";
import ReturnPolicy from "@/models/(ProductListing)/ReturnPolicy";
import Subcategory from "@/models/(ProductListing)/Subcategory";
import { NextResponse } from "next/server";


export async function GET() {
    await connectToDb()

    try {
        const products = await ProductInfo.find(); // get all products

        const fullProducts = await Promise.all(
            products.map(async (product) => {
                const productId = product._id;

                const [
                    type,
                    category,
                    subcategory,
                    brand,
                    attributes,
                    variants,
                    materialCare,
                    returnPolicy,
                    images
                ] = await Promise.all([
                    ProductType.findOne({ productId }),
                    Category.findOne({ productId }),
                    Subcategory.findOne({ productId }),
                    Brand.findOne({ productId }),
                    Attribute.find({ productId }), // many
                    ProductVariant.find({ productId }), // many
                    MaterialCare.findOne({ productId }),
                    ReturnPolicy.findOne({ productId }),
                
                ]);

                return {
                    ...product.toObject(),
                    type,
                    category,
                    subcategory,
                    brand,
                    attributes,
                    variants,
                    materialCare,
                    returnPolicy,
                    images
                };
            })
        );

        return NextResponse.json(fullProducts);
    } catch (err) {
        console.error('Error fetching product details:', err);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        );
    }
}

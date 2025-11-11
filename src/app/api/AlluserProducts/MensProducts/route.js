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
        // Step 1: Find subcategories with "Mens" in the name
        const mensSubcategories = await Category.find({
            name: { $regex: /mens/i } // case-insensitive match
        });

        if (mensSubcategories.length === 0) {
            return NextResponse.json([]);
        }

        // Step 2: Extract productIds from those subcategories
        const productIds = mensSubcategories.map(sub => sub.productId);

        // Step 3: Get products by those IDs
        const products = await ProductInfo.find({ _id: { $in: productIds } }).sort({ createdAt: -1 }) // latest first
            .limit(5);
        ;

        // Step 4: Fetch related data for each product
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
                   
                ] = await Promise.all([
                    ProductType.findOne({ productId }),
                    Category.findOne({ productId }),
                    Subcategory.findOne({ productId }), // could reuse from above, but re-fetching is safe
                    Brand.findOne({ productId }),
                    Attribute.find({ productId }),
                    ProductVariant.find({ productId }),
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
                   
                };
            })
        );

        return NextResponse.json(fullProducts);
    } catch (err) {
         console.log(err.message)
        console.error('Error fetching mens products:', err);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        );
    }
}
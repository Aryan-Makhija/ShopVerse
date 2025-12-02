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


export async function GET(req) {
    await connectToDb();
    try {

        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query')?.trim();

        if (!query) {
            return NextResponse.json({ message: 'Search query is required' }, { status: 400 });
        }

        const keywords = query.split(/\s+/);
        const regexKeywords = keywords.map((word) => new RegExp(word, 'i'));

        // Step 1: Search related collections
        const [matchedProducts, matchedBrands, matchedCategories, matchedSubcategories, matchedAttributes, matchedVariants] = await Promise.all([
            ProductInfo.find({
                $or: [
                    { producttype: { $in: regexKeywords } },
                    { description: { $in: regexKeywords } },
                ],
            }),
            Brand.find({ name: { $in: regexKeywords } }),
            Category.find({ name: { $in: regexKeywords } }),
            Subcategory.find({ name: { $in: regexKeywords } }),
            Attribute.find({
                $or: [
                    { size: { $in: regexKeywords } },
                    { color: { $in: regexKeywords } },
                ],
            }),
            ProductVariant.find({}),
        ]);

        // Step 2: Collect product IDs
        const matchedIds = new Set();

        matchedProducts.forEach((p) => matchedIds.add(p._id.toString()));
        matchedBrands.forEach((b) => matchedIds.add(b.productId.toString()));
        matchedCategories.forEach((c) => matchedIds.add(c.productId.toString()));
        matchedSubcategories.forEach((s) => matchedIds.add(s.productId.toString()));
        matchedAttributes.forEach((a) => matchedIds.add(a.productId.toString()));

        // Optional: Match variants by price if needed
        matchedVariants.forEach((v) => {
            const variantText = v.price?.toString();
            if (regexKeywords.some((regex) => regex.test(variantText))) {
                matchedIds.add(v.productId.toString());
            }
        });

        // Step 3: Fetch matching products
        const products = await ProductInfo.find({
            _id: { $in: Array.from(matchedIds) },
        });

        // Step 4: Enrich products with related data
        const fullResults = await Promise.all(
            products.map(async (product) => {
                const productId = product._id;

                const [type, category, subcategory, brand, attributes, variants, materialCare, returnPolicy] = await Promise.all([
                    ProductType.findOne({ productId }),
                    Category.findOne({ productId }),
                    Subcategory.findOne({ productId }),
                    Brand.findOne({ productId }),
                    Attribute.find({ productId }),
                    ProductVariant.find({ productId }),
                    MaterialCare.findOne({ productId }),
                    ReturnPolicy.findOne({ productId }),
                ]);

                return {
                    ...product.toObject(), // ensures _id and other fields are serializable
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

        return NextResponse.json(fullResults);
    } catch (err) {
        console.error('Search API Error:', err);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
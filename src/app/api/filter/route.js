
import { connectToDb } from "@/db/db";
import Attribute from "@/models/(ProductListing)/Attribute";
import AttributeValue from "@/models/(ProductListing)/AttributeValue";
import Brand from "@/models/(ProductListing)/Brand";
import Category from "@/models/(ProductListing)/Category";
import Subcategory from "@/models/(ProductListing)/Subcategory";
import ProductType from "@/models/(ProductListing)/ProductType";
import ProductVariant from "@/models/(ProductListing)/ProductVariant";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import { NextResponse } from "next/server";


export async function GET(request) {
    await connectToDb();
    const { searchParams } = new URL(request.url);

    const filters = {
        productType: searchParams.get("productType"),
        category: searchParams.get("category"),
        subcategory: searchParams.get("subcategory"),
        size: searchParams.get("size"),
        color: searchParams.get("color"),
        material: searchParams.get("material"),
        priceMin: searchParams.get("priceMin"),
        priceMax: searchParams.get("priceMax"),
        brand: searchParams.get("brand"),
    };

    const productIdsRaw = searchParams.get("productIds");
    const allowedProductIds = productIdsRaw ? productIdsRaw.split(",") : null;

    try {
        // Step 1: Filter variants
        const variantFilter = {};

        if (allowedProductIds) {
            variantFilter.productId = { $in: allowedProductIds };
        }

        if (filters.size) {
            variantFilter["attributes.value"] = { $in: filters.size.split(",") };
        }

        if (filters.color) {
            variantFilter["attributes.value"] = { $in: filters.color.split(",") };
        }

        if (filters.material) {
            variantFilter.material = filters.material;
        }

        if (filters.priceMin || filters.priceMax) {
            variantFilter.price = {};
            if (filters.priceMin) variantFilter.price.$gte = Number(filters.priceMin);
            if (filters.priceMax) variantFilter.price.$lte = Number(filters.priceMax);
        }

        const filteredVariants = await ProductVariant.find(variantFilter).select("productId");

        const filteredProductIds = filteredVariants.map(v => v.productId.toString());

        // Step 2: Filter ProductInfo
        const infoFilter = {};

        if (filters.productType) infoFilter.productType = filters.productType;
        if (filters.category) infoFilter.category = filters.category;
        if (filters.subcategory) infoFilter.subcategory = filters.subcategory;
        if (filters.brand) infoFilter.brand = filters.brand;

        if (allowedProductIds || filteredProductIds.length > 0) {
            const intersectIds = allowedProductIds && filteredProductIds.length > 0
                ? filteredProductIds.filter(id => allowedProductIds.includes(id))
                : (allowedProductIds || filteredProductIds);

            infoFilter._id = { $in: intersectIds };
        }

        const products = await ProductInfo.find(infoFilter);

        // Step 3: Fetch full product data
        const enrichedProducts = await Promise.all(
            products.map(async (product) => {
                const productId = product._id;

                const [
                    type,
                    category,
                    subcategory,
                    brand,
                    attributes,
                    variants,

                ] = await Promise.all([
                    ProductType.findOne({ productId }),
                    Category.findOne({ productId }),
                    Subcategory.findOne({ productId }),
                    Brand.findOne({ productId }),
                    Attribute.find({ productId }),
                    ProductVariant.find({ productId }),

                ]);

                return {
                    ...product.toObject(),
                    type,
                    category,
                    subcategory,
                    brand,
                    attributes,
                    variants,

                };
            })
        );

        return NextResponse.json(enrichedProducts);

    } catch (err) {
        console.error("Filter API Error:", err);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

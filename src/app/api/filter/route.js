
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

// export async function GET(request) {
//     await connectToDb();

//     const { searchParams } = new URL(request.url);

//     // Extract filter parameters from searchParams
//     const filters = {
//         productType: searchParams.get("productType"),
//         category: searchParams.get("category"),
//         subcategory: searchParams.get("subcategory"),
//         size: searchParams.get("size"),
//         color: searchParams.get("color"),
//         material: searchParams.get("material"),
//         priceMin: searchParams.get("priceMin"),
//         priceMax: searchParams.get("priceMax"),
//         brand: searchParams.get("brand"),
//     };

//     try {
//         // Step 1: Build ProductVariant filter (size, color, material, price range, etc.)
//         const variantFilter = {};

//         if (filters.size) variantFilter["attributes.value"] = { $in: filters.size.split(",") };
//         if (filters.color) variantFilter["attributes.value"] = { $in: filters.color.split(",") };
//         if (filters.material) variantFilter.material = filters.material;

//         if (filters.priceMin || filters.priceMax) {
//             variantFilter.price = {};
//             if (filters.priceMin) variantFilter.price.$gte = Number(filters.priceMin);
//             if (filters.priceMax) variantFilter.price.$lte = Number(filters.priceMax);
//         }

//         // Step 2: Find filtered product variants based on the constructed filter
//         const filteredVariants = await ProductVariant.find(variantFilter).select("_id productId");

//         // Extract product IDs from filtered variants
//         const filteredProductIds = filteredVariants.map(variant => variant.productId);

//         // Step 3: Build ProductInfo filter (for product type, category, subcategory, brand, etc.)
//         const infoFilter = {};

//         if (filters.productType) infoFilter.productType = filters.productType;
//         if (filters.category) infoFilter.category = filters.category;
//         if (filters.subcategory) infoFilter.subcategory = filters.subcategory;
//         if (filters.brand) infoFilter.brand = filters.brand;

//         if (filteredProductIds.length > 0) {
//             infoFilter._id = { $in: filteredProductIds };  // Only return products that match filtered variants
//         }

//         // Step 4: Find filtered ProductInfo based on the constructed filter
//         const productInfo = await ProductInfo.find(infoFilter);

//         // Step 5: Retrieve related data (e.g., categories, subcategories, brands, etc.)
//         const [productTypes, categories, subcategories, brands, attributes] = await Promise.all([
//             ProductType.find({}),
//             Category.find({}),
//             Subcategory.find({}),
//             Brand.find({}),
//             Attribute.find({})
//         ]);

//         // Step 6: Return response with filtered products and related data
//         const response = {
//             productInfo,
//             productTypes,
//             categories,
//             subcategories,
//             brands,
//             attributes,
//             productVariants: filteredVariants, // Only return the filtered variants
//         };

//         return NextResponse.json(response);

//     } catch (err) {
//         console.error("Error:", err.message);
//         return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//     }
// }


// export async function GET(request) {
//     await connectToDb()
//     const { searchParams } = new URL(request.url);

//     const filters = {
//         productType: searchParams.get("productType"),
//         category: searchParams.get("category"),
//         subcategory: searchParams.get("subcategory"),
//         size: searchParams.get("size"),
//         color: searchParams.get("color"),
//         material: searchParams.get("material"),
//         priceMin: searchParams.get("priceMin"),
//         priceMax: searchParams.get("priceMax"),
//         brand: searchParams.get("brand"),
//     };

//     const productIdsRaw = searchParams.get("productIds");
//     const allowedProductIds = productIdsRaw ? productIdsRaw.split(",") : null;

//     try {
//         const variantFilter = {};

//         if (allowedProductIds) {
//             variantFilter.productId = { $in: allowedProductIds };
//         }

//         if (filters.size) variantFilter["attributes.value"] = { $in: filters.size.split(",") };
//         if (filters.color) variantFilter["attributes.value"] = { $in: filters.color.split(",") };
//         if (filters.material) variantFilter.material = filters.material;

//         if (filters.priceMin || filters.priceMax) {
//             variantFilter.price = {};
//             if (filters.priceMin) variantFilter.price.$gte = Number(filters.priceMin);
//             if (filters.priceMax) variantFilter.price.$lte = Number(filters.priceMax);
//         }

//         const filteredVariants = await ProductVariant.find(variantFilter).select("_id productId");

//         const filteredProductIds = filteredVariants.map(variant => variant.productId.toString());

//         const infoFilter = {};
//         if (filters.productType) infoFilter.productType = filters.productType;
//         if (filters.category) infoFilter.category = filters.category;
//         if (filters.subcategory) infoFilter.subcategory = filters.subcategory;
//         if (filters.brand) infoFilter.brand = filters.brand;

//         if (allowedProductIds) {
//             infoFilter._id = { $in: filteredProductIds.length > 0 ? filteredProductIds : allowedProductIds };
//         }

//         const productInfo = await ProductInfo.find(infoFilter);

//         const [productTypes, categories, subcategories, brands, attributes] = await Promise.all([
//             ProductType.find({}),
//             Category.find({}),
//             Subcategory.find({}),
//             Brand.find({}),
//             Attribute.find({})
//         ]);

//         return NextResponse.json({
//             productInfo,
//             productTypes,
//             categories,
//             subcategories,
//             brands,
//             attributes,
//             productVariants: filteredVariants,
//         });

//     } catch (err) {
//         console.error("Filter API Error:", err);
//         return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//     }
// }


//  request url:->
// /api/products/filter?productType=men&category=tshirt&subcategory=casual&size=M,L&color=red,blue&material=cotton&priceMin=500&priceMax=1000&brand=nike


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

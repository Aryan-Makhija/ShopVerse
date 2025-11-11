import { connectToDb } from "@/db/db";
import Attribute from "@/models/(ProductListing)/Attribute";
import AttributeValue from "@/models/(ProductListing)/AttributeValue";
import Brand from "@/models/(ProductListing)/Brand";
import Category from "@/models/(ProductListing)/Category";
import MaterialCare from "@/models/(ProductListing)/MaterialCare";
import ProductImage from "@/models/(ProductListing)/ProductImage";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ProductType from "@/models/(ProductListing)/ProductType";
import ProductVariant from "@/models/(ProductListing)/ProductVariant";
import ReturnPolicy from "@/models/(ProductListing)/ReturnPolicy";
import Subcategory from "@/models/(ProductListing)/Subcategory";
import { NextResponse } from "next/server";


export async function GET(_, { params }) {
    await connectToDb()

    try {
        const { id } = await params;
        const product = await ProductInfo.findOne({ productCode: id });
        // console.log("product", product)
        if (!product) {
            return NextResponse.json({ message: "Product Not Found" }, { status: 400 });
        }

        const productid = product._id;

        const [
            producttype,
            category,
            subcategory,
            brand,
            attribute,
           
            productvariant,
            materialcare,
            returnpolicy,
            
        ] = await Promise.all([
            ProductType.findOne({ productId: productid }), // 🟢 findOne()
            Category.findOne({ productId: productid }),
            Subcategory.findOne({ productId: productid }),
            Brand.findOne({ productId: productid }),
            Attribute.find({ productId: productid }),      // still plural
        
            ProductVariant.find({ productId: productid }),
            MaterialCare.findOne({ productId: productid }),
            ReturnPolicy.findOne({ productId: productid }),

        ]);

        const productDetails = {
            _id: productid,
            info: product,
            type: producttype,
            category,
            subcategory,
            brand,
            attribute,
            variants: productvariant,
            materialCare: materialcare,
            returnPolicy: returnpolicy,
       
        };

        return NextResponse.json([productDetails]); // ✅ return as array
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
    }

}
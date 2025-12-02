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
import AdminSessionModel from "@/models/adminSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {

    await connectToDb()


    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("admintoken")?.value
        const admin = await AdminSessionModel.findOne({ token })

        const adminId = admin.adminId

        // Step 1: Get all the productInfo for this admin
        const productInfos = await ProductInfo.find({ adminId })

        // Step 2: For each product, fetch its related models
        const fullProducts = await Promise.all(productInfos.map(async (product) => {
            const productId = product._id

            const [
                type,
                category,
                subcategory,
                brand,
                attributes,
                attributeValues,
                variants,
                materialCare,
                returnPolicy,
            
            ] = await Promise.all([
                ProductType.findOne({ productId }),
                Category.findOne({ productId }),
                Subcategory.findOne({ productId }),
                Brand.findOne({ productId }),
                Attribute.find({ productId }),
                AttributeValue.find({ productId }),
                ProductVariant.find({ productId }),
                MaterialCare.findOne({ productId }),
                ReturnPolicy.findOne({ productId }),
                ProductImage.find({ productId }),
            ])

            return {
                ...product.toObject(),
                type,
                category,
                subcategory,
                brand,
                attributes,
                attributeValues,
                variants,
                materialCare,
                returnPolicy,
               
            }
        }))

        return NextResponse.json(fullProducts)

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }

}


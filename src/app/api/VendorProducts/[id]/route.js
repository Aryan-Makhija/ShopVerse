import { connectToDb } from "@/db/db"
import Attribute from "@/models/(ProductListing)/Attribute"
import AttributeValue from "@/models/(ProductListing)/AttributeValue"
import Brand from "@/models/(ProductListing)/Brand"
import Category from "@/models/(ProductListing)/Category"
import MaterialCare from "@/models/(ProductListing)/MaterialCare"
import ProductImage from "@/models/(ProductListing)/ProductImage"
import ProductType from "@/models/(ProductListing)/ProductType"
import ProductVariant from "@/models/(ProductListing)/ProductVariant"
import ReturnPolicy from "@/models/(ProductListing)/ReturnPolicy"
import Subcategory from "@/models/(ProductListing)/Subcategory"
import AdminSessionModel from "@/models/adminSessionModel"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET(_, { params }) {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await AdminSessionModel.findOne({ token: token })
        const adminId = admin.adminId


        const { id } = await params


        const [producttype, category, subcategory, brand, attribute, attributevalue, productvariant, materialcare, returnpolicy, productimage] = await Promise.all([
            ProductType.find({ adminId, productId: id }),
            Category.find({ adminId, productId: id }),
            Subcategory.find({ adminId, productId: id }),
            Brand.find({ adminId, productId: id }),
            Attribute.find({ adminId, productId: id }),
            AttributeValue.find({ adminId, productId: id }),
            ProductVariant.find({ adminId, productId: id }),
            MaterialCare.find({ adminId, productId: id }),
            ReturnPolicy.find({ adminId, productId: id }),
            ProductImage.find({ adminId, productId: id }),
        ]);

        const productDetails = {
            producttype,
            category,
            subcategory,
            brand,
            attribute,
            attributevalue,
            productvariant,
            materialcare,
            returnpolicy,
            productimage
        };

        return NextResponse.json(productDetails)

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}



export async function DELETE(_, params) {
await connectToDb()

   try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await AdminSessionModel.findOne({ token: token })
        const adminId = admin.adminId


        const { id } = await params


        const [producttype, category, subcategory, brand, attribute, attributevalue, productvariant, materialcare, returnpolicy, productimage] = await Promise.all([
            ProductType.findByIdAndDelete({ adminId, productId: id }),
            Category.find({ adminId, productId: id }),
            Subcategory.find({ adminId, productId: id }),
            Brand.find({ adminId, productId: id }),
            Attribute.find({ adminId, productId: id }),
            AttributeValue.find({ adminId, productId: id }),
            ProductVariant.find({ adminId, productId: id }),
            MaterialCare.find({ adminId, productId: id }),
            ReturnPolicy.find({ adminId, productId: id }),
            ProductImage.find({ adminId, productId: id }),
        ]);

        const productDetails = {
            producttype,
            category,
            subcategory,
            brand,
            attribute,
            attributevalue,
            productvariant,
            materialcare,
            returnpolicy,
            productimage
        };

        return NextResponse.json(productDetails)

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
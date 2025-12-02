import { connectToDb } from "@/db/db";
import Attribute from "@/models/(ProductListing)/Attribute";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ProductVariant from "@/models/(ProductListing)/ProductVariant";
import AdminSessionModel from "@/models/adminSessionModel";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectToDb();
    try {

        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await AdminSessionModel.findOne({ token })
        const adminId = admin.adminId

        const productid = await ProductInfo.findOne({ adminId }).sort({ createdAt: -1 })
        const productId = productid._id


        const attributid = await Attribute.findOne({ adminId, productId: productid._id }).sort({ createdAt: -1 })

        const attribute = attributid._id

        const { price, discountPrice, isAvailable, currency, image, quantity } = await request.json()


        await ProductVariant.create({ price, discountPrice, attribute, isAvailable, currency, image, quantity, adminId, productId })

        return NextResponse.json({ message: "Product Variant Added Successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }

}





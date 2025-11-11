import { connectToDb } from "@/db/db";
import ProductImage from "@/models/(ProductListing)/ProductImage";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import AdminSessionModel from "@/models/adminSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await AdminSessionModel.findOne({ token })
        const adminId = admin.adminId

        const { id } = await params
        const product = await ProductInfo.findOne({ productCode: id })

        const productImage = await ProductImage.findOne({ adminId, productId: product._id })

        return NextResponse.json(productImage)

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }


}
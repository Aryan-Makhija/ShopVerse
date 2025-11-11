import { connectToDb } from "@/db/db";
import ProductImage from "@/models/(ProductListing)/ProductImage";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import adminSessionModel from "@/models/adminSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectToDb()
    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await adminSessionModel.findOne({ token })
        const adminId = admin.adminId

        const productid = await ProductInfo.findOne({ adminId }).sort({ createdAt: -1 })
        const productId = productid._id

        const { image, color, size } = await request.json()

        await ProductImage.create({ image, color, size, adminId, productId })
        return NextResponse.json({ message: "Product Image Added successfully" }, { status: 200 })

        
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }

}
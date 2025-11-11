import { connectToDb } from "@/db/db";
import ProductType from "@/models/(ProductListing)/ProductType";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import AdminSessionModel from "@/models/adminSessionModel";

export async function POST(request) {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await AdminSessionModel.findOne({ token: token })
        const adminId = admin.adminId

        const { name, description } = await request.json()

        const productid = await ProductInfo.findOne({ adminId }).sort({ createdAt: -1 })

        const productId = productid._id

        await ProductType.create({ name, description, productId, adminId })

        return NextResponse.json({ message: "Product type added sucessfully " }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }


}









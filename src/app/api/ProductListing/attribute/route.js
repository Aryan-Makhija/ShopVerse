import { connectToDb } from "@/db/db";
import adminSessionModel from "@/models/adminSessionModel";
import Attribute from "@/models/(ProductListing)/Attribute";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";

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


        const { size, color } = await request.json()

        await Attribute.create({ size, color, adminId, productId })
        return NextResponse.json({ message: "attribute added successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong " }, { status: 400 })
    }
}




import { connectToDb } from "@/db/db";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ReturnPolicy from "@/models/(ProductListing)/ReturnPolicy";
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

        const { returnabel, exchangeabel, exchangewithin } = await request.json()

        await ReturnPolicy.create({ returnabel, exchangeabel, exchangewithin, adminId, productId })

        return NextResponse.json({ message: "Return Policy Added Successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }
}
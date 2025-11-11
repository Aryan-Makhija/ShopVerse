import { connectToDb } from "@/db/db";
import MaterialCare from "@/models/(ProductListing)/MaterialCare";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
// import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import AdminSessionModel from "@/models/adminSessionModel";

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

        const admin = await AdminSessionModel.findOne({ token: token })
        const adminId = admin.adminId

        const productid = await ProductInfo.findOne({ adminId }).sort({ createdAt: -1 })
        const productId = productid._id


        const { material, instructions } = await request.json()

        await MaterialCare.create({ material,instructions,  adminId, productId })
        return NextResponse.json({ message: "material added successfully" }, { status: 200 })


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }


}
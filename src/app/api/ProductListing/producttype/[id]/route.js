import { connectToDb } from "@/db/db";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ProductType from "@/models/(ProductListing)/ProductType";
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


        const { id } = await params;
  
        const product = await ProductInfo.findOne({ productCode:id })
 
        const producttype = await ProductType.findOne({ adminId, productId: product._id }).select("-createdAt -updatedAt -__v")

        if (!producttype) {
            return NextResponse.json({ message: "product-Type not found" }, { status: 400 })
        }

        return NextResponse.json(producttype, { message: "ProductType found" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }

}
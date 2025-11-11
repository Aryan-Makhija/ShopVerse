import { connectToDb } from "@/db/db";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import Subcategory from "@/models/(ProductListing)/Subcategory";
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

        const subcategory = await Subcategory.findOne({ adminId, productId: product._id }).select("-createdAt -updatedAt -__v")


         return NextResponse.json(subcategory)
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }
 }
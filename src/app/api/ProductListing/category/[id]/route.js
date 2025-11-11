import { connectToDb } from "@/db/db";
import Category from "@/models/(ProductListing)/Category";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import AdminSessionModel from "@/models/adminSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { getIds } from "@/middleware/authMiddleware";



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

        // const { adminId, error } = await getIds()

        // if (error) {
        //     return NextResponse.json({ message: error })
        // }

        const { id } = await params;
        const product = await ProductInfo.findOne({ productCode: id })

        const category = await Category.findOne({ adminId, productId: product._id }).select("-createdAt -updatedAt -__v")
        return NextResponse.json(category, { message: "category fetched successfully" }, { status: 200 })


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }
}


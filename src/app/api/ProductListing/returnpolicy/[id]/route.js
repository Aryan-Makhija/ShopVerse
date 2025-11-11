import { connectToDb } from "@/db/db";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ReturnPolicy from "@/models/(ProductListing)/ReturnPolicy";
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

        const returnPolicy = await ReturnPolicy.findOne({ adminId, productId: product._id })


        return NextResponse.json(returnPolicy)
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }
}

export async function PUT(request, { params }) {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const { id } = await params
        const update = await request.json()

        const newreturnPolicy = await ReturnPolicy.findByIdAndUpdate({ _id: id }, update, { new: true })

        return NextResponse.json(newreturnPolicy, { message: "Return Policy Updated successfully" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }
}
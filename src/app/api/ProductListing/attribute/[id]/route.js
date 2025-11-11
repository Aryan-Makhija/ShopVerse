import { connectToDb } from "@/db/db";
import Attribute from "@/models/(ProductListing)/Attribute";
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
        const product = await ProductInfo.findOne({ adminId, productCode: id })

        const attribute = await Attribute.findOne({ adminId, productId: product._id })

        return NextResponse.json(attribute)

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

        const update = await request.json()

        const { id } = await params
        const newattribute = await Attribute.findByIdAndUpdate({ _id: id }, update, {
            new: true
        })

        return NextResponse.json(newattribute, { message: "Attribute updated successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }
}
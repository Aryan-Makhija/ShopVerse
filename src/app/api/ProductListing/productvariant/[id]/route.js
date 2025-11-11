import { connectToDb } from "@/db/db";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ProductVariant from "@/models/(ProductListing)/ProductVariant";
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


        const productvariant = await ProductVariant.findOne({ adminId, productId: product._id })


        return NextResponse.json(productvariant)
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

        const newporductvariant = await ProductVariant.findByIdAndUpdate({ _id: id }, update, { new: true })

        return NextResponse.json(newporductvariant, { message: "Variant Updated SuccessFully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }
}

export async function DELETE(_, { params }) {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }


        const { id } = await params
        await ProductVariant.findByIdAndDelete({ _id: id })

        return NextResponse.json({ message: "Product Variant Deleted Successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }
}
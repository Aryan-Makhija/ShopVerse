import { connectToDb } from "@/db/db";
import AttributeValue from "@/models/(ProductListing)/AttributeValue";
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

        const attributevalue = await AttributeValue.findOne({ adminId, productId: product._id })

        return NextResponse.json(attributevalue)


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

        const updatedvalue = await request.json()

        const newvalue = await AttributeValue.findByIdAndUpdate({ _id: id }, updatedvalue, {
            new: true
        })

        return NextResponse.json(newvalue)

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
        await AttributeValue.findByIdAndDelete({ _id: id })
        return NextResponse.json({ message: " Attribute Deleted Successfully" }, { status: 200 })


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "something Went Wrong" }, { status: 400 })
    }
}

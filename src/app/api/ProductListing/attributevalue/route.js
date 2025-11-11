import { connectToDb } from "@/db/db";

import AttributeValue from "@/models/(ProductListing)/AttributeValue";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import Attribute from "@/models/(ProductListing)/Attribute";
import AdminSessionModel from "@/models/adminSessionModel";

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

        const attribute = await Attribute.findOne({ productId })
        const attributeId = attribute._id

        const { sizevalue,colorvalue } = await request.json()

        await AttributeValue.create({ sizevalue ,colorvalue, adminId, productId, attributeId })

        return NextResponse.json({ message: "attributevalue  added successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong " }, { status: 400 })
    }
}
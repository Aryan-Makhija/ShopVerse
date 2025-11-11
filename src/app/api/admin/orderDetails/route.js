
import { connectToDb } from "@/db/db";
import AdminSessionModel from "@/models/adminSessionModel";
import OrderModel from "@/models/OrderModel";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const getadmin = await AdminSessionModel.findOne({ token })
        if (!getadmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }


        const orderdetails = await OrderModel.findOne({ adminId: getadmin.adminId })


        if (!orderdetails) {
            return NextResponse.json({ message: "Order Details not found" }, { status: 400 })
        }
        return NextResponse.json(orderdetails)


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })

    }
}


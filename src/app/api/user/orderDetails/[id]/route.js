
import { connectToDb } from "@/db/db";
import OrderModel from "@/models/OrderModel";
import userSessionModel from "@/models/userSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("token")?.value

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const getuser = await userSessionModel.findOne({ token })
        if (!getuser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const { id } = await params

        const { status } = await request.json()

        const orderdetails = await OrderModel.findByIdAndUpdate({ _id: id }, { order_details: { order_status: status } }, {
            new: true
        })

        if (!orderdetails) {
            return NextResponse.json({ message: "Order Details not found" }, { status: 400 })
        }
        return NextResponse.json(orderdetails)


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })

    }
}


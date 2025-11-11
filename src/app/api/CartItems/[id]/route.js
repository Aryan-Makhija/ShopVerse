import { connectToDb } from "@/db/db";
import CartItems from "@/models/CartItems";
import userSessionModel from "@/models/userSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {

    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const { id } = await params

        console.log(id)
        await CartItems.findByIdAndDelete(id)

        return NextResponse.json({ message: "CartItem deleted success" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ messsage: "Something Went Wrong" }, { status: 401 })
    }


}
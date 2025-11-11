import { connectToDb } from "@/db/db";
import adminModel from "@/models/admin";
import AdminSessionModel from "@/models/adminSessionModel";
// import adminSessionModel from "@/models/adminSessionModel";


import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET(request) {
    await connectToDb()


    try {

        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value

        if (!token) {
            return NextResponse.json({ message: "Unautherized " }, { status: 400 })
        }
        const adminsession = await AdminSessionModel.findOne({ token })

        if (!adminsession) {
            return NextResponse.json({ message: "admin not found" }, { status: 400 })
        }

        const adminid = adminsession.adminId

        const admin = await adminModel.findOne({ _id: adminid }).select("-password  -__v ")


        if (!admin) {
            return NextResponse.json({ message: "admin not found" }, { status: 400 })
        }

        return NextResponse.json(admin, { message: "admin fetched successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
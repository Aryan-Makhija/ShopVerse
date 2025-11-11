import { connectToDb } from "@/db/db";
import adminModel from "@/models/admin";
import userModel from "@/models/user";
import { NextResponse } from "next/server";



export async function POST(request) {
    await connectToDb()
    try {
        const { email, newpassword } = await request.json()

        const admin = await adminModel.findOne({ email })

        if (!admin) {
            return NextResponse.json({ message: "User not found" }, { status: 400 })
        }

        const hashPassword = await adminModel.hashPassword(newpassword)
        admin.password = hashPassword,
            admin.resetPasswordToken = undefined
        admin.resetPasswordExpires = undefined
        await admin.save()
        return NextResponse.json({ message: "Password Reset Successfully" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }
}
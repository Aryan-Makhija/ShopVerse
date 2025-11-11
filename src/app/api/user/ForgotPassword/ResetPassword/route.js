import { connectToDb } from "@/db/db";
import userModel from "@/models/user";
import { NextResponse } from "next/server";



export async function POST(request) {
    await connectToDb()
    try {
        const { email, newpassword } = await request.json()

        const user = await userModel.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 })
        }

        const hashPassword = await userModel.hashPassword(newpassword)
        user.password = hashPassword,
            user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()
        return NextResponse.json({ message: "Password Reset Successfully" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }
}
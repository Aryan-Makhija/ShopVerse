import { connectToDb } from "@/db/db";
import adminModel from "@/models/admin";
import userModel from "@/models/user";

import { NextResponse } from "next/server";


export async function POST(request) {
    await connectToDb()

    try {
        const details = await request.json()
        const { email, otp } = details
        const admin = await adminModel.findOne({
            email: email,
            resetPasswordToken: otp.toString(),
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!admin) {
            return NextResponse.json({ message: "Invalid Otp " }, { status: 401 })
        }

        return NextResponse.json({ message: "OTP verified Successfully" })


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
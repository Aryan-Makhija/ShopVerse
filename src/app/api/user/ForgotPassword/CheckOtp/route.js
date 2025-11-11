import { connectToDb } from "@/db/db";
import userModel from "@/models/user";

import { NextResponse } from "next/server";


export async function POST(request) {
    await connectToDb()

    try {
        const details = await request.json()

        console.log(details)
        const { email, otp } = details
        const user = await userModel.findOne({
            email: email,
            resetPasswordToken: otp.toString(),
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ message: "Invalid Otp " }, { status: 401 })
        }

        return NextResponse.json({ message: "OTP verified Successfully" })


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
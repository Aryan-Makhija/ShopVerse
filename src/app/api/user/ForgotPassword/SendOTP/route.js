import { connectToDb } from "@/db/db";
import userModel from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto"
import { SendOTP } from "@/app/Mails/ForgotPassMail";


export async function POST(request) {
    await connectToDb()

    try {
        const { email } = await request.json()

        const user = await userModel.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "User Not Found" })
        }

        const buffer = crypto.randomBytes(4)
        const token = buffer.readUInt32BE(0) % 900000 + 100000
        user.resetPasswordToken = token.toString()
        user.resetPasswordExpires = Date.now() + 2 * 60 * 1000;
        await user.save()
        const emailHTML = `
          <h2>Forgot Password OTP</h2>

          <p>Dear User,</p>

          <p>You recently requested to reset your password. Please use the One-Time Password (OTP) below to proceed:</p>

          <p>OTP: <strong>${token}</strong></p>

          <p>This OTP is valid for 2 minutes. If you did not request a password reset, you can safely ignore this email.</p>

          <p>Best regards,<br>Buynest Team</p>
`;

        try {
            await SendOTP(email, 'Password Reset', emailHTML);
        } catch (emailError) {
            console.error("Failed reset password email:", emailError.message);
        }
        return NextResponse.json({ message: "OTP send to your email" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" })
    }
} 
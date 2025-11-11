import { connectToDb } from "@/db/db";
import { loginSchema } from "@/lib/validation/auth";
import userModel from "@/models/user";
import userSessionModel from "@/models/userSessionModel";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import z from "zod";

const JWT_SECRET = process.env.JWT_SECRET


export async function POST(request) {
    await connectToDb()

    try {
        const userdata = await request.json()

        const parsedata = loginSchema.safeParse(userdata)
        const { success, data, error } = parsedata
        if (!success) {
            return NextResponse.json({ errors: z.flattenError(error).fieldErrors }, { status: 401 })
        }



        const { email, password } = parsedata.data

        const user = await userModel.findOne({ email })

        const comparepassword = await bcrypt.compare(password, user.password)
        if (!user || !comparepassword) {
            return Response.json({ message: "Invalid Credentials" }, { status: 400 })
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" })

        await userSessionModel.create({
            userId: user._id,
            token
        })

        const res = NextResponse.json({ message: "Logged In" }, { status: 200 })

        res.cookies.set("token", token), {
            httpOnly: true,
            maxAge: 60 * 60 * 24, //24h
            path: "/"

        }

        return res;

    } catch (err) {
        { console.log(err.message) }
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }


}
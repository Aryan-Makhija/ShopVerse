const { connectToDb } = require("@/db/db");
import { loginSchema } from "@/lib/validation/auth";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import adminModel from "@/models/admin";
import adminSessionModel from "@/models/adminSessionModel";
const JWT_SECRET = process.env.JWT_SECRET

import z from "zod";

export async function POST(request) {
    await connectToDb()

    try {
        const admindata = await request.json()

        const parsedata = loginSchema.safeParse(admindata)
        const { success, data, error } = parsedata
        if (!success) {
            return NextResponse.json({ errors: z.flattenError(error).fieldErrors }, { status: 401 })
        }


        const { email, password } = parsedata.data

        const admin = await adminModel.findOne({ email })

        const comparepassword = await bcrypt.compare(password, admin.password)

        if (!admin || !comparepassword) {
            return NextResponse.json({ message: "Invalid  credentials" }, { status: 400 })
        }


        const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: "24h" })
        await adminSessionModel.create({
            adminId: admin._id,
            token
        })


        const res = NextResponse.json({ message: "Logged In" }, { status: 200 })


        res.cookies.set("admintoken", token), {
            httpOnly: true,
            maxAge: 60 * 60 * 24, //24h
            path: "/admin"
        }
        return res

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })

    }
}


import { connectToDb } from "@/db/db";
import { registerSchema } from "@/lib/validation/auth";
import adminModel from "@/models/admin";
import { NextResponse } from "next/server";
import z from "zod";


export async function POST(request) {
    await connectToDb()

    try {

        const admindata = await request.json()

        const parsedata = registerSchema.safeParse(admindata)


        const { success, data, error } = parsedata
        if (!success) {
            return NextResponse.json({ errors: z.flattenError(error).fieldErrors }, { status: 401 })
        }

        // if (!parsedata.success) {
        //     return NextResponse.json({ message: " Invalid  Credential" }, { status: 400 }, parsedata.error)
        // }

        const { name, email, password } = parsedata.data


        const admin = await adminModel.findOne({ email })

        if (admin) {
            return NextResponse.json({ message: " admin Already exists" }, { status: 400 })
        }
        const hashedPassword = await adminModel.hashPassword(password)

        const newadmin = new adminModel({
            name,
            email,
            password: hashedPassword
        });


        await newadmin.save()

        return NextResponse.json({ message: "Admin Registered  Successfully " }, { status: 200 }, parsedata.error)

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
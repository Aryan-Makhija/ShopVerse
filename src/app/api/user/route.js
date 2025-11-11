import { connectToDb } from "@/db/db"
import { registerSchema } from "@/lib/validation/auth"
import userModel from "@/models/user"
import { NextResponse } from "next/server"
import z from "zod"

export async function POST(request) {
    await connectToDb()

    try {

        const userdata = await request.json()
        const parsedata = registerSchema.safeParse(userdata)
        const { success, data, error } = parsedata
        if (!success) {
            return NextResponse.json({ errors: z.flattenError(error).fieldErrors }, { status: 401 })
        }


        const { name, email, password } = parsedata.data
        // { console.log(parsedata.data) }
        const user = await userModel.findOne({ email })
        if (user) {
            return Response.json({
                message: "User already Exists"
            }, {
                status: 400
            })
        }

        const hashedPassword = await userModel.hashPassword(password)
        const newuser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        await newuser.save()

        return NextResponse.json(newuser, { message: "User Registered Successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }


}
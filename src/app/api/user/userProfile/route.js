import { connectToDb } from "@/db/db"

import userModel from "@/models/user"
import userSessionModel from "@/models/userSessionModel"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET() {
    await connectToDb()


    try {

        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        if (!token) {
            return NextResponse.json({ message: "Unautherized " }, { status: 400 })
        }
        const usersession = await userSessionModel.findOne({ token })

        if (!usersession) {
            return NextResponse.json({ message: "user not found" }, { status: 400 })
        }

        const userid = usersession.userId

        const user = await userModel.findOne({ _id: userid }).select("-password  -__v ")


        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 400 })
        }

        return NextResponse.json(user, { message: "user fetched successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
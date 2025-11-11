import { connectToDb } from "@/db/db"
import { updateSchema } from "@/lib/validation/auth"
import adminModel from "@/models/admin"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
    await connectToDb()
    try {

        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const update = await request.json()
        const { id } = await params
        const parsedata = await updateSchema.safeParse(update)
        if (!parsedata.success) {
            return NextResponse.json({ message: "Invalid credentils" }, { status: 400 })
        }

        const newprofile = parsedata.data

        const adminupdate = await adminModel.findOneAndUpdate({ _id: id }, newprofile, {
            new: true
        }).select("-password -__v")
        return NextResponse.json(
            { message: "Profile updated Successfully", data: adminupdate },
            { status: 200 }
        )

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }

}


export async function DELETE(_, { params }) {
    await connectToDb()
    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("token")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const { id } = await params

        await adminModel.findOneAndDelete({ _id: id })
        return NextResponse.json({ message: "profile deleted Successfully" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
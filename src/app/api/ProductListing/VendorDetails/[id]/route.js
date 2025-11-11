import { connectToDb } from "@/db/db";
import { vendordetails } from "@/lib/validation/auth";
import VendorModel from "@/models/VendorModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import z from "zod";




export async function PUT(request, { params }) {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const { id } = await params
        const update = await request.json()
        const parsedata = vendordetails.safeParse(update)

        // if (!parsedata.success) {
        //     return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 })
        // }


        const { success, data, error } = parsedata
        if (!success) {
            return NextResponse.json({ errors: z.flattenError(error).fieldErrors })
        }

        const newupdate = await VendorModel.findByIdAndUpdate({ _id: id }, update, { new: true })

        return NextResponse.json(newupdate, { message: "Vendor Details updated Sucessfully" }, { status: 200 })


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }
}
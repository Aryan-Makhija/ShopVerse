import { connectToDb } from "@/db/db"
import { vendordetails } from "@/lib/validation/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import VendorModel from "@/models/VendorModel"

import z from "zod"
import AdminSessionModel from "@/models/adminSessionModel"

export async function POST(request) {
    await connectToDb()
    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await AdminSessionModel.findOne({ token: token })
        const adminId = admin.adminId

        const body = await request.json()

        const parsedata = vendordetails.safeParse(body)


        const { success, data, error } = parsedata
        if (!success) {
            return NextResponse.json({ errors: z.flattenError(error).fieldErrors })
        }

        // if (!parsedata.success) {
        //     return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 })
        // }
        const { name, businessName, contactEmail, contactPhone, address } = parsedata.data

        const vendor = await VendorModel.findOne({ adminId })

        if (vendor) {
            return NextResponse.json({ message: "Vendor Already Exisit" }, { status: 400 })
        }

        const newvendor = await VendorModel.create({ name, businessName, contactEmail, contactPhone, address, adminId })

        return NextResponse.json(newvendor, { message: "Vendor Registered Successfully" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }
}


export async function GET() {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await AdminSessionModel.findOne({ token: token })
        const adminId = admin.adminId

        const vendordetails = await VendorModel.findOne({ adminId })

        if (!vendordetails) {
            return NextResponse.json({ message: "Vendore Details Not Found" }, { status: 400 })
        }

        return NextResponse.json([vendordetails])

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }
}
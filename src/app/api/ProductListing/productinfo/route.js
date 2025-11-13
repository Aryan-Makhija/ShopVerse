import { connectToDb } from "@/db/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken"
import { productInfoSchema } from "@/lib/validation/auth";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
const secret = process.env.JWT_SECRET
import z from "zod";
export async function POST(request) {

    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const decoded = jwt.verify(token, secret)


        const adminId = decoded.adminId

        const body = await request.json()
        const parsedata = productInfoSchema.safeParse(body)

        const { success, data, error } = parsedata
        if (!success) {
            return NextResponse.json({ errors: z.flattenError(error).fieldErrors })
        }
        // if (!parsedata.success) {
        //     return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 })
        // }

        const { producttype, category, subcategory, brand, description, productname } = parsedata.data


        const newproduct = await ProductInfo.create({ producttype, category, subcategory, brand, description, productname, adminId })
        return NextResponse.json(newproduct, { message: "new Product added successfully" }, { status: 200 })


    } catch (err) {
        return NextResponse.json({ message: err.message })

    }
}
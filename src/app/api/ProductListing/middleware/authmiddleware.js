import { connectToDb } from "@/db/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
const secret = process.env.JWT_SECRET


export async function getIds() {
    await connectToDb()
    try {

        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const decoded = jwt.verify(token, secret)
        const adminId = decoded.adminId
        return { adminId }

    } catch (err) {
         return { error: err.message };
    }
}
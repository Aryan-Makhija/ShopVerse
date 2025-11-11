import { connectToDb } from "@/db/db";
import adminSessionModel from "@/models/adminSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    await connectToDb()

    const cookieStore = await cookies()
    const admintoken = await cookieStore.get("admintoken")?.value
    if (!admintoken) {
        return NextResponse.json({ message: "Unathorized" }, { status: 400 })
    }

    await adminSessionModel.deleteOne({ token: admintoken })
    await cookieStore.delete("admintoken")
    return NextResponse.json({ message: "Logged Out Successfully " }, { status: 200 })
}
import { connectToDb } from "@/db/db";
import userSessionModel from "@/models/userSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    await connectToDb()

    const cookieStore = await cookies()
    const token = await cookieStore.get("token")?.value
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }
    await userSessionModel.deleteOne({ token })
    await cookieStore.delete("token")
    return NextResponse.json({ message: "Logged Out Successfully " }, { status: 200 })
}

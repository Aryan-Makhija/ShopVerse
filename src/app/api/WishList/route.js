import { connectToDb } from "@/db/db";
import userSessionModel from "@/models/userSessionModel";
import Wishlist from "@/models/Wishlist";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";




export async function POST(request) {
    await connectToDb()

    try {

        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = await userSessionModel.findOne({ token: token })


        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }



        const data = await request.json()


        if (!data) {
            return NextResponse.json("Data Required").status(401)
        }


        const cart = {
            user: user.userId,
            productCode: data.productCode,
            size: data.size,
            color: data.color,
            quantity: data.quantity,
            price: data.price,
            image: data.image,
            category: data.category,
            // subcategory: data.subcategory,
            description: data.description
        }

        const wishlist = await Wishlist.create(cart)
        return NextResponse.json(wishlist, { message: " Produuct Added  to WishList" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 })
    }
}

export async function GET() {

    await connectToDb()
    try {

        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = await userSessionModel.findOne({ token: token })


        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }


        const userId = user.userId

        const wishlist = await Wishlist.find({ user: userId })


        if (!wishlist) {
            return NextResponse.json({ message: "cartItem not found" }, { status: 401 })
        }


        return NextResponse.json([wishlist], { message: "cartItem fetched Successfully" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went Wrong" }, { status: 400 })
    }
}
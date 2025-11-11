import { connectToDb } from "@/db/db";
import AdminSessionModel from "@/models/adminSessionModel";
import CartItems from "@/models/CartItems";
import userSessionModel from "@/models/userSessionModel";
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

        const cartItems = await CartItems.create(cart)
        return NextResponse.json(cartItems, { message: "CartItem Added " }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "SomethingWent Wrong" }, { status: 400 })
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

        const cartItem = await CartItems.find({ user: userId })


        if (!cartItem) {
            return NextResponse.json({ message: "cartItem not found" }, { status: 401 })
        }


        return NextResponse.json(cartItem, { message: "cartItem fetched Successfully" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went Wrong" }, { status: 400 })
    }

}



export async function DELETE() {
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

        await CartItems.deleteMany({ user: userId })

        return NextResponse.json({ message: "CartItem deleted Successfully" }, { status: 200 })


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went Wrong" }, { status: 400 })
    }

}



export async function PUT(request) {
    await connectToDb()
    try {
        const data = await request.json()
        const { id, quantity } = data

        const updatedCartItem = await CartItems.findByIdAndUpdate(
            id,
            { quantity },
            { new: true } // return the updated document
        );


        return NextResponse.json(updatedCartItem, { message: "CartItems Updated Successfully" }, { status: 200 })
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went Wrong" }, { status: 400 })
    }
}
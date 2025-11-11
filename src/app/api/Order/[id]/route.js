import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import userSessionModel from "@/models/userSessionModel";
import OrderModel from "@/models/OrderModel";
import { connectToDb } from "@/db/db";


export async function PUT(_,{params}) {
  await connectToDb();

  try {
    const cookieStore = await  cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token" }, { status: 401 });
    }

    const userdetails = await userSessionModel.findOne({ token });
    if (!userdetails) {
      return NextResponse.json({ message: "Unauthorized: Invalid session" }, { status: 401 });
    }

    const { id } = await params

    if (!id) {
      return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    // Find order by ID and ensure it belongs to the user
    const order = await OrderModel.findOne({ _id: id, "user.userId": userdetails.userId });

    if (!order) {
      return NextResponse.json({ message: "Order not found or not owned by user" }, { status: 404 });
    }

    const currentStatus = order.order_details.order_status;

    if (["Shipped", "Delivered", "Cancel"].includes(currentStatus)) {
      return NextResponse.json({
        message: `Cannot cancel order. Current status: ${currentStatus}`
      }, { status: 400 });
    }

    // Update order status to "Cancel"
    order.order_details.order_status = "Cancel";
    await order.save();

    return NextResponse.json({ message: "Order canceled successfully", order }, { status: 200 });

  } catch (err) {
    console.error("Cancel Order Error:", err.message);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { connectToDb } from "@/db/db";
// import AdminSessionModel from "@/models/adminSessionModel";
// import OrderModel from "@/models/OrderModel";


// const ALLOWED_STATUSES = ["Confirmed", "Shipped", "Delivered"];

// export async function PUT(request, { params }) {
//   await connectToDb();

//   try {
//     const cookieStore = await cookies()
//     const token = cookieStore.get("admintoken")?.value
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized: No token" }, { status: 401 });
//     }

//     const adminDetails = await AdminSessionModel.findOne({ token });
//     if (!adminDetails) {
//       return NextResponse.json({ message: "Unauthorized: Invalid admin session" }, { status: 401 });
//     }

//     const { productid, newStatus } = await request.json();
//     const { id } = await params
//     if (!newStatus) {
//       return NextResponse.json({ message: "Order ID and new status are required" }, { status: 400 });
//     }

//     if (!ALLOWED_STATUSES.includes(newStatus)) {
//       return NextResponse.json({ message: "Invalid status update" }, { status: 400 });
//     }

//     const adminId = adminDetails.adminId;

//     // Find the order that has at least one product with this admin ID
//     const order = await OrderModel.findOne({
//       _id: id,
//       "products.adminId": adminId,
//     });

//     if (!order) {
//       return NextResponse.json({ message: "Order not found or not managed by admin" }, { status: 404 });
//     }

//     // Check current status
//     const currentStatus = order.order_details.order_status;

//     if (currentStatus === "Cancel") {
//       return NextResponse.json({ message: "Cannot update status. Order is cancelled." }, { status: 400 });
//     }

//     // Update order status
//     if (order.products?._id === productid) {

//       order.products?.product.order_status = newStatus;
//     }
//     await order.save();

//     return NextResponse.json({ message: "Order status updated successfully", order }, { status: 200 });

//   } catch (err) {
//     console.error("Admin Order Status Update Error:", err.message);
//     return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDb } from "@/db/db";
import AdminSessionModel from "@/models/adminSessionModel";
import OrderModel from "@/models/OrderModel";

const ALLOWED_STATUSES = ["Confirmed", "Shipped", "Delivered"];

export async function PUT(request, { params }) {
  await connectToDb();

  try {
    // Get admin token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("admintoken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token" }, { status: 401 });
    }

    // Validate admin session
    const adminDetails = await AdminSessionModel.findOne({ token });
    if (!adminDetails) {
      return NextResponse.json({ message: "Unauthorized: Invalid admin session" }, { status: 401 });
    }

    const { productid, newStatus , p_id } = await request.json();
    const { id } = params;

    if (!productid || !newStatus) {
      return NextResponse.json({ message: "Product ID and new status are required" }, { status: 400 });
    }

    if (!ALLOWED_STATUSES.includes(newStatus)) {
      return NextResponse.json({ message: "Invalid status update" }, { status: 400 });
    }

    const adminId = adminDetails.adminId;

    // Find order containing product managed by this admin
    const order = await OrderModel.findOne({
      _id: id,
      // "products.adminId": adminId,
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found or not managed by admin" }, { status: 404 });
    }

    // Prevent update if overall order is canceled
    if (order.order_details.order_status === "Cancel") {
      return NextResponse.json({ message: "Cannot update status. Order is cancelled." }, { status: 400 });
    }

    // Find product in the array by its _id
    const productToUpdate = order.products.find(
      (product) =>  product._id.toString() === productid && product.productId.toString() === p_id 
    );

    if (!productToUpdate) {
      return NextResponse.json({ message: "Product not found in the order" }, { status: 404 });
    }

    // Check admin ownership of the product
    if (productToUpdate.adminId.toString() !== adminId.toString()) {
      return NextResponse.json({ message: "Unauthorized to update this product" }, { status: 403 });
    }

    // Update product's order status
    productToUpdate.product_order_status = newStatus;

    // Optionally update overall order status (e.g., mark as Delivered if all products are delivered)
    const allDelivered = order.products.every(
      (p) => p.product_order_status === "Delivered"
    );
    const allDelivereds = order.products.every(
      (p) => p.product_order_status === "Confirmed"
    );
    const allDeliveredss = order.products.every(
      (p) => p.product_order_status === "Shipped"
    );

    if (allDelivered) {
      order.order_details.order_status = "Delivered" 
      order.order_details.payment_Status = "Completed"
    }
    if (allDelivereds) {
      order.order_details.order_status = "Confirmed" 
      order.order_details.payment_Status = "Pending"
    }
    if (allDeliveredss) {
      order.order_details.order_status = "Shipped" 
      order.order_details.payment_Status = "Pending"
    }
 

    // Save the order
    await order.save();

    return NextResponse.json(
      { message: "Product status updated successfully", order },
      { status: 200 }
    );

  } catch (err) {
    console.error("Admin Order Product Status Update Error:", err.message);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

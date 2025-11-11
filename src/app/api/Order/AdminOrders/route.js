import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDb } from "@/db/db";
import AdminSessionModel from "@/models/adminSessionModel";
import OrderModel from "@/models/OrderModel";
// Adjust to your session model

export async function GET() {
  await connectToDb();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admintoken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token" }, { status: 401 });
    }

    const adminDetails = await AdminSessionModel.findOne({ token });

    if (!adminDetails) {
      return NextResponse.json({ message: "Unauthorized: Invalid admin session" }, { status: 401 });
    }

    const adminId = adminDetails.adminId;

    // Fetch all orders that have at least one product managed by this admin
    const orders = await OrderModel.find({
      "products.adminId": adminId
    }).sort({ createdAt: -1 }).select("-order_details.totalPrice").lean(); // use .lean() for performance and simplicity

    // Filter each order to include only the products belonging to this admin
    const filteredOrders = orders.map(order => {
      const adminProducts = order.products.filter(
        product => product.adminId.toString() === adminId.toString()
      );

      return {
        ...order,
        products: adminProducts
      };
    });

    return NextResponse.json(filteredOrders, { status: 200 });
  } catch (err) {
    console.error("Admin Order Fetch Error:", err.message);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}




// [
//     {
//         "_id": "",
//         "user": {
//             "userId": "",
//             "name": "John Doe",
//             "email": "john@example.com",
//             "phoneNumber": "9876543210"
//         },
//         "products": [
//             {
//                 "productId": "",
//                 "productCode": "91228194",
//                 "product_name": "Unknown",
//                 "description": "100 % cotton Jeans For Mens",
//                 "price": 2000,
//                 "quantity": 2,
//                 "size": "34",
//                 "color": "Dark Blue",
//                 "image": [
//                     "url"
//                 ],
//                 "totalPrice": "4000",
//                 "vendor": {
//                     "vendorId": "",
//                     "vendor_name": "newuser",
//                     "vendor_email": "newuser@123.com"
//                 },
//                 "adminId": "",
//                 "_id": ""
//             },
//             {
//                 "productId": "68d24b7f5dbabaa4521562a2",
//                 "productCode": "56828343",
//                 "product_name": "Unknown",
//                 "description": "adidas Mens Running shoes",
//                 "price": 4000,
//                 "quantity": 3,
//                 "size": "Uk-10",
//                 "color": "Black-Neon",
//                 "image": [
//                     "https://res.cloudinary.com/dqbbmjd9j/image/upload/v1758612551/yjagtgzeboiltoknxgfk.jpg"
//                 ],
//                 "totalPrice": "12000",
//                 "vendor": {
//                     "vendorId": "68cef35fc3902784eb5b9c4e",
//                     "vendor_name": "newuser",
//                     "vendor_email": "newuser@123.com"
//                 },
//                 "adminId": "",
//                 "_id": ""
//             }
//         ],
//         "order_details": {
//             "order_status": "Pending",
//             "shipping_address": "123 Main St, NY",
//             "billing_address": "456 Elm St, NY",
//             "payment_Status": "Pending",
//             "payment_type": "Online",
//             "tracking_number": "65875003"
//         },
//         "createdAt": "2025-09-26T15:28:46.190Z",
//         "updatedAt": "2025-09-26T15:28:46.190Z",
//         "__v": 0
//     }
// ]
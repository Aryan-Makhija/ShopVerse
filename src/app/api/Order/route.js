
import { SendEmail } from '@/app/Mails/OrderMail';
import { connectToDb } from '@/db/db';
import Attribute from '@/models/(ProductListing)/Attribute';
import ProductInfo from '@/models/(ProductListing)/ProductInfo';
import ProductVariant from '@/models/(ProductListing)/ProductVariant';
import OrderModel from '@/models/OrderModel';
import userModel from '@/models/user';
import userSessionModel from '@/models/userSessionModel';
import VendorModel from '@/models/VendorModel';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


// Helper to find price based on size/color
const getVariantForAttributes = (variants, size, color) => {
    return variants.find(variant =>
        variant.size === size && variant.color === color
    );
};

export async function POST(req) {

    await connectToDb()
    try {

        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        const userdetails = await userSessionModel.findOne({ token })
        if (!userdetails) {
            return NextResponse.json({ message: "Unauthorized" })
        }

        const userId = userdetails.userId
        const body = await req.json();

        const { user, products, order_details } = body;

        if (!user || !products || !order_details) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let totalPrice = 0
        const productEntries = [];

        const orderDate = new Date(order_details.orderdate);
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(orderDate.getDate() + 2);

        const formattedDeliveryDate = deliveryDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        for (const item of products) {
            const { productCode, size, color, quantity } = item;

            const product = await ProductInfo.findOne({ productCode });
            if (!product) {
                return NextResponse.json({ error: `Product ${productCode} not found` }, { status: 404 });
            }

            const productId = product._id;
            const adminId = product.adminId
            // 1. Find the matching attribute (based on size and color)
            const attributes = await Attribute.find({ productId }).lean();

            const matchedAttribute = attributes.find(attr =>
                attr.size === size && attr.color === color
            );

            if (!matchedAttribute) {
                return NextResponse.json({ error: `Attribute not found for ${productCode} with size ${size} and color ${color}` }, { status: 400 });
            }

            // 2. Now find the product variant using attributeId
            const variant = await ProductVariant.findOne({
                productId,
                attribute: matchedAttribute._id
            }).lean();

            if (!variant) {
                return NextResponse.json({ error: `Variant not found for attribute ${matchedAttribute._id}` }, { status: 400 });
            }

            // 3. Now you have the correct variant with price


            const vendor = await VendorModel.findOne({ adminId }); // Update if your schema differs
            if (!vendor) {
                return NextResponse.json({ error: `Vendor not found for ${productCode}` }, { status: 404 });
            }


            totalPrice += variant.price * quantity;


            productEntries.push({
                productId: product._id,
                productCode,
                product_name: product.productname || 'Unknown',
                description: product.description || '',
                price: variant.price,
                quantity,
                size,
                color,
                image: variant.image[0],
                totalPrice: (Number(variant.price) * Number(quantity)).toString(),
                vendor: {
                    vendorId: vendor._id,
                    vendor_name: vendor.name,
                    vendor_email: vendor.contactEmail
                },
                adminId: adminId // assuming this is in ProductInfo
            });
        }

        const newOrder = new OrderModel({
            user: {
                userId: userId,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber
            },
            products: productEntries,
            order_details: {
                order_status: 'Pending',
                shipping_address: order_details.shipping_address,
                billing_address: order_details.billing_address,
                totalPrice,
                payment_Status: 'Pending',
                payment_type: order_details.payment_type,
                orderdate: order_details.orderdate,
                delivery_date: formattedDeliveryDate
            }
        });

        await newOrder.save();


        const name = user.name;
        const email = user.email;
        const orderId = newOrder._id;
        const orderdate = new Date(newOrder.order_details.orderdate).toDateString();
        const deliverydate =new Date(newOrder.order_details.delivery_date).toDateString();
        const shippingAddress = newOrder.order_details.shipping_address;
        const totalAmount = newOrder.order_details.totalPrice;

        const emailHTML = `
  <h2>Order Confirmation</h2>
  <p>Dear ${name},</p>
  <p>Thank you for your order with <strong>ShopVerse</strong>.</p>
  <p><strong>Order ID:</strong> ${orderId}</p>
  <p><strong>Order Date:</strong> ${orderdate}</p>
  <p><strong>Delivery Date:</strong> ${deliverydate}</p>
  <p><strong>Shipping Address:</strong> ${shippingAddress}</p>

  <h3>Items Ordered:</h3>
  <ul>
    ${productEntries.map(item => `
      <li>
        ${item.product_name} - ${item.quantity} x ₹${item.price} 
        (${item.size}, ${item.color})
      </li>
    `).join('')}
  </ul>

  <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

  <p>We appreciate your business and look forward to serving you again.</p>
  <p>Best Regards,<br/>ShopVerse Team</p>
`;

        try {
            await SendEmail(email, 'Your Order Confirmation', emailHTML);
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError.message);
        }

        return NextResponse.json({ message: 'Order placed successfully', orderId: newOrder._id }, { status: 201 });

    } catch (error) {
        console.error('[ORDER_API_ERROR]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}




export async function GET() {
    await connectToDb()

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        const userdetails = await userSessionModel.findOne({ token })
        if (!userdetails) {
            return NextResponse.json({ message: "Unauthorized" })
        }

        const userId = userdetails.userId

        const product = await OrderModel.find({ "user.userId": userId }).select("-user -createdAt -updatedAt -__v ").sort({ createdAt: -1 }).lean();

        if (!product) {
            return NextResponse.json({ message: "No Order Found for thi userid" }, { status: 400 })
        }


        return NextResponse.json(product, { message: "user order" })
    } catch (err) {
        console.log(err.message)

        return NextResponse.json({ message: "Something went Wrong" }, { status: 400 })
    }
}


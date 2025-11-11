import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },

    },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProductInfo",
                required: true
            },
            productCode: { type: String, required: true },
            product_name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            size: { type: String, required: true },
            color: { type: String, required: true },
            image: [{ type: String, required: true }],
            totalPrice: { type: String, required: true },
            product_order_status: {
                type: String,
                enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancel"],
                default: "Pending"
            },
            vendor: {
                vendorId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "VendorDetails",
                    required: true
                },
                vendor_name: { type: String, required: true },
                vendor_email: { type: String, required: true }
            },

            adminId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Admin",
                required: true
            }
        }
    ],

    order_details: {
        order_status: {
            type: String,
            enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancel"],
            default: "Pending"
        },
        shipping_address: { type: String, required: true },
        billing_address: { type: String, required: true },
        payment_Status: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending"
        },
        payment_type: {
            type: String,
            enum: ["CashOnDelivery", "Online"],
            required: true
        },
        totalPrice: { type: String, required: true },
        orderdate: {
            type: Date,
            required: true
        },
        delivery_date: {
            type: Date,
            required: true
        },
        tracking_number: {
            type: String,
            unique: true
        }
    }
}, { timestamps: true });

// 🔐 Tracking Number Generator
function generate8DigitCode() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// 🔄 Pre-save hook
OrderSchema.pre("save", async function (next) {
    if (!this.order_details.tracking_number) {
        let isUnique = false;
        let code;

        while (!isUnique) {
            code = generate8DigitCode();
            const existing = await mongoose.models.OrderDetails.findOne({ "order_details.tracking_number": code });
            if (!existing) isUnique = true;
        }

        this.order_details.tracking_number = code;
    }

    next();
});

export default mongoose.models.OrderDetails || mongoose.model("OrderDetails", OrderSchema);






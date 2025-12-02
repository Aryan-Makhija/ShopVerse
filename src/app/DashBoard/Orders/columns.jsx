

"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";





export const columns = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const imageUrl = row.original.image[0];
            const isValid = typeof imageUrl === "string" && imageUrl.startsWith("http");

            return isValid ? (
                <img
                    src={imageUrl}
                    alt="Product"
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                />
            ) : (
                <span>N/A</span>
            );
        },
    },
    {
        accessorKey: "productCode",
        header: "Code",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },

    {
        accessorKey: "order_status",
        header: "Order Status",
        cell: ({ row }) => {
            const StatusCell = () => {
                const currentStatus = row.original.order_status;
                const orderId = row.original.orderId;
                const productid = row.original._id;
                const proid = row.original.productId;
                const isDelivered = currentStatus === "Delivered";

                const [status, setStatus] = useState(currentStatus);
                const router = useRouter()

                useEffect(() => {
                    // If status changed, call the update function
                    if (status !== currentStatus) {
                        handleStatusChange();
                    }
                }, [status]);

                const handleStatusChange = async () => {
                    const order = {
                        productid: productid,
                        p_id: proid,
                        newStatus: status,
                    };

                    try {
                        const res = await fetch(`/api/Order/AdminOrders/${orderId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(order),
                        });

                        const data = await res.json();
                        router.refresh()
         
                        toast.success("Order status updated");
                    } catch (error) {
                        console.error("Error updating status:", error);
                        toast.error("Failed to update order status");
                    }
                };

                const statuses = ["Confirmed", "Shipped", "Delivered"];

                return (
                    <Select
                        value={currentStatus}
                        onValueChange={setStatus}
                        disabled={isDelivered}
                    >
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder={currentStatus} />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            };

            return <StatusCell />;
        },
    },

    {
        accessorKey: "user",
        header: "User Info",
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span>{user?.email}</span>
                    <span>{user?.phoneNumber}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "shipping_address",
        header: "Shipping Address",
    },
    {
        accessorKey: "billing_address",
        header: "Billing Address",
    },
    {
        accessorKey: "payment_Status",
        header: "Payment Status",
        cell: ({ row }) => {
            const status = row.original.payment_Status;
            return (
                <Badge className={
                    status === "Completed" ? "bg-green-500 text-white" : "bg-gray-200 text-black"
                }>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "payment_type",
        header: "Payment Type",
    },
    {
        accessorKey: "isCompleted",
        header: "Completed",
        cell: ({ row }) => {
            const isCompleted =
                row.original.order_status === "Delivered" &&
                row.original.payment_Status === "Completed";

            return <Checkbox checked={isCompleted} disabled />;
        },
    },
];


"use client"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useOrder } from "@/Context/OrderContext"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import confetti from "canvas-confetti"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export function PlaceOrder({
    className,
    ...props
}) {


    const [cart, setcart] = useState([])
    const { payment, address, user, ordertotal } = useOrder()
    const router = useRouter()

    const getcartdetails = async () => {
        const response = await fetch("/api/CartItems", {
            method: "GET"
        })
        const data = await response.json()
        setcart(data)
    }

    const orderdetails = {
        user: {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        },
        products: cart,
        order_details: {
            shipping_address: address.shipping_address,
            billing_address: address.billing_address,
            payment_type: payment.payment_type,
            orderdate: new Date()
        }
    }


    const clearcart = async () => {
        const response = await fetch("/api/CartItems", {
            method: "DELETE"
        })
        const data = await response.json()
        console.log(data)
    }



    const order = async () => {

        const response = await fetch("/api/Order", {
            method: "POST",
            body: JSON.stringify(orderdetails)
        })

        const data = await response.json()
        toast("Order Placed Successfully")
        setTimeout(() => {
            setTimeout(() => {
                router.refresh()
            }, 1000);

            clearcart()
            router.push("/")
        }, 2000);
    }




    const handleClick = () => {
        const duration = 5 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
        const randomInRange = (min, max) =>
            Math.random() * (max - min) + min
        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now()
            if (timeLeft <= 0) {
                return clearInterval(interval)
            }
            const particleCount = 50 * (timeLeft / duration)
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        }, 250)
    }

    useEffect(() => {
        getcartdetails()
    }, [])












    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-1">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Place Order</h1>
                            </div>

                            <div className="grid  gap-4">
                                <div className=" flex justify-between  ">
                                    <Label>Name</Label>
                                    <p>{user.name}</p>

                                </div>
                                <div className=" flex justify-between  ">
                                    <Label>Email</Label>
                                    <p>{user.email}</p>

                                </div>
                                <div className=" flex justify-between  ">
                                    <Label>PhoneNumber</Label>
                                    <p>{user.phoneNumber}</p>

                                </div>
                                <div className=" flex justify-between  ">
                                    <Label>Shipping Address</Label>
                                    <p>{address.shipping_address}</p>

                                </div>
                                <div className=" flex justify-between  ">
                                    <Label>Billing Address</Label>
                                    <p>{address.billing_address}</p>

                                </div>
                                <div className=" flex justify-between  ">
                                    <Label>Payment Type</Label>
                                    <p>{payment.payment_type}</p>

                                </div>
                                <div className="w-full bg-blue-500 h-[1px]">

                                </div>
                                <div className=" flex justify-between  ">
                                    <Label>Order Total</Label>
                                    <p>₹{ordertotal}</p>

                                </div>

                            </div>
                            <Button onClick={() => { order(), handleClick() }} className="w-full relative cursor-pointer bg-pink-600 text-white">
                                Place Order
                            </Button>

                        </div>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}

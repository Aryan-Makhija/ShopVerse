"use client"

import Counter from "@/components/Counter"
import { Navbar } from "@/components/homepage/Navbar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useOrder } from "@/Context/OrderContext"
import { IconShoppingCart } from "@tabler/icons-react"

import { DeleteIcon, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const ShoppingCart = () => {

    const [cart, setcart] = useState([])
    const [id, setid] = useState("")
    const [total, settotal] = useState(0)

    const { setordertotal, ordertotal } = useOrder()
    const [loading, setloading] = useState(true)


    // console.log(ordertotal)
    const router = useRouter()



    const getcartitems = async () => {
        try {
            const response = await fetch("/api/CartItems", {
                method: "GET"
            })

            const data = await response.json()
            if (Array.isArray(data)) {
                const total = data.reduce((sum, item) => {
                    const price = parseFloat(item.price) || 0;
                    return sum + price;
                }, 0);

                settotal(total)
                setordertotal(total + 100)
                setcart(data)

            }

        } catch (err) {
            console.log(err.message)
        } finally {
            setloading(false)
        }
    }

    const deleteitem = async (id) => {
        const response = await fetch(`/api/CartItems/${id}`, {
            method: "DELETE"
        })

        setTimeout(() => {
            getcartitems()

        }, 1000)
        windows.location.relaod()
        toast.success("Item Deleted From the Cart")
    }


    useEffect(() => {
        getcartitems()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-foreground max-w-screen">

            <Navbar />

            <div className="w-full min-h-screen p-8 bg-primary-foreground flex  gap-10 flex-col items-center">
                <div className="w-full p-2 rounded bg-gray-200 shadow-md  text-center">
                    <h1 className="text-3xl font-serif  font-medium ">Shopping Cart 🛒</h1>
                </div>

                <div className=" w-full flex justify-start ">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Cart</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {
                    cart.length === 0 ?

                        <div className="w-11/12 max-w-7xl justify-center items-center flex flex-col gap-8">
                            <h1 className="text-4xl fontsemibold font-serif flex ">  Your Cart is Empty </h1>
                            <Link href="/">
                                <Button className="bg-pink-500">
                                    Continue Shopping
                                </Button>

                            </Link>

                        </div> : <div className="w-11/12 max-w-7xl flex flex-col lg:flex-row gap-8">




                            {/* Products Section */}
                            <div className="w-full lg:w-3/5 bg-white border border-gray-200 rounded-xl shadow-2xl p-6 flex flex-col gap-6 max-h-[600px] overflow-y-auto">
                                {/* Product Card */}

                                <p>Total Cart Items : {cart.length}</p>
                                {cart.map((item, index) => {
                                    return (
                                        < div key={index} className="w-full border border-blue-100 rounded-lg p-4 flex gap-4 shadow-md bg-white hover:bg-blue-50 transition-all duration-300" >

                                            <div className="w-2/6 h-32 bg-gray-200 rounded-md overflow-hidden">
                                                <img src={item.image} className="w-full h-full object-cover object-center" alt="" />
                                            </div>
                                            <div className="w-4/6 flex flex-col justify-between">
                                                <p className="font-semibold text-lg text-indigo-700">{item.category} </p>
                                                <p className="text-gray-600 text-sm">{item.description}</p>
                                                <p className="text-gray-600 text-sm">Size : <span>{item.size}</span></p>
                                                <p className="text-gray-600 text-sm"> Color :<span>{item.color}</span></p>
                                                <p className="text-gray-600 text-sm"> Quantity :<span className="text-blue-800 font-bold">{item.quantity}</span></p>
                                                <p className="text-green-600 font-semibold">₹{item.price}</p>

                                                <p className="text-yellow-500 text-sm">★★★★☆</p>
                                            </div>
                                            <div onClick={() => deleteitem(item._id)} className="flex items-start">
                                                <Trash2 className="text-red-500 cursor-pointer hover:scale-110 hover:text-red-700 transition-transform duration-200" />
                                            </div>
                                        </div>
                                    )

                                })}

                                {/* Add more product cards dynamically here */}

                            </div>

                            {/* Cart Details Section */}
                            <div className="w-full lg:w-2/5 bg-white border border-gray-200 rounded-xl shadow-2xl p-6 flex flex-col gap-6">
                                <h2 className="text-2xl font-bold text-pink-600 border-b pb-2">Cart Summary</h2>

                                <div className="flex flex-col gap-4 text-sm text-gray-800">
                                    <div className="flex justify-between">
                                        <p>Subtotal</p>
                                        <p className="font-medium">₹{total}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Discount</p>
                                        <p className="font-medium text-green-600">10%</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Shipping Fee</p>
                                        <p className="font-medium">₹100</p>
                                    </div>
                                    <div className="flex justify-between border-t pt-2 text-lg font-semibold text-indigo-800">
                                        <p>Total</p>
                                        <p className="font-bold text-pink-600">₹{total + 100}</p>
                                    </div>
                                </div>

                                <Link href="/OrderPage">

                                    <button className="w-full mt-4 py-2 bg-blue-900 text-white rounded-lg font-semibold text-lg">
                                        Continue to Checkout
                                    </button>

                                </Link>
                            </div>

                        </div>
                }

            </div>


        </div >
    )
}

export default ShoppingCart
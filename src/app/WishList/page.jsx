"use client"

import { Navbar } from "@/components/homepage/Navbar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"


const WishList = () => {
    const [wishlist, setwishlist] = useState([])
    const [wishdata, setdata] = useState([])

    const router = useRouter()

    const getwishlist = async () => {
        const response = await fetch("/api/WishList", {
            method: "GET"
        })

        const data = await response.json()
        setwishlist(data)
    }

    const handleAddToCart = async () => {
        const selectedProduct = {

            productCode: wishdata.productCode,
            size: wishdata.size,
            color: wishdata.color,
            quantity: 1,
            price: wishdata.price,
            image: wishdata.image,
            category: wishdata.category,
            description: wishdata.description,
        };

        // console.log(productdata)
        const response = await fetch("/api/CartItems", {
            method: "POST",
            body: JSON.stringify(selectedProduct)
        })
        const data = await response.json()
        // console.log("cart data", data)
        if (response.status === 400) {
            // toast.error("Please select  the size")
            return
        }

        if (!response.ok) {
            // toast.error("Something went wrong. Please try again.");
            return;
        }
        toast.success("Product added to Cart 🛒")
        deleteItem(wishdata._id)
        window.location.reload()
        // console.log("productadded", data)
    };


    const deleteItem = async (productId) => {
        const response = await fetch(`/api/WishList/${productId}`, {
            method: "DELETE"
        })

        const data = await response.json()
        toast.success("Wishlist Item Deleted")
        window.location.reload()
    }

    useEffect(() => {
        handleAddToCart()
    }, [wishdata])


    useEffect(() => {
        getwishlist()
    }, [])

    return (
        <div className="min-h-screen bg-primary-foreground max-w-screen">
            <Navbar></Navbar>

            <div className="w-full min-h-screen p-8 bg-primary-foreground flex  gap-10 flex-col items-center">
                <div className="w-full p-2 rounded bg-gray-200 shadow-md  text-center">
                    <h1 className="text-3xl font-serif  font-medium ">WishList ❤️</h1>
                </div>
                <div className=" w-full flex justify-start ">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>WishList</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {
                    wishlist.length === 0 ?

                        <div className="w-11/12 max-w-7xl justify-center items-center flex flex-col gap-8">
                            <h1 className="text-4xl fontsemibold font-serif flex "> Your wishlist is Empty  </h1>
                            <Link href="/">
                                <Button className="bg-pink-500">
                                    Continue Shopping
                                </Button>

                            </Link>

                        </div> : <div className="w-11/12 max-w-7xl flex justify-center items-center flex-col lg:flex-row gap-8 ">
                            {/* Products Section */}
                            <div className="w-full lg:w-3/5 bg-white border border-gray-200 rounded-xl shadow-2xl p-6 flex flex-col gap-6 max-h-[600px] overflow-y-auto">
                                {/* Product Card */}
                                <p>Total WishList Items: {wishlist.length}</p>


                                {wishlist.map((item, index) => {
                                    return (
                                        < div key={index} className="w-full border border-blue-100 rounded-lg p-4 flex gap-4 shadow-md bg-white hover:bg-blue-50 transition-all duration-300 relative" >

                                            <div className="w-2/6 h-32 bg-gray-200 rounded-md overflow-hidden">
                                                <img src={item.image} className="w-full h-full object-cover object-center" alt="" />
                                            </div>
                                            <div className="w-4/6 flex flex-col justify-between">
                                                <p className="font-semibold text-lg text-indigo-700">{item.category} </p>
                                                <p className="text-gray-600 text-sm">{item.description}</p>
                                                <p className="text-gray-600 text-sm">Size : <span>{item.size}</span></p>
                                                <p className="text-gray-600 text-sm"> Color :<span>{item.color}</span></p>
                                                <p className="text-gray-600 text-sm"> Quantity :{item.quantity}<span>


                                                </span></p>
                                                <p className="text-green-600 font-semibold">₹{item.price}</p>

                                                <p className="text-yellow-500 text-sm">★★★★☆</p>
                                            </div>
                                            <div onClick={() => deleteItem(item._id)} className="flex items-start">
                                                <Trash2 className="text-red-500 cursor-pointer hover:scale-110 hover:text-red-700 transition-transform duration-200" />
                                            </div>


                                            <div className="absolute bottom-3 right-3">
                                                <button onClick={() => setdata(item)} className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-pink-700 text-white font-semibold rounded-md hover:bg-gray-800 transition">
                                                    Add to Cart
                                                </button>

                                            </div>
                                        </div>
                                    )

                                })}

                                {/* Add more product cards dynamically here */}

                            </div>

                            {/* Cart Details Section */}
                            {/* <div className="w-full lg:w-2/5 bg-white border border-gray-200 rounded-xl shadow-2xl p-6 flex flex-col gap-6">
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
                            </div> */}

                        </div>
                }





            </div>
        </div>



    )

}

export default WishList
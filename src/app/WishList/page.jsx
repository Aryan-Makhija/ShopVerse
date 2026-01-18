"use client"

import Footer from "@/components/homepage/Footer"
import FooterNavbar from "@/components/homepage/FooterNav"
import Header from "@/components/homepage/Header"
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
    const [wishdata, setwishdata] = useState([])



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


        const response = await fetch("/api/CartItems", {
            method: "POST",
            body: JSON.stringify(selectedProduct)
        })
        const data = await response.json()

        if (response.status === 400) {

            return
        }

        if (response.ok)
            toast.success("Product added to Cart 🛒")
        deleteItem(wishdata._id)
        window.location.reload()
    }




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
        <div className="min-h-screen bg-primary-foreground max-w-screen ">
            {/* <Navbar></Navbar> */}
            <Header></Header>
            <div className="  w-full min-h-screen p-8 bg-primary-foreground flex  gap-10 flex-col items-center">
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

                        </div> : <div className="  w-11/12 max-w-7xl flex justify-center items-center flex-col lg:flex-row gap-8">
                            {/* Products Section */}
                            <div className="w-full lg:w-3/5   p-4 sm:p-6 flex flex-col gap-6 max-h-[70vh] lg:max-h-[600px]
  overflow-y-auto">

                                <p className="font-semibold text-gray-700">
                                    Total WishList Items: {wishlist.length}
                                </p>

                                {wishlist.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full border border-blue-100 rounded-lg p-4 flex flex-col sm:flex-row gap-4 shadow-md bg-white hover:bg-blue-50 transition-all duration-300 relative"
                                    >
                                        {/* Image */}
                                        <div className="w-full sm:w-2/6 h-48 sm:h-32 bg-gray-200 rounded-md overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="w-full sm:w-4/6 flex flex-col gap-1">
                                            <p className="font-semibold text-lg text-indigo-700">
                                                {item.category}
                                            </p>

                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {item.description}
                                            </p>

                                            <p className="text-gray-600 text-sm">
                                                Size: <span>{item.size}</span>
                                            </p>

                                            <p className="text-gray-600 text-sm">
                                                Color: <span>{item.color}</span>
                                            </p>

                                            <p className="text-gray-600 text-sm">
                                                Quantity: {item.quantity}
                                            </p>

                                            <p className="text-green-600 font-semibold">
                                                ₹{item.price}
                                            </p>

                                            <p className="text-yellow-500 text-sm">★★★★☆</p>
                                        </div>

                                        {/* Delete Icon */}
                                        <div
                                            onClick={() => deleteItem(item._id)}
                                            className="absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex justify-center items-center"
                                        >
                                            <Trash2 className="text-red-500 cursor-pointer hover:scale-110 hover:text-red-700 transition-transform duration-200" />
                                        </div>

                                        {/* Add to Cart Button */}
                                        <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-3 sm:right-3">
                                            <button
                                                onClick={() => setwishdata(item)}
                                                className="w-full sm:w-auto px-6 py-3 bg-pink-700 text-white font-semibold rounded-md hover:bg-gray-800 transition"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>




                }





            </div>

            <FooterNavbar></FooterNavbar>
            <Footer></Footer>
        </div>



    )

}

export default WishList
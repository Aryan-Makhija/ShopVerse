"use client"

import Counter from "@/components/Counter"
import FooterNavbar from "@/components/homepage/FooterNav"
import { Navbar } from "@/components/homepage/Navbar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useOrder } from "@/Context/OrderContext"
import { IconShoppingCart } from "@tabler/icons-react"

import { DeleteIcon, Loader, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const ShoppingCart = () => {

    const [cart, setcart] = useState([])
    const [id, setid] = useState("")
    const [total, settotal] = useState(0)

    const { setordertotal, ordertotal } = useOrder()
    const [loading, setloading] = useState(true)



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
        ro
        toast.success("Item Deleted From the Cart")
    }


    useEffect(() => {
        getcartitems()
    }, [])

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center py-20">
    //             <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
    //         </div>
    //     );
    // }

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

                        </div> :
                        ""
                }

                {
                    cart.length !== 0 ?


                        <div className="w-11/12 max-w-7xl flex flex-col lg:flex-row gap-8">




                            {/* Products Section */}

                            <div className="
  w-full lg:w-3/5
  bg-white border border-gray-200 rounded-xl shadow-2xl
  p-4 sm:p-6
  flex flex-col gap-4 sm:gap-6
  max-h-[70vh] lg:max-h-[600px]
  overflow-y-auto
">
                                <p className="text-sm sm:text-base font-medium">
                                    Total Cart Items : {cart.length}
                                </p>

                                {cart.map((item, index) => {
                                    return (
                                        <Link href={`/ProductPage?productCode=${item.productCode}`} key={index}>

                                            <div
                                                key={index}
                                                className="
                                w-full border border-blue-100 rounded-lg
                                                                          p-3 sm:p-4
                                                        flex flex-col sm:flex-row
                                                                          gap-4
                     shadow-md bg-white hover:bg-blue-50
                                                                                transition-all duration-300
                                                                            relative
        "
                                            >
                                                {/* Image */}
                                                <div className="
          w-full sm:w-2/6
          h-40 sm:h-32
          bg-gray-200 rounded-md overflow-hidden
        ">
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                        className="w-full h-full object-cover object-center"
                                                    />
                                                </div>

                                                {/* Product Info */}
                                                <div className="w-full sm:w-4/6 flex flex-col gap-1 sm:gap-2">
                                                    <p className="font-semibold text-base sm:text-lg text-indigo-700">
                                                        {item.category}
                                                    </p>

                                                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                                                        {item.description}
                                                    </p>

                                                    <p className="text-gray-600 text-xs sm:text-sm">
                                                        Size : <span>{item.size}</span>
                                                    </p>

                                                    <p className="text-gray-600 text-xs sm:text-sm">
                                                        Color : <span>{item.color}</span>
                                                    </p>

                                                    <p className="text-gray-600 text-xs sm:text-sm">
                                                        Quantity :
                                                        <span className="text-blue-800 font-bold ml-1">
                                                            {item.quantity}
                                                        </span>
                                                    </p>

                                                    <p className="text-green-600 font-semibold text-sm sm:text-base">
                                                        ₹{item.price}
                                                    </p>

                                                    <p className="text-yellow-500 text-xs sm:text-sm">
                                                        ★★★★☆
                                                    </p>
                                                </div>

                                                {/* Delete Icon */}
                                                <div
                                                    onClick={(e) => {
                                                        e.preventDefault();   // ⛔ stops Link navigation
                                                        e.stopPropagation();  // ⛔ stops bubbling
                                                        deleteitem(item._id);
                                                    }}
                                                    className="
            absolute sm:static
            top-2 right-2 sm:top-auto sm:right-auto
             bg-white w-12 h-11 justify-center
            flex items-center rounded-full
          "
                                                >
                                                    <Trash2
                                                        className="
              text-red-500 cursor-pointer
              hover:scale-110 hover:text-red-700
              transition-transform duration-200
            "
                                                    />
                                                </div>
                                            </div>

                                        </Link>
                                    );
                                })}
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

                        </div> :


                        <div className="flex justify-center items-center">

                            {
                                loading === true ?
                                    <Loader className="w-15 h-15 animate-spin"></Loader> : ""
                            }


                        </div>
                }


            </div>
            <FooterNavbar></FooterNavbar>

        </div >
    )
}

export default ShoppingCart
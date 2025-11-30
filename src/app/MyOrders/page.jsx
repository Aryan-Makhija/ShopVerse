
"use client"
import { Navbar } from '@/components/homepage/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'


const Myorders = () => {
  const [order, setorder] = useState([])

  const myorder = async () => {

    const response = await fetch("/api/Order", {
      method: "GET"
    })

    const data = await response.json()
    console.log(data)
    setorder(data)
  }

  useEffect(() => {
    myorder()
  }, [])





  return (


    <div className="min-h-screen bg-gray-100 max-w-screen">
      <Navbar />

      <div className="w-full min-h-screen p-8 bg-primary-foreground flex  gap-10 flex-col items-center">
        {/* Page Heading */}
        <div className="w-full p-2 rounded bg-gray-200 shadow-md  text-center">
          <h1 className="text-3xl font-serif  font-medium ">My Orders 📦</h1>
        </div>

        {/* Table Headers */}

        {
          order.length === 0 ?

            <div className="w-full  flex flex-col gap-8   items-center justify-center  ">
              <h1 className="text-4xl fontsemibold font-serif flex "> No Orders Yet!   </h1>
              <Link href="/">
                <Button className="bg-pink-500">
                  Continue Shopping
                </Button>

              </Link>

            </div> : <div className="w-full rounded-xl p-4 bg-white shadow-sm">

              <div className="hidden py-2  md:flex justify-between font-semibold gap-2 text-gray-600 mb-4">
                <div className="w-1/2 flex justify-between">
                  <p>Products</p>
                  <p>Total Price</p>
                </div>
                <div className="w-1/2 flex justify-between">
                  <p>Address</p>
                  <p>Status</p>
                </div>
              </div>

              {/* Order List */}
              <div className="space-y-4">
                {/* Order Card */}
                {order.map((item, index) => (

                  <div
                    key={index}
                    className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition"
                  >
                    {/* Left Section */}
                    <div className="w-full md:w-1/2 flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                          <img src={item?.products[0]?.image} className='object-cover' alt="" />
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                          <p className="font-medium text-gray-800">{item.products.map((product,indexs)=>(
                            product.product_name
                          ))}</p>
                          <p className="text-gray-600">
                            ₹{item.order_details.totalPrice} <span className="text-xs">(Qty:1)</span>
                          </p>
                          <p className="text-xs text-gray-500">Order:  {new Date(item.order_details.orderdate).toDateString()}</p>
                          <span className="text-yellow-500 text-sm">★★★★☆</span>

                        </div>
                      </div>
                      <div className="hidden md:block text-gray-700 font-semibold">₹{item.order_details.totalPrice}</div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 flex justify-between items-center">
                      <div className="text-sm flex flex-col gap-1 text-gray-600">
                        <p>{item.order_details.shipping_address}</p>
                        <p>{item.order_details.billing_address}</p>
                      </div>
                      <div>
                        <span
                          className={
                            `px-3 py-1 rounded-full text-xs font-semibold ` +
                            (item.order_details.order_status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.order_details.order_status === "Confirmed"
                                ? "bg-purple-100 text-purple-700"
                                : item.order_details.order_status === "Shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : item.order_details.order_status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700") // fallback
                          }
                        >
                          {item.order_details.order_status}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Total Price */}
                    <div className="md:hidden text-gray-700 font-semibold self-end">₹{item.order_details.totalPrice}</div>
                  </div>
                ))}
              </div>
            </div>


        }

      </div>
    </div>



  )
}

export default Myorders
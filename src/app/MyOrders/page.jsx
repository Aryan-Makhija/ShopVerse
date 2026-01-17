
"use client"
import { Navbar } from '@/components/homepage/Navbar'
import { Button } from '@/components/ui/button'
import { Loader, MoreHorizontal, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'sonner'
import FooterNavbar from '@/components/homepage/FooterNav'
import Footer from '@/components/homepage/Footer'
import Header from '@/components/homepage/Header'



const Myorders = () => {
  const [order, setorder] = useState([])
  const [menuOpen, setMenuOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [id, setid] = useState("")
  const [loader, setloader] = useState(false)

  const myorder = async () => {

    const response = await fetch("/api/Order", {
      method: "GET"
    })

    const data = await response.json()


    setorder(data)
  }

  useEffect(() => {
    myorder()
  }, [])

  const CancelOrder = async () => {
    setloader(true)
    try {
      const response = await fetch(`/api/Order/${id}`, {
        method: "PUT"
      })

      const data = await response.json()
      if (response.status === 200) {
        toast.success("Order Canceled Successfully")

      }

    } catch (err) {
      console.log(err.message)
    } finally {
      setloader(false)
      setShowModal(false);
      window.location.reload();
    }
  }





  return (


    <div className="min-h-screen bg-gray-100 max-w-screen">


      <Header></Header>


      <div className="w-full min-h-screen p-8 bg-primary-foreground flex  gap-10 flex-col items-center">
        {/* Page Heading */}
        <div className="w-full p-2 rounded bg-gray-200 shadow-md  text-center">
          <h1 className="text-3xl font-serif  font-medium ">My Orders 📦</h1>
        </div>

        {/* Order Modal */}
        <AnimatePresence>
          {showModal && selectedOrder && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/30 bg-opacity-40 backdrop-blur-sm 
                 flex items-center justify-center z-50"
            >
              {/* Modal Box */}
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className="bg-white w-[420px] p-6 rounded-2xl shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 transition"
                  onClick={() => setShowModal(false)}
                >
                  ✖
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Cancel Order
                </h2>

                {/* Order Info */}
                <div className="flex gap-4 mb-4">
                  <img
                    src={selectedOrder.products[0].image}
                    alt=""
                    className="w-24 h-24 rounded-lg object-cover shadow"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-gray-800">
                      {selectedOrder.products[0].product_name}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      ₹ <span className="text-green-600 font-semibold">
                        {selectedOrder.order_details.totalPrice}
                      </span>
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Ordered on:{" "}
                      {new Date(selectedOrder.order_details.orderdate).toDateString()}
                    </p>
                  </div>
                </div>

                {/* Warning Box */}
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">
                  ⚠ Are you sure you want to cancel this order?
                  This action cannot be undone.
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-3 w-full p-2 ">
                  <button
                    className="px-4 w-1/2 py-2 bg-gray-200 rounded-md hover:bg-gray-300 
                       transition font-medium"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  {/* Animated cancel button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 w-1/2 py-2 bg-red-600 flex gap-1 justify-center items-center text-white rounded-md shadow 
                       hover:bg-red-700 transition font-medium"
                    onClick={() => {
                      CancelOrder()


                    }}
                  >
                    {loader ? <Loader className="animate-spin"></Loader> : ""}    Confirm Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {
          order.length === 0 ?

            <div className="w-full  flex flex-col gap-8   items-center justify-center  ">
              <h1 className="text-4xl fontsemibold font-serif flex "> No Orders Yet!   </h1>
              <Link href="/">
                <Button className="bg-pink-500">
                  Continue Shopping
                </Button>

              </Link>

            </div> :
            <div className="w-full  rounded-xl p-4 bg-white shadow-sm">


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
                    className="w-full relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition"
                  >
                    {/* Three Dots */}

                    {item.order_details.order_status === "Pending" && (
                      <div className="absolute top-2 right-5">
                        <MoreVertical
                          className="cursor-pointer hover:text-gray-700 transition"
                          onClick={() => { setMenuOpen(menuOpen === index ? null : index), setid(item._id) }}
                        />

                        <AnimatePresence>
                          {menuOpen === index && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute right-0 mt-2 bg-white shadow-xl border rounded-lg p-2 w-32 z-20"
                            >
                              <button
                                className="text-red-600 text-sm px-3 py-2 hover:bg-red-50 rounded-md w-full text-left transition"
                                onClick={() => {
                                  setSelectedOrder(item);
                                  setShowModal(true);
                                  setMenuOpen(null);
                                }}
                              >
                                Cancel Order
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}



                    {/* Left Section */}
                    <div className="w-full md:w-1/2 flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">

                          <img src={item?.products[0]?.image} className='object-cover' alt="" />
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                          <p className="font-medium text-gray-800  ">{item.products.map((product, indexs) => (
                            <p className='flex gap-1'>{product.product_name}</p>
                          ))}</p>
                          <p className="text-gray-800 ">
                            Total Order Price: ₹<span className='text-green-600 font-semibold'>{item.order_details.totalPrice}</span>  <span className="text-xs">(Qty:1)</span>
                          </p>
                          <p className="text-xs text-gray-500">Order: <span className='text-pink-500 '>{new Date(item.order_details.orderdate).toDateString()}</span> </p>
                          <span className="text-yellow-500 text-sm">★★★★☆</span>

                        </div>
                      </div>
                      <div className="hidden md:block text-green-600 font-semibold">₹{item.order_details.totalPrice}</div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full  md:w-1/2 flex justify-between items-center">



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

      <FooterNavbar></FooterNavbar>
      <Footer></Footer>
    </div>



  )


}

export default Myorders
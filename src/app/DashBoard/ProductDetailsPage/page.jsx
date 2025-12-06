"use client"


import { VendorDetailsForm } from '@/components/VendorDetails/VendorDetails'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductdetForm } from '@/components/ProductDetails/Productdetailsform'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'



const Productdetails = () => {

    const params = useSearchParams()
    const code = params.get("productno")

    const [open, setOpen] = useState(false);
    const [id, setid] = useState("")
    const [productdata, setproductdata] = useState([])
    const [loader, setloader] = useState(false)
    const a = productdata[0]?.variants?.flatMap(variant => variant.image || []) || []
    const router = useRouter()

    const getproductdetails = async () => {
        const response = await fetch(`/api/AllProducts/${code}`, {
            method: "GET"
        })
        const data = await response.json()
        setid(data[0]?._id)
        setproductdata(data)
    }


    const handleDelete = async () => {
        setloader(true)
        try {
            const response = await fetch(`/api/AllProducts/${id}`, {
                method: "DELETE"
            })
            const data = await response.json()

            if (response.status === 200) {
                toast.success("Product Deleted Successfull")
                router.push("/DashBoard/AllProductsDetails")
            }
            if (response.status == 401) {
                toast.error("This Product cannot be deleted as there is an order that contains this product. ",)
            }
        } catch (err) {
            console.log(err.message)
        } finally {
            setloader(false)
            setOpen(false);
        }
    };



    useEffect(() => {
        getproductdetails()
    }, [])

    return (
        <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center gap-10 p-6 md:p-10">

            <Button onClick={() => setOpen(true)} className="absolute top-5 right-5 bg-red-200 text-red-600 hover:bg-red-300 ">
                Delete Product
            </Button>
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            initial={{ scale: 0.8, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 40 }}
                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        >
                            <div
                                className="bg-white dark:bg-neutral-900 shadow-xl rounded-xl p-6 w-full max-w-md"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-xl font-semibold mb-3 text-center">
                                    Delete Product?
                                </h2>

                                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                                    Are you sure you want to delete this product? This action cannot be undone.
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="w-full py-2.5 rounded-lg border border-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        disabled={loader}
                                        className="w-full cursor-pointer py-2.5 flex justify-center items-center gap-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                    >

                                        {loader ? <Loader2Icon className='animate-spin'></Loader2Icon> : ""}
                                        Yes, Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <div className="w-full max-w-sm md:max-w-3xl flex justify-center items-center ">
                <Carousel >
                    <CarouselContent >
                        {/* {productdata[0]?.variants[0]?.image.map((item, index) => (

                            <CarouselItem key={index} className="flex justify-center"><img className=' rounded-2xl w-100 h-100 object-cover' src={item}></img></CarouselItem>
                        ))} */}
                        {a.map((item, index) => (

                            <CarouselItem key={index} className="flex justify-center"><img className=' rounded-2xl w-100 h-100 object-cover' src={item}></img></CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>

            <div className="w-full max-w-sm md:max-w-5xl">
                <ProductdetForm></ProductdetForm>
            </div>


        </div >
    )
}

export default Productdetails
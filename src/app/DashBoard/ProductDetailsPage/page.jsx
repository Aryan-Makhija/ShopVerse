"use client"


import { VendorDetailsForm } from '@/components/VendorDetails/VendorDetails'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductdetForm } from '@/components/ProductDetails/Productdetailsform'

const Productdetails = () => {

    const params = useSearchParams()
    const code = params.get("productno")

    const [productdata, setproductdata] = useState([])

    const a = productdata[0]?.variants?.flatMap(variant => variant.image || []) || []
 

    const getproductdetails = async () => {
        const response = await fetch(`/api/AllProducts/${code}`, {
            method: "GET"
        })
        const data = await response.json()
        setproductdata(data)
    }


    useEffect(() => {
        getproductdetails()
    }, [])

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-10 p-6 md:p-10">

            <div className="w-full max-w-sm md:max-w-3xl flex justify-center items-center ">
                <Carousel >
                    <CarouselContent >
                        {/* {productdata[0]?.variants[0]?.image.map((item, index) => (

                            <CarouselItem key={index} className="flex justify-center"><img className=' rounded-2xl w-100 h-100 object-cover' src={item}></img></CarouselItem>
                        ))} */}
                        {a.map((item,index)=>(

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
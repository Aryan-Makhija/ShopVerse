"use client"
import { cn } from "@/lib/utils"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import Link from "next/link";
import { useEffect, useState } from "react";



export function NewArrivalwomens() {


    const [womensdata, setwomensdata] = useState([])


    const getproducts = async () => {
        const response = await fetch("/api/AlluserProducts/WomensProducts", {
            method: "GET"
        })

        const data = await response.json()
        setwomensdata(data)
    }


    useEffect(() => {
        getproducts()
    }, [])
    return (
        <div className=" flex  flex-wrap
         gap-15 justify-center items-center  ">

            <Link href="/ProductPage">
               {
                              womensdata.map((item) => {
              
                                 
                                  return (
              
                                      < Card className="w-[250px] rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 shadow-orange-200" >
                                          <CardHeader className="p-0">
                                              <img
                                                  src={item?.variants?.[0].image?.[0]}
                                                  alt="Mens T-shirt"
                                                  className="w-full h-60 object-cover"
                                              />
                                          </CardHeader>
              
                                          <CardContent className="p-4">
                                              <h2 className="text-lg font-semibold text-gray-800">{item.category?.name} {item.subcategory?.name}</h2>
                                              <p className="text-sm text-gray-500 mb-2">Brand: {item.brand?.name}</p>
              
                                              <div className="flex items-center justify-between mt-3">
                                                  <span className="text-lg font-bold text-green-600">₹{item.variants?.[0].price}</span>
                                                  <span className="text-yellow-500 text-sm">★★★★☆</span>
                                              </div>
                                          </CardContent>
              
                                      </Card>
                                  )
                              })
                          }
            </Link>

            <Card className="w-[250px] grid rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 shadow-orange-200">
                <CardHeader className="p-0">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/028/244/679/small/white-t-shirt-mockup-male-t-shirt-with-short-sleeves-front-back-view-realistic-3d-mock-up-ai-generated-photo.jpg"
                        alt="Mens T-shirt"
                        className="w-full h-60 object-cover"
                    />
                </CardHeader>

                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">Men's T-Shirt</h2>
                    <p className="text-sm text-gray-500 mb-2">Brand: Roadster</p>

                    <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-green-600">₹500</span>
                        <span className="text-yellow-500 text-sm">★★★★☆</span>
                    </div>
                </CardContent>
                {/* 
                <CardFooter className="p-4 border-t">
                    <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                        Add to Cart
                    </button>
                </CardFooter> */}
            </Card>
            <Card className="w-[250px] grid rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 shadow-orange-200">
                <CardHeader className="p-0">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/028/244/679/small/white-t-shirt-mockup-male-t-shirt-with-short-sleeves-front-back-view-realistic-3d-mock-up-ai-generated-photo.jpg"
                        alt="Mens T-shirt"
                        className="w-full h-60 object-cover"
                    />
                </CardHeader>

                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">Men's T-Shirt</h2>
                    <p className="text-sm text-gray-500 mb-2">Brand: Roadster</p>

                    <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-green-600">₹500</span>
                        <span className="text-yellow-500 text-sm">★★★★☆</span>
                    </div>
                </CardContent>
                {/* 
                <CardFooter className="p-4 border-t">
                    <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                        Add to Cart
                    </button>
                </CardFooter> */}
            </Card>
            <Card className="w-[250px] grid rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 shadow-orange-200">
                <CardHeader className="p-0">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/028/244/679/small/white-t-shirt-mockup-male-t-shirt-with-short-sleeves-front-back-view-realistic-3d-mock-up-ai-generated-photo.jpg"
                        alt="Mens T-shirt"
                        className="w-full h-60 object-cover"
                    />
                </CardHeader>

                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">Men's T-Shirt</h2>
                    <p className="text-sm text-gray-500 mb-2">Brand: Roadster</p>

                    <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-green-600">₹500</span>
                        <span className="text-yellow-500 text-sm">★★★★☆</span>
                    </div>
                </CardContent>
                {/* 
                <CardFooter className="p-4 border-t">
                    <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                        Add to Cart
                    </button>
                </CardFooter> */}
            </Card>

        </div>
    );
}

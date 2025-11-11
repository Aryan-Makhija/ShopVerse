"use client"
import { cn } from "@/lib/utils"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"



export function NewArrivalmens() {

    const [mensdata, setmensdata] = useState([])

    const getproducts = async () => {

        const response = await fetch("/api/AlluserProducts/MensProducts", {
            method: "GET"
        })

        const data = await response.json()
        setmensdata(data)

    }


    useEffect(() => {
        getproducts()
    }, [])

    return (
        <div className="flex items-center justify-center flex-wrap gap-15">


            {
                mensdata.map((item,index) => {

                   
                    return (

                        < Card key={index} className="w-[250px] rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 shadow-orange-200" >
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
           
          

        </div >
    );
}

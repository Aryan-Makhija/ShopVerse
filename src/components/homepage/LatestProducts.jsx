"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'

const LatestProducts = () => {

  const [latestdata, setlatestdata] = useState([])


  const { setparams } = useParams()
  const getproducts = async () => {

    const response = await fetch("/api/AlluserProducts/LatestProducts", {
      method: "GET"
    })

    const data = await response.json()
    setlatestdata(data)

  }


  useEffect(() => {
    getproducts()
  }, [])
  return (
    <div className="flex flex-wrap items-center justify-center gap-15">


      {
        latestdata.map((item, index) => {


          return (
            <Link key={index} href={`/ProductPage?productCode=${item.productCode}`} >
              < Card key={index} className="w-[250px] rounded-lg   shadow-lg border hover:shadow-xl transition-shadow duration-300 shadow-orange-200" >
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
            </Link>

          )
        })
      }



    </div >
  )
}

export default LatestProducts
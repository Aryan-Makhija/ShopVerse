"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

const LatestProducts = () => {

  const [latestdata, setlatestdata] = useState([])



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


      {latestdata.length === 0 ? (
        [1, 2, 3, 4].map(() => (

          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[330px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))
      ) : (
        latestdata.map((item) => {


          return (
            <Link href={`/ProductPage?productCode=${item.productCode}`}>

              <Card className="group relative w-[250px] rounded-xl overflow-hidden border bg-white shadow-md transition-all duration-300 hover:shadow-pink-300 hover:-translate-y-1 hover:border-pink-300">

                {/* Image Section */}
                <div className="relative">
                  <img
                    src={item?.variants?.[0].image?.[0]}
                    alt={item.category?.name}
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Hover Buttons */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button className="px-3 py-2 bg-white text-pink-600 text-sm rounded-lg font-medium shadow-md hover:bg-pink-50 transition">
                      Quick View
                    </button>
                    <button className="px-3 py-2 bg-pink-600 text-white text-sm rounded-lg font-medium shadow-md hover:bg-pink-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition">
                    {item.category?.name} {item.subcategory?.name}
                  </h2>

                  <p className="text-sm text-gray-500 mb-2">Brand: {item.brand?.name}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-pink-600">
                      ₹{item.variants?.[0].price}
                    </span>
                    <span className="text-yellow-500 text-sm">★★★★☆</span>
                  </div>
                </CardContent>

              </Card>

            </Link>
          )
        })
      )
      }




    </div >
  )
}

export default LatestProducts
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
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center md:gap-15 gap-6">

      {latestdata.length === 0 ? (
        [1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col space-y-3 w-full max-w-[180px] sm:max-w-[200px] md:max-w-[230px] lg:w-[250px]">
            <Skeleton className="h-[250px] sm:h-[280px] md:h-[300px] lg:h-[330px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))
      ) : (
        latestdata.map((item, index) => (
          <Link href={`/ProductPage?productCode=${item.productCode}`} key={index}>
            <Card className="group relative w-full max-w-[180px] sm:max-w-[200px] md:max-w-[240px] lg:w-[280px] rounded-xl overflow-hidden border bg-white shadow-md transition-all duration-300 hover:shadow-pink-300 hover:-translate-y-1 hover:border-pink-300">

              <div className="relative">
                <img
                  src={item?.variants?.[0].image?.[0]}
                  alt={item.category?.name}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button className="px-3 py-2 bg-white text-pink-600 text-xs sm:text-sm rounded-lg font-medium shadow-md hover:bg-pink-50 transition">
                    Quick View
                  </button>
                  <button className="px-3 py-2 bg-pink-600 text-white text-xs sm:text-sm rounded-lg font-medium shadow-md hover:bg-pink-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>

              <CardContent className="p-3 sm:p-4">
                <h2 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition">
                  {item.productname} 
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                  Brand: {item.brand?.name}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-md sm:text-lg font-bold text-pink-600">
                    ₹{item.variants?.[0].price}
                  </span>
                  <span className="text-yellow-500 text-xs sm:text-sm">★★★★☆</span>
                </div>
              </CardContent>

            </Card>
          </Link>
        ))
      )}

    </div>

  )
}

export default LatestProducts
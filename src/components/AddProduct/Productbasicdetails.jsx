"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"


export function ProductBasicInfo({
  className,
  ...props
}) {

  const [productdetails, setproductdetails] = useState({ producttype: "", category: "", subcategory: "", brand: "", description: "", productname: "" })
  const [error, seterror] = useState([])
  // console.log(error)


  const handelform = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/ProductListing/productinfo", {
      method: "POST",
      body: JSON.stringify(productdetails)
    })

    const data = await response.json()
    // console.log("data", data)
    seterror(data.errors)

    if (!data.errors) {

      toast("Product details submitted Click on next")
    }

  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Product Basic Details</h1>

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="producttype">ProductType</Label>
                  <Input onChange={(e) => setproductdetails({ ...productdetails, producttype: e.target.value })} value={productdetails.producttype} id="producttype" type="text" placeholder="clothing/electronics" required />
                  <p className="text-sm text-red-400">{error?.producttype}</p>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="category">Category</Label>
                  </div>
                  <Input onChange={(e) => setproductdetails({ ...productdetails, category: e.target.value })} value={productdetails.category} id="category" type="text" placeholder="Mens/Women" required />
                  <p className="text-sm text-red-400">{error?.category}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="subcategory">SubCategory</Label>
                  <Input onChange={(e) => setproductdetails({ ...productdetails, subcategory: e.target.value })} value={productdetails.subcategory} id="producttype" type="text" placeholder="t-shirts/jeans" required />
                  <p className="text-sm text-red-400">{error?.subcategory}</p>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="brand">Brand</Label>
                  </div>
                  <Input onChange={(e) => setproductdetails({ ...productdetails, brand: e.target.value })} value={productdetails.brand} id="brand" type="text" placeholder="Nike/addidas" required />
                  <p className="text-sm text-red-400">{error?.brand}</p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="productname">Product Name</Label>
                  <Input onChange={(e) => setproductdetails({ ...productdetails, productname: e.target.value })} value={productdetails.productname} id="productname" type="text" placeholder="Iphone15" required />
                  <p className="text-sm text-red-400">{error?.productname}</p>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="description">Product Description</Label>
                  </div>
                  <textarea onChange={(e) => setproductdetails({ ...productdetails, description: e.target.value })} value={productdetails.description} id="description" className="bg-black text-white p-1">

                  </textarea>
                  <p className="text-sm text-red-400">{error?.description}</p>
                </div>
              </div>
              <Button type="" onClick={(e) => handelform(e)} className=" w-full">
                Submit
              </Button>



            </div>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}

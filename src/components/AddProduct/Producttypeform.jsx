"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


export function TypeForm({
  className,
  ...props
}) {

  const [productdetails, setproductdetails] = useState({ name: "", description: "" })



  const handelform = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/ProductListing/producttype", {
      method: "POST",
      body: JSON.stringify(productdetails)
    })

    const data = await response.json()


    toast("Product Type submitted Click on next")



  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Product Type</h1>

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label>ProductType</Label>
                  {/* <Input onChange={(e) => setproductdetails({ ...productdetails, producttype: e.target.value })} value={productdetails.producttype} id="producttype" type="text" placeholder="clothing/electronics" required /> */}
                  {/* <p className="text-sm text-red-400">{error?.producttype}</p> */}

                  <Select
                    onValueChange={(value) =>
                      setproductdetails((prev) => ({ ...prev, name: value }))
                    }
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Product Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Shoes">Shoes</SelectItem>
                      <SelectItem value="Households">Households</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="description">Product Description</Label>
                  </div>
                  <textarea onChange={(e) => setproductdetails({ ...productdetails, description: e.target.value })} value={productdetails.description} id="description" className="bg-black text-white p-1">

                  </textarea>

                </div>
              </div>




              <Button type="" onClick={(e) => handelform(e)} className="w-full">
                Submit
              </Button>



            </div>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}

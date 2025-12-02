"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"



export function CategoryForm({
  className,
  ...props
}) {

  const [productdetails, setproductdetails] = useState({ name: "" })



  const handelform = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/ProductListing/category", {
      method: "POST",
      body: JSON.stringify(productdetails)
    })

    const data = await response.json()


    toast("Category submitted Click on next")



  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Category</h1>

              </div>

              <div className="grid grid-cols-1">
                <div className="grid gap-3">
                  <Label>product Category</Label>
                  <Input onChange={(e) => setproductdetails({ ...productdetails, name: e.target.value })} value={productdetails.name} id="name" type="text" placeholder="Mens/Women" required />

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

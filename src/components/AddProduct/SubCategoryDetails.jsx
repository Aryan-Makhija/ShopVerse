"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"



export function SubcategoryForm({
  className,
  ...props
}) {

  const [productdetails, setproductdetails] = useState({ name: "" })

  const [loader, setloader] = useState(false)
  const [disable, setdisable] = useState(false)

  const handelform = async (e) => {
    e.preventDefault()
    setloader(true)
    setdisable(true)
    try {

      const response = await fetch("/api/ProductListing/subcategory", {
        method: "POST",
        body: JSON.stringify(productdetails)
      })

      const data = await response.json()
      if (response.status = 200) {

        toast("SubCategory submitted Click on next")
      }

    } catch (err) {
      console.log(er.message)
    } finally {
      setloader(false)
    }



  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">SubCategory</h1>

              </div>

              <div className="grid grid-cols-1">
                <div className="grid gap-3">
                  <Label>Product SubCategory</Label>
                  <Input onChange={(e) => setproductdetails({ ...productdetails, name: e.target.value })} value={productdetails.name} id="name" type="text" placeholder="t-shirt/Jeans" required />

                </div>
              </div>

              <Button type="" onClick={(e) => handelform(e)} disabled={disable} className=" w-full flex gap-2">
                {loader ? <Loader2Icon className="animate-spin"></Loader2Icon> : ""}

                Submit
              </Button>
            </div>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}

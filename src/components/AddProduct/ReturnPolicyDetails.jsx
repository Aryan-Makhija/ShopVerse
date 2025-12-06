"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Loader2Icon } from "lucide-react"


export function ReturnForm({
  className,
  ...props
}) {

  const [productdetails, setproductdetails] = useState({ returnabel: "", exchangeabel: "", exchangewithin: "" })
  const [loader, setloader] = useState(false)
  const [disable, setdisable] = useState(false)


  const handelform = async (e) => {
    e.preventDefault()

    setloader(true)
    setdisable(true)

    try {

      const response = await fetch("/api/ProductListing/returnpolicy", {
        method: "POST",
        body: JSON.stringify(productdetails)
      })

      const data = await response.json()
      toast("Material and Care Submitted Click on next")
    } catch (err) {
      console.log(err.message)
    } finally {
      setloader(false)
    }




  }


  const day = [
    "1", "2", "3", "4", "5", "6", "7", "Non"
  ]
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Material and Instructions</h1>

              </div>

              <div className="grid grid-cols-3 gap-4">


                <div className="grid gap-3">
                  <Label>Returnbale</Label>
                  {/* <Input onChange={(e) => setproductdetails({ ...productdetails, material: e.target.value })} value={productdetails.material} id="material" type="text" placeholder="eg: Cotton/Nylon/Plastic etc" required /> */}

                  <Select
                    onValueChange={(value) =>
                      setproductdetails((prev) => ({ ...prev, returnabel: value }))
                    }
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Retunable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>

                    </SelectContent>
                  </Select>

                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="description">Exchangeabel </Label>
                  </div>
                  <Select
                    onValueChange={(value) =>
                      setproductdetails((prev) => ({ ...prev, exchangeabel: value }))
                    }
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Exchangeable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>

                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="description">Return/Exhange </Label>
                  </div>



                  <Select
                    onValueChange={(value) =>
                      setproductdetails((prev) => ({ ...prev, exchangewithin: value }))
                    }
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Return/Exhange within" />
                    </SelectTrigger>
                    <SelectContent>

                      {day.map((item) => {
                        return (

                          <SelectItem value={item} > {item} day</SelectItem>

                        )
                      })}
                    </SelectContent>
                  </Select>
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

    </div >
  );
}

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


export function MaterialForm({
  className,
  ...props
}) {

  const [productdetails, setproductdetails] = useState({ material: "", instructions: "" })

  const [loader, setloader] = useState(false)
  const [disable, setdisable] = useState(false)

  const handelform = async (e) => {
    e.preventDefault()

     setloader(true)
     setdisable(true)

     try{
       const response = await fetch("/api/ProductListing/materialandcare", {
         method: "POST",
         body: JSON.stringify(productdetails)
       })
   
       const data = await response.json()
     
   
       toast("Material and Care Submitted Click on next")

     }catch(err){
       console.log(err.message)
     }finally{
       setloader(false)
     }


    setproductdetails({ material: "", instrucions: "" })
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Material and Instructions</h1>

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label>Material</Label>
                  <Input onChange={(e) => setproductdetails({ ...productdetails, material: e.target.value })} value={productdetails.material} id="material" type="text" placeholder="eg: Cotton/Nylon/Plastic etc" required />



                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="description">Instructions </Label>
                  </div>
                  <textarea onChange={(e) => setproductdetails({ ...productdetails, instructions: e.target.value })} value={productdetails.instructions} id="instructions" placeholder="Enter product Instructions" className="bg-black text-white p-1">

                  </textarea>

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

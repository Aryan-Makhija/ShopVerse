"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"



export function VendorDetailsForm({
  className,
  ...props
}) {


  const [vendordetails, setvendordetails] = useState({ name: "", businessName: "", contactEmail: "", contactPhone: "", address: "" })

  const [error, seterror] = useState([])
  const [loading, setloading] = useState(false)
  const router = useRouter()


  const RegisterVendor = async (e) => {
    e.preventDefault()
    setloading(true)
    try {

      const response = await fetch("/api/ProductListing/VendorDetails", {
        method: "POST",
        body: JSON.stringify(vendordetails)
      })

      const data = await response.json()

      seterror(data.errors)
      if (data.errors) {
        return
      } else {
        return (
          toast.success("Vendor Signup Successfully"),
          router.push("/DashBoard")

        )
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      setloading(false)
    }


  }


  return (

    <>

      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Vendor Details</h1>
                  <p className="text-muted-foreground text-balance">
                    Enter your details
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="grid gap-3 ">
                    <Label htmlFor="name">Name</Label>
                    <Input onChange={(e) => setvendordetails({ ...vendordetails, name: e.target.value })} value={vendordetails.name} id="name" placeholder="Enter Your Name" type="text" required />
                    <p className="text-sm text-red-500">
                      {error?.name}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="businessName">BusinessName</Label>
                    <Input onChange={(e) => setvendordetails({ ...vendordetails, businessName: e.target.value })} value={vendordetails.businessName} id="businessName" type="text" placeholder="Enter your BusinessName" required />
                    <p className="text-sm text-red-500">
                      {error?.businessName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="contactEmail">Contact Email</Label>

                    </div>
                    <Input onChange={(e) => setvendordetails({ ...vendordetails, contactEmail: e.target.value })} value={vendordetails.contactEmail} id="contactEmail" type="email" placeholder="Enter Contact Email" required />
                    <p className="text-sm text-red-500">
                      {error?.contactEmail}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="contactPhone">Contact Phone</Label>

                    </div>
                    <Input onChange={(e) => setvendordetails({ ...vendordetails, contactPhone: e.target.value })} value={vendordetails.contactPhone} id="contactPhone" type="Number" placeholder="Enter Contact Phone" required />
                    <p className="text-sm text-red-500">
                      {error?.contactPhone}
                    </p>
                  </div>

                </div>

                <div className="grid gap-3">
                  <Label >Address</Label>
                  <Input onChange={(e) => setvendordetails({ ...vendordetails, address: e.target.value })} value={vendordetails.address} id="address" type="text" placeholder="Enter Address " required />
                  <p className="text-sm text-red-500">
                    {error?.address}
                  </p>


                </div>
                <Button type="" onClick={(e) => RegisterVendor(e)} className="w-full flex gap-2 justify-center items-center"
                  disabled={loading}>


                  {
                    loading ? <Loader2 className="animate-spin"></Loader2> : ""}
                  Submit
                </Button>



              </div>
            </form>

          </CardContent>
        </Card>
        <div
          className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>

    </>
  );
}

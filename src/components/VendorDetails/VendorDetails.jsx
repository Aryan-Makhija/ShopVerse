"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"


export function VendorDetailsForm({
  className,
  ...props
}) {


  const [vendordetails, setvendordetails] = useState({ name: "", businessName: "", contactEmail: "", contactPhone: "", address: { street: "", city: "", state: "", country: "", postalCode: "" }, verified: "" })

  const [error, seterror] = useState([])
 
  const router = useRouter()
  

  const RegisterVendor = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/ProductListing/VendorDetails", {
      method: "POST",
      body: JSON.stringify(vendordetails)
    })

    const data = await response.json()

    seterror(data.errors)
    if (data.error) {
    
    } else {
      return router.push("/DashBoard")

    }
  }


  return (
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="street">Street</Label>

                    </div>
                    <Input
                      onChange={(e) =>
                        setvendordetails(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            street: e.target.value,
                          },
                        }))
                      }
                      value={vendordetails.address.street}
                      id="street"
                      type="text"
                      placeholder="Enter Street"
                      required
                    />

                    <p className="text-sm text-red-500">
                      {error?.address?.[0]}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="city">City</Label>

                    </div>
                    <Input
                      onChange={(e) =>
                        setvendordetails(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            city: e.target.value,
                          },
                        }))
                      }
                      value={vendordetails.address.city}
                      id="city"
                      type="text"
                      placeholder="Enter City"
                      required
                    />

                    <p className="text-sm text-red-500">
                      {error?.address?.[1]}
                    </p>
                  </div>

                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="state">State</Label>

                    </div>
                    <Input
                      onChange={(e) =>
                        setvendordetails(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            state: e.target.value,
                          },
                        }))
                      }
                      value={vendordetails.address.state}
                      id="state"
                      type="text"
                      placeholder="Enter State"
                      required
                    />

                    <p className="text-sm text-red-500">
                      {error?.address?.[2]}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="country">Country</Label>

                    </div>
                    <Input
                      onChange={(e) =>
                        setvendordetails(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            country: e.target.value,
                          },
                        }))
                      }
                      value={vendordetails.address.country}
                      id="country"
                      type="text"
                      placeholder="Enter Country"
                      required
                    />

                    <p className="text-sm text-red-500">
                      {error?.address?.[3]}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="postalCode">Postal Code</Label>

                    </div>
                    <Input
                      onChange={(e) =>
                        setvendordetails(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            postalCode: e.target.value,
                          },
                        }))
                      }
                      value={vendordetails.address.postalCode}
                      id="postalCode"
                      type="text"
                      placeholder="Enter Postal Code"
                      required
                    />

                    <p className="text-sm text-red-500">
                      {error?.address?.[4]}
                    </p>
                  </div>

                </div>
              </div>
              <Button type="" onClick={(e) => RegisterVendor(e)} className="w-full">
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
  );
}

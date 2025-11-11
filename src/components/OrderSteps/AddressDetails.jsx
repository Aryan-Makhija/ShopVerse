"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useOrder } from "@/Context/OrderContext"


export function AddressDetails({
  className,
  ...props
}) {


  const {  address, setaddress } = useOrder()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Address Details</h1>

              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="grid gap-3">
                  <Label>Shipping Address</Label>
                  <Input onChange={(e) => setaddress({ ...address, shipping_address: e.target.value })} value={address.shipping_address} id="shipping_address" type="text" placeholder="Enter Shipping Address" required />

                </div>
                <div className="grid gap-3">
                  <Label>Billing Address</Label>
                  <Input onChange={(e) => setaddress({ ...address, billing_address: e.target.value })} value={address.billing_address} id="billing_address" type="text" placeholder="Enter Billing Address " required />

                </div>

              </div>
            </div>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}

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



export function UserDetails({
  className,
  ...props
}) {


  const { user, setuser } = useOrder()
 
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Enter Details</h1>

              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="grid gap-3">
                  <Label>Name</Label>
                  <Input onChange={(e) => setuser({ ...user, name: e.target.value })} value={user.name} id="name" type="text" placeholder="Enter Your Name" required />

                </div>
                <div className="grid gap-3">
                  <Label>Email</Label>
                  <Input onChange={(e) => setuser({ ...user, email: e.target.value })} value={user.email} id="email" type="text" placeholder="Enter Your Email " required />

                </div>
                <div className="grid gap-3">
                  <Label>Phone Number</Label>
                  <Input onChange={(e) => setuser({ ...user, phoneNumber: e.target.value })} value={user.phoneNumber} id="phoneNumber" type="text" placeholder="Enter Your Phone Number" required />

                </div>
              </div>

            
            </div>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}

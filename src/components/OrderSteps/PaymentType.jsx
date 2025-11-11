"use client"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useOrder } from "@/Context/OrderContext"


export function Paymenttype({
  className,
  ...props
}) {



  const { payment, setpayment } = useOrder()




  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Product Type</h1>

              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-3">
                  <Label>ProductType</Label>

                  <Select
                    onValueChange={(value) =>
                      setpayment((prev) => ({ ...prev, payment_type: value }))
                    }
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="CashOnDelivery">Cash On Delivery</SelectItem>

                    </SelectContent>
                  </Select>
                </div>

              </div>


            </div>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}

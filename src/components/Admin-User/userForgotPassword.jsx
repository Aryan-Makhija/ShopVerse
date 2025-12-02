"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { set } from "mongoose"


export function UserForgotPassword({
  className,
  ...props
}) {


  const [userlogin, setuserlogin] = useState({ email: "" })
  const [verifyotp, setverifyotp] = useState({ email: "", otp: "" })
  const [newpass, setnewpass] = useState({ email: "", newpassword: "" })
  const [sendotp, setsendotp] = useState(true)
  const [verify, setverify] = useState(false)
  const [reset, setreset] = useState(false)

  const router = useRouter()

  const handelsendotp = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/user/ForgotPassword/SendOTP", {
      method: "POST",
      body: JSON.stringify(userlogin)
    })

    const data = await response.json()

    setverify(true)
    setsendotp(false)
    toast("OTP Send to your Email")


  }



  const handleverifyotp = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/user/ForgotPassword/CheckOtp", {
      method: "POST",
      body: JSON.stringify(verifyotp)
    })
    const data = await response.json()
    router.refresh()
    toast("Otp Verified Successfully")
    setverify(false)
    setreset(true)

  }



  const handelSetNewPass = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/user/ForgotPassword/ResetPassword", {
      method: "POST",
      body: JSON.stringify(newpass)
    })

    const data = await response.json()
    toast("Password Reset Sucessfully")
    router.refresh()
    router.push("/UserLogin")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      {
        sendotp === true ? <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Forgot Password</h1>

                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Enter Email</Label>
                  <Input onChange={(e) => setuserlogin({ ...userlogin, email: e.target.value })} value={userlogin.email} id="email" type="email" placeholder="m@example.com" required />

                </div>

                <Button type="" onClick={(e) => handelsendotp(e)} className="w-full">
                  Send OTP
                </Button>


              </div>
            </form>

          </CardContent>
        </Card> : ""
      }

      {
        verify === true ? <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Forgot Password</h1>

                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Enter Email</Label>

                  <Input onChange={(e) => setverifyotp({ ...verifyotp, email: e.target.value })} value={verifyotp.email} id="email" type="email" placeholder="user@gmail.com" X>
                  </Input>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Enter OTP</Label>

                  </div>
                  <Input onChange={(e) => setverifyotp({ ...verifyotp, otp: e.target.value })} value={verifyotp.otp} id="otp" type="text" required />

                </div>
                <Button type="" onClick={(e) => handleverifyotp(e)} className="w-full">
                  Verify OTP
                </Button>


              </div>
            </form>

          </CardContent>
        </Card> : ""
      }
      {
        reset === true ? <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Forgot Password</h1>

                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Enter Email</Label>

                  <Input onChange={(e) => setnewpass({ ...newpass, email: e.target.value })} value={newpass.email} id="email" type="email" placeholder="user@gmail.com" X>
                  </Input>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Set New Password</Label>

                  </div>
                  <Input onChange={(e) => setnewpass({ ...newpass, newpassword: e.target.value })} value={newpass.newpassword} id="newpassword" type="Password" required />

                </div>
                <Button type="" onClick={(e) => handelSetNewPass(e)} className="w-full">
                  Confirm
                </Button>


              </div>
            </form>

          </CardContent>
        </Card> : ""
      }





      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"


export function AdminLoginForm({
  className,
  ...props
}) {


  const [adminlogin, setadminlogin] = useState({ email: "", password: "" })
  const [error, seterror] = useState([])

  const [loading, setLoading] = useState(false);

  const router = useRouter()
  const handelSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      const response = await fetch("/api/admin/adminlogin", {
        method: "POST",
        body: JSON.stringify(adminlogin)
      })

      if (!response.ok) {
        seterror(data.errors)
        return
      }
      toast.success("Logged In Successfully")

      const admin = await fetch("/api/admin/adminProfile", {
        method: "GET"
      })

      const admindata = await admin.json()



      const vendor = await fetch("/api/ProductListing/VendorDetails", {
        method: "GET"
      })
      const vendordata = await vendor.json()


      const data = await response.json()



      if (vendordata.adminId === admindata._id) {
        return router.push("/DashBoard")
      } else {
        return router.push("/VendorDetails")
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
      router.refresh()

    }

  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Wellcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input onChange={(e) => setadminlogin({ ...adminlogin, email: e.target.value })} value={adminlogin.email} id="email" type="email" placeholder="m@example.com" required />
                <p className="text-sm text-red-400">{error?.email}</p>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/AdminForgotPassword" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input onChange={(e) => setadminlogin({ ...adminlogin, password: e.target.value })} value={adminlogin.password} id="password" type="password" required />
                <p className="text-sm text-red-400">{error?.password}</p>
              </div>
              <Button
                type="submit"
                onClick={(e) => { handelSignup(e) }}
                className="w-full flex items-center justify-center"
                disabled={loading} // Optional: prevent multiple clicks
              >
                {loading ? (
                  // You can use any spinner you like here
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="grid grid-cols-3 gap-4">

              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <a href="/AdminSignup" className="underline underline-offset-4">
                  Signup
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://img.freepik.com/premium-vector/computer-login-concept-illustration_114360-7962.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
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

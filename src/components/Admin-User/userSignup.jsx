"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export function UsersignupForm({
  className,
  ...props
}) {


  const [usersignup, setusersignup] = useState({ name: "", email: "", password: "" })

  const [error, seterror] = useState([])
  // console.log(error)
  const router = useRouter()
  const handelSignup = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(usersignup)
    })

    const data = await response.json()

    seterror(data.errors)
    if (response.ok) {
      toast.success(" User Signup Successfully")
      router.push("/")
      router.refresh()
    } else if (response.status === 400) {
      toast.error(data.message)

    } else {
      toast.error("Please try again")
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Signup</h1>
                <p className="text-muted-foreground text-balance">
                  Signup to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input onChange={(e) => setusersignup({ ...usersignup, name: e.target.value })} value={usersignup.name} id="name" placeholder="Enter Your Name" type="text" required />
                <p className="text-sm text-red-500">
                  {error?.name}
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input onChange={(e) => setusersignup({ ...usersignup, email: e.target.value })} value={usersignup.email} id="email" type="email" placeholder="m@example.com" required />
                <p className="text-sm text-red-500">
                  {error?.email}
                </p>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                </div>
                <Input onChange={(e) => setusersignup({ ...usersignup, password: e.target.value })} value={usersignup.password} id="password" type="password" placeholder="Create Password" required />
                <p className="text-sm text-red-500">
                  {error?.password}
                </p>
              </div>
              <Button type="" onClick={(e) => handelSignup(e)} className="w-full">
                Create New Account
              </Button>

              <div className="grid grid-cols-3 gap-4">

              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/UserLogin" className="underline underline-offset-4">
                  Login
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

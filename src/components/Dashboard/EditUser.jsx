"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"

const formSchema = z.object({
    username: z.string().min(2, { message: "username must be at least 2 character long" })
        .max(50),
    email: z.string().email({ message: "Invalid email address!" }),
    phone: z.string().min(2),
    location: z.string().min(2),
    role: z.enum(["admin", "user"])

})


const EditUser = () => {
    // const form = useForm < z.infer < typeof formSchema >> ({
    //     resolver: zodResolver(formSchema),
    //     deafultValues: {
    //         username: " ",
    //         email: "",
    //         phone: "",
    //         location: "",
    //         role: ""
    //     }
    // })


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "aryan",
            email: "aryan@gmail.com",
            phone: "+91 123456789",
            location: "India",
            role: "admin"
        }
    });


    const [vendordata, setvendordata] = useState([])
    const [error, seterror] = useState()
    const [vendoreid, setvendorid] = useState()

    setvendorid(vendordata[0]?._id)
    const [update, setupdate] = useState({ name: "", buisinessName: "", contactEmail: "", contactPhone: "" })
    const vendorDetails = async () => {
        const response = await fetch("/api/ProductListing/VendorDetails", {
            method: "GET"
        })

        const data = await response.json()
        setvendordata(data)
        

    }

    const updatevendor = async () => {
        const response = await fetch(`/api/ProductListing/VendorDetails/${vendoreid}`, {
            method: "GET",
            body: update
        })

         const data = await response.json()
          seterror(data.errors)
    }

    useEffect(() => {
        vendorDetails()
    }, [])


    return (
        <>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="mb-4">Edit User</SheetTitle>
                    <SheetDescription className="overflow-auto h-screen" asChild>



                        <form className="space-y-5 overflow-auto h-screen">
                            {
                                vendordata.map((item, index) => {
                                    return (
                                        <div key={index} className="grid gap-5">


                                            < div className="grid  gap-3" >
                                                <label>Username</label>
                                                <input
                                                    type="text"
                                                    placeholder={item.name}
                                                    className="border p-2 w-full rounded-md"
                                                />
                                                <p className="text-sm text-red-500">{error?.name}</p>
                                            </div>

                                            <div className="grid  gap-3">
                                                <label>Business Name</label>
                                                <input
                                                    type="email"
                                                    placeholder={item.businessName}
                                                    className="border p-2 w-full rounded-md"
                                                />
                                            </div>
                                            <div className="grid  gap-3">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    placeholder={item.contactEmail}
                                                    className="border p-2 w-full rounded-md"
                                                />
                                            </div>

                                            <div className="grid  gap-3">
                                                <label>Phone</label>
                                                <input
                                                    type="tel"
                                                    placeholder={item.contactPhone}
                                                    className="border p-2 w-full rounded-md"
                                                />
                                            </div>


                                        </div>
                                    )
                                })}
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                                Submit
                            </button>

                        </form>



                    </SheetDescription>
                </SheetHeader>
            </SheetContent >

        </>


    )
}

export default EditUser
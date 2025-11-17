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
import { toast } from "sonner"


const EditUser = () => {
    const [vendordata, setvendordata] = useState([])
    const [error, seterror] = useState([])
    // const [vendoreid, setvendorid] = useState()
    const vendoreid = vendordata[0]?._id
    const [update, setupdate] = useState({ name: "", businessName: "", contactEmail: "", contactPhone: "", address: "" })


    const vendorDetails = async () => {
        const response = await fetch("/api/ProductListing/VendorDetails", {
            method: "GET"
        })

        const data = await response.json()

        setvendordata(data)

    }

    const updatevendor = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/ProductListing/VendorDetails/${vendoreid}`, {
            method: "PUT",
            body: JSON.stringify(update)
        })

        const data = await response.json()

        seterror(data.errors)

        if (response.ok) {
            return toast.success("Admin Profile Update Successfully")
        }
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
                                                    onChange={(e) => { setupdate({ ...update, name: e.target.value }) }} value={update.name}
                                                />
                                                <p className="text-sm text-red-500">{error?.name}</p>
                                            </div>

                                            <div className="grid  gap-3">
                                                <label>Business Name</label>
                                                <input
                                                    type="text"
                                                    placeholder={item.businessName}
                                                    className="border p-2 w-full rounded-md"
                                                    onChange={(e) => { setupdate({ ...update, businessName: e.target.value }) }} value={update.businessName}
                                                />
                                                     <p className="text-sm text-red-500">{error?.businessName}</p>
                                            </div>
                                            <div className="grid  gap-3">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    placeholder={item.contactEmail}
                                                    className="border p-2 w-full rounded-md"
                                                    onChange={(e) => { setupdate({ ...update, contactEmail: e.target.value }) }} value={update.contactEmail}
                                                />
                                                <p className="text-sm text-red-500">{error?.contactEmail}</p>
                                            </div>

                                            <div className="grid  gap-3">
                                                <label>Phone</label>
                                                <input
                                                    type="tel"
                                                    placeholder={item.contactPhone}
                                                    className="border p-2 w-full rounded-md"
                                                    onChange={(e) => { setupdate({ ...update, contactPhone: e.target.value }) }} value={update.contactPhone}
                                                />
                                                <p className="text-sm text-red-500">{error?.contactPhone}</p>
                                            </div>
                                            <div className="grid  gap-3">
                                                <label>Address</label>
                                                <input
                                                    type="text"
                                                    placeholder={item.address}
                                                    className="border p-2 w-full rounded-md"
                                                    onChange={(e) => { setupdate({ ...update, address: e.target.value }) }} value={update.address}
                                                />
                                                <p className="text-sm text-red-500">{error?.address}</p>
                                            </div>


                                        </div>
                                    )
                                })}
                            <button onClick={(e) => updatevendor(e)} type="submit" className="bg-blue-500 text-white p-2 rounded">
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
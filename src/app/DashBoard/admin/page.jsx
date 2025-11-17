"use client"
import CardList from "@/components/Dashboard/CardList"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"
import { BadgeCheck } from "lucide-react"
import EditUser from "@/components/Dashboard/EditUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppLineChart } from "@/components/Dashboard/ApplineChart"
import { useEffect, useState } from "react"
const AdminPage = () => {

    const [vendor, setvendor] = useState([])

    const vendordetails = async () => {
        const response = await fetch("/api/ProductListing/VendorDetails", {
            method: "GET"
        })
        const data = await response.json()
        setvendor(data)

    }

    useEffect(() => {
        vendordetails()
    }, [])



    return (

        <div>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">DashBoard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Aryan</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>



            <div className="mt-4 flex flex-col xl:flex-row gap-8">
                {/* left */}
                <div className="w-full xl:w-1/3 space-y-6">
                    {/* User badges container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h1 className="text-xl font-semibold">User badges</h1>

                        <div className="flex gap-4 mt-4">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <BadgeCheck size={36} className="  p-2 rounded-full text-primary-foreground bg-blue-400"></BadgeCheck>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Verified user</h1>
                                    <p className="text-sm text-muted-foreground">this user has been verified by the admin</p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    {/* Information Container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">

                        <div className="flex items-center justify-between">

                            <h1 className="text-lg">User Information</h1>
                            <Sheet>
                                <SheetTrigger className="bg-white rounded p-1 text-black">Edit User</SheetTrigger>
                                <EditUser></EditUser>
                            </Sheet>



                        </div>


                        {
                            vendor.map((item, index) => {
                                return (
                                    <div key={index} className="w-full border-2 border-white rounded-lg p-4 mt-5">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-white font-semibold">Name</p>
                                            <p className="text-white font-medium">{item.name}</p>
                                        </div>

                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-white font-semibold">Business Name</p>
                                            <p className="text-white font-medium">{item.businessName}</p>
                                        </div>

                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-white font-semibold">Contact Email</p>
                                            <p className="text-white font-medium">{item.contactEmail}</p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <p className="text-white font-semibold">Contact Phone</p>
                                            <p className="text-white font-medium">{item.contactPhone}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-white font-semibold">Address </p>
                                            <p className="text-white font-medium">{item.address}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }



                    </div>
                    {/* Card list Container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <CardList title="Recent Transaction"></CardList>
                    </div>
                </div>

                {/* right */}
                <div className="w-full xl:w-2/3 space-y-6">
                    {/* User Card Container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">

                        <div className="bg-primary-foreground p-4 rounded-lg">
                            <div className=" flex items-center gap-2">

                                <Avatar className="size-12">
                                    <AvatarImage src="https://i.pinimg.com/1200x/21/ac/7d/21ac7dbd2e678acd2d86286b62cf9b4d.jpg">
                                    </AvatarImage>
                                    <AvatarFallback>
                                        AM
                                    </AvatarFallback>
                                </Avatar>
                                <h1>Aryan</h1>
                            </div>

                            <span className=" text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem et hic officia ab praesentium minima ut animi voluptas repudiandae maxime!</span>
                        </div>


                    </div>
                    <div className="bg-primary-foreground  space-y-4 p-4 rounded-lg">
                        <h1 className="text-lg ">User Activity</h1>
                        <AppLineChart></AppLineChart>
                    </div>
                </div>

            </div>

        </div>




    )
}

export default AdminPage
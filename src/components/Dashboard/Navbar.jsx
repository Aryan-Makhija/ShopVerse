"use client"
import { LogOut, Moon, Settings, Sun, User } from "lucide-react"
import Link from "next/link"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "../ui/sidebar"
import { useRouter } from "next/navigation"




const DashBoradNavbar = () => {
    const { setTheme } = useTheme()

    const router = useRouter()


    const Logout = async () => {
        const response = await fetch("/api/admin/adminLogout", {
            method: "GET"
        })

        const data = await response.json()
        router.refresh()
        if (!data.error) {
            return router.push("/")
        }

    }
    return (
        <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-10">

            <SidebarTrigger></SidebarTrigger>
            <div className="flex items-center gap-4">

                <Link href="/DashBoard">DashBoard</Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


                <DropdownMenu>
                    <DropdownMenuTrigger><Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/DashBoard/admin/admin">
                            <DropdownMenuItem>
                                <User className="h-[1.2rem] w-[1.2rem] mr-2"></User>

                                <Link href="/DashBoard/admin">
                                Profile
                                
                                </Link>
                            </DropdownMenuItem>

                        </Link>
                        <DropdownMenuItem>

                            <Settings className="h-[1.2rem] w-[1.2rem] mr-2"></Settings>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={Logout}>
                            <LogOut className="h-[1.2rem] w-[1.2rem] mr-2"></LogOut>
                            Logout</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav >
    )
}

export default DashBoradNavbar
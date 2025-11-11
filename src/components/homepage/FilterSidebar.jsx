import { Calendar, ChevronDown, ChevronUp, Home, Inbox, NotebookTabsIcon, Plus, Projector, Search, Settings, User2 } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "../ui/sidebar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Collapsible, CollapsibleContent } from "../ui/collapsible"
import { CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"



const items = [
    {
        title: "Home",
        url: "/DashBoard",
        icon: Home
    },
    {
        title: "Admin",
        url: "/DashBoard/admin/admin",
        icon: Inbox
    },
    {
        title: "Login",
        url: "/DashBoard/payments",
        icon: Calendar
    },
    {
        title: "Inventory",
        url: "/DashBoard/Inventory",
        icon: Search
    },
    {
        title: "Orders",
        url: "/DashBoard/Orders",
        icon: NotebookTabsIcon
    },
]
const FilterSidebar = () => {
    return (
        <Sidebar collapsible="icon">

            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>

                            <span>Filters</span>

                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator></SidebarSeparator>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem>




                                <div className="flex items-center gap-3">
                                    <Checkbox id="terms" />
                                    <Label htmlFor="terms">Accept terms and conditions</Label>
                                
                                </div>


                                <SidebarMenuBadge> 24</SidebarMenuBadge>

                            </SidebarMenuItem>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* COLAPSIBLE SIDE GROUP */}
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Products
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <SidebarGroupAction>
                            {/* <Plus></Plus> */}

                        </SidebarGroupAction>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/DashBoard/AllProductsDetails">
                                                <Projector></Projector>
                                                See All Products
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/DashBoard/AddProduct">
                                                <Plus></Plus>
                                                Add product
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>

                {/* Nested  */}


            </SidebarContent>



            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Username
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                            // className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default FilterSidebar
"use client"
import { IoBag } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { GoHeartFill } from "react-icons/go";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Box, ChevronRight, CrossIcon, LogOut, MenuIcon, Moon, MoreHorizontal, SearchIcon, Settings, Sun, User } from "lucide-react";
import { Mail, UserCircle, LogIn } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "../ui/badge";

import StaggeredMenu from "../StaggeredMenu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { toast } from "sonner";
import Header from "./Header";
import { FlipWords } from "../ui/flip-words";

export const Navbar = () => {

    const menuGroups = [
        {
            title: "Men",
            items: ["T-Shirts", "Jeans", "Jackets", "Shoes"],
        },
        {
            title: "Women",
            items: ["Dresses", "Tops", "Handbags", "Heels"],
        },
        {
            title: "Kids",
            items: ["T-Shirts", "Shorts", "Accessories", "Toys"],
        },
        {
            title: "Accessories",
            items: ["Watches", "Belts", "Sunglasses"],
        },
    ];
    const [search, setSearch] = useState("");
    const router = useRouter();



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/AllProducts?query=${encodeURIComponent(search.trim())}`);
    };


    const { setTheme } = useTheme()
    const [active, setActive] = useState(null);

    const [profile, setprofile] = useState([])

    const [showOptions, setShowOptions] = useState(false);
    const [order, setorder] = useState([])


    const [status, setstatus] = useState("")
    const [cartitem, setcartitem] = useState([])
    const [wishlist, setwishlist] = useState([])


    const myorder = async () => {
        const response = await fetch("/api/Order", {
            method: "GET"
        })

        const data = await response.json()
        router.refresh()
        setorder(data)
    }


    const userprofile = async () => {

        const response = await fetch("/api/user/userProfile", {
            method: "GET"
        })
        const data = await response.json()

        if (response.ok) {
            setprofile([data])
        } else {
            router.push("/UserLogin")
        }

    }



    const logout = async () => {
        const response = await fetch("/api/user/userLogout", {
            method: "GET"
        })

        if (response.ok) {
            toast.success("Logged Out Successfully")
            router.refresh()
            router.push("/")
        }


    }



    const cart = async () => {
        const response = await fetch("/api/CartItems", {
            method: "GET"
        })

        const data = await response.json()
        router.refresh()
        setcartitem(data)
    }

    const getwishlist = async () => {

        const response = await fetch("/api/WishList", {
            method: "GET"
        })
        const data = await response.json()

        setwishlist(data)
    }


    useEffect(() => {
        myorder(),

            cart()

    }, [])

    useEffect(() => {
        getwishlist()
    }, [])

    const words = [
        "Stay in Style",
        "Trending Now",
        "Everyday Elevated",
    ];


    return (


        <div className="flex sticky   top-0  border-red-500   inset-x-0 justify-around items-center mx-auto z-50   w-full rounded-b-2xl   ">

            {/* <Link href="/">
                <div className="text-3xl font-serif font-bold px-8 py-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg hidden xl:block">

                    ShopVerse
                </div>

            </Link> */}


            <div
                className="
      hidden md:flex items-center
      px-8 py-3
      text-3xl font-serif font-bold
      text-transparent bg-clip-text
      bg-gradient-to-r  from-red-400 via-pink-500 to-pink-600
      drop-shadow-lg
      whitespace-nowrap
    "
            >
                <FlipWords words={words} />
            </div>

            {/* Menu Item div  */}
            <div className=" hidden xl:block relative z-[60]  ">


                <Menu setActive={setActive} className="w-full">


                    <MenuItem setActive={setActive} active={active} item="Mens">
                        <p className="text-xl align-center text-pink-700 font-semibold">Mens</p>
                        <div className=" shadow-lg rounded-lg p-8 max-w-6xl mx-auto mt-10">
                            <div className="flex gap-10 justify-between items-start flex-wrap">

                                {/* First Column Group */}
                                <div className="grid grid-cols-2 gap-10 border-r pr-10">
                                    {/* Clothing */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Clothing</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink className="cursor-pointer" onClick={(e) => {
                                                const value = "t-shirt"
                                                setSearch(value), handleSubmit(e)
                                            }}>T-Shirts</HoveredLink>
                                            <HoveredLink className="cursor-pointer" onClick={(e) => {
                                                const value = "Jeans"
                                                setSearch(value), handleSubmit(e)
                                            }}>Jeans</HoveredLink>
                                            <HoveredLink href="#">Hoodies</HoveredLink>
                                            <HoveredLink href="#">Jackets</HoveredLink>
                                            <HoveredLink href="#">Chinos</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Footwear */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Footwear</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Sneakers</HoveredLink>
                                            <HoveredLink href="#">Formal Shoes</HoveredLink>
                                            <HoveredLink href="#">Sandals</HoveredLink>
                                            <HoveredLink href="#">Loafers</HoveredLink>
                                            <HoveredLink href="#">Sports Shoes</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Column Group */}
                                <div className="grid grid-cols-2 gap-10 pl-10">
                                    {/* Accessories */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Accessories</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Watches</HoveredLink>
                                            <HoveredLink href="#">Wallets</HoveredLink>
                                            <HoveredLink href="#">Belts</HoveredLink>
                                            <HoveredLink href="#">Backpacks</HoveredLink>
                                            <HoveredLink href="#">Sunglasses</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Sportswear */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Sportswear</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Running Shoes</HoveredLink>
                                            <HoveredLink href="#">Gym Wear</HoveredLink>
                                            <HoveredLink href="#">Tracksuits</HoveredLink>
                                            <HoveredLink href="#">Athletic Shorts</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </MenuItem>


                    <MenuItem setActive={setActive} active={active} item="Womens">
                        <p className="text-xl align-center text-pink-700 font-semibold">Womens</p>
                        <div className="bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto mt-10">
                            <div className="flex gap-10 justify-between items-start flex-wrap">

                                {/* First Column Group */}
                                <div className="grid grid-cols-2 gap-10 border-r pr-10">
                                    {/* Clothing */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Clothing</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Tops & T-Shirts</HoveredLink>
                                            <HoveredLink href="#">Dresses & Jumpsuits</HoveredLink>
                                            <HoveredLink href="#">Kurtas & Suits</HoveredLink>
                                            <HoveredLink href="#">Jeans & Trousers</HoveredLink>
                                            <HoveredLink href="#">Skirts & Shorts</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Footwear */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Footwear</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Heels</HoveredLink>
                                            <HoveredLink href="#">Flats</HoveredLink>
                                            <HoveredLink href="#">Boots</HoveredLink>
                                            <HoveredLink href="#">Sneakers</HoveredLink>
                                            <HoveredLink href="#">Ethnic Footwear</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Column Group */}
                                <div className="grid grid-cols-2 gap-10 pl-10">
                                    {/* Accessories */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Accessories</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Jewellery</HoveredLink>
                                            <HoveredLink href="#">Handbags & Wallets</HoveredLink>
                                            <HoveredLink href="#">Scarves & Belts</HoveredLink>
                                            <HoveredLink href="#">Sunglasses</HoveredLink>
                                            <HoveredLink href="#">Hair Accessories</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Beauty */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Beauty</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Skincare</HoveredLink>
                                            <HoveredLink href="#">Makeup</HoveredLink>
                                            <HoveredLink href="#">Fragrances</HoveredLink>
                                            <HoveredLink href="#">Haircare</HoveredLink>
                                            <HoveredLink href="#">Bath & Body</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </MenuItem>


                    <MenuItem setActive={setActive} active={active} item="Kids">
                        <p className="text-xl align-center text-pink-700 font-semibold">Kids</p>
                        <div className="bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto mt-10">
                            <div className="flex gap-10 justify-between items-start flex-wrap">

                                {/* First Column Group */}
                                <div className="grid grid-cols-2 gap-10 border-r pr-10">
                                    {/* Boys Clothing */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Boys Clothing</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">T-Shirts</HoveredLink>
                                            <HoveredLink href="#">Shirts</HoveredLink>
                                            <HoveredLink href="#">Jeans</HoveredLink>
                                            <HoveredLink href="#">Shorts</HoveredLink>
                                            <HoveredLink href="#">Sweatshirts</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Girls Clothing */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Girls Clothing</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Dresses</HoveredLink>
                                            <HoveredLink href="#">Tops & Tunics</HoveredLink>
                                            <HoveredLink href="#">Leggings</HoveredLink>
                                            <HoveredLink href="#">Skirts</HoveredLink>
                                            <HoveredLink href="#">Co-ord Sets</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Column Group */}
                                <div className="grid grid-cols-2 gap-10 pl-10">
                                    {/* Footwear */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Footwear</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Sandals</HoveredLink>
                                            <HoveredLink href="#">Sneakers</HoveredLink>
                                            <HoveredLink href="#">School Shoes</HoveredLink>
                                            <HoveredLink href="#">Slip-Ons</HoveredLink>
                                            <HoveredLink href="#">Boots</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Toys & Games */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Toys & Games</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Educational Toys</HoveredLink>
                                            <HoveredLink href="#">Action Figures</HoveredLink>
                                            <HoveredLink href="#">Dolls</HoveredLink>
                                            <HoveredLink href="#">Board Games</HoveredLink>
                                            <HoveredLink href="#">Soft Toys</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </MenuItem>


                    <MenuItem setActive={setActive} active={active} item="Home&Accessories">
                        <p className="text-xl align-center text-pink-700 font-semibold">Home & Accessories</p>
                        <div className="bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto mt-10">
                            <div className="flex gap-10 justify-between items-start flex-wrap">

                                {/* First Column Group */}
                                <div className="grid grid-cols-2 gap-10 border-r pr-10">
                                    {/* Home Decor */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Home Decor</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Wall Art</HoveredLink>
                                            <HoveredLink href="#">Clocks</HoveredLink>
                                            <HoveredLink href="#">Lamps & Lighting</HoveredLink>
                                            <HoveredLink href="#">Vases</HoveredLink>
                                            <HoveredLink href="#">Showpieces</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Kitchen & Dining */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Kitchen & Dining</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Cookware</HoveredLink>
                                            <HoveredLink href="#">Dinner Sets</HoveredLink>
                                            <HoveredLink href="#">Storage Containers</HoveredLink>
                                            <HoveredLink href="#">Mugs & Glasses</HoveredLink>
                                            <HoveredLink href="#">Kitchen Tools</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Column Group */}
                                <div className="grid grid-cols-2 gap-10 pl-10">
                                    {/* Furnishings */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Furnishings</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Bedsheets</HoveredLink>
                                            <HoveredLink href="#">Curtains</HoveredLink>
                                            <HoveredLink href="#">Cushions & Covers</HoveredLink>
                                            <HoveredLink href="#">Blankets & Quilts</HoveredLink>
                                            <HoveredLink href="#">Towels</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Storage & Organizers */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Storage & Organizers</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Wardrobe Organizers</HoveredLink>
                                            <HoveredLink href="#">Shoe Racks</HoveredLink>
                                            <HoveredLink href="#">Laundry Baskets</HoveredLink>
                                            <HoveredLink href="#">Wall Shelves</HoveredLink>
                                            <HoveredLink href="#">Drawers & Boxes</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </MenuItem>


                    <MenuItem setActive={setActive} active={active} item="Electronics" >
                        <p className="text-xl align-center text-pink-700 font-semibold ">Electronics</p>

                        <div className="bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto mt-10">
                            <div className="flex gap-10 justify-between items-start flex-wrap">

                                {/* First Column Group */}
                                <div className="grid grid-cols-2 gap-10 border-r pr-10">
                                    {/* Mobiles & Accessories */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Mobiles & Accessories</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Smartphones</HoveredLink>
                                            <HoveredLink href="#">Phone Cases</HoveredLink>
                                            <HoveredLink href="#">Chargers</HoveredLink>
                                            <HoveredLink href="#">Power Banks</HoveredLink>
                                            <HoveredLink href="#">Screen Protectors</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Audio Devices */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Audio</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Wireless Earbuds</HoveredLink>
                                            <HoveredLink href="#">Headphones</HoveredLink>
                                            <HoveredLink href="#">Bluetooth Speakers</HoveredLink>
                                            <HoveredLink href="#">Soundbars</HoveredLink>
                                            <HoveredLink href="#">Home Theaters</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Column Group */}
                                <div className="grid grid-cols-2 gap-10 pl-10">
                                    {/* Computers & Laptops */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Computers & Laptops</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Laptops</HoveredLink>
                                            <HoveredLink href="#">Keyboards & Mice</HoveredLink>
                                            <HoveredLink href="#">Laptop Bags</HoveredLink>
                                            <HoveredLink href="#">Monitors</HoveredLink>
                                            <HoveredLink href="#">External Drives</HoveredLink>
                                        </div>
                                    </div>

                                    {/* Smart Gadgets */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-semibold text-gray-800 border-b pb-1">Smart Gadgets</h4>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <HoveredLink href="#">Smart Watches</HoveredLink>
                                            <HoveredLink href="#">Fitness Bands</HoveredLink>
                                            <HoveredLink href="#">Streaming Devices</HoveredLink>
                                            <HoveredLink href="#">Smart Home Devices</HoveredLink>
                                            <HoveredLink href="#">Security Cameras</HoveredLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </MenuItem>

                </Menu>


            </div>


            {/* Search Input  */}


            <div className="">
                <form
                    onSubmit={handleSubmit}
                    className="w-[200px] sm:w-[280px] mx-2"
                >
                    <div className="relative flex items-center border rounded overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-pink-500 transition">

                        {/* Brand Logo SV */}
                        <div className="absolute left-2 flex items-center pointer-events-none">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 font-bold text-sm sm:text-lg font-serif">
                                SV
                            </span>
                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            className="
          w-full
          pl-8 sm:pl-10
          pr-9
          py-1.5
          text-sm sm:text-base
          outline-none
          border-none
          placeholder-gray-400
        "
                        />

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="
          absolute right-1
          flex items-center justify-center
          px-2 py-1.5
          bg-pink-500 hover:bg-pink-600
          text-white
          rounded
          transition
          cursor-pointer
        "
                        >
                            <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>

                    </div>
                </form>
            </div>







            {/* profile  ,cart , wishlist , mobilemenu  */}
            <div className=" w-40  flex justify-around">



                {/* Mobile menu  */}


                <div className=" flex justify-around items-center md:gap-9 gap-2 w-full">


                    <Link href="/Cart" className="relative inline-block   justify-center items-center">
                        {/* Icon */}

                        <Tooltip>
                            <TooltipTrigger>

                                <IoBag className="cursor-pointer  md:w-7 md:h-7 w-6 h-6 text-pink-400" />

                            </TooltipTrigger>
                            <TooltipContent >
                                <p>Shopping Bag</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Badge */}
                        {cartitem.length > 0 && (
                            <Badge
                                className="absolute -top-1 -right-2 rounded-full text-[10px] px-1.5 py-0.5 bg-red-500 text-white"
                            >
                                {cartitem.length}
                            </Badge>
                        )}
                    </Link>

                    <Link href="/WishList" className=" relative inline-block justify-center  items-center">


                        <Tooltip>
                            <TooltipTrigger>

                                <GoHeartFill className=" cursor-pointer md:w-7 md:h-7 h-6 w-6 text-rose-600" />

                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Wishlist</p>
                            </TooltipContent>
                        </Tooltip>
                        {wishlist.length > 0 && (
                            <Badge
                                className="absolute -top-1 -right-2 rounded-full text-[10px] px-1.5 py-0.5 bg-red-500 text-white"
                            >
                                {wishlist.length}
                            </Badge>
                        )}
                    </Link>

                    <DropdownMenu className="w-40 h-30 ">
                        <DropdownMenuTrigger>

                            <Tooltip>
                                <TooltipTrigger>


                                    <Avatar className=" cursor-pointer md:w-7 md:h-7 w-6 h-6 " >
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Profile</p>
                                </TooltipContent>
                            </Tooltip>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-70 h-70">
                            <DropdownMenuLabel>Welcome</DropdownMenuLabel>
                            <DropdownMenuLabel className="text-sm ">To access and manage account</DropdownMenuLabel>
                            <DropdownMenuSeparator />


                            <Link href="/UserLogin">
                                <DropdownMenuItem className=" ml-[-6px] ">

                                    <Button className=" bg-pink-500 hover:bg-white hover:border-2 hover:text-pink-500 hover:border-pink-500 cursor-pointer">
                                        Login / Signup
                                    </Button>
                                </DropdownMenuItem>
                            </Link>

                            <Link href="">
                                <DropdownMenuItem asChild>
                                    {/* <Sheet asChild>
                                    <SheetTrigger onClick={userprofile} className="flex gap-2"><User className="h-[1.2rem] w-[1.2rem] mr-2"></User>Profile</SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>My Profile</SheetTitle>
                                            <SheetDescription>

                                                {profile.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col items-center justify-center gap-6 p-6 bg-white rounded-xl shadow-md max-w-md mx-auto mt-10"
                                                    >
                                                        <div className="w-24 h-24 rounded-full bg-pink-400 flex items-center justify-center text-gray-500 text-sm">
                                                            <User ></User>
                                                        </div>

                                                        <p className="text-lg text-gray-700 font-medium">{item.email}</p>

                                                        <div className="w-full text-center">
                                                            <p className="text-sm text-gray-500 uppercase tracking-wide">Name</p>
                                                            <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                                                        </div>
                                                    </div>
                                                ))
                                                }


                                            </SheetDescription>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet> */}
                                    <Sheet asChild>
                                        <SheetTrigger
                                            onClick={userprofile}
                                            className="flex items-center gap-2 cursor-pointer hover:text-pink-600 transition"
                                        >
                                            <User className="h-[1.2rem] w-[1.2rem]" />
                                            Profile
                                        </SheetTrigger>

                                        <SheetContent className="p-6 flex flex-col">
                                            <SheetHeader>
                                                <SheetTitle className="text-2xl font-semibold text-gray-800">My Profile</SheetTitle>
                                                <SheetDescription className="text-gray-500">
                                                    Manage your account, view details, and access quick actions.
                                                </SheetDescription>
                                            </SheetHeader>

                                            {/* CONTENT */}
                                            <div className="mt-6 flex-1 overflow-auto">
                                                {profile.length > 0 ? (
                                                    profile.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl shadow-md border max-w-md mx-auto"
                                                        >
                                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-pink-300 flex items-center justify-center shadow-md">
                                                                <UserCircle className="text-white w-14 h-14" />
                                                            </div>

                                                            <div className="w-full text-center">
                                                                <p className="text-gray-500 text-xs uppercase tracking-wide">Email</p>
                                                                <p className="text-lg font-medium text-gray-800 flex items-center justify-center gap-2 mt-1">
                                                                    <Mail className="w-4 h-4 text-gray-500" /> {item.email}
                                                                </p>
                                                            </div>

                                                            <div className="w-full text-center">
                                                                <p className="text-gray-500 text-xs uppercase tracking-wide">Name</p>
                                                                <p className="text-xl font-semibold text-gray-900">{item.name}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    // EMPTY PROFILE (Not Logged In)
                                                    <div className="flex flex-col items-center justify-center h-full text-center mt-10">
                                                        <UserCircle className="w-20 h-20 text-gray-400 mb-4" />
                                                        <h2 className="text-xl font-semibold text-gray-800">You're not logged in</h2>
                                                        <p className="text-gray-500 mt-2 mb-4">
                                                            Please log in to view and manage your profile details.
                                                        </p>
                                                        <button
                                                            onClick={() => router.push("/UserLogin")}
                                                            className="px-5 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
                                                        >
                                                            <LogIn className="w-4 h-4 inline mr-2" />
                                                            Login
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* FOOTER ACTIONS */}
                                            {profile.length > 0 && (
                                                <div className="mt-6 border-t pt-4">
                                                    <button
                                                        onClick={logout}
                                                        className="w-full flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                                                    >
                                                        <LogOut className="w-4 h-4" /> Logout
                                                    </button>
                                                </div>
                                            )}
                                        </SheetContent>
                                    </Sheet>


                                </DropdownMenuItem>

                            </Link>

                            <Link href="/MyOrders">
                                <DropdownMenuItem className="flex gap-2 ml-[-6px] hover:text-pink-500 cursor-pointer transition" >
                                    <Box className="h-[1.2rem] w-[1.2rem] hover:text-pink-500  transition"></Box>
                                    My Orders
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={logout} variant="destructive" className="flex gap-2 ml-[-5px] font-semibold" >
                                <LogOut className="h-[1.2rem] w-[1.2rem]"></LogOut>
                                Logout</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>



                </div>








            </div>




        </div >




    )
}




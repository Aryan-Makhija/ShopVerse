"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Menu, ShoppingBag, Home, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
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
import { GoHeartFill } from "react-icons/go";
import { useRouter } from "next/navigation";
const FooterNavbar = () => {
    const [active, setActive] = useState("home");
    const [wishlist, setwishlist] = useState([])

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


    const navItems = [
        {
            id: "home",
            icon: Home,
            link: "/", // home page URL
            isLink: true,
        },

        {
            id: "orders",
            icon: ShoppingBag,
            link: "/MyOrders", // orders page URL
            isLink: true,
        },
        {
            id: "wishlist",
            icon: GoHeartFill,
            isWishlist: true, // special wishlist icon
        },
        {
            id: "menu",
            icon: Menu,
            isSheet: true, // open menu sheet
        },
    ];
    const [search, setSearch] = useState("");


    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/AllProducts?query=${encodeURIComponent(search.trim())}`);
    };

    const getwishlist = async () => {

        const response = await fetch("/api/WishList", {
            method: "GET"
        })
        const data = await response.json()

        setwishlist(data)
    }
    useEffect(() => {
        getwishlist()
    }, [])
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md flex justify-around items-center h-16 xl:hidden">
            {navItems.map(({ id, icon: Icon, link, isSheet, isWishlist }) => (
                <div key={id} className="relative flex flex-col items-center justify-center w-full h-full">
                    {/* Active top indicator */}
                    {active === id && (
                        <span className="absolute top-0 w-8 h-[3px] bg-pink-500 rounded-full" />
                    )}

                    {/* Icon button */}
                    {isSheet ? (
                        // Menu Sheet
                        <Sheet>
                            <SheetTrigger asChild>
                                <button
                                    onClick={() => setActive(id)}
                                    className={`p-2 rounded-full transition ${active === id ? "bg-pink-100" : ""
                                        }`}
                                >
                                    <Icon
                                        size={24}
                                        className={`${active === id ? "text-pink-600" : "text-pink-500"
                                            }`}
                                    />
                                </button>
                            </SheetTrigger>

                            <SheetContent side="left" className="w-72 p-0 bg-white shadow-xl">
                                {/* Header */}
                                <SheetHeader className="p-4 border-b bg-pink-50">
                                    <SheetTitle className="text-lg font-semibold text-pink-600">
                                        Shop Categories
                                    </SheetTitle>
                                </SheetHeader>

                                {/* Accordion Navigation */}
                                <nav className="p-2">
                                    <Accordion type="multiple" className="w-full">
                                        {menuGroups.map((group) => (
                                            <AccordionItem
                                                key={group.title}
                                                value={group.title}
                                                className="border-b last:border-b-0"
                                            >
                                                <AccordionTrigger className="flex justify-between items-center px-3 py-3 text-base font-medium rounded-md hover:bg-pink-100 hover:text-pink-600 transition">
                                                    <div className="flex items-center gap-2">
                                                        {group.icon && (
                                                            <group.icon className="h-5 w-5 text-pink-400 group-hover:text-pink-600 transition" />
                                                        )}
                                                        {group.title}
                                                    </div>
                                                </AccordionTrigger>

                                                <AccordionContent className="px-3 pb-2">
                                                    <ul className="space-y-1">
                                                        {group.items.map((item) => (
                                                            <li key={item}>
                                                                <SheetClose asChild>
                                                                    <button
                                                                        className="flex items-center w-full text-left text-sm px-2 py-2 rounded-md hover:bg-pink-50 hover:text-pink-500 transition"
                                                                        onClick={(e) => {
                                                                            const value = item.toLowerCase();
                                                                            setSearch(value);
                                                                            handleSubmit(e);
                                                                        }}
                                                                    >
                                                                        <ChevronRight className="mr-2 h-4 w-4 text-pink-300 group-hover:text-pink-500 transition" />
                                                                        {item}
                                                                    </button>
                                                                </SheetClose>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    ) : isWishlist ? (
                        // Wishlist Icon
                        <Link href="/WishList" onClick={() => setActive(id)}>
                            <div
                                className={`relative flex items-center justify-center p-2 rounded-full transition ${active === id ? "bg-pink-100" : ""
                                    }`}
                            >
                                <GoHeartFill
                                    size={24}
                                    className={`${active === id ? "text-pink-600" : "text-rose-600"
                                        }`}
                                />
                                {wishlist.length > 0 && (
                                    <Badge className="absolute -top-1 -right-2 rounded-full text-[10px] px-1.5 py-0.5 bg-red-500 text-white">
                                        {wishlist.length}
                                    </Badge>
                                )}
                            </div>
                        </Link>
                    ) : (
                        // Normal Link Icons (Home / Orders)
                        <Link
                            href={link}
                            onClick={() => setActive(id)}
                            className={`flex items-center justify-center p-2 rounded-full transition ${active === id ? "bg-pink-100" : ""
                                }`}
                        >
                            <Icon
                                size={24}
                                className={`${active === id ? "text-pink-600" : "text-pink-500"
                                    }`}
                            />
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FooterNavbar;

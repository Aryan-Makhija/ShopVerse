
"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Flame,
    Sparkles,
    Tag,
    Truck,
    Heart,
    ShieldCheck, RefreshCcw,
    Trophy,
    Star,
    Clock,
    ThumbsUp,
    BadgeCheck,
    BarChart3,
    Percent,
    Trash2,
    Crown,
    ShoppingBag
} from "lucide-react";
import React, { useEffect, useState } from 'react'


import Link from "next/link";
import { Navbar } from "./Navbar";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const Header = () => {


    const [showQuickActions, setShowQuickActions] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setShowQuickActions(window.scrollY < 40);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (


        <div className="fixed sticky top-0 inset-x-0 z-50">
            <motion.header
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="
          relative
          backdrop-blur-xl
        
          border-b border-slate-200/70
          shadow-[0_10px_25px_rgba(0,0,0,0.08)]
        "
            >
                {/* SOFT TINT */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-t
            from-[#faf6e3] via-[#fffdf0] to-[rgb(250,248,225)]
            pointer-events-none
            rounded-b-3xl border-b-2 border-pink-500
          "
                />

                <div className="relative w-full mx-auto px-4 pt-3">

                    {/* BRAND ROW */}
                    <div className="flex items-center justify-between">

                        {/* LOGO + BRAND */}
                        <Link href="/" className="flex items-center gap-3">
                            {/* PREVIOUS LOGO */}
                            <div
                                className="
                  w-10 h-10 rounded-full
                  bg-white
                  flex items-center justify-center
                  font-serif font-bold
                  text-pink-600
                  shadow-md
                "
                            >
                                SV
                            </div>

                            <div className="leading-tight">
                                <Link href="/">
                                    <div className="
    
    text-2xl font-serif font-bold
    text-slate-900
    relative text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg
  ">
                                        ShopVerse

                                    </div>
                                </Link>

                                <span className="text-xs text-slate-500">
                                    Smart shopping, everyday
                                </span>
                            </div>
                        </Link>

                        {/* TRUST BADGES */}
                        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
                            <TrustItem icon={ShieldCheck} label="Secure Payments" />
                            <TrustItem icon={Truck} label="Fast Delivery" />
                            <TrustItem icon={RefreshCcw} label="Easy Returns" />
                        </div>
                    </div>

                    {/* QUICK ACTIONS (HIDE ON SCROLL) */}
                    <AnimatePresence>
                        {showQuickActions && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="mt-4"
                            >
                                <ScrollArea className="w-full">
                                    <div className="flex gap-3 pb-2">
                                        {quickActions.map((item, i) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ y: -2 }}
                                                className="
                flex items-center gap-2 px-4 py-2
                rounded-full text-xs font-medium
                border border-pink-400
                text-pink-600
                bg-white
                hover:bg-pink-50
                transition-all
                shadow-sm
                whitespace-nowrap
              "
                                            >
                                                <item.icon size={14} />
                                                {item.label}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Horizontal scrollbar */}
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* DIVIDER */}
                    <div className="mt-3 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent" />

                    {/* NAVBAR (ALWAYS VISIBLE) */}
                    <div className="mt-2 pb-2">
                        <Navbar />
                    </div>
                </div>
            </motion.header>
        </div>
    );
}
export default Header

function TrustItem({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-1.5">
            <Icon size={14} className="text-rose-500" />
            <span>{label}</span>
        </div>
    );
}

const quickActions = [
    { label: "Trending", icon: Flame },
    { label: "New Arrivals", icon: Sparkles },
    { label: "Deals", icon: Tag },
    { label: "Favorites", icon: Heart },
    { label: "Best Sellers", icon: Trophy },        // icon name: Trophy
    { label: "Featured", icon: Star },              // icon name: Star
    { label: "Limited Edition", icon: Clock },      // icon name: Clock
    { label: "Top Rated", icon: ThumbsUp },         // icon name: ThumbsUp
    { label: "Recommended", icon: BadgeCheck },     // icon name: BadgeCheck
    { label: "Popular", icon: BarChart3 },          // icon name: BarChart3
    { label: "On Sale", icon: Percent },            // icon name: Percent
    { label: "Clearance", icon: Trash2 },           // icon name: Trash2
    { label: "Exclusive", icon: Crown },            // icon name: Crown
    { label: "Just In", icon: ShoppingBag },        // icon name: ShoppingBag

];
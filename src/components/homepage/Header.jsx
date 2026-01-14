
"use client";

import { motion } from "framer-motion";
import {
    Flame,
    Sparkles,
    Tag,
    Truck,
    Heart,
    ShieldCheck, RefreshCcw
} from "lucide-react";
import React from 'react'


import Link from "next/link";
import { Navbar } from "./Navbar";

const Header = () => {
    return (
        // <div className="sticky top-0 z-50">
        //     {/* Animated Banner */}
        //     <motion.div
        //         initial={{ y: "-100%", opacity: 0 }}
        //         animate={{ y: 0, opacity: 1 }}
        //         transition={{ duration: 0.7, ease: "easeOut" }}
        //         className="relative bg-gradient-to-br from-pink-500 via-orange-400 to-red-500 text-white rounded-b-3xl shadow-xl overflow-hidden"
        //     >
        //         {/* Floating animated background sparkles */}
        //         <motion.div
        //             className="absolute inset-0 opacity-20"
        //             animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        //             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        //             style={{
        //                 backgroundImage:
        //                     "radial-gradient(circle at 20% 30%, white 2px, transparent 2px)",
        //                 backgroundSize: "60px 60px",
        //             }}
        //         />

        //         <div className="relative px-4 pt-4 pb-6">
        //             {/* Brand */}
        //             <div className="flex items-center gap-3 mb-4">
        //                 <motion.div
        //                     animate={{ rotate: [0, 10, -10, 0] }}
        //                     transition={{ repeat: Infinity, duration: 4 }}
        //                     className="w-12 h-12 bg-white text-pink-600 rounded-full flex items-center justify-center font-bold text-xl shadow-md"
        //                 >
        //                     SV
        //                 </motion.div>
        //                 <div>
        //                     <h1 className="text-xl font-bold leading-none">ShopVerse</h1>
        //                     <p className="text-xs opacity-90">
        //                         Discover. Shop. Repeat.
        //                     </p>
        //                 </div>
        //             </div>

        //             {/* Quick Tags */}
        //             <motion.div
        //                 className="flex gap-3 overflow-x-auto no-scrollbar"
        //                 initial="hidden"
        //                 animate="visible"
        //                 variants={{
        //                     hidden: {},
        //                     visible: {
        //                         transition: { staggerChildren: 0.1 },
        //                     },
        //                 }}
        //             >
        //                 {quickActions.map((item, i) => (
        //                     <motion.div
        //                         key={i}
        //                         variants={{
        //                             hidden: { y: 20, opacity: 0 },
        //                             visible: { y: 0, opacity: 1 },
        //                         }}
        //                         className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium whitespace-nowrap"
        //                     >
        //                         <item.icon size={14} />
        //                         {item.label}
        //                     </motion.div>
        //                 ))}
        //             </motion.div>
        //         </div>
        //     </motion.div>

        //     {/* Existing Navbar (UNCHANGED) */}
        //     <Navbar></Navbar>
        // </div>

        // <motion.div
        //     initial={{ y: -60, opacity: 0 }}
        //     animate={{ y: 0, opacity: 1 }}
        //     transition={{ duration: 0.6, ease: "easeOut" }}
        //     className="sticky top-0 inset-x-0 z-50"
        // >
        //     {/* Unified Background */}
        //     <div className="bg-gradient-to-b from-pink-100 via-pink-50 to-white rounded-b-3xl shadow-lg overflow-hidden">

        //         {/* TOP BRAND STRIP */}
        //         <div className="flex items-center justify-between px-4 sm:px-8 pt-4 pb-2">

        //             {/* Brand */}
        //             <Link href="/" className="relative flex items-center gap-3">
        //                 {/* Sparkle pulse */}
        //                 <motion.div
        //                     className="absolute -top-2 -right-2"
        //                     initial={{ opacity: 0, scale: 0 }}
        //                     animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
        //                     transition={{
        //                         duration: 1.2,
        //                         repeat: Infinity,
        //                         repeatDelay: 3,
        //                     }}
        //                 >
        //                     <Sparkles className="w-4 h-4 text-pink-400" />
        //                 </motion.div>

        //                 <div className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">
        //                     ShopVerse
        //                 </div>
        //             </Link>

        //             {/* TRUST ELEMENTS */}
        //             <div className="hidden sm:flex items-center gap-6 text-xs sm:text-sm text-pink-700 font-medium">
        //                 <span className="flex items-center gap-1">
        //                     <ShieldCheck className="w-4 h-4" /> Secure Payments
        //                 </span>
        //                 <span className="flex items-center gap-1">
        //                     <Truck className="w-4 h-4" /> Free Delivery
        //                 </span>
        //                 <span className="flex items-center gap-1">
        //                     <RefreshCcw className="w-4 h-4" /> Easy Returns
        //                 </span>
        //             </div>
        //         </div>

        //         {/* SOFT DIVIDER */}
        //         <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-200 to-transparent mx-6" />

        //         {/* EXISTING NAVBAR */}
        //         <div className="relative">
        //             {children}
        //         </div>
        //     </div>
        // </motion.div>

        <div className="sticky top-0 inset-x-0 z-50">

            {/* FULL UNIFIED CONTAINER */}
            <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative   bg-white rounded-b-3xl shadow-xl overflow-visible"
            >
                {/* SUBTLE FLOATING SPARKLES BACKGROUND */}
                <motion.div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 30% 40%, #fff 1.5px, transparent 2px)",
                        backgroundSize: "70px 70px",
                    }}
                />

                <div className="relative px-4 pt-4">

                    {/* BRAND ROW */}
                    <div className="flex items-center justify-between mb-3">

                        {/* Brand */}
                        <div className="relative flex items-center gap-3">
                            {/* LOGO + SPARKLE WRAPPER */}
                            <div className="relative flex items-center justify-center">
                                {/* Sparkle pulse every 3s */}
                                <motion.div
                                    className="absolute -top-2 -right-2"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
                                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <Sparkles className="w-4 h-4 text-pink-400" />
                                </motion.div>

                                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center font-serif font-bold text-pink-600 shadow-md">
                                    SV
                                </div>
                            </div>

                            {/* BRAND TEXT */}
                            <div className="flex flex-col justify-center leading-tight">
                                <Link href="/">
                                    <span className="
        font-serif font-bold
        text-xl sm:text-2xl
        text-transparent bg-clip-text
        bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600
        drop-shadow-sm
        block
      ">
                                        ShopVerse
                                    </span>
                                </Link>

                                <span className="text-xs text-pink-500">
                                    Trusted shopping experience
                                </span>
                            </div>
                        </div>


                        {/* TRUST INDICATORS */}
                        <div className="hidden sm:flex items-center gap-4 text-xs text-pink-600 font-medium">
                            <span className="flex items-center gap-1">
                                <ShieldCheck className="w-4 h-4" /> Secure
                            </span>
                            <span className="flex items-center gap-1">
                                <Truck className="w-4 h-4" /> Free Delivery
                            </span>
                            <span className="flex items-center gap-1">
                                <RefreshCcw className="w-4 h-4" /> Easy Returns
                            </span>
                        </div>
                    </div>

                    {/* QUICK TAGS */}
                    {/* <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
                        {["Trending", "New", "Deals", "Best Sellers"].map((tag) => (
                            <div
                                key={tag}
                                className="px-3 py-1.5 text-xs font-medium bg-white/70 text-pink-600 rounded-full shadow-sm whitespace-nowrap"
                            >
                                {tag}
                            </div>
                        ))}
                    </div> */}
                    <motion.div
                        className="flex gap-3 overflow-x-auto no-scrollbar"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                    >
                        {quickActions.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 },
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-transparent backdrop-blur-md rounded-full text-xs font-medium whitespace-nowrap"
                            >
                                <item.icon size={14} className="text-pin-500" />
                                {item.label}
                            </motion.div>
                        ))}
                    </motion.div>


                    {/* SOFT DIVIDER */}
                    <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-1" />

                    {/* 🔥 EXISTING NAVBAR BLENDED IN */}
                    <div className="bg-transparent relative overflow-visible">
                        {/* IMPORTANT:
               Inside Navbar REMOVE: sticky top-0
               Keep everything else SAME
                        */}
                        <Navbar />
                    </div>
                </div>
            </motion.div >
        </div >
    )
}

export default Header

const quickActions = [
    { label: "Trending", icon: Flame },
    { label: "New Arrivals", icon: Sparkles },
    { label: "Deals", icon: Tag },
    { label: "Free Delivery", icon: Truck },
    { label: "Favorites", icon: Heart },
];

"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Flame,
    Sparkles,
    Tag,
    Truck,
    Heart,
    ShieldCheck, RefreshCcw
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

        // <div className="sticky top-0 inset-x-0 z-50">
        //     <motion.header
        //         initial={{ y: -40, opacity: 0 }}
        //         animate={{ y: 0, opacity: 1 }}
        //         transition={{ duration: 0.5, ease: "easeOut" }}
        //         className="
        //   relative

        //   backdrop-blur-xl
        //   border-b border-slate-200/70
        //   shadow-[0_10px_30px_rgba(0,0,0,0.08)]

        // "
        //     >
        //         {/* TOP AMBIENT GLOW */}
        //         <div
        //             className="
        //     absolute inset-x-0 top-0 h-1

        //   "
        //         />

        //         {/* SOFT TINT LAYER */}
        //         <div
        //             className="
        //     absolute inset-0
        //     bg-gradient-to-br
        //  from-[#fcf6cf] via-[#fff9d9] to-[rgb(237,230,192)]
        //     pointer-events-none
        //  rounded-b-2xl border-b-3 border-pink-500
        //   "
        //         />

        //         <div className="relative max-w-7xl mx-auto px-4 pt-4">

        //             {/* BRAND ROW */}
        //             <div className="flex items-center justify-between">
        //                 <Link href="/" className="group flex items-center gap-3">
        //                     <motion.div
        //                         whileHover={{ scale: 1.05 }}
        //                         className="
        //           w-11 h-11 rounded-xl
        //           bg-gradient-to-br from-rose-500 to-pink-600
        //           text-white font-bold text-lg
        //           flex items-center justify-center
        //           shadow-md
        //         "
        //                     >
        //                         SV
        //                     </motion.div>

        //                     <div className="leading-tight">
        //                         <div className="text-3xl font-serif font-bold px-8 py-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg ">
        //                             ShopVerse
        //                         </div>
        //                         <span className="text-xs text-black">
        //                             Smart shopping, everyday
        //                         </span>
        //                     </div>
        //                 </Link>

        //                 {/* TRUST BADGES */}
        //                 <div className="hidden md:flex items-center gap-6 text-xs text-slate-600 font-medium">
        //                     <TrustItem icon={ShieldCheck} label="Secure Payments" />
        //                     <TrustItem icon={Truck} label="Fast Delivery" />
        //                     <TrustItem icon={RefreshCcw} label="Easy Returns" />
        //                 </div>
        //             </div>

        //             {/* QUICK ACTIONS */}
        //             <motion.div
        //                 initial="hidden"
        //                 animate="visible"
        //                 variants={{
        //                     hidden: {},
        //                     visible: { transition: { staggerChildren: 0.08 } },
        //                 }}
        //                 className="mt-4 flex gap-3 overflow-x-auto no-scrollbar"
        //             >
        //                 {quickActions.map((item, i) => (
        //                     <motion.button
        //                         key={i}
        //                         variants={{
        //                             hidden: { opacity: 0, y: 10 },
        //                             visible: { opacity: 1, y: 0 },
        //                         }}
        //                         whileHover={{ y: -2 }}
        //                         className="
        //           flex items-center gap-2 px-4 py-2
        //           rounded-full text-xs font-medium
        //           border border-slate-200
        //           bg-white/90
        //           text-slate-700
        //           hover:border-rose-400
        //           hover:text-rose-600
        //           transition-all
        //         "
        //                     >
        //                         <item.icon size={14} />
        //                         {item.label}
        //                     </motion.button>
        //                 ))}
        //             </motion.div>

        //             {/* DIVIDER */}
        //             <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        //             {/* NAVBAR */}
        //             <div className="mt-2 pb-2">
        //                 <Navbar />
        //             </div>
        //         </div>
        //     </motion.header>
        // </div>



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
];
"use client"

import React from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from '@/components/homepage/Navbar';
import Footer from '@/components/homepage/Footer';
import {
    Store,
    BarChart3,
    Truck,
    ShieldCheck,
} from "lucide-react";

const Sellerpage = () => {
    return (

        <>

            <Navbar></Navbar>
            <div className="min-h-screen bg-white flex items-center justify-center px-6">
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative max-w-6xl w-full rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                >
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50 pointer-events-none" />

                    {/* Accent Line */}
                    <div className="relative h-1 bg-gradient-to-r from-pink-400 to-orange-400" />

                    <div className="relative grid md:grid-cols-2 gap-12 p-12">
                        {/* Left Content */}
                        <div>
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight   "
                            >
                                <span>Welcome to </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg font-serif">
                                    ShopVerse
                                </span>
                            </motion.h1>



                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.35 }}
                                className="mt-4 text-lg text-gray-600"
                            >
                                Your modern marketplace to build, manage, and scale your online
                                business.
                            </motion.p>

                            {/* Feature List */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 space-y-5"
                            >
                                <Feature
                                    icon={<Store />}
                                    title="Sell with Confidence"
                                    desc="Launch your store and reach millions of buyers globally."
                                />
                                <Feature
                                    icon={<BarChart3 />}
                                    title="Smart Analytics"
                                    desc="Track performance, sales trends, and growth in real time."
                                />
                                <Feature
                                    icon={<Truck />}
                                    title="Seamless Fulfillment"
                                    desc="Fast logistics, smooth order management, and delivery."
                                />
                                <Feature
                                    icon={<ShieldCheck />}
                                    title="Secure & Reliable"
                                    desc="Trusted payments, quick settlements, and seller protection."
                                />
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="mt-10 flex flex-wrap gap-4"
                            >
                                <Link
                                    href="/DashBoard"
                                    className="px-7 py-3 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                                >
                                    Seller Login
                                </Link>

                                <Link
                                    href="/AdminSignup"
                                    className="px-7 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-semibold hover:opacity-90 transition"
                                >
                                    Create Seller Account
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Highlight Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="hidden md:flex items-center justify-center"
                        >
                            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-8">
                                <p className="text-sm text-gray-500 mb-4">
                                    Why sellers choose ShopVerse
                                </p>

                                <div className="space-y-4 text-sm text-gray-700">
                                    <p>✔ Faster onboarding & store setup</p>
                                    <p>✔ Powerful seller dashboard</p>
                                    <p>✔ Marketing & promotion tools</p>
                                    <p>✔ Dedicated seller support</p>
                                </div>

                                <div className="mt-6 h-1 rounded-full bg-gradient-to-r from-pink-400 to-orange-400" />
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>

            <Footer></Footer>
        </>
    )
}

function Feature({ icon, title, desc }) {
    return (
        <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-pink-100 to-orange-100 text-pink-500">
                {icon}
            </div>
            <div>
                <h4 className="font-semibold text-gray-900">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
            </div>
        </div>
    );
}
export default Sellerpage
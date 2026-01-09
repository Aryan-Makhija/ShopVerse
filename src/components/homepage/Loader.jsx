'use client';

import { Loader, ShoppingBag, Sparkles, CreditCard } from 'lucide-react';

import React from 'react'

const LoaderPage = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white text-black px-6">

            {/* Content Wrapper (prevents compact look) */}
            <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-8">

                {/* Brand */}
                <div className="flex items-center gap-4">
                    <ShoppingBag className="h-12 w-12 text-pink-500" />
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
                        ShopVerse
                    </h1>
                </div>

                {/* Loader */}
                <div className="relative flex items-center justify-center">
                    <Loader className="h-14 w-14 text-pink-500 animate-spin" />
                    <Sparkles className="absolute -top-3 -right-3 h-6 w-6 text-pink-400 animate-pulse" />
                </div>

                {/* Taglines */}
                <div className="space-y-2">
                    <p className="text-xl font-medium">
                        Preparing your premium shopping experience
                    </p>
                    <p className="text-sm sm:text-base text-black/70">
                        Please wait while we load the best deals for you
                    </p>
                </div>

                {/* Feature Icons */}
                <div className="flex flex-wrap justify-center gap-10 pt-6">
                    <div className="flex flex-col items-center gap-2">
                        <ShoppingBag className="h-6 w-6 text-pink-500" />
                        <span className="text-sm">Products</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <CreditCard className="h-6 w-6 text-pink-500" />
                        <span className="text-sm">Secure Pay</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Sparkles className="h-6 w-6 text-pink-500" />
                        <span className="text-sm">Exclusive Deals</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderPage
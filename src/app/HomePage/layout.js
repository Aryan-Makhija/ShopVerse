// import { Geist, Geist_Mono } from "next/font/google";

// import "./globals.css";

import "../globals.css"

import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/homepage/Navbar";
import { ThemeProvider } from "@/components/Provider/ThemeProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
    title: "ShopVerse",
    description: "",
};

export default async function RootLayout({ children }) {
    const cookieStore = await cookies()

    return (

        <main>

            {/* <Navbar></Navbar> */}
            <ThemeProvider attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>


                <main className=" w-full">

                    <div className="px-4">



                        {children}
                        <Toaster></Toaster>


                    </div>


                </main>

            </ThemeProvider>
        </main>

    );
}

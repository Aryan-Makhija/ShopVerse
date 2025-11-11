// import { Geist, Geist_Mono } from "next/font/google";
import DashBoradNavbar from "@/components/Dashboard/Navbar";
// import "./globals.css";
import DashBoardSidebar from "@/components/Dashboard/Sidebar";
import "../globals.css"
import { ThemeProvider } from "@/components/Provider/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import ContextApi from "@/Context/ContextApi";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
    title: "DashBoard",
    description: "",
};

export default async function RootLayout({ children }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (

        <main>

            <ThemeProvider attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                <ContextApi>

                    <SidebarProvider defaultOpen={defaultOpen}>

                        <DashBoardSidebar></DashBoardSidebar>
                        <main className=" w-full">
                            <DashBoradNavbar></DashBoradNavbar>

                            <div className="px-4">
                                {children}
                                <Toaster></Toaster>
                            </div>
                        </main>

                    </SidebarProvider>
                </ContextApi>


            </ThemeProvider>
        </main>

    );
}

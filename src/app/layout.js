// import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/homepage/Navbar";

import "./globals.css";
import { ThemeProvider } from "@/components/Provider/ThemeProvider";
import { CartProvider } from "@/Context/CartContext";
import { OrderProvider } from "@/Context/OrderContext";
import { Toaster } from "@/components/ui/sonner";



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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
     
      </head> */}
      <body
      >
        {/* <Navbar></Navbar> */}
        {/* <Navbar></Navbar> */}
        {/* <ThemeProvider attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange> */}

        <OrderProvider>

          <CartProvider>
            <main className="w-full">

              {children}
              <Toaster />



            </main>

          </CartProvider>

        </OrderProvider>




        {/* </ThemeProvider> */}

      </body>
    </html>
  );
}

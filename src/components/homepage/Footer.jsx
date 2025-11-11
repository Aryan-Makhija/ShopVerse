import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react"
import Link from "next/link"


const Footer = () => {
    return (


        // <div className=" bg-amber-100 dark:bg-muted-foreground
        //          rounded-xl  w-full   gap-10 flex justify-center items-center p-5   ">

        //     <div className="grid grid-cols-5 gap-10 max-w-full">

        //         <div className=" flex flex-col gap-5">
        //             <h1>
        //                 About
        //             </h1>
        //             <div className="flex  flex-col ">
        //                 <a href="#">Contact Us</a>
        //                 <a href="#">About Us</a>
        //                 <a href="#">Carrers</a>
        //                 <a href="#">Press</a>
        //                 <a href="#">Corporate Information</a>
        //             </div>
        //         </div>

        //         <div className=" flex flex-col gap-5">
        //             <h1>
        //                 Group Companies
        //             </h1>
        //             <div className="flex flex-col">
        //                 <a href="#">Myntra</a>
        //                 <a href="#">Cleartrip</a>
        //                 <a href="#">Shopsy</a>
        //             </div>
        //         </div>

        //         <div className=" flex flex-col gap-5">
        //             <h1>
        //                 HELP
        //             </h1>
        //             <div className="flex flex-col">
        //                 <a href="#">Payments</a>
        //                 <a href="#">Shipping</a>
        //                 <a href="#">Cancellation & Retunrs</a>
        //                 <a href="#">FAQ</a>
        //             </div>
        //         </div>
        //         <div className=" flex flex-col gap-5">
        //             <h1>
        //                 Make Money with US
        //             </h1>
        //             <div className=" flex flex-col">
        //                 <Link href="/DashBoard">Sell on E-Commerce</Link>
        //                 <Link href="/AdminLogin">Login to your Account</Link>
        //             </div>
        //         </div>
        //         <div className=" flex flex-col gap-5">
        //             <h1>
        //                 Social Accounts
        //             </h1>
        //             <div className="  flex  gap-3">
        //                 <a href="#"><TwitterIcon></TwitterIcon></a>
        //                 <a href="#"><InstagramIcon></InstagramIcon> </a>
        //                 <a href="#"><FacebookIcon></FacebookIcon> </a>
        //                 <a href="#"><YoutubeIcon></YoutubeIcon> </a>

        //             </div>
        //         </div>


        //     </div>



        // </div>


        <footer className="w-full bg-gradient-to-l from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
                {/* Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 sm:gap-12">
                    {/* About */}
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            About
                        </h1>
                        <div className="flex flex-col space-y-2 text-sm">
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Contact Us
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                About Us
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Careers
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Press
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Corporate Information
                            </a>
                        </div>
                    </div>

                    {/* Group Companies */}
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Group Companies
                        </h1>
                        <div className="flex flex-col space-y-2 text-sm">
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Myntra
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Cleartrip
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Shopsy
                            </a>
                        </div>
                    </div>

                    {/* Help */}
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Help
                        </h1>
                        <div className="flex flex-col space-y-2 text-sm">
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Payments
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Shipping
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                Cancellation & Returns
                            </a>
                            <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                FAQ
                            </a>
                        </div>
                    </div>

                    {/* Make Money */}
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Make Money with Us
                        </h1>
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link
                                href="/DashBoard"
                                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                Sell on E-Commerce
                            </Link>
                            <Link
                                href="/AdminLogin"
                                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                Login to your Account
                            </Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Social Accounts
                        </h1>
                        <div className="flex gap-4 text-gray-600 dark:text-gray-300">
                            <a
                                href="#"
                                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                <TwitterIcon className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                <InstagramIcon className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                <FacebookIcon className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                <YoutubeIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider & Bottom Bar */}
                <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-sm text-gray-600 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} E-Commerce Inc. All rights reserved.</p>
                    <div className="mt-4 sm:mt-0 flex gap-4 text-sm">
                        <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400">Privacy Policy</a>
                        <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
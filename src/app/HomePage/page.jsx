"use client"
import { Branding } from "@/components/homepage/Branding"
import Footer from "@/components/homepage/Footer"
import LatestProducts from "@/components/homepage/LatestProducts"
import { NewArrivalmens } from "@/components/homepage/NewArrivalmens"
import { NewArrivalwomens } from "@/components/homepage/NewArrivalwomens"
import { AnimatedTestimonialsDemo, MarqueeDemo } from "@/components/homepage/Reviews"
import { TagLine } from "@/components/homepage/Tagline"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Marquee } from "@/components/ui/marquee"
import { Separator } from "@/components/ui/separator"
import Autoplay from "embla-carousel-autoplay"
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react"
import React, { useRef } from "react"

const Home = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    )
    return (
        <div className="w-full">

            <div className="bg-primary-foreground min-h-screen  flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 border-2 w-full gap-40">


                <div className="w-full max-w-md sm:max-w-md md:max-w-4xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-7xl ">

                    <div className="w-full rounded ">

                        <Carousel

                            plugins={[plugin.current]}
                            opts={{
                                loop: true, // ensures infinite looping
                            }}
                        >
                            <CarouselContent>
                                <CarouselItem className="w-full rounded">
                                    <div className="relative w-full h-[450px]">
                                        <img
                                            src="https://cms.landmarkshops.in/cdn-cgi/image/w=1232,q=85,fit=cover/MAX-Friday/MAX2.O/MAX-Uber-HP-Desktop-HeroBanner3-22OCT25A.png"
                                            className="w-full h-full object-cover rounded"
                                            alt="Hero Banner"
                                        />

                                        <div className="absolute  bottom-1 left-20">

                                            {/* <TagLine className="" /> */}
                                        </div>
                                    </div>

                                </CarouselItem>
                                <CarouselItem className="w-full rounded">
                                    <div className="relative w-full h-[450px]">
                                        <img
                                            src="https://max.a.bigcontent.io/v1/static/Hero-DT-Eng-100924-Men"
                                            className="w-full h-full object-cover rounded"
                                            alt="Hero Banner"
                                        />

                                        <div className="absolute  bottom-1 left-20">

                                            {/* <TagLine className="" /> */}
                                        </div>
                                    </div>

                                </CarouselItem>
                                <CarouselItem className="w-full rounded">
                                    <div className="relative w-full h-[450px]">
                                        <img
                                            src="https://media.maxfashion.com/i/max/1x2-New%20In-DT-En-201025-V2"
                                            className="w-full h-full object-cover object-center rounded"
                                            alt="Hero Banner"
                                        />

                                        <div className="absolute  bottom-1 left-20">

                                            {/* <TagLine className="" /> */}
                                        </div>
                                    </div>

                                </CarouselItem>
                                <CarouselItem className="w-full rounded">
                                    <div className="relative w-full h-[450px]">
                                        <img
                                            src="https://www.meijer.com/content/dam/meijer/digital/web-and-graphics/2022/clothing/site-assets/common-identity/09-september/D-CommonID-Hero-2x1-20220925.jpg"
                                            className="w-full h-full object-cover object-center rounded"
                                            alt="Hero Banner"
                                        />

                                        <div className="absolute  bottom-1 left-20">

                                            {/* <TagLine className="" /> */}
                                        </div>
                                    </div>

                                </CarouselItem>
                                <CarouselItem className="w-full rounded">
                                    <div className="relative w-full h-[450px]">
                                        <img
                                            src="https://cms.landmarkshops.in/cdn-cgi/image/w=1232,q=85,fit=cover/MAX-Friday/MAX2.O/MAX-Uber-HP-Desktop-HeroBanner1-22OCT25.png"
                                            className="w-full h-full object-cover object-center rounded"
                                            alt="Hero Banner"
                                        />

                                        <div className="absolute  bottom-1 left-20">

                                            {/* <TagLine className="" /> */}
                                        </div>
                                    </div>

                                </CarouselItem>

                            </CarouselContent>
                            {/* <CarouselPrevious />
                            <CarouselNext /> */}
                        </Carousel>

                    </div>

                    <div className=" h-full w-full  flex-col gap-10 flex justify-center items-center p-5   ">
                        <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                            Discover Top        <span className="  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">Brands</span>
                        </h1>

                        <div className="flex justify-center items-center w-full  ">
                            <Branding></Branding>
                        </div>

                    </div>
                    <Separator></Separator>

                    <div className=" h-full w-full  flex-col gap-10 flex justify-center items-center p-5   ">
                        <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                            Latest       <span className="  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">Arrivals</span>
                        </h1>



                        <div className="flex justify-center items-center w-full  ">
                            <LatestProducts></LatestProducts>

                        </div>
                    </div>
                    <Separator />
                    <div className=" h-full w-full  flex-col gap-10 flex justify-center items-center p-5   ">
                        <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                            New Arrivals for       <span className="  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">Mens</span>
                        </h1>



                        <div className="flex justify-center items-center flex-wrap w-full  ">
                            <NewArrivalmens></NewArrivalmens>

                        </div>
                    </div>
                    <Separator />
                    <div className=" h-full w-full   flex-col gap-10 flex justify-center items-center p-5   ">
                        <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                         New Arrivals for        <span className="  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">Womens</span>
                        </h1>



                        <div className="flex justify-center items-center flex-wrap w-full ">
                            <NewArrivalwomens></NewArrivalwomens>

                        </div>
                    </div>

                    <Separator />

                    <div className=" h-full w-full  flex-col gap-10 flex justify-center items-center p-5   ">
                        <h1 className="text-3xl font-semibold font-serif">
                            Customer Reviews
                        </h1>


                        <div className="flex justify-center items-center w-full  ">
                            <AnimatedTestimonialsDemo></AnimatedTestimonialsDemo>
                        </div>
                    </div>
                    <Separator></Separator>
                    <div className=" h-full w-full  flex-col gap-10 flex justify-center items-center p-5   ">
                        <h1 className="text-3xl font-semibold font-serif">
                            Security And Return Policy
                        </h1>


                        <div className="flex justify-center items-center w-full  ">
                            <section className="w-full bg-primary-foreground py-6 px-4 sm:px-6 lg:px-12 border-t">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
                                    <div className="flex flex-col items-center">
                                        <img src="https://img.freepik.com/premium-vector/shop-with-confidence-icon-vector-image-can-be-used-web-store_120816-226489.jpg" alt="Secure Shopping" className="w-60 h-60 mb-2" />
                                        <h3 className="text-sm font-semibold">Shop with Confidence</h3>
                                        <p className="text-xs text-gray-500">Secure checkout & genuine products</p>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <img src="https://png.pngtree.com/png-vector/20240402/ourmid/pngtree-vector-illustration-of-the-best-brand-label-good-for-product-packaging-png-image_12257729.png" alt="Top Brands" className="w-60 h-60 mb-2" />
                                        <h3 className="text-sm font-semibold">Top Brands</h3>
                                        <p className="text-xs text-gray-500">100+ trusted brands in one place</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="https://as2.ftcdn.net/jpg/03/90/63/79/1000_F_390637943_VlSei8Z4xogEvEoYL3eKl3HR726FlDr7.jpg" alt="Easy Returns" className="w-60 h-60 mb-2" />
                                        <h3 className="text-sm font-semibold">Easy Returns</h3>
                                        <p className="text-xs text-gray-500">7-day hassle-free return policy</p>
                                    </div>

                                </div>
                            </section>

                        </div>
                    </div>



                </div>
            </div>

            <div>
                <Footer />
            </div>

        </div>








    )
}

export default Home
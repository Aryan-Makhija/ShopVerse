"use client"
import { Branding } from "@/components/homepage/Branding"
import Footer from "@/components/homepage/Footer"
import Header from "@/components/homepage/Header"
import LatestProducts from "@/components/homepage/LatestProducts"
import { Navbar } from "@/components/homepage/Navbar"
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
import { FacebookIcon, InstagramIcon, RotateCcw, ShieldCheck, Tags, TwitterIcon, YoutubeIcon } from "lucide-react"
import React, { useRef } from "react"

const Home = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    )
    return (
        <div className="w-full">

          
                <Header></Header>
            {/* <div className="xl:block hidden">

                <Navbar></Navbar>
            </div> */}
            <div className="bg-primary-foreground min-h-screen  flex flex-col items-center justify-center p-4 sm:p-6 md:p-10  w-full gap-40  ">


                <div className="w-full max-w-md sm:max-w-md md:max-w-5xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-7xl flex flex-col gap-20">


                    <div className="w-full overflow-hidden">
                        <Carousel
                            plugins={[plugin.current]}
                            opts={{
                                loop: true,
                            }}
                        >
                            <CarouselContent>

                                <CarouselItem className="w-full">
                                    <div className="relative w-full 
            h-[220px] 
            sm:h-[300px] 
            md:h-[380px] 
            lg:h-[450px]">


                                        <img
                                            src="https://cms.landmarkshops.in/cdn-cgi/image/w=1232,q=85,fit=cover/MAX-Friday/MAX2.O/MAX-Uber-HP-Desktop-HeroBanner3-22OCT25A.png"
                                            alt="Hero Banner"
                                            className="w-full h-full object-cover object-center
              sm:rounded-xl"
                                        />




                                        <div className="absolute 
              bottom-4 left-4 
              sm:bottom-8 sm:left-8 
              lg:left-20">


                                        </div>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="w-full">
                                    <div className="relative w-full 
            h-[220px] 
            sm:h-[300px] 
            md:h-[380px] 
            lg:h-[450px]">


                                        <img
                                            src="https://max.a.bigcontent.io/v1/static/Hero-DT-Eng-100924-Men"
                                            alt="Hero Banner"
                                            className="w-full h-full object-cover object-center
              sm:rounded-xl"
                                        />


                                        <div className="absolute 
              bottom-4 left-4 
              sm:bottom-8 sm:left-8 
              lg:left-20">


                                        </div>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="w-full">
                                    <div className="relative w-full 
            h-[220px] 
            sm:h-[300px] 
            md:h-[380px] 
            lg:h-[450px]">


                                        <img
                                            src="https://media.maxfashion.com/i/max/1x2-New%20In-DT-En-201025-V2"
                                            alt="Hero Banner"
                                            className="w-full h-full object-cover object-center
              sm:rounded-xl"
                                        />


                                        <div className="absolute 
              bottom-4 left-4 
              sm:bottom-8 sm:left-8 
              lg:left-20">


                                        </div>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="w-full">
                                    <div className="relative w-full 
            h-[220px] 
            sm:h-[300px] 
            md:h-[380px] 
            lg:h-[450px]">


                                        <img
                                            src="https://www.meijer.com/content/dam/meijer/digital/web-and-graphics/2022/clothing/site-assets/common-identity/09-september/D-CommonID-Hero-2x1-20220925.jpg"
                                            alt="Hero Banner"
                                            className="w-full h-full object-cover object-center
              sm:rounded-xl"
                                        />


                                        <div className="absolute 
              bottom-4 left-4 
              sm:bottom-8 sm:left-8 
              lg:left-20">

                                        </div>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="w-full">
                                    <div className="relative w-full 
            h-[220px] 
            sm:h-[300px] 
            md:h-[380px] 
            lg:h-[450px]">


                                        <img
                                            src="https://cms.landmarkshops.in/cdn-cgi/image/w=1232,q=85,fit=cover/MAX-Friday/MAX2.O/MAX-Uber-HP-Desktop-HeroBanner1-22OCT25.png"
                                            alt="Hero Banner"
                                            className="w-full h-full object-cover object-center
              sm:rounded-xl"
                                        />

                                        <div className="absolute 
              bottom-4 left-4 
              sm:bottom-8 sm:left-8 
              lg:left-20">

                                        </div>
                                    </div>
                                </CarouselItem>

                            </CarouselContent>


                        </Carousel>
                    </div>



                    <div
                        className="
    w-screen sm:w-full
    relative sm:static
    left-1/2 sm:left-auto
    -ml-[50vw] sm:ml-0
    -mr-[50vw] sm:mr-0
    flex flex-col gap-10 justify-center items-center p-1
  "
                    >
                        <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                            Discover Top{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">
                                Brands
                            </span>
                        </h1>

                        <div className="w-full flex justify-center items-center">
                            <Branding />
                        </div>
                    </div>


                    {/* <Separator></Separator> */}

                    <div className=" h-full w-full  flex-col gap-8 flex justify-center items-center p-1   ">
                        <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                            Latest       <span className="  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">Arrivals</span>
                        </h1>



                        <div className="flex justify-center items-center w-full  ">
                            <LatestProducts></LatestProducts>

                        </div>
                    </div>
                    {/* <Separator /> */}
                    <div className=" h-full w-full  flex-col gap-10 flex justify-center items-center p-1   ">
                        <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                            New Arrivals for       <span className="  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">Mens</span>
                        </h1>



                        <div className="flex justify-center items-center flex-wrap w-full  ">
                            <NewArrivalmens></NewArrivalmens>

                        </div>
                    </div>
                    {/* <Separator /> */}
                    <div className=" h-full w-full   flex-col gap-10 flex justify-center items-center p-1   ">
                        <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                            New Arrivals for        <span className="  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">Womens</span>
                        </h1>



                        <div className="flex justify-center items-center flex-wrap w-full ">
                            <NewArrivalwomens></NewArrivalwomens>

                        </div>
                    </div>

                    {/* <Separator /> */}

                    <div className=" h-full w-full  flex-col gap-10 flex justify-center items-center p-5   ">
                        <h1 className="text-3xl font-semibold font-serif">
                            Customer Reviews
                        </h1>


                        <div className="flex justify-center items-center w-full  ">
                            <AnimatedTestimonialsDemo></AnimatedTestimonialsDemo>
                        </div>
                    </div>
                    <Separator></Separator>


                    <div className="w-full flex flex-col items-center gap-8 p-5 bg-white">

                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 font-serif text-center">
                            Your Security & Return Assurance
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base text-center max-w-2xl">
                            We ensure safe shopping, trusted brands, and a smooth return experience for every customer.
                        </p>

                        <section className="w-full bg-primary-foreground py-8 px-4 sm:px-8 lg:px-12 border rounded-xl shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">

                                {/* Secure Shopping */}
                                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                                    <ShieldCheck className="w-12 h-12 text-pink-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-800">Secure Shopping</h3>
                                    <p className="text-sm text-gray-500 mt-1">Encrypted checkout & 100% genuine products</p>
                                </div>

                                {/* Top Brands */}
                                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                                    <Tags className="w-12 h-12 text-pink-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-800">Premium Brands</h3>
                                    <p className="text-sm text-gray-500 mt-1">Choose from 100+ verified and trusted brands</p>
                                </div>

                                {/* Easy Returns */}
                                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                                    <RotateCcw className="w-12 h-12 text-pink-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-800">Easy Returns</h3>
                                    <p className="text-sm text-gray-500 mt-1">7-day no-questions-asked return policy</p>
                                </div>

                            </div>
                        </section>
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
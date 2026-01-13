"use client"

import Footer from "@/components/homepage/Footer";
import FooterNavbar from "@/components/homepage/FooterNav";
import LatestProducts from "@/components/homepage/LatestProducts";
import { Navbar } from "@/components/homepage/Navbar"
import { NewArrivalmens } from "@/components/homepage/NewArrivalmens";
import { NewArrivalwomens } from "@/components/homepage/NewArrivalwomens";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Lens } from "@/components/ui/lens";
import { useCart } from "@/Context/CartContext";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";



const ProductPage = () => {

    const params = useSearchParams()
    const code = params.get("productCode")
    const [productdata, setproductdata] = useState([])
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedAttribute, setSelectedAttribute] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const { addToCart, cartItems } = useCart();
    const [name, setname] = useState("")


    const getProductdetails = async () => {
        const response = await fetch(`/api/AllProducts/${code}`, {
            method: "GET"
        })

        const data = await response.json()

        setproductdata(data)
        setname(data[0].category.name)
    }

    useEffect(() => {
        if (!productdata || productdata.length === 0) return

        // Set default color and attribute on mount
        const defaultAttribute = productdata[0]?.attribute?.[0]
        if (defaultAttribute) {
            handleColorSelect(defaultAttribute.color)
        }
    }, [productdata])

    const handleColorSelect = (color) => {
        setSelectedColor(color)
        setSelectedSize('') // reset size when color changes

        const attribute = productdata[0].attribute.find((a) => a.color === color)
        if (attribute) {
            setSelectedAttribute(attribute)

            const variant = productdata[0]?.variants.find(
                (v) => v.attribute === attribute._id // assuming attribute has _id
            )

            setSelectedVariant(variant)
        }
    }

    const handleSizeSelect = (size) => {
        setSelectedSize(size)
    }


    const handleAddToCart = async () => {
        const selectedProduct = {

            productCode: productdata[0]?.info.productCode,
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
            price: selectedVariant?.price,
            image: selectedVariant?.image[0],
            category: productdata[0]?.category?.name,
            // subcategory: productdata[0]?.subcategory?.name,
            description: productdata[0]?.info?.description,
        };


        const response = await fetch("/api/CartItems", {
            method: "POST",
            body: JSON.stringify(selectedProduct)
        })
        const data = await response.json()

        if (response.status === 400) {
            toast.error("Please select  the size")
            return
        }

        if (!response.ok) {
            toast.error("Login to your Account First");
            return;
        }
        toast.success("Product added to Cart 🛒")

    };


    const handleWishList = async () => {
        const selectedProduct = {

            productCode: productdata[0]?.info.productCode,
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
            price: selectedVariant?.price,
            image: selectedVariant?.image[0],
            category: productdata[0]?.category?.name,
            // subcategory: productdata[0]?.subcategory?.name,
            description: productdata[0]?.info?.description,
        };


        const response = await fetch("/api/WishList", {
            method: "POST",
            body: JSON.stringify(selectedProduct)
        })
        const data = await response.json()

        if (response.status === 400) {
            toast.error("Please select  the size")
            return
        }

        if (!response.ok) {
            toast.error("Login to your Account First");
            return;
        }
        toast.success("Product added to WishList ❤️ ")

    }

    const getcartitems = async () => {
        const response = await fetch("/api/CartItems", {
            method: "GET"
        })
        const data = await response.json()

    }





    useEffect(() => {
        getProductdetails(),
            getcartitems()

    }, [])



    return (
        <div>

            <Navbar></Navbar>



            <div className="m-5" >
                {/* breadcrums */}
            </div>

            <div className="bg-primary-foreground min-h-screen flex flex-col items-center  p-4 sm:p-6 md:p-10  w-full gap-10">

                {/* Main content wrapper: responsive grid */}
                <div className=" w-full flex justify-start ">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>ProductPage</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {
                    productdata.length === 0 ? <div className="w-full flex justify-center items-center "><Loader className="w-15 h-15 animate-spin "></Loader></div> :
                        <div>

                            {
                                productdata.map((item, index) => (
                                    <div
                                        key={index}
                                        className=" w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 md:p-10"
                                    >
                                        {/* 📸 Image Gallery */}
                                        <div className="  hidden  lg:grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                            {selectedVariant?.image?.map((img, i) => (
                                                <div key={i} className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
                                                    <Lens>
                                                        <img
                                                            src={img}
                                                            alt={`Product Image ${i}`}
                                                            className="w-full h-80 object-cover"
                                                        />
                                                    </Lens>
                                                </div>
                                            ))}
                                        </div>


                                        <div className="lg:hidden block">
                                            <Carousel>
                                                <CarouselContent>
                                                    {selectedVariant?.image?.map((img, i) => (
                                                        <CarouselItem>

                                                            <div key={i} className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
                                                                <Lens>
                                                                    <img
                                                                        src={img}
                                                                        alt={`Product Image ${i}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </Lens>
                                                            </div>
                                                        </CarouselItem>
                                                    ))}

                                                </CarouselContent>
                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </Carousel>

                                        </div>

                                        {/* 📦 Product Details */}
                                        <div className="border p-6 rounded-lg shadow-sm space-y-6">
                                            {/* 🏷️ Title & Description */}
                                            <div className="space-y-2">
                                                <h1 className="text-3xl font-bold text-gray-900">
                                                    {item.info.productname}

                                                </h1>
                                                <p className="text-lg text-gray-600">{item.info?.description}</p>
                                                <p className="text-sm text-yellow-500">⭐ 4.5 (200 reviews)</p>
                                            </div>

                                            {/* 💰 Price Section */}
                                            <div className="border-t pt-4 space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        ₹{selectedVariant?.price ?? '0'}
                                                    </span>
                                                    <span className="line-through text-gray-400">
                                                        ₹{selectedVariant?.discountPrice ?? '0'}
                                                    </span>
                                                    <span className="text-orange-500 font-semibold text-lg">50% OFF</span>
                                                </div>

                                                {/* 🎨 Color Selection */}
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Select Color</h3>
                                                    <div className="flex gap-3">
                                                        {item.attribute.map((attr) => (
                                                            <button
                                                                key={attr._id}
                                                                onClick={() => handleColorSelect(attr.color)}
                                                                className={`w-8 h-8 rounded-full bg-${attr.color.toLowerCase()}-900 border-2 ${selectedColor === attr.color
                                                                    ? 'ring-2 ring-black'
                                                                    : 'border-gray-300'
                                                                    } ${attr.class}`}
                                                                title={attr.color}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-sm mt-1 text-gray-600">Selected: {selectedColor}</p>
                                                </div>

                                                {/* 📏 Size Selection */}
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Select Size</h3>
                                                    <div className="flex gap-2">
                                                        {item.attribute
                                                            .filter((a) => a.color === selectedColor)
                                                            .map((attr) => (
                                                                <button
                                                                    key={attr.size}
                                                                    onClick={() => handleSizeSelect(attr.size)}
                                                                    className={`px-4 py-1 border rounded-md text-sm font-medium ${selectedSize === attr.size
                                                                        ? 'bg-black text-white border-black'
                                                                        : 'border-gray-300 text-gray-700'
                                                                        }`}
                                                                >
                                                                    {attr.size}
                                                                </button>
                                                            ))}
                                                    </div>
                                                    <p className="text-sm mt-1 text-gray-600">Selected: {selectedSize}</p>
                                                </div>

                                                {/* 🛒 Action Buttons */}
                                                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                                    <button onClick={handleAddToCart} className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-pink-700 text-white font-semibold rounded-md hover:bg-gray-800 transition">
                                                        Add to Cart
                                                    </button>
                                                    <button onClick={handleWishList} className="w-full cursor-pointer sm:w-auto px-6 py-3 border border-gray-300 text-gray-800 font-semibold rounded-md hover:border-black transition">
                                                        ❤️ Add to Wishlist
                                                    </button>
                                                </div>
                                            </div>

                                            {/* 📄 Additional Info */}
                                            <div className="pt-4 space-y-3 text-sm text-gray-700">
                                                <div>
                                                    <h4 className="font-semibold">Product Details</h4>
                                                    <p>
                                                        {item.info.description}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Material & Care</h4>
                                                    <p>
                                                        {item.materialCare.material} {item.materialCare.instructions}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Return Policy</h4>
                                                    <p>Easy {item.returnPolicy.exchangewithin} days Return policy. No questions asked.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                }




                <div className=" h-full w-full   flex-col gap-10 flex justify-center items-center p-1  ">
                    <h1 className="text-center font-serif text-2xl sm:text-5xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                        Explore More      <span className="  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-pink-600 drop-shadow-lg">{name}</span> Products
                    </h1>


                    <div className="flex justify-center  items-center w-full ">

                        {name === "Women" || "Mens" ? (name === "Women" ?
                            <NewArrivalwomens></NewArrivalwomens> : <NewArrivalmens></NewArrivalmens>) : <LatestProducts></LatestProducts>}

                    </div>

                </div>

            </div>



            <FooterNavbar></FooterNavbar>
            <div>
                <Footer></Footer>
            </div>
        </div>




    )
}

export default ProductPage
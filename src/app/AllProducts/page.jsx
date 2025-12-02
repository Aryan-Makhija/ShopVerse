
"use client"

import DashBoardSidebar from "@/components/Dashboard/Sidebar"
import { Navbar } from "@/components/homepage/Navbar"
import { NewArrivalwomens } from "@/components/homepage/NewArrivalwomens"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { useEffect, useState } from "react"


const brandOptions = ['Nike', 'Adidas', 'Puma', 'Roadster', 'HRX',"levis"];
const colorOptions = ['Red', 'Blue', 'Black', 'White', 'Purple'];

const AllProductsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("query");

    const [products, setProducts] = useState([]);
    const [productIds, setProductIds] = useState([]);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);

    // 1️⃣ Fetch initial products from search API
    useEffect(() => {
        if (!query) return;

        const fetchSearchResults = async () => {
            try {
                const res = await fetch(`/api/AlluserProducts/SearchProducts?query=${query}`);
                const data = await res.json();

                setProducts(data);
                setProductIds(data.map((p) => p._id));
            } catch (err) {
                console.error("Search fetch error:", err);
            }
        };

        fetchSearchResults();
    }, [query]);

    // 2️⃣ Handle checkbox toggle
    const handleCheckboxChange = (value, setFunc) => {
        setFunc(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };


    const applyFilters = async () => {
        const params = new URLSearchParams();

        if (query) params.set("subcategory", query); // treat search query as subcategory
        if (selectedBrands.length > 0) params.set("brand", selectedBrands.join(","));
        if (selectedColors.length > 0) params.set("color", selectedColors.join(","));
        if (priceRange[0]) params.set("priceMin", priceRange[0]);
        if (priceRange[1]) params.set("priceMax", priceRange[1]);

        try {
            const res = await fetch(`/api/filter?${params.toString()}`);
            const data = await res.json();
   
            setProducts(data);
        } catch (err) {
            console.error("Filter fetch error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-primary-foreground max-w-screen">
            <Navbar />

            <div className="w-full h-32 border-b border-gray-300 flex items-center justify-center shadow-sm">
                <h2 className="text-xl font-medium text-gray-700">Search results for "{query}"</h2>
            </div>

            <div className="flex w-full min-h-screen">
                {/* Sidebar Filters */}
                <aside className="hidden sm:block w-full max-w-[240px] border-r p-4">
                    <h3 className="text-2xl font-semibold font-serif mb-4">Filters</h3>

                    {/* Brands */}
                    <section className="mb-6">
                        <p className="text-md font-medium text-gray-700 mb-2">Brands</p>
                        <div className="flex flex-col gap-2">
                            {brandOptions.map((brand, index) => (
                                <div className="flex items-center gap-2" key={`brand-${index}`}>
                                    <Checkbox
                                        id={`brand-${index}`}
                                        checked={selectedBrands.includes(brand)}
                                        onCheckedChange={() => handleCheckboxChange(brand, setSelectedBrands)}
                                    />
                                    <Label htmlFor={`brand-${index}`}>{brand}</Label>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Price Range */}
                    <section className="my-6">
                        <Field>
                            <FieldTitle>Price Range</FieldTitle>
                            <FieldDescription>
                                ₹ <span>{priceRange[0]}</span> - ₹ <span>{priceRange[1]}</span>
                            </FieldDescription>
                            <Slider
                                value={priceRange}
                                onValueChange={setPriceRange}
                                max={5000}
                                min={0}
                                step={50}
                                className="mt-3 w-full"
                                aria-label="Price Range"
                            />
                        </Field>
                    </section>

                    <Separator />

                    {/* Colors */}
                    <section className="mt-6">
                        <p className="text-md font-medium text-gray-700 mb-2">Colors</p>
                        <div className="flex flex-col gap-2">
                            {colorOptions.map((color, index) => (
                                <div className="flex items-center gap-2" key={`color-${index}`}>
                                    <Checkbox
                                        id={`color-${index}`}
                                        checked={selectedColors.includes(color)}
                                        onCheckedChange={() => handleCheckboxChange(color, setSelectedColors)}
                                    />
                                    <Label htmlFor={`color-${index}`}>{color}</Label>
                                </div>
                            ))}
                        </div>
                    </section>

                    <button
                        onClick={applyFilters}
                        className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                    >
                        Apply Filters
                    </button>
                </aside>

                {/* Product Listing */}
                <main className="flex-1 p-6">
                    <div className="flex flex-wrap gap-10 justify-center items-center">
                        {products.length === 0 ? (
                            <p>No products found.</p>
                        ) : (
                            products.map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/ProductPage?productCode=${item.productCode}`}
                                    legacyBehavior
                                    passHref
                                >
                                    <a target="_blank" rel="noopener noreferrer">
                                        <Card className="w-[250px] rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 shadow-orange-200">
                                            <CardHeader className="p-0">
                                                <img
                                                    src={item?.variants?.[0]?.image?.[0]}
                                                    alt="Product"
                                                    className="w-full h-60 object-cover"
                                                />
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {item.category?.name} {item.subcategory?.name}
                                                </h2>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Brand: {item.brand?.name}
                                                </p>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-lg font-bold text-green-600">
                                                        ₹{item.variants?.[0]?.price}
                                                    </span>
                                                    <span className="text-yellow-500 text-sm">★★★★☆</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </a>
                                </Link>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AllProductsPage;




"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"


//  const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('/api/your-api-endpoint/product-code-123'); // Adjust as needed
//       const result = await res.json();
//       setData(result);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {data.map(({ attribute, variant }, index) => (
//         <div key={index} className="p-4 border mb-2">
//           <p><strong>Size:</strong> {attribute.size}</p>
//           <p><strong>Color:</strong> {attribute.color}</p>
//           <p><strong>Price:</strong> {variant?.price ?? 'N/A'}</p>
//           <p><strong>Discount:</strong> {variant?.discountPrice ?? 'N/A'}</p>
//           <p><strong>Quantity:</strong> {variant?.quantity ?? 'N/A'}</p>
//         </div>
//       ))}
//     </div>
//   );

export function ProductdetForm({
  className,
  ...props
}) {
  const params = useSearchParams()
  const code = params.get("productno")

  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };
  const [productdata, setproductdata] = useState([])

  const [attributevalue, setattributevalue] = useState([])

  const [variant, setvariant] = useState({ price: "", discountPrice: "", currency: "", isAvailable: "", quantity: "" })
  const getproductdetails = async () => {
    const response = await fetch(`/api/AllProducts/${code}`, {
      method: "GET"
    })
    const data = await response.json()
    setproductdata(data)
  }


  const savevalue = () => {
    const attributes = data.map(({ attribute }) => ({
      size: attribute.size,
      color: attribute.color,
    }));
    setattributevalue( attributes );
  }

  useEffect(() => {
    getproductdetails(),
      savevalue()
  }, [])

  const [data, setdata] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/ProductListing/variant/${code}`); // Adjust as needed
      const result = await res.json();
      setdata(result);
    };

    fetchData();
  }, []);



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-12">

              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Product Details</h1>

              </div>


              {/* Proeduct Type */}
              <div className="grid grid-cols-2 gap-4">

                <div className="grid gap-3 ">
                  <Label htmlFor="name">ProductType</Label>
                  <div id="name" className="p-2 border rounded-md">
                    {productdata[0]?.type?.name || "N/A"}
                  </div>
                </div>

                <div className="grid gap-3 ">
                  <Label htmlFor="name">Description</Label>
                  <div id="name" className="p-2 border rounded-md">
                    {productdata[0]?.type?.description || "N/A"}
                  </div>
                </div>


              </div>

              {/* Category SubCategory  Brand */}
              <div className="grid grid-cols-3 gap-4">

                <div className="grid gap-3 ">
                  <Label htmlFor="name">Category</Label>
                  <div id="name" className="p-2 border rounded-md">
                    {productdata[0]?.category?.name || "N/A"}
                  </div>
                </div>

                <div className="grid gap-3 ">
                  <Label htmlFor="name">SubCategory</Label>
                  <div id="name" className="p-2 border rounded-md">
                    {productdata[0]?.subcategory?.name || "N/A"}
                  </div>
                </div>
                <div className="grid gap-3 ">
                  <Label htmlFor="name">Brand</Label>
                  <div id="name" className="p-2 border rounded-md">
                    {productdata[0]?.brand?.name || "N/A"}
                  </div>
                </div>

              </div>


              {/* Attributes */}
              <Label>Attributes : {data.length}</Label>

              {/* <div className=" bg-primary-foreground w-full max-h-70 gap-30 overflow-auto p-2">
                {data.map(({ attribute, variant }, index) => (



                  <div className="grid grid-cols-5 gap-4 bg-medium-foreground">


                    <div className="grid gap-3 ">
                      <Label htmlFor="name">Sizes</Label>
                      <Input defaultValue={attribute.size} />
                    </div>
                    <div className="grid gap-3 ">
                      <Label htmlFor="name">Colors</Label>
                      <Input defaultValue={attribute.color} />
                    </div>
                    <div className="grid gap-3 ">
                      <Label htmlFor="name">Colors</Label>
                      <Input defaultValue={variant?.price} />
                    </div>
                    <div className="grid gap-3 ">
                      <Label htmlFor="name">Colors</Label>
                      <Input defaultValue={variant?.discountPrice} />
                    </div>
                    <div className="grid gap-3 ">
                      <Label htmlFor="name">Colors</Label>
                      <Input defaultValue={variant?.isAvailable} />
                    </div>
                    <div className="grid gap-3 ">
                      <Label htmlFor="name">Colors</Label>
                      <Input defaultValue={variant?.quantity} />
                    </div>
                    <div className="grid gap-3 ">
                      <Label htmlFor="name">Colors</Label>
                      <Input defaultValue={variant?.currency} />
                    </div>

                    <div className="grid grid-3 mt-7">
                      <Label></Label>
                      <Button type="" className="w-full">
                        Edit
                      </Button>
                    </div>



                  </div>
                ))}
              </div> */}


              <div className="bg-primary-foreground w-full max-h-[70vh] overflow-auto p-4 rounded-lg shadow-lg">
                {data.map(({ attribute, variant }, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 bg-medium-foreground p-4 rounded-lg shadow-md border-2 mb-10 "
                  >
                    {/* Size */}
                    <div className="grid gap-3">
                      <Label htmlFor="size">Size</Label>
                      <Input
                        id="size"
                        value={attribute.size}
                        readOnly={!isEditable}
                        className="p-2 rounded-md border border-gray-300"
                      />
                    </div>

                    {/* Color */}
                    <div className="grid gap-3">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        value={attribute.color}
                        readOnly={!isEditable}
                        className="p-2 rounded-md border border-gray-300"
                      />
                    </div>

                    {/* Price */}
                    <div className="grid gap-3">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        value={variant?.price}
                        readOnly={!isEditable}
                        className="p-2 rounded-md border border-gray-300"
                      />
                    </div>

                    {/* Discount Price */}
                    <div className="grid gap-3">
                      <Label htmlFor="discountPrice">Discount Price</Label>
                      <Input
                        id="discountPrice"
                        value={variant?.discountPrice}
                        readOnly={!isEditable}
                        className="p-2 rounded-md border border-gray-300"
                      />
                    </div>

                    {/* Availability */}
                    <div className="grid gap-3">
                      <Label htmlFor="isAvailable">Available</Label>
                      <Input
                        id="isAvailable"
                        value={variant?.isAvailable ? 'Yes' : 'No'}
                        readOnly={!isEditable}
                        className="p-2 rounded-md border border-gray-300"
                      />
                    </div>

                    {/* Quantity */}
                    <div className="grid gap-3">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        value={variant?.quantity}
                        readOnly={!isEditable}
                        className="p-2 rounded-md border border-gray-300"
                      />
                    </div>

                    {/* Currency */}
                    <div className="grid gap-3">
                      <Label htmlFor="currency">Currency</Label>
                      <Input
                        id="currency"
                        value={variant?.currency}
                        readOnly={!isEditable}
                        className="p-2 rounded-md border border-gray-300"
                      />
                    </div>

                    {/* Edit Button */}
                    <div className="grid gap-3 mt-7 col-span-full sm:col-span-2 md:col-span-3 lg:col-span-5">
                      <Button
                        onClick={handleEditClick}
                        className="w-full py-2 bg-white text-black rounded-md hover:bg-primary-600 focus:outline-none"
                      >
                        {isEditable ? 'Save' : 'Edit'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Material And Instructions  */}
              <div className="grid grid-cols-3 gap-4">

                <div className="grid gap-3 ">
                  <Label htmlFor="name">Material</Label>
                  <Input readOnly defaultValue={productdata[0]?.materialCare?.material} />
                </div>

                <div className="grid gap-3 ">
                  <Label htmlFor="name">Instructions</Label>
                  <textarea readOnly defaultValue={productdata[0]?.materialCare?.instructions} className="border-2 rounded p-1" />
                </div>
                <div className="grid gap-3 mt-5 ">
                  <Button type="" className="w-full bg-white text-black ">
                    Edit
                  </Button>

                </div>


              </div>


              {/* Return Policy */}
              <div className="grid grid-cols-4 gap-4 justify-center items-center ">

                <div className="grid gap-3 ">
                  <Label htmlFor="name">Returnabel</Label>
                  <Input defaultValue={productdata[0]?.returnPolicy?.returnabel} />
                </div>

                <div className="grid gap-3 ">
                  <Label htmlFor="name">Exchangeabel</Label>
                  <Input defaultValue={productdata[0]?.returnPolicy?.exchangeabel} />
                </div>
                <div className="grid gap-3 ">
                  <Label htmlFor="name">Exchange Within</Label>
                  <Input defaultValue={productdata[0]?.returnPolicy?.exchangewithin} />
                </div>
                <div className="grid gap-3 mt-5 ">
                  <Button type="" className="w-full bg-white text-black ">
                    Edit
                  </Button>

                </div>

              </div>


            </div>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}

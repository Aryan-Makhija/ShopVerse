"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Plus } from "lucide-react"
import axios from "axios"


export function AttributeVaraintForm({
  className,
  ...props
}) {


  const [attribute, setAttribute] = useState({ size: "", color: "" });

  const [attributesList, setAttributesList] = useState([]);

  const [valueBlock, setValueBlock] = useState({
    price: "",
    discountPrice: "",
    currency: "",
    isAvailable: "",
    quantity: "",
    image: [], // array of strings or File objects
  });

  const [valueBlocks, setValueBlocks] = useState([]);


  // console.log("attribute", attribute)
  // console.log("valueBlocks", valueBlock)
  const handleValueChange = (field, value) => {
    setValueBlock((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  // For adding image
  // const handleImageAdd = (files) => {
  //   const fileArray = Array.from(files);
  //   setValueBlock((prev) => ({
  //     ...prev,
  //     image: [...prev.image, ...fileArray],
  //   }));
  // };


  const addValueBlock = () => {
    // Simple validation: make sure price and currency are set
    if (!valueBlock.price || !valueBlock.currency) return;

    setValueBlocks((prev) => [...prev, valueBlock]);
    setValueBlock({
      price: "",
      discountPrice: "",
      currency: "",
      isAvailable: "",
      quantity: "",
      image: [],
    });
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttribute((prev) => ({ ...prev, [name]: value }));

  };
  const addAttribute = () => {
    if (!attribute.size || !attribute.color) return;

    setAttributesList((prev) => [...prev, attribute]);
    setAttribute({ size: "", color: "" }); // reset input
  };


  const uploadToCloudinary = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", `${process.env.NEXT_PUBLIC_VITE_PRESET}`);
    data.append("cloud_name", `${process.env.NEXT_PUBLIC_VITE_CLOUDNAME}`);

    console.log("PRESET", process.env.NEXT_PUBLIC_VITE_PRESET)
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_VITE_CLOUDNAME}/image/upload`, data)
      return res.data.secure_url;

    } catch (err) {
      console.log('Image upload failed:', err.message)
      return null
    }
  }


  const handelproductImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedUrls = [];

    // const file = event.target.files[0];
    // if (file) {
    //   const url = await uploadToCloudinary(file);
    //   if (url) {
    //     setValueBlock((prev) => ({
    //       ...prev,
    //       image: [...prev.image, url]
    //     }))
    //   }
    // }

    for (const file of files) {
      const url = await uploadToCloudinary(file);
      if (url) uploadedUrls.push(url);
    }

    setValueBlock((prev) => ({
      ...prev,
      image: [...prev.image, ...uploadedUrls],
    }));
  }




  const handelform = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/ProductListing/attribute", {
      method: "POST",
      body: JSON.stringify(attribute)
    })

    const data = await response.json()
    // console.log("data", data)



  }
  const handelvariantform = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/ProductListing/productvariant", {
      method: "POST",
      body: JSON.stringify(valueBlock)
    })

    const data = await response.json()
    // console.log("data", data)
    // console.log(valueBlock)
    toast("Product Attributes added Successfully")

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-auto max-h-[600px] p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Product Attributes</h1>

              </div>

              <div className="grid grid-cols-2 justify-between   w-full">

                <h1>Attribute</h1>
                <p className="text-[12px]">Please enter each attribute followed by its value, one at a time (e.g., size: xl , price:100)</p>
              </div>

              <div className="w-full max-w-3xl mx-auto p-4 space-y-6 ">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                  <div className="grid gap-2">
                    <Label>Size</Label>
                    <Input
                      name="size"
                      value={attribute.size}
                      onChange={handleInputChange}
                      placeholder="e.g. M, L, XL"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Color</Label>
                    <Input
                      name="color"
                      value={attribute.color}
                      onChange={handleInputChange}
                      placeholder="e.g. Red, Blue"
                    />
                  </div>



                  <div className="grid gap-2">
                    <Label>Add</Label>
                    <Plus
                      onClick={(e) => { handelform(e), addAttribute() }}
                      className="w-10 h-10 p-2 cursor-pointer bg-muted border rounded-md hover:scale-105 transition"
                    />
                  </div>
                </div>

                <div className="space-y-2 max-h-[150px] overflow-auto">
                  <h2 className="font-semibold text-lg">Added Attributes:</h2>
                  {attributesList.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center border p-3 rounded-md bg-muted"
                    >
                      <span className="font-medium">Size: {item.size}</span>
                      <span className="font-medium">Color: {item.color}</span>
                    </div>
                  ))}
                </div>

              </div>



              <h1>Attribute values</h1>



              <div className="space-y-6">

                {/* Input Section for One Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">

                  <div className="grid gap-2">
                    <Label>Price</Label>
                    <Input
                      value={valueBlock.price}
                      onChange={(e) => handleValueChange("price", e.target.value)}
                      placeholder="e.g. 1000"
                      type="number"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Discount Price</Label>
                    <Input
                      value={valueBlock.discountPrice}
                      onChange={(e) => handleValueChange("discountPrice", e.target.value)}
                      placeholder="e.g. 800"
                      type="number"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Currency</Label>
                    <Select
                      onValueChange={(value) => handleValueChange("currency", value)}
                      value={valueBlock.currency}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Availability</Label>
                    <Select
                      onValueChange={(value) => handleValueChange("isAvailable", value)}
                      value={valueBlock.isAvailable}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Is Available?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Quantity</Label>
                    <Input
                      value={valueBlock.quantity}
                      onChange={(e) => handleValueChange("quantity", e.target.value)}
                      placeholder="e.g. 50"
                      type="number"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Images</Label>
                    <Input
                      type="file"
                      // multiple
                      onChange={handelproductImageUpload}
                    />
                    {/* {valueBlock.image.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                      {valueBlock.image.length} image(s) selected
                      </p>
                      )} */}
                  </div>
                  <p className="text-[12px]">(Can select multiple product Images) </p>

                  <div className="grid gap-2">
                    <Label>&nbsp;</Label>
                    <Plus
                      onClick={(e) => { handelvariantform(e), addValueBlock() }}
                      className="w-10 h-10 p-2 cursor-pointer bg-muted border rounded-md hover:scale-105 transition"
                    />
                  </div>
                </div>

                {/* Display All Added Blocks */}
                <h1>Added Values</h1>
                <div className="space-y-4 max-h-[200px] overflow-auto">
                  {valueBlocks.map((item, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-2 bg-muted">
                      <div className="flex flex-wrap gap-4">
                        <span><strong>Price:</strong> {item.price}</span>
                        <span><strong>Discount:</strong> {item.discountPrice || "—"}</span>
                        <span><strong>Currency:</strong> {item.currency}</span>
                        <span><strong>Available:</strong> {item.isAvailable === "true" ? "Yes" : "No"}</span>
                        <span><strong>Qty:</strong> {item.quantity}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {item.image.map((img, i) => (
                          <span key={i} className="text-xs bg-background px-2 py-1 border rounded">
                            {typeof img === "string" ? ` Product Image ${img.length} ` : "No prodcut Image"}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>


              {/* <Button type="" onClick={(e) => handelform(e)} className="w-full">
                Submit
              </Button> */}



            </div>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}

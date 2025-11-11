import { connectToDb } from "@/db/db";
import Attribute from "@/models/(ProductListing)/Attribute";
import AttributeValue from "@/models/(ProductListing)/AttributeValue";
import Brand from "@/models/(ProductListing)/Brand";
import Category from "@/models/(ProductListing)/Category";
import Inventory from "@/models/(ProductListing)/Inventory";
import ProductImage from "@/models/(ProductListing)/ProductImage";
import ProductInfo from "@/models/(ProductListing)/ProductInfo";
import ProductType from "@/models/(ProductListing)/ProductType";
import ProductVariant from "@/models/(ProductListing)/ProductVariant";
import Subcategory from "@/models/(ProductListing)/Subcategory";
import adminModel from "@/models/admin";
import AdminSessionModel from "@/models/adminSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDb()
    try {

        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const admin = await AdminSessionModel.findOne({ token: token })
        const adminId = admin.adminId

        const inventoryItems = await Inventory.find({ adminId })
            .populate({
                path: "productId",
                select: "productCode",
                match: { adminId: adminId }
            })
            .populate({
                path: "productType",
                select: "name",
                match: { adminId: adminId }
            })
            .populate({
                path: "category",
                select: ("name", "slug"),
                match: { adminId: adminId }
            })
            .populate({
                path: "subcategory",
                select: ("name", "categoryId"),
                match: { adminId: adminId }
            })
            .populate({
                path: "",
                select: ("name", "slug"),
                match: { adminId: adminId }
            })
            .populate({
                path: "brand",
                select: ("name"),
                match: { adminId: adminId }
            })
            .populate({
                path: "category",
                select: ("name", "slug"),
                match: { adminId: adminId }
            })
            .populate({
                path: "productVariant",
                select: ("sku", "price", "discountprice", "attributes", "currency", "isAvailabel", "quantity"),
                match: { adminId: adminId }
            })
            .populate({
                path: "attributes",
                match: { "attribute.adminId": specificAdminId },
                populate: [
                    {
                        path: "attribute",
                        select: ("size", "color", "slug", "isVariant")
                    },
                    {
                        path: "value",
                        select: ("sizevalue", "colorvalue", "slug")
                    }
                ],
                select: "attribute  value"
            })
            .populate({
                path: "productImages",
                select: ("image", "size", "color"),
                match: { adminId: adminId }
            })
            .lean()
        return NextResponse.json(inventoryItems)
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }


}


export async function POST(request) {
    await connectToDb()

    try {


        const { vendorname } = await request.json()
        const adminId = await adminModel.find()
        const productid = await ProductInfo.find()
        const producttype = await ProductType.find({})
        const category = await Category.find({})
        const subcategory = await Subcategory.find({})
        const brand = await Brand.find({})
        const attribute = await Attribute.find({})
        const attributevalue = await AttributeValue.find({})
        const productVariant = await ProductVariant.find({})
        const productImage = await ProductImage.find({})


        const inventorydetails = [

            {
                vendorname,
                adminId: adminId.map(id => id._id),
                productId: productid.map(id => id._id),
                productType: producttype.map(id => id._id),
                category: category.map(id => id._id),
                subcategory: subcategory.map(id => id._id),
                brand: brand.map(id => id._id),
                productVariant: productVariant.map(id => id._id),
                // attributes: [{
                //     attribute: attribute.map(id => id._id),
                //     value: attributevalue.map(id => id._id)
                // }],
                productImages: productImage.map(id => id._id)


            }
        ]



        const inventory = await Inventory.create(inventorydetails)

        return NextResponse.json(inventory, { message: "Inventory updated successfuly" }, { status: 200 })

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }


}




// const inventoryItems = await Inventory.find({ adminId: specificAdminId })
//     .populate({
//         path: "productType",
//         select: "name",
//         match: { adminId: specificAdminId }
//     })
//     .populate({
//         path: "category",
//         select: "name",
//         match: { adminId: specificAdminId }
//     })
//     .populate({
//         path: "brand",
//         select: "name",
//         match: { adminId: specificAdminId }
//     });

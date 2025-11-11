import { connectToDb } from "@/db/db";
import Attribute from "@/models/(ProductListing)/Attribute";
import AttributeValue from "@/models/(ProductListing)/AttributeValue";
import Brand from "@/models/(ProductListing)/Brand";
import Category from "@/models/(ProductListing)/Category";
import MaterialCare from "@/models/(ProductListing)/MaterialCare";
import ProductImage from "@/models/(ProductListing)/ProductImage";
import ProductType from "@/models/(ProductListing)/ProductType";
import ProductVariant from "@/models/(ProductListing)/ProductVariant";
import ReturnPolicy from "@/models/(ProductListing)/ReturnPolicy";
import Subcategory from "@/models/(ProductListing)/Subcategory";
import AdminSessionModel from "@/models/adminSessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {

    await connectToDb()

    try {

        const cookieStore = await cookies()
        const token = await cookieStore.get("admintoken")?.value

        if (!token) {
            return NextResponse.json({ message: "Unautherized " }, { status: 400 })
        }
        const adminsession = await AdminSessionModel.findOne({ token })

        if (!adminsession) {
            return NextResponse.json({ message: "admin not found" }, { status: 400 })
        }

        const adminid = adminsession.adminId


        const [producttype, category, subcategory, brand, attribute, attributevalue, productvariant, materialcare, returnpolicy, productimage] = await Promise.all([
            ProductType.find({ adminId: adminid }),
            Category.find({ adminId: adminid }),
            Subcategory.find({ adminId: adminid }),
            Brand.find({ adminId: adminid }),
            Attribute.find({ adminId: adminid }),
            AttributeValue.find({ adminId: adminid }),
            ProductVariant.find({ adminId: adminid }),
            MaterialCare.find({ adminId: adminid }),
            ReturnPolicy.find({ adminId: adminid }),
            ProductImage.find({ adminId: adminid }),
        ]);

        const productDetails = {
            producttype,
            category,
            subcategory,
            brand,
            attribute,
            attributevalue,
            productvariant,
            materialcare,
            returnpolicy,
            productimage
        };


        return NextResponse.json(productDetails)

    } catch (err) {
        console.log(err.message)

        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })

    }
}


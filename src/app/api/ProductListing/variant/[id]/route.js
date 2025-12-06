import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDb } from '@/db/db';
import AdminSessionModel from '@/models/adminSessionModel';
import ProductInfo from '@/models/(ProductListing)/ProductInfo';
import Attribute from '@/models/(ProductListing)/Attribute';
import ProductVariant from '@/models/(ProductListing)/ProductVariant';


export async function GET(req, { params }) {
  await connectToDb();

  try {
    const cookieStore = cookies();
    const token = await cookieStore.get('admintoken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = await AdminSessionModel.findOne({ token });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const adminId = admin.adminId;
    const { id } = await params;

    const product = await ProductInfo.findOne({ productCode: id });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productId = product._id;

    const attributes = await Attribute.find({ adminId, productId }).lean();
    const variants = await ProductVariant.find({ adminId, productId }).lean();

    // Build a map of attributeId -> variant
    const variantMap = {};
    for (const variant of variants) {
      if (variant.attribute) {
        variantMap[variant.attribute.toString()] = variant;
      }
    }

    // Merge each attribute with its corresponding variant
    const mergedArray = attributes.map(attribute => {
      const attrId = attribute._id.toString();
      const relatedVariant = variantMap[attrId] || null;


      return {
        attribute,
        variant: relatedVariant,
      };
    });

    // ✅ Return array directly
    return NextResponse.json(mergedArray, { status: 200 });

  } catch (error) {
    console.error('[ATTRIBUTE_VARIANT_API_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}













import Product from "@/model/product";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

import slugify from "slugify";


export async function GET() {
    await dbConnect();
    try {
        const products = await Product.find({}).populate(
            "category_id",
            "name slug"
        ).sort({ createAt: -1 });
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    await dbConnect();
    const body = await req.json();
    const {
        name,
        category_id,
        price,
        thumb_image,
        short_description,
        long_description,
        offer_price,
        sku,
        show_at_home = false,
        status = true,
    } = body

    try {
        if (!name || !category_id || !price || !thumb_image) {
            return NextResponse.json({ err: "Required fields are missing" }, { status: 400 })
        }
        const product = Product.create({
            name,
            slug: slugify(name, { lower: true }),
            category_id,
            price,
            thumb_image,
            short_description,
            long_description,
            sku: sku || generateSKU(),
            show_at_home,
            status
        })

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}


function generateSKU(prefix = "PROD", Length = 8) {
    const randomPart = Math.random().toString(36).substring(2, 2 + Length).toUpperCase();
    const timestamptPart = Date.now().toString(36).toUpperCase().slice(-4);
    return `${prefix}-${randomPart}${timestamptPart}`


}
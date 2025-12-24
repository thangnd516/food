import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductOption from "@/model/productoption";
import ProductSize from "@/model/productsize";


export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    if (!product_id) {
        return NextResponse.json({ err: "product_id parameter is required" }, { status: 500 })
    }
    try {
        const [sizes, options] = await Promise.all([
            ProductOption.find({ product_id }).sort({ createAt: 1 }),
            ProductSize.find({ product_id }).sort({ CreatedAt: 1 })
        ])
        return NextResponse.json({
            sucess: true,
            sizes,
            options
        })
    } catch (error) {
        return NextResponse.json({ err: "Fail to fetch product details" }, { status: 500 })

    }
}
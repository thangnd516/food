import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/model/product";
import ProductGallery from "@/model/productgallery";
import ProductOption from "@/model/productoption";
import ProductSize from "@/model/productsize";


export async function GET(req, { params }) {
    await dbConnect();
    const { id } = await params;
    try {
        const product = await Product.findOne({ slug: id }).populate(
            "category_id",
            "name slug"
        ).lean();
        if (!product) {
            return NextResponse.json({ err: "Product not found" }, { status: 404 })
        }
        const [gallery, options, sizes] = await Promise.all([
            ProductGallery.find({ product_id: product._id }).lean(),
            ProductOption.find({ product_id: product._id }).lean(),
            ProductSize.find({ product_id: product._id }).lean(),

        ])
        const response = {
            ...product,
            gallery,
            options,
            sizes,
        }
        return NextResponse.json(response)
    } catch (err) {
        return NextResponse.json({ err: error.messase }, { status: 500 })

    }
}
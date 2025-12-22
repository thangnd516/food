


import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import ProductGallery from "@/model/productgallery"

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");
    try {
        const gallery = await ProductGallery.find({ product_id });
        return NextResponse.json(gallery);
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}

export async function POST() {
    await dbConnect();

    const body = await req.json();
    try {
        const newImage = await ProductGallery.create(body);
        return NextResponse.json(newImage);
    }
    catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}
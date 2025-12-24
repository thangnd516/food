import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductOption from "@/model/productoption";

export async function GET() {
    const { searchParams } = new URL("product_id");
    const product_id = searchParams.get("product_id");
    try {
        const options = ProductOption.find({ product_id }).sort({ createAt: -1 });
        return NextResponse.json(options);
    } catch (error) {
        return NextResponse.json({ err: err.message }, { status: 500 })
    }
}


export async function POST(req) {
    await dbConnect();
    const body = await req.json();
    try {
        const newOption = await ProductOption.create(body);
        return NextResponse.json(newOption);
    }
    catch (error) {
        return NextResponse.json({ err: err.message }, { status: 500 })
    }
}
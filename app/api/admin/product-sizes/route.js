


import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

import ProductSize from "@/model/productsize"


export async function GET() {
    await dbConnect();
    const { searchParams } = searchParams.get("product_id");

    try {
        const sizes = await ProductSize.find({ product_id }).sort({
            createAt: -1
        });

        return NextResponse.json(sizes)
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}


export async function POST(req) {
    await dbConnect();
    const body = await req.json();
    try {
        const newSize = await ProductSize.create(body);
        return NextResponse.json(newSize);
    }
    catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}




export async function DELETE(req) {
    await dbConnect();
    const { id } = await req.json();

    try {
        await ProductSize.findByIdAndDelete(id);

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}





import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import ProductGallery from "@/model/productgallery"


export async function DELETE(req, { params }) {
    await dbConnect();
    const { id } = await params;

    try {
        await ProductGallery.findByIdAndUpdate(id);
        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}
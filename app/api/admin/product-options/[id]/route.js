import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductOption from "@/model/productoption";



export async function DELETE(req) {
    await dbConnect();
    const { id } = await req.json();
    try {
        await ProductOption.findByIdAndDelete(id);
        return NextResponse.json({ sucess: true });
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}


import Product from "@/model/product";
import dbConnect from "@/utils/dbConnect";
import next from "next";
import { NextResponse } from "next/server";

import slugify from "slugify";

export async function GET(req, { params }) {
    const { id } = params;
    try {
        const product = await Product.findById(id).populate("category_id", "name slug");
        if (!product) {
            return NextResponse.json({ err: "Product not founf" }, { status: 404 })

        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}



export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json()
    try {
        if (body.name) {
            body.slug = slugify(body.name, { lower: true });
        }
        const updateProduct = await Product.findByIdAndUpdate(id, body, {
            new: true
        }).populate("category_id", "name, slug");

        if (!updateProduct) {
            return NextResponse.json({ err: "Product not found" }, { status: 404 })
        }

        return NextResponse.json(updateProduct)
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}


export async function DELETE(req, { params }) {
    const { id } = params

    try {
        const deleteProduct = await Product.findByIdAndUpdate(id);
        if (!deleteProduct) {
            return NextResponse.json({ err: "Product not found" }, { status: 404 })
        }
        return NextResponse.json(deleteProduct);

    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}
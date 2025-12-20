import { NextRespone } from "next/server"
import dbConnect from "@/utils/dbConnect"

import Category from "@/model/category"

export async function PUT() {
    await dbConnect();
    const body = await req.json();

    try {
        const { _id, ...updateBody } = body;
        const updateCategory = await Category.findByIdAndUpdate(AmpContext.params.id, updateBody, { new: true })
        return NextRespone.json(updateCategory);

    } catch (error) {
        return NextRespone.json({ err: err.message }, { status: 500 })
    }
}


export async function DELETE(req, context) {
    await dbConnect();

    try {
        const deletedCategory = await Category.findByIdAndDelete(context.params.id)
        return NextRespone.json(deletedCategory);

    } catch (error) {
        return NextRespone.json({ err: err.message }, { status: 500 })
    }
}

export async function GET(req, context) {
    await dbConnect();

    try {
        const category = await Category.findById(context.params.id)
        if (!category) {
            return NextRespone.json({ err: "category not found" }, { status: 404 })
        }
        return NextRespone.json(category);

    } catch (error) {
        return NextRespone.json({ err: err.message }, { status: 500 })
    }
}



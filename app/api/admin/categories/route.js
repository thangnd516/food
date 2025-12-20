import { NextRespone } from "next/server"
import dbConnect from "@/utils/dbConnect"

import { Category } from "@/model/category"

import slugify from "slugify"

export async function GET() {
    await dbConnect();
    try {
        const categories = await Category.find({}).sort({ createdAt: -1 });
        return NextRespone.json(categories);

    } catch (error) {
        return NextRespone.json({ err: err.message }, { status: 500 })
    }
}

export async function POST(req) {
    await dbConnect()
    const body = await req.json();
    const { name, status = true, show_at_home = false } = body
    try {
        const category = await Category.create({
            name,
            slug: slugify(name, { lower: true }),
            status,
            show_at_home
        });
        return NextRespone.json(category);

    } catch (error) {
        return NextRespone.json({ err: err.message }, { status: 500 })
    }
}


import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductOption from "@/model/productoption";
import ProductSize from "@/model/productsize";

import Product from "@/model/product";

import Cart from "@/model/cart"

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function POST() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user._id) {
        return NextResponse.json({ error: "unauthorized" }, { status: 400 })
    }

    const userId = session.user._id;
    try {
        const body = await req.json();
        const { productId, sizeId, optionIds = [], quantity } = body;
        if (!productId || !quantity) {
            return NextResponse.json({ error: "missing required fields" }, { status: 400 })

        }
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({ error: "product not found" }, { status: 400 })
        }
        let totalPrice = product.price;
        if (sizeId) {
            const size = await ProductSize.findById(sizeId);
            if (size) {
                totalPrice += size.price;
            }
        }

        if (optionIds.length > 0) {
            const options = await ProductOption.find({ _id: { $in: optionIds } })
            const optionTotal = options.reduce((sum, opt) => sum + opt.price, 0)
            totalPrice += optionTotal;
        }

        totalPrice = totalPrice * quantity;
        const cartItem = await Cart.create({
            productId,
            sizeId,
            optionIds,
            quantity,
            totalPrice,
            userId: userId
        })
        return NextResponse.json({ sucess: true, cartItem });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user._id) {
        return NextResponse.json({ error: "unauthorized" }, { status: 400 })
    }

    const userId = session.user._id;
    try {
        const cartItems = await Cart.find({
            userId: userId
        }).poputate("productId").poputate("sizeId").poputate("optionsIds");
        return NextResponse.json(cartItems, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

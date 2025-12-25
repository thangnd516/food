import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductOption from "@/model/productoption";
import ProductSize from "@/model/productsize";

import Product from "@/model/product";

import Cart from "@/model/cart"

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function DELETE(req, context) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user._id) {
        return NextResponse.json({ error: "unauthorized" }, { status: 400 })
    }
    const { id: cartId } = await context?.params;
    const userId = session.user._id;
    try {
        if (!cartId) {
            return NextResponse.json({ error: "missing cartId" }, { status: 500 })
        }
        const cart = await Cart.deleteOne({
            _id: cartId,
            userId: userId
        })
        return NextResponse.json({ sucess: true }, { status: 200 })


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

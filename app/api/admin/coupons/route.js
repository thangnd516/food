
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";


import Coupon from "@/model/coupon";


export async function GET() {
    await dbConnect();
    try {
        const coupons = await Coupon.find({}).sort({ createAt: -1 })
        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })

    }
}

export async function POST(req) {
    await dbConnect();
    const body = await req.json()
    const {
        name, code, quantity, min_purchase_amount = 0, expire_date,
        discount_type, discount, status = true } = body
    try {
        if (
            !name || !code || !quantity || !expire_date ||
            !discount_type || !discount
        ) {
            return NextResponse.json({ err: "Missing required fields" }, { status: 500 })

        }

        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return NextResponse.json({ err: "coupon code already existes" }, { status: 400 })
        }

        if (discount_type === "percentage" && (discount < 0 || discount > 100)) {
            return NextResponse.json({ err: "percantage discount must be between 0-100" }, { status: 400 })
        } else if (discount_type === "fixed" && discount < 0) {
            return NextResponse.json({ err: "pfixed discount must be a positive number" }, { status: 400 })

        }
        if (new Date(expire_date) <= new Date()) {
            return NextResponse.json({ err: "expiration date must in the future" }, { status: 400 })

        }
        const coupon = await Coupon.create({
            name,
            code: code.toUperCase().trim(),
            min_purchase_amount,
            expire_date: new Date(expire_date),
            discount_type,
            discount,
            status,
        })
        return NextResponse.json(coupon)
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })

    }
}

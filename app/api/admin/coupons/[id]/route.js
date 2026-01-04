
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Coupon from "@/model/coupon";




export async function GET(req, context) {
    await dbConnect();
    const { id } = await context.params
    try {
        const coupons = await Coupon.findById(id)
        if (!coupons) {
            return NextResponse.json({ err: "coupon  not found" }, { status: 404 })

        }

        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })

    }
}

export async function PUT(req, context) {
    await dbConnect();
    const body = await req.json();

    try {
        if (!body.discount_type && body.discount) {

            if (body.discount_type === "percentage" && (body.discount < 0 || body.discount > 100)) {
                return NextResponse.json({ err: "Percantage discount must be between 0 -100" }, { status: 400 })

            } else if (body.discount_type === "fixed" && body.discount < 0) {
                return NextResponse.json({ err: "Fixed discount must be a positive number" }, { status: 400 })
            }

        }
        if (body.expire_date && Date(body.expire_date) <= new Date()) {
            return NextResponse.json({ err: "expiration date must in the future" }, { status: 400 })

        }
        if (body.code) {
            body.code = body.code.toUpperCase().trim();
            const existingCoupon = await Coupon.findOne({
                code: body.code,
                _id: {
                    $ne: context.params.id
                },
            }
            )
        }


        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return NextResponse.json({ err: "coupon code already existes" }, { status: 400 })
        }

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            context.params.id,
            body,
            { new: true }
        )
        if (!updatedCoupon) {
            return NextResponse.json({ err: "coupon not found" }, { status: 400 })

        }

        return NextResponse.json(updatedCoupon);

    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })

    }
}



export async function DELETE(req, context) {
    await dbConnect()
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(context.params.id)
        if (!deletedCoupon) {
            return NextResponse.json({ err: "Coupon not found" }, { status: 404 })
        }
        return NextResponse.json(deletedCoupon);
    }
    catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 });

    }
}
import Cart from "@/model/cart";
import Product from "@/model/product";
import ProductOption from "@/model/productoption";
import ProductSize from "@/model/productsize";
import { authOptions } from "@/utils/authOptions";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import DeliveryArea from "@/model/deliveryarea";
import Coupon from "@/model/coupon";
import { get } from "http";


export async function POST() {
    await dbConnect();

    try {
        const body = await request.json();
        const { sessionid } = body;
        const session = await getServerSession(authOptions);
        if (!session?.user?._id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const stripeSession = await sessionInstance.checkout.sessions.retrieve(sessionid, {
            expand: ['payment_intent']
        });

        if (stripeSession.payment_status !== 'paid') {
            return NextResponse.json(
                { error: "Payment not completed" },
                { status: 400 }
            );
        }
        const { order_id, user_id, coupon_id, amount, currency } = stripeSession.metadata;

        if (user_id !== session.user._id.toString()) {
            return NextResponse.json(
                { error: "order does not belong to  this user " },
                { status: 403 }
            );
        }
        const updateData = {
            payment_method: stripeSession.payment_method_types[0] || "card",
            payment_status: 'Paid',
            transaction_id: stripeSession.payment_intent?.id || stripeSession.id,
            payment_approved_date: new Date(stripeSession.created * 1000),
            currency_name: currency || stripeSession.currency || "USD",


        };

        let couponInfo = {}
        if (coupon_id) {
            const coupon = await Coupon.findByIdAndUpdate(coupon_id, {
                $inc: { used_count: 1 }
            }, { new: true });
            if (coupon) {
                couponInfo = {
                    coupon_id: coupon._id,
                    code: coupon.code,
                    discount_type: coupon.discount_type,
                    discount_value: coupon.discount,
                    name: coupon.name
                }

            }else {
                console.log("Coupon not found for ID:", coupon_id);
            }
        }

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
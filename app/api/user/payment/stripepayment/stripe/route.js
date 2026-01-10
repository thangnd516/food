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
import { type } from "os";


export async function validateDeliveryFee(deliveryAreaId, clientFee) {
    const area = await DeliveryArea.findById(deliveryAreaId);

    if (!area) {
        throw new Error("Delivery area not found");
    }
    if (area.delivery_fee !== clientFee) {
        throw new Error("Delivery fee mismatch");
    }
    return area.delivery_fee;
}

export async function validateCoupon(code, subtotal, clientTotalDiscount) {
    if (!code) {
        return { discount: 0, couponData: null };
    }
    const coupon = await Coupon.findOne({
        code: code.toUpperCase(), status: true, expire_date: { $gt: new Date() },
        $expr: { $lt: ["$used_count", "$quantity"] }
    });

    if (!coupon) {
        throw new Error("Coupon not found");
    }
    if (subtotal < coupon.min_purchase_amount) {
        throw new Error("Coupon minimum purchase amount not met");
    }
    const calculatedDiscount = coupon.discount_type === "percentage"
        ? (subtotal * coupon.discount) / 100
        : coupon.discount;
    if (Math.abs(calculatedDiscount - clientTotalDiscount) > 0.01) {
        throw new Error("Coupon discount mismatch");
    }
    return {
        discount: calculatedDiscount, couponData: {
            id: coupon._id,
            name: coupon.name,
            code: coupon.code,
            type: coupon.discount_type,
            value: coupon.discount,
            min_purchase: coupon.min_purchase_amount
        }
    };
}

const generateInvoiceId = () => {
    return `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function validateCartItems(cartItems) {
    const validatedItems = [];
    let subtotal = 0;

    for (const item of cartItems) {
        // 1️⃣ Product
        const productId = item.productId?._id || item.productId;
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        let size = null;
        let sizePrice = 0;

        if (item.sizeId) {
            const sizeId = item.sizeId?._id || item.sizeId;
            size = await ProductSize.findOne({
                _id: sizeId,
                product_id: productId,
            });

            if (!size) {
                throw new Error("Product size not found");
            }

            sizePrice = size.price || 0;
        }

        const options = [];
        let optionsPrice = 0;

        if (item.optionIds?.length > 0) {
            for (const opt of item.optionIds) {
                const optionId = opt?._id || opt;
                const optionDoc = await ProductOption.findOne({
                    _id: optionId,
                    product_id: productId,
                });

                if (!optionDoc) {
                    throw new Error("Product option not found");
                }

                options.push(optionDoc);
                optionsPrice += optionDoc.price || 0;
            }
        }

        const basePrice =
            product.offer_price ?? product.price;

        const unitPrice = basePrice + sizePrice + optionsPrice;
        const quantity = item.quantity || 1;
        const totalPrice = unitPrice * quantity;

        subtotal += totalPrice;

        validatedItems.push({
            product,
            size,
            options,
            quantity,
            unitPrice,
            totalPrice,
        });
    }

    return {
        items: validatedItems,
        subtotal,
    };
}

export async function POST() {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?._id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const body = await req.json();
        const userId = session.user?._id

        const {
            cartItems = [],
            subtotal: clientSubtotal = 0,
            totalDiscount: clientTotalDiscount = 0,
            deliveryFee: clientDeliveryFee = 0,
            total: clientTotal = 0,
            address = {},
            couponCode = ""

        } = body
        // 1 validate cart items
        const { validatedItems, subtotal: serverSubtotal } = await Cart.validateCartItems(cartItems);

        //2 validate delivery fee based on address
        const deliveryFee = await validateDeliveryFee(address.delivery_area_id?._id || address.delivery_area_id, clientDeliveryFee);
        //3 validate coupon applied
        const { discount: serverDiscount, couponData } = await validateCoupon(couponCode, userId, serverSubtotal, clientTotalDiscount);

    } catch (error) {
        return NextResponse.json(
            { err: error.message },
            { status: 500 }
        );
    }

}
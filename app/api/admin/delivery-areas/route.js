
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Delivery from "@/model/deliveryArea  ";


export async function GET() {
    await dbConnect();
    try {
        const deliveryAreas = await Delivery.find({}).sort({ createdAt: -1 });
        return NextResponse.json(deliveryAreas);
    } catch (error) {
        return NextResponse.json(
            { err: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    await dbConnect();

    const body = await req.json();

    const {
        area_name,
        min_delivery_time,
        max_delivery_time,
        delivery_fee,
        status = true,
    } = body
    try {
        const area = await Delivery.create({
            area_name,
            min_delivery_time,
            max_delivery_time,
            delivery_fee,
            status
        });
        return NextResponse.json(area);

    } catch (error) {
        return NextResponse.json(
            { err: error.message },
            { status: 500 }
        );
    }

}


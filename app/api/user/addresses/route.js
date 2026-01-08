import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Address from "@/model/address";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function GET() {
    await dbConnect();
    try {
        const addresses = await Address.find({})
            .populate('user_id', 'name email')
            .populate('delivery_area_id')
            .sort({ createdAt: -1 });
        return NextResponse.json(addresses);
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
    const session = await getServerSession(authOptions);
    try {
        if (!session?.user?._id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const body = await req.json();
        const {
            delivery_area_id,
            first_name,
            last_name,
            email,
            phone,
            address,
            type
        } = body

        const newAddress = new Address({
            user_id: session?.user?._id,
            delivery_area_id,
            first_name,
            last_name,
            email,
            phone,
            address,
            type
        });
        await newAddress.save();
        return NextResponse.json(newAddress);
    } catch (error) {
        return NextResponse.json(
            { err: error.message },
            { status: 500 }
        );
    }
}
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Address from "@/model/address";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";



export async function GET(req, context) {
    await dbConnect();
    const { id } = await context?.params;
    try {
        const address = await Address.find({})
            .populate('user_id', 'name email')
            .populate('delivery_area_id')
            .findById(id);
        if (!address) {
            return NextResponse.json({ err: "Address not found" }, { status: 404 })

        }

        return NextResponse.json(address);
    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })

    }
}

export async function PUT(req, context) {
    await dbConnect();
    const body = await req.json();

    try {
        const { _id, ...updateData } = body;
        const updateAddress = await Address.findByIdAndUpdate(
            context.params.id, updateData, { new: true });

        return NextResponse.json(updateAddress);

    } catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 })

    }
}



export async function DELETE(req, context) {
    await dbConnect()
    const { id } = await context?.params;
    try {
        const deletedAddress = await Address.findByIdAndDelete(id)
        if (!deletedAddress) {
            return NextResponse.json({ err: "Address not found" }, { status: 404 })
        }
        return NextResponse.json(deletedAddress);
    }
    catch (error) {
        return NextResponse.json({ err: error.message }, { status: 500 });

    }
}
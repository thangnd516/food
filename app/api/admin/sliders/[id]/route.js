
import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import Slider from "@/model/slider"

export async function PUT(req, context) {
    await dbConnect();
    const body = await req.json();
    const { id } = await context.params

    try {
        const { _id, ...updateBody } = body;

        const updatingSlider = await Slider.findByIdAndUpdate(id, updateBody, { new: true })

        return NextResponse.json(updatingSlider)


    } catch (error) {
        return NextResponse.json({ err: err.message }, { status: 500 })
    }
}

export async function DELETE(req, context) {
    await dbConnect();
    const { id } = await context.params

    try {

        const deletingSlider = await Slider.findByIdAndDelete(id)

        return NextResponse.json(deletingSlider)


    } catch (error) {
        return NextResponse.json({ err: err.message }, { status: 500 })
    }
}

export async function GET(req, context) {
    await dbConnect();
    const { id } = await context.params

    try {

        const slider = await Slider.findById(id)
        if (!slider) {
            return NextResponse.json({ err: "slider not found " }, { status: 404 })
        }

        return NextResponse.json(slider)


    } catch (error) {
        return NextResponse.json({ err: err.message }, { status: 500 })
    }
}





import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import Slider from "@/model/slider"

const cleanStringInput = (str) => {
    if (!str) return
    return str.replace(/\n/g, "").trim()
}

export async function GET() {
    await dbConnect()
    try {
        const sliders = await Slider.find({}).sort({ createAt: -1 })
        return NextResponse.json({ sliders })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
export async function POST(req) {
    await dbConnect()
    const body = await req.json()
    const cleanedData = {
        image: body.image,
        offer: cleanStringInput(body.offer),
        title: cleanStringInput(body.title),
        sub_title: cleanStringInput(body.sub_title),
        short_description: cleanStringInput(body.short_description),
        button_link: cleanStringInput(body.button_link),
        status: body.status || true


    }
    try {
        const slider = await Slider.create(cleanedData)
        return NextResponse.json({
            success: true,
            data: slider,
            message: "slider  created successfully"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to create slider",
            reveivedData: cleanedData,
        }, { status: 500 })
    }

}
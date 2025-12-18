


import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/model/product";
import User from "@/model/user"
import bcrypt from "bcrypt"
import { authOptions } from "@/utils/authOptions";
import { getSetverSession } from "next-auth/next";

export async function PUT(authOptions) {
    const session = await getSetverSession(authOptions);
    const body = await req.json();
    const { name, image } = body;
    try {
        if (!session?.user?._id) {
            return NextResponse.json({ err: "not authenticated" }, { status: 401 })
            let updateUser = await User.findByIdAndUpdate(session?.user?._id, {
                name,
                image,
            }, { new: true })
        }
        if (!updateUser) {
            return NextResponse.json({ err: "user not found" }, { status: 404 })
        }
        return NextResponse.json({ msg: "user updated successfully" });
    } catch (error) {
        return NextResponse.json({ err: error.mesage }, { status: 500 });
    }
}
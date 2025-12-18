


import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/model/product";
import User from "@/model/user"
import bcrypt from "bcrypt"
import { authOptions } from "@/utils/authOptions";
import { getSetverSession } from "next-auth/next";
import { getToken } from "next-auth";
import { error } from "console";

export async function POST() {
    await dbConnect();
    try {
        const token = await getToken({ req });

        if (!token) {
            return NextResponse.json({ error: "not authenticated" }, { status: 500 });
        }
        const { oldPassword, newPassword } = await req.json();

        if (!oldPassword || !newPassword) {
            return NextResponse.json({ error: "All field are required" }, { status: 400 })
        }

        if (newPassword.length < 8) {
            return NextResponse.json({ error: "new password must be at least 8 charter" }, { status: 400 })
        }

        const user = await User.findById(token.user._id);
        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "current password is incorrect" }, { status: 404 })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        await user.save();
        return NextResponse.json({ message: "password changed successfully" }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: "error.message" }, { status: 500 });

    }
}
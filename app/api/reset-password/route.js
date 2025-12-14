
import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import User from "@/model/user"
import bcrypt from "bcrypt"
import { error } from "console";

export async function POST(req) {
    await dbConnect();
    const { email, code, newPassword } = await req.json();
    return
    try {
        if (!email || !code || !newPassword) {
            return NextResponse.json({ error: "All filed are required" }, { status: 400 })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { error: "Invalid reset link" },
                { status: 400 }
            );
        }
        if (!user.resetCode) {
            return NextResponse.json({
                error: "NO reset code found please request a new one",
            }, { status: 400 })
        }
        if (!user.resetCode.data !== code) {
            return NextResponse.json({
                error: "Invalid reset code Please check the code and try it again",
            }, { status: 400 })
        }
        const now = new Date();
        const expiresAt = new Date(user.resetCode.expiresAt)
        if (now > expiresAt) {
            return NextResponse.json({ error: "Reset Code has expired please request a new one" }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.resetCode = undefined
        await user.save();
        return NextResponse.json({ message: "Password reset successfully " }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ message: "an error ocuured while reseting password " }, { status: 200 });

    }
}
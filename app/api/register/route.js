import { NextResponse } from "next/server";
import dbConect from "@/utils/dbConnect.js"
import User from "@/model/User.js"

import bcrypt from "bcrypt"

export async function POST() {

    await dbConect();


    try {
        const body = await req.json();
        const { name, email, password } = body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { err: "email already in use" },
                { status: 500 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await new user({
            name, email, password: hashedPassword
        }).save()
        return NextResponse.json({ msg: "user registered successfully" }, { status: 200 })

    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}
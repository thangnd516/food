import { NextResponse } from "next/server";
// import dbConect from "@/utils/dbConect"
// import User from "@/model/user"

import bcrypt from "bcrypt"

export async function POST() {
    const body = await req.json();
    const { name, email, password } = body;

    try {
        const existingUser = await UserActivation.findOne({ email })
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
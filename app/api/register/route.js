import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/model/user";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { name, email, password, role } = body;

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Please provide all required fields" },
                { status: 400 }
            );
        }

        // Check email tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', // default là 'user'
        });

        return NextResponse.json(
            { 
                message: "User registered successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json(
            { error: error.message || "Registration failed" },
            { status: 500 }
        );
    }
}

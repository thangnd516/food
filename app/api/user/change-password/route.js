


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
        if(!oldPassword || !newPassword ){
            return NextResponse.json({ error: "All field are required"},{status: 400})
        }
        
    } catch (e) {
        return NextResponse.json({ error: "error.message" }, { status: 500 });

    }
}
import { NextResponse } from "next/server";
// import dbConect from "@/utils/dbConect"
// import User from "@/model/user"

import bcrypt from "bcrypt"

export async function POST() {
    const body = await req.json();
    const { name, email, password } = body;
}
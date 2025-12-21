
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/model/category"; // Đảm bảo import đúng model
import mongoose from "mongoose";

// --- Hàm GET (Lấy dữ liệu để hiển thị lên form Edit) ---
export async function GET(req, { params }) {
    await dbConnect();

    // !!! QUAN TRỌNG: Phải await params mới lấy được id trong Next.js 15 !!!
    const { id } = await params; 

    try {
        // Kiểm tra ID có đúng format MongoDB không
        if (!mongoose.Types.ObjectId.isValid(id)) {
             return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
        }

        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// --- Hàm PUT (Update dữ liệu) ---
export async function PUT(req, { params }) {
    await dbConnect();
    
    // !!! QUAN TRỌNG: Cũng phải await ở đây !!!
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
            { message: "Invalid category id" },
            { status: 400 }
        );
    }

    const body = await req.json();
    delete body._id; // Xóa _id trong body để tránh lỗi update đè key chính

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id, // Dùng biến id đã await
            body,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// --- Hàm DELETE (Xóa dữ liệu) ---
export async function DELETE(req, { params }) {
    await dbConnect();
    
    // !!! QUAN TRỌNG: Await ở đây nữa !!!
    const { id } = await params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        
        if (!deletedCategory) {
             return NextResponse.json({ message: "Not found" }, { status: 404 });
        }
        
        return NextResponse.json(deletedCategory);

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
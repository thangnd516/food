
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Delivery from "@/model/deliveryArea  ";


// // --- Hàm GET (Lấy dữ liệu để hiển thị lên form Edit) ---
// export async function GET(req, { params }) {
//     await dbConnect();

//     // !!! QUAN TRỌNG: Phải await params mới lấy được id trong Next.js 15 !!!
//     const { id } = await params; 

//     try {
//         // Kiểm tra ID có đúng format MongoDB không
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//              return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
//         }

//         const category = await Category.findById(id);

//         if (!category) {
//             return NextResponse.json(
//                 { message: "Category not found" },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(category);
//     } catch (error) {
//         return NextResponse.json(
//             { error: error.message },
//             { status: 500 }
//         );
//     }
// }

// --- Hàm PUT (Update dữ liệu) ---
export async function PUT(req, context) {
    await dbConnect();

    const body = await req.json();


    try {
        const { _id, ...updateData } = body; // Loại bỏ _id khỏi dữ liệu cập nhật
        const updatedCategory = await Delivery.findByIdAndUpdate(
            context.params.id, updateData, { new: true });
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

    const { id } = await params;

    try {
        const deletedDelivery = await Delivery.findByIdAndDelete(id);

        if (!deletedDelivery) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        return NextResponse.json(deletedDelivery);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

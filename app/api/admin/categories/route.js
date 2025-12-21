// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Category from "@/model/category";
// import slugify from "slugify";

// export async function GET() {
//   await dbConnect();
//   try {
//     const categories = await Category.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(categories);
//   } catch (error) {
//     return NextResponse.json(
//       { err: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   await dbConnect();
//   try {
//     const body = await req.json();
//     const { name, status = true, show_at_home = false } = body;

//     const category = await Category.create({
//       name,
//       slug: slugify(name, { lower: true }),
//       status,
//       show_at_home,
//     });

//     return NextResponse.json(category, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { err: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/model/category";
import slugify from "slugify";

export async function GET() {
  await dbConnect();
  const categories = await Category.find().sort({ createdAt: -1 });
  return NextResponse.json(categories);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const category = await Category.create({
    name: body.name,
    slug: slugify(body.name, { lower: true }),
    status: body.status ?? true,
    show_at_home: body.show_at_home ?? false,
  });

  return NextResponse.json(category, { status: 201 });
}


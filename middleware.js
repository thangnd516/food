import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const role = token?.role;
    const pathname = req.nextUrl.pathname;

    // ⛔ User cố vào trang admin
    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ⛔ Admin cố vào trang user
    if (pathname.startsWith("/dashboard/user") && role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/user/:path*",
  ],
};

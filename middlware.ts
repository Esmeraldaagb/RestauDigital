import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.pathname;

  // Routes gestionnaire
  if (url.startsWith("/gestionnaire") && token?.role !== "gestionnaire") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Routes admin
  if (url.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gestionnaire/:path*", "/admin/:path*"]
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Halaman yang butuh login
const protectedRoutes = ["/dashboard", "/lacak", "/kirim", "/history", "/about"];

// Halaman yang tidak boleh diakses jika sudah login
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = request.cookies.get("user");

  // Jika mencoba akses halaman protected tanpa login → redirect ke login
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah login tapi mencoba akses /login atau /register → redirect ke dashboard
  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lacak/:path*",
    "/kirim/:path*",
    "/history/:path*",
    "/about/:path*",
    "/login",
    "/register",
  ],
};
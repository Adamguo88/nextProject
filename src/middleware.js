import { NextResponse } from "next/server";

export async function middleware(request) {
  const getToken = request.cookies.get("loginToken");

  // console.log(getToken?.value);
  if (request.nextUrl.pathname.includes("/permission")) {
    if (!getToken?.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname === "/login") {
    if (getToken?.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/permission";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/permission", "/permission/:path*", "/login"],
};

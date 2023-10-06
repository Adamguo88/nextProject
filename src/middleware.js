import { NextResponse } from "next/server";

export async function middleware(request) {
  const getToken = request.cookies.get("loginToken");
  console.log(getToken?.value);
  if (!getToken?.value) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/permission"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // headerにcookieが存在するなら何もしない（Server ComponentからのAPI呼び出し）
  if (request.headers.has("Authorization")) {
    return NextResponse.next();
  }
  // Unauthorized User
  if (!request.cookies.has("session")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // cookie headerにsession cookieをセットする
  const sessionCookie = request.cookies.get("session")!.value;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", sessionCookie);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/api/user/:path*",
};

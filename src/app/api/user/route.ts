import { auth } from "@/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const CookieHeader = request.headers.get("Authorization");
  const decodedIdToken = await auth.verifySessionCookie(CookieHeader!, true);
  return NextResponse.json({ decodedIdToken });
};

import { auth } from "@/firebase/admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const sessionCookie = request.cookies.get("session")?.value;
  if (!sessionCookie) return NextResponse.json({ error: "No Session Cookies" });
  cookies().delete("session");
  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
    await auth.revokeRefreshTokens(decodedIdToken.sub);
    return NextResponse.json({ message: "Signed out successfully" });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

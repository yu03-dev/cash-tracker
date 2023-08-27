import { auth } from "@/firebase/admin";
import { zIdToken } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { idToken } = zIdToken.parse(body);
    const expiresIn = 60 * 60 * 24 * 3 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    cookies().set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: expiresIn,
    });
    return NextResponse.json({ message: "Signed in successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};

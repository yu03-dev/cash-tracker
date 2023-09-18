import { getUser } from "@/utils/session";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const { name, email, picture } = await getUser(sessionCookie!);
    return NextResponse.json({
      name,
      picture,
      email,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

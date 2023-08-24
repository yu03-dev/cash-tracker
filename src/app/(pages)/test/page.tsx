import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default async function Page() {
  const cookieStore = cookies();
  if (!cookieStore.has("session")) {
    return redirect("/");
  }
  const sessionCookie = cookieStore.get("session")!.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionCookie,
    },
    cache: "no-store",
  });
  const parsed = await response.json();
  console.log(parsed);
  return <div>Hello</div>;
}

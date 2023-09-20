import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

type FetchParams<T> = {
  uri: string;
  schema: z.ZodType<T>;
};

export const fetchData = async <T>(params: FetchParams<T>) => {
  const { uri, schema } = params;
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) {
    return redirect("/");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${uri}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionCookie,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = schema.parse(await response.json());
  return data;
};

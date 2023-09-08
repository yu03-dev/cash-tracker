import { PostDataType, zMessageResponse } from "@/types";

export const createRecord = async ({ price, category }: PostDataType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, category }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { message } = zMessageResponse.parse(await response.json());
    console.log(message);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error", error.message);
    } else {
      console.error(error);
    }
  }
};

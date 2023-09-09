import { PostDataType, RecordType, zMessageResponse } from "@/types";

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

type UpdateRecordPrams = {
  recordId: string;
  price: number;
  category: string;
};

export const updateRecord = async (params: UpdateRecordPrams) => {
  const { recordId, price, category } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records/${recordId}`,
    {
      method: "PUT",
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
};

export const deleteRecord = async (params: { recordId: string }) => {
  const { recordId } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records/${recordId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const { message } = zMessageResponse.parse(await response.json());
  console.log(message);
};

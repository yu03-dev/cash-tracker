import { PostDataType, zMessageResponse } from "@/types";
import { useCallback, useState } from "react";

type UpdateRecordPrams = {
  recordId: string;
  price: number;
  category: string;
};

export const useRecord = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createRecord = useCallback(
    async ({ price, category }: PostDataType) => {
      setIsLoading(true);
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
      setIsLoading(false);
    },
    []
  );

  const updateRecord = useCallback(async (params: UpdateRecordPrams) => {
    const { recordId, price, category } = params;
    setIsLoading(true);
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message);
      } else {
        console.error(error);
      }
    }
    setIsLoading(false);
  }, []);

  const deleteRecord = useCallback(async (params: { recordId: string }) => {
    const { recordId } = params;
    setIsLoading(true);
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message);
      } else {
        console.error(error);
      }
    }
    setIsLoading(false);
  }, []);

  return { isLoading, createRecord, updateRecord, deleteRecord };
};

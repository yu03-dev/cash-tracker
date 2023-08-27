import { zChartData, zProfileData, zRecords } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// コンポーネント側でエラーハンドリングする?
export const getRecordsData = async () => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) {
    redirect("/");
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionCookie,
          },
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const records = zRecords.parse(await response.json());
      return records;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message);
      } else {
        console.error(error);
      }
    }
  }
};

export const getChartData = async () => {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) {
    redirect("/");
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/expenses/by-category`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionCookie,
          },
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const chartData = zChartData.parse(await response.json());
      return { ...chartData };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message);
      } else {
        console.error(error);
      }
    }
  }
};

export const getProfileData = async () => {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) {
    redirect("/");
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionCookie,
          },
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const profileData = zProfileData.parse(await response.json());
      return { ...profileData };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message);
      } else {
        console.error(error);
      }
    }
  }
};

export const getTotalExpenses = async () => {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) {
    redirect("/");
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/expenses/total`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionCookie,
          },
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const total = z.number().parse(await response.json());
      return total;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message);
      } else {
        console.error(error);
      }
    }
  }
};

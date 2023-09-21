import { ExpenseByCategoryType, RecordsType } from "@/types";
import { getRecords } from "@/utils/firestore_query";
import { getUser } from "@/utils/session";
import { NextResponse, type NextRequest } from "next/server";

const reduceByCategory = (records: RecordsType) => {
  const chartData = records.reduce(
    (accumulator: ExpenseByCategoryType, record) => {
      const { price, category } = record;
      const index = accumulator.findIndex((item) => item.category === category);
      if (index >= 0) {
        accumulator[index].value += price;
      } else {
        accumulator.push({
          category,
          value: price,
        });
      }
      return accumulator;
    },
    []
  );
  return chartData;
};

export const GET = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const { uid } = await getUser(sessionCookie!);
    const records = await getRecords(uid);
    const chartData = reduceByCategory(records);
    return NextResponse.json(chartData);
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
};

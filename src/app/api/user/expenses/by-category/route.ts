import { ChartDataType, RecordsType } from "@/types";
import { isNotExpense } from "@/utils/const";
import { getRecords } from "@/utils/firestoreUtils";
import { getUserId } from "@/utils/session";
import { NextResponse, type NextRequest } from "next/server";

const reduceByCategory = (records: RecordsType) => {
  const chartData = records.reduce(
    (accumulator: ChartDataType, record) => {
      const { price, category } = record;
      if (isNotExpense(category)) return accumulator;
      accumulator.expensesTotal += price;
      const categoryIndex = accumulator.categories.findIndex(
        (item) => item === category
      );
      if (categoryIndex >= 0) {
        accumulator.expenses[categoryIndex] += price;
      } else {
        accumulator.categories.push(category);
        accumulator.expenses.push(price);
      }
      return accumulator;
    },
    { expensesTotal: 0, categories: [], expenses: [] }
  );
  return chartData;
};

export const GET = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const uid = await getUserId(sessionCookie!);
    const records = await getRecords(uid);
    const chartData = reduceByCategory(records);
    return NextResponse.json(chartData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

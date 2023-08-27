import { db } from "@/firebase/admin";
import { ExpensesByCategoryType, RecordsType } from "@/types";
import { isNotExpense } from "@/utils/const";
import { getUserId } from "@/utils/session";
import { NextResponse, type NextRequest } from "next/server";

const getRecords = async (uid: string) => {
  const userRecordRef = db.collection("users").doc(uid).collection("records");
  const snapshot = await userRecordRef.get();
  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RecordsType;
  return records;
};

const reduceByCategory = (records: RecordsType) => {
  const expensesByCategory = records.reduce(
    (accumulator: ExpensesByCategoryType, record) => {
      const { price, category } = record;
      if (isNotExpense(category)) return accumulator;
      accumulator.expensesTotal += price;
      const categoryIndex = accumulator.category.findIndex(
        (item) => item === category
      );
      if (categoryIndex >= 0) {
        accumulator.expenses[categoryIndex] += price;
      } else {
        accumulator.category.push(category);
        accumulator.expenses.push(price);
      }
      return accumulator;
    },
    { expensesTotal: 0, category: [], expenses: [] }
  );
  return expensesByCategory;
};

export const GET = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const uid = await getUserId(sessionCookie!);
    const records = await getRecords(uid);
    const expensesByCategory = reduceByCategory(records);
    return NextResponse.json(expensesByCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

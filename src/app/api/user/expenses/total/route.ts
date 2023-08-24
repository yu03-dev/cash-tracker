import { RecordsType } from "@/types";
import { getRecords, isNotExpense } from "@/utils/firestoreUtils";
import { getUserId } from "@/utils/session";
import { NextResponse, type NextRequest } from "next/server";

const getTotal = (records: RecordsType) => {
  const total = records.reduce((accumulator, record) => {
    const { price, category } = record;
    if (isNotExpense(category)) {
      accumulator += price;
    } else {
      accumulator -= price;
    }
    return accumulator;
  }, 0);
  return total;
};

export const GET = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const uid = await getUserId(sessionCookie!);
    const records = await getRecords(uid);
    const total = getTotal(records);
    return NextResponse.json(total);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

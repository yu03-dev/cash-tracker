import { RecordsType } from "@/types";
import { getRecords } from "@/utils/firestore_query";
import { isNotExpense } from "@/utils/expense";
import { getUserInformation } from "@/utils/session";
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
    const { uid } = await getUserInformation(sessionCookie!);
    const records = await getRecords(uid);
    let total;
    if (records.length === 0) {
      total = 0;
    } else {
      total = getTotal(records);
    }
    return NextResponse.json(total);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

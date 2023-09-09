import { NotExpenseCategory } from "@/constant";

export const isNotExpense = (category: string) => {
  return category === NotExpenseCategory;
};

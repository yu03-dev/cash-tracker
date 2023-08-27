const nonExpenseCategory = "支給";

export const isNotExpense = (category: string) => {
  return category === nonExpenseCategory;
};

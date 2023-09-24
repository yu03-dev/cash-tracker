import cn from "@/app/common/lib/cn";
import { Card, Typography } from "@/app/common/lib/material-tailwind";
import { NotExpenseCategory } from "@/constant";
import { ExpenseByCategoryType } from "@/types";

type ExpensesListProps = {
  expenseByCategory: ExpenseByCategoryType;
  className: string | undefined;
};

export const ExpensesList = async (props: ExpensesListProps) => {
  const { expenseByCategory, className } = props;

  const total = expenseByCategory.reduce((accumulator, item) => {
    if (item.category === NotExpenseCategory) {
      accumulator += item.value;
    } else {
      accumulator -= item.value;
    }
    return accumulator;
  }, 0);

  return (
    <Card className={cn(className)}>
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Expenses & Profit
      </Typography>
      <div className="flex flex-col gap-4 justify-center">
        {expenseByCategory.map((item, index) => (
          <div key={index} className="flex justify-between">
            <Typography color="blue-gray">{item.category}</Typography>
            <Typography
              color={item.category === NotExpenseCategory ? "blue-gray" : "red"}
            >
              {`¥ ${item.value}`}
            </Typography>
          </div>
        ))}
        <div className="flex justify-between border-t pt-4 border-blue-gray-200">
          <Typography color="blue-gray" variant="h4">
            収支
          </Typography>
          <Typography color={total >= 0 ? "blue-gray" : "red"} variant="h4">
            {`¥ ${total}`}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

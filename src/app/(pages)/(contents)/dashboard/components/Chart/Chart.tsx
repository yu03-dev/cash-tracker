"use client";
import cn from "@/app/lib/cn";
import { Card, Typography } from "@/app/lib/material-tailwind";
import { ExpenseByCategoryType } from "@/types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "@/app/lib/chart.js";
import { Doughnut } from "@/app/lib/react-chartjs-2";
import { ExpenseCategoryList } from "@/constant";

ChartJS.register(ArcElement, Tooltip, Legend);

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];
const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

const ChartContent = ({ chartData }: { chartData: ExpenseByCategoryType }) => {
  const expenses = ExpenseCategoryList.map((item) => {
    return chartData.find((dataItem) => dataItem.category === item)?.value;
  });

  const data = {
    labels: ExpenseCategoryList,
    datasets: [
      {
        label: "金額(¥)",
        data: expenses,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} className="mx-auto" />;
};

type ChartProps = {
  chartData: ExpenseByCategoryType;
  className: string | undefined;
};

export const Chart = async (props: ChartProps) => {
  const { chartData, className } = props;

  // 要修正
  if (chartData.length === 0) {
    return (
      <Typography
        variant="h3"
        color="blue-gray"
        className="flex justify-center mt-4"
      >
        記録がありません。
      </Typography>
    );
  }

  return (
    <Card className={cn(className)}>
      <ChartContent chartData={chartData} />
    </Card>
  );
};

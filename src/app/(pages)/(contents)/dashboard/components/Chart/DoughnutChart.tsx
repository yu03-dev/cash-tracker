"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "@/app/common/lib/chart.js";
import { Doughnut } from "@/app/common/lib/react-chartjs-2";
import { ExpenseByCategoryType } from "@/types";
import { useEffect, useMemo, useState } from "react";
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

export const DoughnutChart = ({ data }: { data: ExpenseByCategoryType }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    setCategories(ExpenseCategoryList);
    const expenses = ExpenseCategoryList.map((item) => {
      const matchData = data.find((dataItem) => dataItem.category === item);
      return matchData?.value!;
    });
    setValues(expenses);
  }, [data]);

  const chartData = useMemo(
    () => ({
      labels: categories,
      datasets: [
        {
          label: "#expense",
          data: values,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    }),
    [categories, values]
  );

  return <Doughnut data={chartData} className="mx-auto" />;
};

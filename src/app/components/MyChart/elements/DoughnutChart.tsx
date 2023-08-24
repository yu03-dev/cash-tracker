"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartDataType } from "@/types";

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

export const DoughnutChart = async ({
  total,
  category,
  expenses,
}: ChartDataType) => {
  const chartData = {
    labels: category,
    datasets: [
      {
        label: "#expense",
        data: expenses,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  const options = {};

  const textCenter = {
    id: "textCenter",
    beforeDraw(chart: ChartJS) {
      const {
        ctx,
        chartArea: { top, width, height },
      } = chart;
      ctx.save();
      ctx.fillRect(width / 2, top + height / 2, 0, 0);
      ctx.font = "30px sans-serif";
      ctx.fillStyle = "#333333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lines = ["Total Expense", "¥" + total.toString()];
      lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, top + height / 2 + index * 40 - 20);
      });
    },
  };

  return (
    <Doughnut
      data={chartData}
      options={options}
      plugins={[textCenter]}
      className="w-full"
    />
  );
};

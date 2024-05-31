import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarDataType, BarDatasetType, BarProps } from "./BarChartType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function datasetGenerator(data: BarDataType[], color?: string) {
  let chartDataset: BarDatasetType;
  let labels: string[] = [];
  let scoreData: number[] = [];

  data.map((item: BarDataType) => {
    labels.push(item.label);
    scoreData.push(item.score);
  });

  chartDataset = {
    labels: labels,
    datasets: [
      {
        label: "Score",
        data: scoreData,
        borderRadius: 2,
        backgroundColor: color ?? "#FF6821",
      },
    ],
  };
  return chartDataset;
}

const BarChart: React.FC<BarProps> = ({ width, height, data, color }) => {
  const dataset: any = datasetGenerator(data, color);

  const options: any = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      x: {
        suggestedMax: 10,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (value: number) {
            const stringValue = dataset.labels[value].toString();
            return stringValue.length > 20
              ? stringValue.substring(0, 20) + "..."
              : stringValue;
          },
        },
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Bar options={options} data={dataset} />
    </div>
  );
};

export default BarChart;

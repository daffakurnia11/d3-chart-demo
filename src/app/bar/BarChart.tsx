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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { BarDataType, BarDatasetType, BarProps } from "./BarChartType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export function datasetGenerator(data: BarDataType[], color?: string) {
  let chartDataset: BarDatasetType;
  let labels: string[] = [];
  let scoreData: number[] = [];

  data.map((item: BarDataType) => {
    labels.push(item.label);
    scoreData.push(Math.ceil(item.value));
  });

  chartDataset = {
    labels: labels,
    datasets: [
      {
        label: "Score",
        data: scoreData,
        borderRadius: 2,
        backgroundColor: color ?? "#FF6821",
        datalabels: {
          align: "end",
          anchor: "end",
        },
      },
    ],
  };
  return chartDataset;
}

const BarChart: React.FC<BarProps> = ({
  width,
  height,
  data,
  color,
  title,
  print = false,
}) => {
  const dataset: any = datasetGenerator(data, color);

  const options: any = {
    animation: !print,
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        title: {
          display: true,
          text: title,
          font: {
            size: 12,
          },
          padding: 4,
        },
      },
      datalabels: {
        color: "black",
        display: true,
        font: {
          weight: "normal",
          size: 8,
        },
        formatter: (data: string) => `${data}%`,
      },
    },
    scales: {
      x: {
        max: 100,
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
            if (!print) {
              return stringValue.length > 20
                ? stringValue.substring(0, 20) + "..."
                : stringValue;
            } else {
              return stringValue;
            }
          },
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div style={{ width, height: height ?? data.length * 20 + 90 }}>
      <Bar options={options} data={dataset} />
    </div>
  );
};

export default BarChart;

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
import data from "./data.json";
import chroma from "chroma-js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SunburstChartProps {
  width: number;
  height: number;
}

type DatasetType = {
  label: string;
  score: number;
};

type ChartDatasetType = {
  label: "Score" | "Baseline";
  data: number[];
  backgroundColor?: string | null;
  borderRadius?: number;
};

type ChartDataType = {
  labels: string[];
  datasets: ChartDatasetType[];
};

const colorPalette = chroma.scale(["#FF6821", "FFBFA3"]).mode("lch").colors(2);

export function datasetGenerator(data: DatasetType[]) {
  let chartDataset: ChartDataType;
  let labels: string[] = [];
  let scoreData: number[] = [];

  data.map((item: DatasetType) => {
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
        backgroundColor: colorPalette[0],
      },
    ],
  };
  return chartDataset;
}

const BarChart: React.FC<SunburstChartProps> = ({ width, height }) => {
  const dataset: any = datasetGenerator(data);

  const options = {
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

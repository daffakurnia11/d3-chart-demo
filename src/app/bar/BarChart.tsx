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
  baseline: number;
};

type ChartDatasetType = {
  label: "Score" | "Baseline";
  data: number[];
  backgroundColor?: string | null;
};

type ChartDataType = {
  labels: string[];
  datasets: ChartDatasetType[];
};

const colorPalette = chroma.scale("Set2").colors(8);

export function datasetGenerator(data: DatasetType[]) {
  let chartDataset: ChartDataType;
  let labels: string[] = [];
  let scoreData: number[] = [];
  let baselineData: number[] = [];

  data.map((item: DatasetType) => {
    labels.push(item.label);
    scoreData.push(item.score);
    baselineData.push(item.baseline);
  });

  chartDataset = {
    labels: labels,
    datasets: [
      {
        label: "Score",
        data: scoreData,
        backgroundColor: colorPalette[0],
      },
      {
        label: "Baseline",
        data: baselineData,
        backgroundColor: colorPalette[1],
      },
    ],
  };
  return chartDataset;
}

const BarChart: React.FC<SunburstChartProps> = ({ width, height }) => {
  const dataset: any = datasetGenerator(data);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
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

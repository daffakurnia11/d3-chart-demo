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

const colorPalette = chroma.scale("Set2").colors(8);

type DatasetType = {
  category: string;
  negative: number;
  neutral: number;
  positive: number;
};

type ChartDatasetType = {
  label: "Negative" | "Neutral" | "Positive";
  data: number[];
  backgroundColor?: string | null;
};

type ChartDataType = {
  labels: string[];
  datasets: ChartDatasetType[];
};

export function datasetGenerator(data: DatasetType[]) {
  let chartDataset: ChartDataType;
  let labels: string[] = [];
  let negativeData: number[] = [];
  let neutralData: number[] = [];
  let positiveData: number[] = [];

  data.map((item: DatasetType) => {
    labels.push(item.category);
    negativeData.push(item.negative);
    neutralData.push(item.neutral);
    positiveData.push(item.positive);
  });

  chartDataset = {
    labels: labels,
    datasets: [
      {
        label: "Negative",
        data: negativeData,
        backgroundColor: colorPalette[0],
      },
      {
        label: "Neutral",
        data: neutralData,
        backgroundColor: colorPalette[1],
      },
      {
        label: "Positive",
        data: positiveData,
        backgroundColor: colorPalette[2],
      },
    ],
  };
  return chartDataset;
}

const StackedBarChart: React.FC<SunburstChartProps> = ({ width, height }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  // const dataset = assignColorsToData(data);
  console.log(datasetGenerator(data));

  return (
    <div style={{ width, height }}>
      <Bar options={options} data={datasetGenerator(data) as any} />
    </div>
  );
};

export default StackedBarChart;

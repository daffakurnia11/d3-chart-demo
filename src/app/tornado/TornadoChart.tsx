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
import chroma from "chroma-js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import data from "./data.json";

interface SunburstChartProps {
  width: number;
  height: number;
}

const colorPalette = chroma.scale(["#8DDAEE", "#00474F"]).mode("lch").colors(2);

type ChartDatasetType = {
  label: string;
  data: number[];
  backgroundColor?: string | null;
};

type ChartDataType = {
  labels: string[];
  datasets: ChartDatasetType[];
};

export function datasetGenerator(data: any) {
  let chartDataset: ChartDataType;
  let labels: string[] = [];
  let positiveData: number[] = [];
  let negativeData: number[] = [];

  data.data.map(({ category, value }) => {
    labels.push(category);
    positiveData.push(value);
    negativeData.push(value - 100);
  });

  chartDataset = {
    labels: labels,
    datasets: [
      {
        label: "Positive",
        data: positiveData,
        backgroundColor: colorPalette[0],
      },
      {
        label: "Negative",
        data: negativeData,
        backgroundColor: colorPalette[1],
      },
    ],
  };

  return chartDataset;
}

const TornadoChart: React.FC<SunburstChartProps> = ({ width, height }) => {
  const dataset: any = datasetGenerator(data);

  const options: any = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
    scales: {
      x: {
        stacked: true,
        max: 100,
        min: -100,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Bar options={options} data={dataset} />
    </div>
  );
};

export default TornadoChart;

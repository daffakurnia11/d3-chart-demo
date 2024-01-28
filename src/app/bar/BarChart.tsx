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

export function assignColorsToData(data: any) {
  data.datasets.forEach((dataset: any, i: number) => {
    dataset.backgroundColor = colorPalette[i];
  });
  return data;
}

const BarChart: React.FC<SunburstChartProps> = ({ width, height }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const dataset = assignColorsToData(data);

  return (
    <div style={{ width, height }}>
      <Bar options={options} data={dataset} />
    </div>
  );
};

export default BarChart;

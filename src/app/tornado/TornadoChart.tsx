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
import {
  TornadoDataType,
  TornadoDatasetType,
  TornadoProps,
} from "./TornadoChartType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TornadoChart: React.FC<TornadoProps> = ({
  width,
  height,
  data,
  color,
}) => {
  const colorPalette = chroma
    .scale(color ? [color, "#A4A4AB"] : ["#8DDAEE", "#00474F"])
    .mode("lch")
    .colors(2);

  function generateDataset(data: TornadoDataType) {
    let labels: string[] = [];
    let positiveData: number[] = [];
    let negativeData: number[] = [];

    data.data.map(({ label, value }) => {
      labels.push(label);
      positiveData.push(value);
      negativeData.push(value - 100);
    });

    return {
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
  }
  const dataset: TornadoDatasetType = generateDataset(data);

  const options: any = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
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
      <Bar options={options} data={dataset as any} />
    </div>
  );
};

export default TornadoChart;

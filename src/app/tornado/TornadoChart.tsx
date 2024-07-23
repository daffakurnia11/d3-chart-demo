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
  Legend,
  ChartDataLabels
);

function wrapText(label: string) {
  const maxLength = 50;
  let words = label.split(" ");
  let lines: string[] = [];
  let currentLine: string = "";

  words.forEach((word) => {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

const TornadoChart: React.FC<TornadoProps> = ({
  width,
  height,
  data,
  color,
  animation = true,
}) => {
  const colorPalette = chroma
    .scale(color ? [color, "#A4A4AB"] : ["#8DDAEE", "#00474F"])
    .mode("lch")
    .colors(2);

  function generateDataset(data: TornadoDataType) {
    let labels: string[][] = [];
    let positiveData: number[] = [];
    let negativeData: number[] = [];

    data.data.map(({ label, value }) => {
      labels.push(wrapText(label));
      positiveData.push(Math.ceil(value));
      negativeData.push(Math.ceil(value) - 100);
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Positive",
          data: positiveData,
          backgroundColor: colorPalette[0],
          datalabels: {
            align: "end",
            anchor: "start",
          },
        },
        {
          label: "Negative",
          data: negativeData,
          backgroundColor: colorPalette[1],
          datalabels: {
            align: "start",
            anchor: "end",
          },
        },
      ],
    };
  }
  const dataset: TornadoDatasetType = generateDataset(data);

  const options: any = {
    animation,
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: (data: any) =>
          data.dataset.label === "Positive"
            ? color
              ? "#FFFFFF"
              : "#0F424B"
            : "#FFFFFF",
        display: (data: any) => data.dataset.stack !== "stack2",
        font: {
          weight: "normal",
          size: 8,
        },
        formatter: (data: string) => `${data}%`,
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
        ticks: {
          font: {
            size: 8,
          },
        },
      },
    },
  };

  return (
    <div style={{ width, height: height ?? data.data.length * 25 + 90 }}>
      <Bar options={options} data={dataset as any} />
    </div>
  );
};

export default TornadoChart;

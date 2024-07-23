import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import chroma from "chroma-js";
import {
  StackedBarDataType,
  StackedBarDatasetDataType,
  StackedBarDatasetType,
  StackedBarProps,
} from "./StackedBarChartType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ChartDataLabels
);

const colorPalette = chroma
  .scale([
    "#535554",
    "#5D6768",
    "#01474F",
    "#206970",
    "#0097B2",
    "#A9EDF8",
    "#7ED957",
  ])
  .mode("lch")
  .colors(7);

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

function generateDataset(data: StackedBarDataType) {
  let chartDataset: StackedBarDatasetType;
  let labels: string[][] = [];
  let valueData: number[] = [];
  let datasetArray: StackedBarDatasetDataType[] = [];

  data.data.map(({ label, value }) => {
    labels.push(wrapText(label));
    valueData.push(Math.ceil(value));
  });
  datasetArray.push({
    label: "Value",
    stack: "stack1",
    order: 1,
    data: valueData,
    backgroundColor: colorPalette[6],
    type: "bar",
    datalabels: {
      align: "start",
      anchor: "end",
    },
  });

  const generateParameterData = (value: any) => {
    let valueArray: number[] = [];
    for (let i = 0; i < data.data.length; i++) {
      valueArray.push(value);
    }
    return valueArray;
  };

  data.parameter.map(({ label, value }, index) => {
    datasetArray.push({
      label: label,
      stack: "stack2",
      order: 2,
      data: generateParameterData(value),
      backgroundColor: colorPalette[index],
      type: "bar",
    });
  });

  chartDataset = {
    labels: labels,
    datasets: datasetArray,
  };
  return chartDataset;
}

const StackedBarChart: React.FC<StackedBarProps> = ({
  width,
  height,
  data,
  animation = true,
}) => {
  const dataset: StackedBarDatasetType = generateDataset(data);

  const options: any = {
    animation,
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        filter: function (tooltipItem: any) {
          return tooltipItem.dataset.stack === "stack1";
        },
      },
      datalabels: {
        color: "#0F424B",
        display: (data: any) => data.dataset.stack !== "stack2",
        font: {
          weight: "normal",
          size: 6,
        },
        formatter: (data: string) => `${data}%`,
      },
    },
    scales: {
      y: {
        stacked: true,
        ticks: {
          font: {
            size: 8,
          },
        },
        afterFit: function (scale: any) {
          scale.width = 220;
        },
      },
      x: {
        stacked: true,
        ticks: {
          callback: function (value: number) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div style={{ width, height: height ?? (data.data.length + 1) * 30 }}>
      <Bar options={options} data={dataset} />
    </div>
  );
};

export default StackedBarChart;

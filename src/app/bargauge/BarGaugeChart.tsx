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
import { Bar } from "react-chartjs-2";
import data from "./data.json";
import chroma from "chroma-js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface SunburstChartProps {
  width: number;
  height: number;
}

type DatasetType = {
  parameter: {
    name: string;
    value: number;
  }[];
  data: {
    label: string;
    score: number;
  }[];
};

type ChartDatasetType = {
  label: string;
  stack: string;
  order: number;
  data: string[] | number[];
  backgroundColor: string;
  type: string;
};

type ChartDataType = {
  labels: string[];
  datasets: ChartDatasetType[];
};

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

export function datasetGenerator(data: DatasetType) {
  let chartDataset: ChartDataType;
  let labels: string[] = [];
  let valueData: number[] = [];
  let datasetArray: ChartDatasetType[] = [];

  data.data.map(({ label, score }) => {
    labels.push(label);
    valueData.push(score);
  });
  datasetArray.push({
    label: "Value",
    stack: "stack1",
    order: 1,
    data: valueData,
    backgroundColor: colorPalette[6],
    type: "bar",
  });

  const generateParameterData = (value) => {
    let valueArray: number[] = [];
    for (let i = 0; i < data.data.length; i++) {
      valueArray.push(value);
    }
    return valueArray;
  };

  data.parameter.map(({ name, value }, index) => {
    datasetArray.push({
      label: name,
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

const BarGaugeChart: React.FC<SunburstChartProps> = ({ width, height }) => {
  const dataset: any = datasetGenerator(data);

  const options: any = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        filter: function (tooltipItem: any) {
          return tooltipItem.dataset.stack === "stack1";
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        ticks: {
          callback: function (value: number) {
            const stringValue = dataset.labels[value].toString();
            return stringValue.length > 25
              ? stringValue.substring(0, 25) + "..."
              : stringValue;
          },
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
    <div style={{ width, height }}>
      <Bar options={options} data={dataset} />
    </div>
  );
};

export default BarGaugeChart;

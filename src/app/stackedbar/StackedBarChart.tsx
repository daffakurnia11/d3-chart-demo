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
    category: string;
    value: number;
  }[];
};

type ChartDatasetType = {
  label:
    | "Non-Active"
    | "Non-Complaint"
    | "Grudging"
    | "Complaint"
    | "Engaged"
    | "Committed"
    | "Value";
  data: number[];
  backgroundColor?: string | null;
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
  let chartDataset: ChartDataType | any;
  let labels: string[] = [];
  let valueData: number[] = [];
  let datasetArray: Object[] = [];

  data.data.map(({ category, value }) => {
    labels.push(category);
    valueData.push(value);
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
  console.log(datasetArray);

  chartDataset = {
    labels: labels,
    datasets: datasetArray,
  };
  return chartDataset;
}

const StackedBarChart: React.FC<SunburstChartProps> = ({ width, height }) => {
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

export default StackedBarChart;

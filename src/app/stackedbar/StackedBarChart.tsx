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
  category: string;
  non_active: number;
  non_complaint: number;
  grudging: number;
  complaint: number;
  engaged: number;
  committed: number;
  value: number;
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

export function datasetGenerator(data: DatasetType[]) {
  let chartDataset: ChartDataType | any;
  let labels: string[] = [];
  let nonActiveData: number[] = [];
  let nonComplaintData: number[] = [];
  let grudgingData: number[] = [];
  let complaintData: number[] = [];
  let engagedData: number[] = [];
  let committedData: number[] = [];
  let valueData: number[] = [];

  data.map((item: DatasetType) => {
    labels.push(item.category);
    nonActiveData.push(item.non_active);
    nonComplaintData.push(item.non_complaint);
    grudgingData.push(item.grudging);
    complaintData.push(item.complaint);
    engagedData.push(item.engaged);
    committedData.push(item.committed);
    valueData.push(item.value);
  });

  chartDataset = {
    labels: labels,
    datasets: [
      {
        label: "Value",
        stack: "stack1",
        order: 1,
        data: valueData,
        backgroundColor: colorPalette[6],
        borderColor: colorPalette[6],
        type: "bar",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Non-Active",
        stack: "stack2",
        order: 2,
        data: nonActiveData,
        backgroundColor: colorPalette[0],
        type: "bar",
      },
      {
        label: "Non-Complaint",
        stack: "stack2",
        order: 2,
        data: nonComplaintData,
        backgroundColor: colorPalette[1],
        type: "bar",
      },
      {
        label: "Grudging",
        stack: "stack2",
        order: 2,
        data: grudgingData,
        backgroundColor: colorPalette[2],
        type: "bar",
      },
      {
        label: "Complaint",
        stack: "stack2",
        order: 2,
        data: complaintData,
        backgroundColor: colorPalette[3],
        type: "bar",
      },
      {
        label: "Engaged",
        stack: "stack2",
        order: 2,
        data: engagedData,
        backgroundColor: colorPalette[4],
        type: "bar",
      },
      {
        label: "Committed",
        stack: "stack2",
        order: 2,
        data: committedData,
        backgroundColor: colorPalette[5],
        type: "bar",
      },
    ],
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

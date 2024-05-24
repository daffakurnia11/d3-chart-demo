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
import chroma from "chroma-js";
import {
  BarGaugeDataType,
  BarGaugeDatasetDataType,
  BarGaugeDatasetType,
  BarGaugeProps,
} from "./BarGaugeChartType";

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

function generateDataset(data: BarGaugeDataType) {
  let chartDataset: BarGaugeDatasetType;
  let labels: string[] = [];
  let valueData: number[] = [];
  let datasetArray: BarGaugeDatasetDataType[] = [];

  data.data.map(({ label, value }) => {
    labels.push(label);
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

const BarGaugeChart: React.FC<BarGaugeProps> = ({ width, height, data }) => {
  const dataset: BarGaugeDatasetType = generateDataset(data);

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

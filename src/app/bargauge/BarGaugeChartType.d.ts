export type BarGaugeDatasetDataType = {
  label: string;
  stack: string;
  order: number;
  data: number[];
  backgroundColor: string;
  type: "bar";
};

export type BarGaugeDatasetType = {
  labels: string[];
  datasets: BarGaugeDatasetDataType[];
};

export type BarGaugeDataType = {
  parameter: {
    id: number;
    label: string;
    value: number;
  }[];
  data: {
    id: number;
    label: string;
    value: number;
  }[];
};

export type BarGaugeProps = {
  data: BarGaugeDataType
  width?: number
  height?: number
}
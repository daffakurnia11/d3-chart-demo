export type StackedBarDatasetDataType = {
  label: string;
  stack: string;
  order: number;
  data: number[];
  backgroundColor: string;
  type: "bar";
  datalabels?: any;
};

export type StackedBarDatasetType = {
  labels: string[][];
  datasets: StackedBarDatasetDataType[];
};

export type StackedBarDataType = {
  parameter: {
    id?: number;
    label: string;
    value: number;
  }[];
  data: {
    id?: number;
    label: string;
    value: number;
    type: string;
    description: string;
  }[];
};

export type StackedBarProps = {
  data: StackedBarDataType;
  width?: number | string;
  height?: number | string;
  animation?: boolean;
};

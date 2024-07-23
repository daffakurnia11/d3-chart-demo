export type BarDatasetDataType = {
  label: string;
  data: number[];
  borderRadius: number;
  backgroundColor: string;
  datalabels?: any;
};

export type BarDatasetType = {
  labels: string[];
  datasets: BarDatasetDataType[];
};

export type BarDataType = {
  label: string;
  value: number;
};

export type BarProps = {
  data: any;
  title?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  print?: boolean;
};

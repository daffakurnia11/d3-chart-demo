export type BarDatasetType = {
  labels: string[];
  datasets: ChartDatasetType[];
};

export type BarDataType = {
  label: string;
  score: number;
};

export type BarProps = {
  data: any;
  width?: number | string;
  height?: number | string;
  color?: string;
};

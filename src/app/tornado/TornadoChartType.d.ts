export type TornadoDatasetDataType = {
  label: "Positive" | "Negative";
  data: number[];
  backgroundColor: string;
  datalabels?: any;
};

export type TornadoDatasetType = {
  labels: string[][];
};

export type TornadoDataType = {
  data: {
    label: string;
    value: number;
  }[];
};

export type TornadoProps = {
  data: TornadoDataType;
  color?: string | null;
  width?: number | string;
  height?: number | string;
  animation?: boolean;
};

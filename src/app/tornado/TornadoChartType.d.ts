export type TornadoDatasetDataType = {
  label: "Positive" | "Negative";
  data: number[];
  backgroundColor: string;
};

export type TornadoDatasetType = {
  labels: string[];
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
};

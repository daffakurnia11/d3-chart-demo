export type GaugeDataType = {
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

export type GaugeDatasetType = {
  label: string;
  min: number;
  max: number;
};

export type GenerateDatasetType = {
  value: number;
  data: GaugeDatasetType[];
};

export type GaugeProps = {
  data: GaugeDataType;
  width?: number | string,
  height?: number | string,
}

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

export type BarGaugeDatasetType = {
  label: string;
  min: number;
  max: number;
};

export type GenerateDatasetType = {
  value: number;
  data: BarGaugeDatasetType[];
};

export type BarGaugeDataType = {
  parameter: {
    label: string;
    value: number;
  }[];
  data: {
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

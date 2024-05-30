export type BluePrintGaugeDataType = {
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

export type BluePrintGaugeProps = {
  title: string | React.ReactElement;
  data: BluePrintGaugeDataType;
};

export type ImpactGaugeProps = {
  data: BluePrintGaugeDataType;
};

export type BluePrintGaugeCombinedProps = {
  firstData: BluePrintGaugeDataType;
  secondData: BluePrintGaugeDataType;
  thirdData: BluePrintGaugeDataType;
  firstTitle: string | React.ReactElement;
  secondTitle: string | React.ReactElement;
}
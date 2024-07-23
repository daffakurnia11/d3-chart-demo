export type PackedCirclesDataType = {
  data: {
    label: string;
    type: string | "COLLABORATING" | "BEING" | "ACTING" | "THINKING" | "RELATING";
    value: number;
    description?: string | null;
  }[];
};

export type PackedCirclesProps = {
  data: PackedCirclesDataType;
  width?: number | string;
  height?: number | string;
  print?: boolean;
};

export type SunburstChildrenType = {
  name: string;
  score: number;
  value: number;
};

export type SunburstRootChildrenType = {
  name: string;
  children: SunburstChildrenType[];
};

export type SunburstDataType = {
  name: string;
  children: SunburstRootChildrenType[];
};

export type SunburstStateType = "all" | "positive" | "negative";

export type SunburstProps = {
  data: SunburstDataType;
  state?: SunburstStateType;
  width?: number | string;
  height?: number | string;
};

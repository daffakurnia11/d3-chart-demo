export type SankeyNodesDataType = {
  name: string;
  category: string;
};

export type SankeyLinksDataType = {
  source: number;
  target: number;
  value: number;
};

export type SankeyDataType = {
  nodes: SankeyNodesDataType[];
  links: SankeyLinksDataType[];
};

export type SankeyProps = {
  data: SankeyDataType;
  width?: number | string;
  height?: number | string;
};

export type SankeyNodesDataType = {
  id: number
  name: string;
  category: string;
  color?: string;
  description?: string | null;
  layer?: number | null;
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

export type RadialTreeChildrenType = {
  name: string;
  score: number; 
}

export type RadialTreeRootChildrenType = {
  name: string;
  children: RadialTreeChildrenType[]
}

export type RadialTreeDataType = {
  name: string;
  children: RadialTreeRootChildrenType[]
}

export type RadialTreeProps = {
  data: RadialTreeDataType
  width?: number | string;
  height?: number | string;
}
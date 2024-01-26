"use client";

import { SunburstVisDataExample } from "@/data/example";
import React from "react";
import { Sunburst } from "react-vis";

const myData = {
  title: "analytics",
  color: "#000",
  children: [
    {
      title: "cluster",
      children: [
        { title: "AgglomerativeCluster", color: "#000", size: 3938 },
        { title: "CommunityStructure", color: "#000", size: 3812 },
        { title: "HierarchicalCluster", color: "#000", size: 6714 },
        { title: "MergeEdge", color: "#000", size: 743 },
      ],
    },
    {
      title: "graph",
      children: [
        { title: "BetweennessCentrality", color: "#000", size: 3534 },
        { title: "LinkDistance", color: "#000", size: 5731 },
        { title: "MaxFlowMinCut", color: "#000", size: 7840 },
        { title: "ShortestPaths", color: "#000", size: 5914 },
        { title: "SpanningTree", color: "#000", size: 3416 },
      ],
    },
    {
      title: "optimization",
      children: [{ title: "AspectRatioBanker", color: "#000", size: 7074 }],
    },
  ],
};

export default function SunburstVis() {
  return (
    <>
      <Sunburst
        hideRootNode
        colorType="literal"
        data={myData}
        height={300}
        width={350}
      />
    </>
  );
}

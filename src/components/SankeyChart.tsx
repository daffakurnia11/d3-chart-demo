"use client";

import React from "react";
import chroma from "chroma-js";
import dynamic from "next/dynamic";

const Sankey = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Sankey),
  { ssr: false }
);

export default function SankeyChart() {
  const config = {
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/fa3414cc-75ed-47b4-8306-f2ffe8c40127.json",
    },
    scale: {
      color: {
        range: chroma.scale("RdYlBu").colors(10),
      },
    },
    layout: { nodeWidth: 0.01, nodePadding: 0.01 },
    linkColorField: (d: any) => d.source.key,
    style: { linkFillOpacity: 0.4 },
  };
  return Sankey && <Sankey width={1000} height={1000} {...config} />;
}

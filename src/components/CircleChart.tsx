"use client";

import { CircleDataExample } from "@/data/example";
import chroma from "chroma-js";
import dynamic from "next/dynamic";
import React from "react";

const CirclePacking = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.CirclePacking),
  { ssr: false }
);

export default function CircleChart() {
  const config = {
    data: {
      value: CircleDataExample,
    },
    valueField: "value",
    colorField: "depth",
    scale: {
      color: {
        domain: [0, 5],
        range: chroma.scale("Set2").colors(2),
      },
    },
    label: {
      text: (d: any) =>
        d.height === 0 ? `${d.data.name} (${d.data.value}%)` : "",
      position: "inside",
    },
  };
  return <CirclePacking {...config} />;
}

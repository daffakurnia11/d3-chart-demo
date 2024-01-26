"use client";

import { BarDataExample } from "@/data/example";
import dynamic from "next/dynamic";
import React from "react";

const Column = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Column),
  { ssr: false }
);

export default function BarChart() {
  const config = {
    data: {
      value: BarDataExample,
    },
    xField: "name",
    yField: "value",
    colorField: "type",
    group: true,
    style: {
      width: 30,
      inset: 5,
      radiusTopLeft: 30,
      radiusTopRight: 30,
    },
  };
  return <Column width={400} {...config} />;
}

"use client";

import { PercentDataExample } from "@/data/example";
import dynamic from "next/dynamic";
import React from "react";

const Column = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Column),
  { ssr: false }
);

export default function PercentChart() {
  const config = {
    data: {
      value: PercentDataExample,
    },
    xField: "year",
    yField: "value",
    colorField: "country",
    percent: true,
    stack: true,
    interaction: {
      tooltip: {
        shared: true,
      },
    },
    tooltip: { channel: "y0", valueFormatter: ".0%" },
  };
  return <Column width={400} {...config} />;
}

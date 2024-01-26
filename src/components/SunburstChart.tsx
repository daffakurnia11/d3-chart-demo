"use client";

import React from "react";
import { SunburstDataExample } from "@/data/example";
import dynamic from "next/dynamic";

const Sunburst = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Sunburst),
  { ssr: false }
);

export default function SunburstChart() {
  const config = {
    data: { value: SunburstDataExample },
    valueField: "value",
    label: {
      text: "name",
      autoRotate: true,
      position: "outside",
    },
  };
  return <Sunburst width={700} height={700} {...config} />;
}

"use client";

import React from "react";
import BarGaugeChart from "./BarGaugeChart";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Bar Gauge Chart Test</h1>
      <div className="flex justify-center items-center">
        <BarGaugeChart width={800} height={600} />
      </div>
    </div>
  );
}

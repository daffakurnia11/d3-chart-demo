"use client";

import React from "react";
import BarChart from "./GaugeChart";
import GaugeChart from "./GaugeChart";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Gauge Chart Test</h1>
      <div className="flex justify-center items-center">
        <GaugeChart />
      </div>
    </div>
  );
}
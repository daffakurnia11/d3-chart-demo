"use client";

import React from "react";
import StackedBarChart from "./StackedBarChart";
import data from "./data.json";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Stacked Bar Chart Test</h1>
      <div className="flex justify-center items-center">
        <StackedBarChart width={800} data={data} />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import BarChart from "./BarChart";
import data from "./data.json";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Bar Chart Test</h1>
      <div className="flex justify-center items-center">
        <BarChart width={400} height={250} data={data} />
      </div>
    </div>
  );
}

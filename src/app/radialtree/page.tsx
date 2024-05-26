"use client";

import React from "react";
import RadialTreeChart from "./RadialTreeChart";
import data from "./data.json";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Radial Tree Chart Test</h1>
      <div className="flex justify-center items-center">
        <RadialTreeChart
          width={700}
          height={700}
          data={data}
          detailPagePrefix="/radialtree"
        />
      </div>
    </div>
  );
}

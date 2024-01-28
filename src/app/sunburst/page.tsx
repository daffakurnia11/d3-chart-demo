"use client";

import React from "react";
import SunburstChart from "./SunburstChart";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Sunburst Chart Test</h1>
      <div className="flex justify-center items-center">
        <SunburstChart width={500} height={500} />
      </div>
    </div>
  );
}

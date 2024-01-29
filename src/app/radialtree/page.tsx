"use client";

import React from "react";
import RadialTreeChart from "./RadialTreeChart";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Radial Tree Chart Test</h1>
      <div className="flex justify-center items-center">
        <RadialTreeChart />
      </div>
    </div>
  );
}

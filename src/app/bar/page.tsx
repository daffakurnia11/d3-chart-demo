"use client";

import React from "react";
import BarChart from "./BarChart";
import data from "./data.json";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Bar Chart Test</h1>
      <div className="flex container justify-center items-center">
        <BarChart
          data={data}
          width={"100%"}
          color="#c11f1f"
          title="Efforts are not Satisfactory"
        />
      </div>
    </div>
  );
}

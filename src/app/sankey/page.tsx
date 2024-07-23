"use client";

import React from "react";
import data from "./data.json";
import SankeyChart from "./SankeyChart";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Sankey Chart Test</h1>
      <div className="flex justify-center items-center w-full h-full">
        <SankeyChart data={data as any} />
      </div>
    </div>
  );
}

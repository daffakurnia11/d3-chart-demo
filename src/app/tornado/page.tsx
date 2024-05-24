"use client";

import React from "react";
import TornadoChart from "./TornadoChart";
import data from "./data.json";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Tornado Chart Test</h1>
      <div className="flex justify-center items-center">
        <TornadoChart width={800} height={600} data={data} />
      </div>
    </div>
  );
}

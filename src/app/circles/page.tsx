"use client";

import React from "react";
import PackedCirclesChart from "./PackedCirclesChart";
import data from "./data.json";

export default function SankeyPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">
        Packed Circles Chart Test
      </h1>
      <div className="flex justify-center items-center">
        <PackedCirclesChart width={400} data={data} />
      </div>
    </div>
  );
}

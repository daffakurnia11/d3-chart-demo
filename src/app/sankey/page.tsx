"use client";

import React from "react";
import SankeyChart from "./SankeyChart";
import JSONPretty from "react-json-pretty";
import { sankeyData } from "./data";

export default function SankeyPage() {
  return (
    <div className="w-screen">
      <h1 className="text-3xl font-bold text-center">Sankey Chart Test</h1>
      <div className="flex justify-center items-center">
        <SankeyChart width={1200} height={600} />
      </div>
      <p className="text-xl font-bold text-center mt-10">JSON Data Example</p>
      <div className="flex justify-center items-center">
        <JSONPretty data={sankeyData}></JSONPretty>
      </div>
    </div>
  );
}

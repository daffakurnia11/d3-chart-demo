"use client";

import React, { useState } from "react";
import SunburstChart from "./SunburstChart";
import data from "./data.json";

export default function SankeyPage() {
  const [state, setState] = useState<"all" | "positive" | "negative">("all");

  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Sunburst Chart Test</h1>
      <div className="flex justify-center gap-5 my-4">
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setState("all")}
        >
          All
        </button>
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setState("positive")}
        >
          Positive
        </button>
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setState("negative")}
        >
          Negative
        </button>
      </div>
      <div className="flex justify-center items-center">
        <SunburstChart width={500} height={500} data={data} state={state} />
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import TornadoChart from "./TornadoChart";
import data from "./data.json";

export default function SankeyPage() {
  const [color, setColor] = useState<string | null>(null);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">Tornado Chart Test</h1>
      <div className="flex justify-center gap-5 my-4">
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setColor(null)}
        >
          No Color
        </button>
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setColor("#D4B88C")}
        >
          Being
        </button>
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setColor("#E585A1")}
        >
          Thinking
        </button>
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setColor("#E84139")}
        >
          Relating
        </button>
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setColor("#FF6821")}
        >
          Collaborating
        </button>
        <button
          className="border border-solid border-black rounded px-6 py-2"
          onClick={() => setColor("#661A30")}
        >
          Acting
        </button>
      </div>
      <div className="flex justify-center items-center">
        <TornadoChart width={800} height={600} data={data} color={color} />
      </div>
    </div>
  );
}

import React from "react";
import firstData from "./data1.json";
import secondData from "./data2.json";
import BluePrintGauge from "./BluePrintGauge";

export default function page() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center mb-5">
        Blueprint Gauge Chart Test
      </h1>
      <div className="shrink-0 max-w-[1000px] w-full">
        <BluePrintGauge
          firstData={firstData}
          secondData={secondData}
          firstTitle={"First Title"}
          secondTitle={"Second Title"}
        />
      </div>
    </div>
  );
}

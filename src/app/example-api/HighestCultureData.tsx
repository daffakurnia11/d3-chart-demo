import React from "react";
import BarChart from "../bar/BarChart";
import BarData from "../bar/data.json";

export default function HighestCultureData() {
  return (
    <div className="rounded-lg w-full h-full bg-white">
      <div className="pt-6 pb-3">
        <p className="text-xs text-center font-semibold">
          Skills above the cultural threshold(&gt;7.0)
        </p>
      </div>
      <div className="pb-4 flex justify-center">
        <BarChart width={375} height={200} data={BarData} />
      </div>
    </div>
  );
}

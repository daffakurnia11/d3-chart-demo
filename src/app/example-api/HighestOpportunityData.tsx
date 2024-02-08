import React from "react";
import PackedCirclesChart from "../circles/PackedCirclesChart";
import PackedCirclesData from "../circles/data.json";

export default function HighestOpportunityData() {
  return (
    <div className="rounded-lg w-full h-full bg-white">
      <div className="pt-6 pb-3">
        <p className="text-xs text-center font-semibold">
          Skills perceived as crucial in the next 12 months by %respondents
        </p>
      </div>
      <div className="pb-4 flex justify-center">
        <PackedCirclesChart width={200} height={200} data={PackedCirclesData} />
      </div>
    </div>
  );
}
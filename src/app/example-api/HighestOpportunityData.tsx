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
      <div
        className="pb-4 flex justify-center items-center"
        style={{ height: 400 }}
      >
        <div style={{ width: "100%", height: 300 }}>
          <PackedCirclesChart
            width={"100%"}
            height={"100%"}
            data={PackedCirclesData}
          />
        </div>
      </div>
    </div>
  );
}

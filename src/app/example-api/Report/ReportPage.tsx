import React from "react";
import OverviewData from "./OverviewData";
import QuotesData from "./QuotesData";
import HighestOpportunityData from "./HighestOpportunityData";
import HighestCultureData from "./HighestCultureData";
import HighestTransformationData from "./HighestTransformationData";
import LowestGapData from "./LowestGapData";
import LowestInnovationData from "./LowestInnovationData";
import LowestAppreciationData from "./LowestAppreciationData";

export default function ReportPage({
  state,
}: {
  state: "all" | "positive" | "negative";
}) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <OverviewData state={state} />
      </div>
      <div className="col-span-2">
        <QuotesData />
      </div>
      <div
        className={`col-span-1 ${
          state === "all" || state === "positive" ? "block" : "hidden"
        }`}
      >
        <HighestOpportunityData />
      </div>
      <div
        className={`col-span-1 ${
          state === "all" || state === "positive" ? "block" : "hidden"
        }`}
      >
        <HighestCultureData />
      </div>
      <div
        className={`col-span-1 ${
          state === "all" || state === "positive" ? "block" : "hidden"
        }`}
      >
        <HighestTransformationData />
      </div>
      <div
        className={`col-span-1 ${
          state === "all" || state === "negative" ? "block" : "hidden"
        }`}
      >
        <LowestGapData />
      </div>
      <div
        className={`col-span-1 ${
          state === "all" || state === "negative" ? "block" : "hidden"
        }`}
      >
        <LowestInnovationData />
      </div>
      <div
        className={`col-span-1 ${
          state === "all" || state === "negative" ? "block" : "hidden"
        }`}
      >
        <LowestAppreciationData />
      </div>
    </div>
  );
}

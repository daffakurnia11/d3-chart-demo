import React from "react";
import OverviewAnalysis from "./OverviewAnalysis";
import PositiveAnalysis from "./PositiveAnalysis";
import NegativeAnalysis from "./NegativeAnalysis";

export default function AnalysisPage({
  state,
}: {
  state: "all" | "positive" | "negative";
}) {
  return (
    <>
      {state === "all" ? (
        <OverviewAnalysis />
      ) : state === "positive" ? (
        <PositiveAnalysis />
      ) : (
        <NegativeAnalysis />
      )}
    </>
  );
}

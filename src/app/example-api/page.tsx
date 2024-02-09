"use client";

import React, { useState } from "react";
import OverviewData from "./OverviewData";
import QuotesData from "./QuotesData";
import HighestOpportunityData from "./HighestOpportunityData";
import HighestCultureData from "./HighestCultureData";
import HighestTransformationData from "./HighestTransformationData";
import LowestGapData from "./LowestGapData";
import LowestInnovationData from "./LowestInnovationData";
import LowestAppreciationData from "./LowestAppreciationData";

const highestCircleUrl =
  "/api/v1/chart/data?survey_id=1&type=perception-of-opportunity&class=high-percentile&chart-type=buble";

const lowestCircleUrl =
  "/api/v1/chart/data?survey_id=1&type=perception-of-gap&class=low-percentile&chart-type=buble";

export default function ApiExamplePage() {
  const [tabActive, setTabActive] = useState("report");
  const [paramActive, setParamActive] = useState<
    "all" | "positive" | "negative"
  >("all");

  return (
    <div className="min-h-screen bg-neutral-100 report">
      <div className="container h-full mx-auto py-10">
        <h1 className="text-xl font-bold font-merriweather mb-3">
          Organizational Assessment Across the 23 skills of The Inner
          Development Goals
        </h1>
        <p className="text-sm text-slate-500">Survey Taken : Nov 6, 2023</p>
        <div className="flex justify-between items-center my-8">
          <div className="flex gap-8 tab-group">
            <button
              className={`tab-item pb-2 text-slate-600 font-medium ${
                tabActive === "report" ? "active" : ""
              }`}
              onClick={() => setTabActive("report")}
            >
              Report
            </button>
            <button
              className={`tab-item pb-2 text-slate-600 font-medium ${
                tabActive === "analysis" ? "active" : ""
              }`}
              onClick={() => setTabActive("analysis")}
            >
              Analysis
            </button>
          </div>
          <div className="flex button-group border border-solid rounded overflow-hidden">
            <button
              className={`text-xs button-item p-3 ${
                paramActive === "all" ? "active" : ""
              }`}
              onClick={() => setParamActive("all")}
            >
              Overview
            </button>
            <button
              className={`text-xs button-item p-3 ${
                paramActive === "positive" ? "active" : ""
              }`}
              onClick={() => setParamActive("positive")}
            >
              Positive Impact
            </button>
            <button
              className={`text-xs button-item p-3 ${
                paramActive === "negative" ? "active" : ""
              }`}
              onClick={() => setParamActive("negative")}
            >
              Negative Impact
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <OverviewData state={paramActive} />
          </div>
          <div className="col-span-2">
            <QuotesData />
          </div>
          {(paramActive === "all" || paramActive === "positive") && (
            <>
              <div className="col-span-1">
                <HighestOpportunityData />
              </div>
              <div className="col-span-1">
                <HighestCultureData />
              </div>
              <div className="col-span-1">
                <HighestTransformationData />
              </div>
            </>
          )}
          {(paramActive === "all" || paramActive === "negative") && (
            <>
              <div className="col-span-1">
                <LowestGapData />
              </div>
              <div className="col-span-1">
                <LowestInnovationData />
              </div>
              <div className="col-span-1">
                <LowestAppreciationData />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

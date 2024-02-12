"use client";

import React, { useState } from "react";
import ReportPage from "./Report/ReportPage";
import AnalysisPage from "./Analysis/AnalysisPage";

export default function ApiExamplePage() {
  const [tabActive, setTabActive] = useState<"report" | "analysis">("report");
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
        {tabActive === "report" ? (
          <ReportPage state={paramActive} />
        ) : (
          <AnalysisPage state={paramActive} />
        )}
      </div>
    </div>
  );
}

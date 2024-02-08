"use client";

import React, { useState } from "react";
import SunburstChart from "../sunburst/SunburstChart";
import SunburstData from "../sunburst/data.json";
import PackedCirclesChart from "../circles/PackedCirclesChart";
import PackedCirclesData from "../circles/data.json";
import BarChart from "../bar/BarChart";
import BarData from "../bar/data.json";

export default function ApiExamplePage() {
  const [tabActive, setTabActive] = useState("report");
  const [paramActive, setParamActive] = useState("overview");

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
                paramActive === "overview" ? "active" : ""
              }`}
              onClick={() => setParamActive("overview")}
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
            <div className="rounded-lg w-full h-full bg-white">
              <div className="pt-6 pb-3">
                <p className="text-xs text-center font-semibold">
                  The Inner Development Goals
                </p>
              </div>
              <div className="p-4 flex justify-center">
                <SunburstChart width={250} height={250} data={SunburstData} />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="rounded-lg w-full h-full bg-white">
              <div className="pt-6 pb-3">
                <p className="text-xs text-center font-semibold">Quotes</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="rounded-lg w-full h-full bg-white">
              <div className="pt-6 pb-3">
                <p className="text-xs text-center font-semibold">
                  Skills perceived as crucial in the next 12 months by
                  %respondents
                </p>
              </div>
              <div className="pb-4 flex justify-center">
                <PackedCirclesChart
                  width={200}
                  height={200}
                  data={PackedCirclesData}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
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
          </div>
          <div className="col-span-1">
            <div className="rounded-lg w-full h-full bg-white">
              <div className="pt-6 pb-3">
                <p className="text-xs text-center font-semibold">
                  Skills above the transformation threshold(&gt;7.4)
                </p>
              </div>
              <div className="pb-4 flex justify-center">
                <BarChart width={375} height={200} data={BarData} />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="rounded-lg w-full h-full bg-white">
              <div className="pt-6 pb-3">
                <p className="text-xs text-center font-semibold">
                  Skills perceived as critically lacking by %respondents
                </p>
              </div>
              <div className="pb-4 flex justify-center">
                <PackedCirclesChart
                  width={200}
                  height={200}
                  data={PackedCirclesData}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="rounded-lg w-full h-full bg-white">
              <div className="pt-6 pb-3">
                <p className="text-xs text-center font-semibold">
                  Skills below the innovation threshold(&gt;6.0)
                </p>
              </div>
              <div className="pb-4 flex justify-center">
                <BarChart width={375} height={200} data={BarData} />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="rounded-lg w-full h-full bg-white">
              <div className="pt-6 pb-3">
                <p className="text-xs text-center font-semibold">
                  Skills below the appreciation threshold (&gt;6.4)
                </p>
              </div>
              <div className="pb-4 flex justify-center">
                <BarChart width={375} height={200} data={BarData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

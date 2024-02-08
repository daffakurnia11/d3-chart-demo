"use client";

import React, { useEffect, useState } from "react";
import SunburstChart from "../sunburst/SunburstChart";
import { assignColorsToData } from "../utils";

// STATIC URL FOR DEMO ONLY
const baseUrl = "https://ecologies-api.staging.iavtest.com";
const dataUrl =
  "/api/v1/chart/data?survey_id=1&type=overview&class=overview&chart-type=sunburst";

export default function OverviewData({
  state,
}: {
  state: "all" | "positive" | "negative";
}) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(baseUrl + dataUrl);
    const json = await response.json();
    setData(json.data);
  };

  useEffect(() => {
    if (data === null) {
      fetchData();
    }
  }, [data, state]);

  return (
    <div className="rounded-lg w-full h-full bg-white">
      <div className="pt-6 pb-3">
        <p className="text-xs text-center font-semibold">
          The Inner Development Goals
        </p>
      </div>
      <div className="p-4 flex justify-center">
        <div style={{ width: 350, height: "auto", aspectRatio: "1/1" }}>
          {data && (
            <SunburstChart
              width={"100%"}
              height={"100%"}
              data={data}
              state={state}
            />
          )}
        </div>
      </div>
    </div>
  );
}

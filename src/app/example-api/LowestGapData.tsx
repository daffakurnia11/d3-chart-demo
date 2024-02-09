import React, { useEffect, useState } from "react";
import PackedCirclesChart from "../circles/PackedCirclesChart";

// STATIC URL FOR DEMO ONLY
const baseUrl = "https://ecologies-api.staging.iavtest.com";
const dataUrl =
  "/api/v1/chart/data?survey_id=1&type=perception-of-gap&class=low-percentile&chart-type=buble";

export default function LowestGapData() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(baseUrl + dataUrl);
    const json = await response.json();
    setData(json.data.datasets);
  };

  useEffect(() => {
    if (data === null) {
      fetchData();
    }
  }, [data]);

  return (
    <div className="rounded-lg w-full h-full bg-white">
      <div className="pt-6 pb-3">
        <p className="text-xs text-center font-semibold">
          Skills perceived as critically lacking by %respondents
        </p>
      </div>
      <div
        className="pb-4 flex justify-center items-center"
        style={{ height: 400 }}
      >
        <div style={{ width: "100%", height: 300 }}>
          {data && (
            <PackedCirclesChart width={"100%"} height={"100%"} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

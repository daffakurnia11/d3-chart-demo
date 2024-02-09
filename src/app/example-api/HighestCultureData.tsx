import React, { useEffect, useState } from "react";
import BarChart from "../bar/BarChart";
import BarData from "../bar/data.json";

// STATIC URL FOR DEMO ONLY
const baseUrl = "https://ecologies-api.staging.iavtest.com";
const dataUrl =
  "/api/v1/chart/data?survey_id=1&type=defining-culture&class=high-percentile&chart-type=bar";

export default function HighestCultureData() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(baseUrl + dataUrl);
    const json = await response.json();
    setData(json.data);
    console.log(json.data);
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
          Skills above the cultural threshold(&gt;7.0)
        </p>
      </div>
      <div className="pb-4 flex justify-center px-3">
        <div style={{ width: "100%", height: 400 }}>
          {data && <BarChart width={"100%"} height={"100%"} data={data} />}
        </div>
      </div>
    </div>
  );
}

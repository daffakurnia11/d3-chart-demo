import React, { useEffect, useState } from "react";
import BarChart from "../../bar/BarChart";

// STATIC URL FOR DEMO ONLY
const baseUrl = "https://ecologies-api.staging.iavtest.com";
const dataUrl =
  "/api/v1/chart/data?survey_id=1&type=systemic-innovation&class=low-percentile&chart-type=bar";

export default function LowestInnovationData() {
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
  }, [data]);

  return (
    <div className="rounded-lg w-full h-full bg-white">
      <div className="pt-6 pb-3">
        <p className="text-xs text-center font-semibold">
          Skills below the innovation threshold(&gt;6.0)
        </p>
      </div>
      <div className="pb-4 flex justify-center px-3">
        <div style={{ width: "100%", height: 400 }}>
          {data && (
            <BarChart
              width={"100%"}
              height={"100%"}
              data={data}
              color="#661A30"
            />
          )}
        </div>
      </div>
    </div>
  );
}

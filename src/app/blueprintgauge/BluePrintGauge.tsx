import React from "react";
import BluePrintGaugeChart from "./BluePrintGaugeChart";
import { BluePrintGaugeCombinedProps } from "./BluePrintChartType";

const BluePrintGauge: React.FC<BluePrintGaugeCombinedProps> = ({
  firstData,
  secondData,
  firstTitle,
  secondTitle,
}) => {
  return (
    <div className="relative flex flex-col gap-1">
      <BluePrintGaugeChart title={firstTitle} data={firstData} />
      <BluePrintGaugeChart title={secondTitle} data={secondData} />
      <div className="absolute left-[308px] right-[68px] top-0 bottom-0">
        {firstData.data[0].value === secondData.data[0].value && (
          <>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[200px] w-[2px] bg-gradient-to-b from-transparent via-[#C1DFA6] to-transparent"
              style={{
                content: "",
                left: `calc( ${firstData.data[0].value}%)`,
              }}
            ></div>
            <div
              className="absolute top-[71.5%] -translate-y-1/2 h-5 w-5 p-0.5 border border-solid border-[#C1DFA6]  rounded-full -translate-x-1/2"
              style={{
                content: "",
                left: `calc(1px + ${firstData.data[0].value}%)`,
              }}
            >
              <div
                style={{ content: "" }}
                className="w-full h-full bg-[#C1DFA6] rounded-full"
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BluePrintGauge;

import React from "react";
import {
  BluePrintGaugeDataType,
  BluePrintGaugeProps,
} from "./BluePrintChartType";

function generateDataset(data: BluePrintGaugeDataType) {
  const minValue = data.parameter[0].value;
  const maxValue = data.parameter.reduce((sum, { value }) => sum + value, 0);
  const parameterRange = maxValue - minValue;
  let currentValue = 0;

  return {
    ...data,
    parameter: data.parameter.map((item) => {
      currentValue += item.value;
      return {
        ...item,
        position: ((currentValue - minValue) / parameterRange) * 100,
      };
    }),
  };
}

const BluePrintGaugeChart: React.FC<BluePrintGaugeProps> = ({
  title,
  data,
}) => {
  const dataset = generateDataset(data);

  return (
    <div className="flex gap-8 items-center min-h-[120px] w-full bg-[#173C07] text-[#C1DFA6] rounded-[8px] py-4 px-12 mx-auto">
      <div className="w-[200px] shrink-0">{title}</div>
      <div className="w-full relative mx-6 mb-5">
        <div
          style={{ content: "" }}
          className="h-[2px] w-full bg-[#C1DFA6] rounded"
        ></div>
        {dataset.parameter.map((item, index) => (
          <>
            <div
              key={index}
              className="absolute left-0 top-3 text-[12px]"
              style={{
                left: `calc(${item.position}% + 5px)`,
                transform: "translateX(-50%)",
              }}
            >
              {item.label}
            </div>
            <div
              key={index}
              className="absolute left-0 w-2.5 h-2.5 bg-[#C1DFA6] rounded-full -translate-y-1/2 top-1/2"
              style={{
                left: `${item.position}%`,
                content: "",
              }}
            ></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default BluePrintGaugeChart;

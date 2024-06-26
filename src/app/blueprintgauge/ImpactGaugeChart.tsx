import React from "react";
import { BluePrintGaugeDataType, ImpactGaugeProps } from "./BluePrintChartType";

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

const ImpactGaugeChart: React.FC<ImpactGaugeProps> = ({ data }) => {
  const dataset = generateDataset(data);

  const boxHeights = [14, 12, 10, 8, 6, 4, 3, 2, 3, 5, 8, 13, 18, 25, 35];

  return (
    <div className="flex gap-8 items-center min-h-[120px] w-full bg-[#00474F] text-[#B3EFFF] rounded-[8px] py-4 px-12 mx-auto">
      <div className="w-[200px] shrink-0 mx-auto">
        <div className="flex flex-col items-center gap-1">
          Impact
          <svg
            width="44"
            height="60"
            viewBox="0 0 44 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2314 59.967C11.2562 59.967 7.28104 59.9701 3.30895 59.967C1.37059 59.967 0.401416 59.0275 0.401416 57.1487C0.401416 55.5457 0.44449 53.9427 0.386032 52.3459C0.333727 50.9059 0.915234 50.0321 2.389 50.2598C5.00116 50.6598 6.93644 49.5552 8.70558 47.8353C10.6039 45.9924 12.93 45.2939 15.5514 45.3247C19.0773 45.3678 22.6033 45.3155 26.1292 45.3432C28.0184 45.3585 29.0675 46.3062 29.0768 47.8815C29.0829 49.4476 28.0584 50.3367 26.1077 50.386C24.5047 50.426 22.8956 50.3244 21.3049 50.469C20.7542 50.5183 20.2557 51.1275 19.7327 51.4782C20.2249 51.8567 20.7049 52.5428 21.2126 52.5643C23.7724 52.6781 26.3415 52.672 28.9014 52.5797C29.5352 52.5582 30.2244 52.1582 30.7628 51.7644C33.2489 49.9552 35.6764 48.063 38.1563 46.2477C39.8085 45.0386 41.4669 45.1032 42.4453 46.3123C43.3222 47.4015 42.916 50.3829 41.6976 51.3151C38.4947 53.7673 35.3349 56.2872 32.0028 58.5517C30.8121 59.3609 29.1845 59.8408 27.7322 59.9024C23.5725 60.0777 19.4004 59.9639 15.2345 59.967H15.2314Z"
              fill="#B3EFFF"
            />
            <path
              d="M24.3843 27.1442C25.815 27.1442 26.9534 27.1257 28.0948 27.1534C28.5994 27.1657 29.5224 27.2057 29.544 27.3411C29.8424 29.3563 30.1532 31.3932 30.1255 33.4177C30.1193 33.8269 28.7779 34.4268 27.9841 34.5714C26.8857 34.7714 25.7257 34.6207 24.372 34.6207C24.372 36.1929 24.3966 37.519 24.3658 38.842C24.3043 41.568 22.1875 40.6942 20.8122 40.6542C19.3938 40.6142 17.1693 41.6849 17.0462 38.8389C16.9908 37.5159 17.037 36.1898 17.037 34.6299C15.5386 34.6299 14.2771 34.6022 13.0126 34.6361C11.7296 34.6699 11.105 34.1007 11.1296 32.8085C11.1511 31.4639 11.1542 30.1225 11.1542 28.7779C11.1542 27.6611 11.7265 27.1442 12.8187 27.1472C14.1448 27.1472 15.474 27.1472 17.0401 27.1472C17.0401 25.7227 17.0247 24.5258 17.0431 23.329C17.077 21.1599 17.1662 21.1137 20.8491 21.1291C24.2643 21.1414 24.3535 21.1968 24.3812 23.4028C24.3935 24.5443 24.3812 25.6889 24.3812 27.1442H24.3843Z"
              fill="#B3EFFF"
            />
            <path
              d="M38.068 19.9834C39.5694 19.9834 40.7693 19.9742 41.9662 19.9834C43.1723 19.9957 43.643 20.6049 43.6184 21.8172C43.5938 23.0387 42.9446 23.3586 41.9016 23.3463C40.754 23.334 39.6063 23.3463 38.0864 23.3463C38.0864 24.7216 38.071 25.9708 38.0926 27.2169C38.111 28.3922 37.6003 29.0352 36.388 29.0383C35.1173 29.0383 34.7512 28.2753 34.7697 27.1523C34.7912 26.0016 34.7727 24.8509 34.7727 23.3432C33.4067 23.3432 32.1575 23.3371 30.9083 23.3432C29.8038 23.3494 29.2623 22.8479 29.2777 21.7064C29.293 20.6296 29.6992 20.0327 30.8468 19.9742C32.099 19.9096 33.7359 20.1803 34.4805 19.5065C35.1143 18.9343 34.7543 17.2267 34.782 16.0206C34.8066 14.9437 35.222 14.3345 36.385 14.3499C37.4711 14.3653 38.0803 14.8053 38.068 15.9529C38.0556 17.1651 38.068 18.3804 38.068 19.9834Z"
              fill="#B3EFFF"
            />
            <path
              d="M27.0919 9.03374C27.0919 10.6552 27.2519 11.9536 27.0212 13.175C26.9135 13.7412 26.0397 14.5442 25.5105 14.5473C24.9628 14.5473 24.0921 13.7966 23.9321 13.2181C23.5721 11.9228 24.0336 10.0675 23.2829 9.31372C22.5845 8.61222 20.7477 9.03989 19.4123 8.9599C19.2985 8.95374 19.1877 8.85221 18.9785 8.74452V5.79391C19.7723 5.75699 20.5169 5.70777 21.2645 5.6893C22.0276 5.67084 22.7875 5.68623 23.849 5.68623C23.849 4.29861 23.8675 3.04637 23.8429 1.79413C23.8213 0.628043 24.2859 -0.0180755 25.532 0.000384983C26.6796 0.0188455 27.1165 0.621889 27.0981 1.70491C27.0765 2.91099 27.0919 4.11708 27.0919 5.68007C28.3472 5.68007 29.4672 5.64931 30.5871 5.6893C31.7409 5.7293 33.0731 5.6893 33.0762 7.34152C33.0793 8.96297 31.8178 9.01835 30.621 9.03066C29.5441 9.03989 28.4672 9.03066 27.0919 9.03066V9.03374Z"
              fill="#B3EFFF"
            />
          </svg>
        </div>
      </div>
      <div className="w-full relative mx-6 mb-5">
        <div
          style={{ content: "" }}
          className="h-[2px] w-full bg-[#B3EFFF] rounded relative z-50 mb-3"
        ></div>
        {dataset.parameter.map((item, index) => (
          <div
            key={index}
            className="absolute top-5 text-[12px] max-w-[120px] w-fill text-center mx-auto z-50"
            style={{
              left: `calc(${item.position}% + 5px)`,
              transform: "translateX(-50%)",
            }}
          >
            {item.label}
          </div>
        ))}
        {boxHeights.map((height, index) => (
          <div
            key={index}
            style={{
              content: "",
              left: `${index * (100 / 15)}%`,
              height,
              backgroundColor: index < 7 ? "#C81E1E" : "#7ED957",
              top: index < 7 ? 0 : -height,
            }}
            className="absolute w-5 translate-x-1/2"
          ></div>
        ))}
        <div
          className="absolute top-0 -right-1 -translate-y-1/2"
          style={{
            width: 0,
            height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",

            borderLeft: "6px solid #B3EFFF",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ImpactGaugeChart;

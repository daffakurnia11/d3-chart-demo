import classNames from "classnames";
import React from "react";

const Tooltip = ({ x, y, content, visible }) => {
  return (
    <>
      <div
        className={classNames(
          "absolute content-none w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-solid border-x-transparent border-b-gray-500 -translate-y-full -translate-x-1/2 transition duration-500",
          visible ? "opacity-100" : "opacity-0"
        )}
        style={{ left: x, top: y }}
      ></div>
      <div
        className={classNames(
          "absolute bg-gray-500 font-text text-xs text-center text-white py-1 px-2.5 rounded -translate-x-1/2 transition duration-500 w-[200px]",
          visible ? "opacity-100" : "opacity-0"
        )}
        style={{ left: x, top: y }}
      >
        {content}
      </div>
    </>
  );
};

export default Tooltip;

"use client";

import classNames from "classnames";
import React, { useState } from "react";

const Tooltip = ({ x, y, content, visible }) => {
  return (
    <>
      <div
        className={classNames(
          "absolute content-none w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-solid border-x-transparent border-b-primary-500 -translate-y-full -translate-x-1/2 transition duration-500",
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        style={{ left: x, top: y }}
      ></div>
      <div
        className={classNames(
          "absolute bg-primary-500 font-text text-xs text-center text-white py-1 px-2.5 rounded -translate-x-1/2 transition duration-500 max-w-[200px]",
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        style={{ left: x, top: y }}
      >
        {content}
      </div>
    </>
  );
};

export const useTooltipHook = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  return { tooltip, setTooltip };
};

export default Tooltip;

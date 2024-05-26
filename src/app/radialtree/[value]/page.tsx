"use client";

import React from "react";
import RadialTreeChart from "../RadialTreeChart";
import data from "../data.json";

export default function RadialTreeDetailChart({
  params,
}: {
  params: { value: string };
}) {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center">
        Radial Tree Chart Test : {params.value.toUpperCase()}
      </h1>
      <div className="flex justify-center items-center">
        <RadialTreeChart
          width={700}
          height={700}
          data={data}
          detailPagePrefix="/radialtree"
          state={params.value.toUpperCase()}
        />
      </div>
    </div>
  );
}

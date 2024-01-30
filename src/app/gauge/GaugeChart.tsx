import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";

const GaugeChart = () => {
  const ref = useRef();

  useEffect(() => {
    const data = [
      { label: "Deteriorating", min: 0, max: 25 },
      { label: "Inhibiting", min: 25, max: 45 },
      { label: "Entropic", min: 45, max: 60 },
      { label: "Scalable", min: 60, max: 75 },
      { label: "Innovative", min: 75, max: 90 },
      { label: "Regenerative", min: 90, max: 100 },
    ];

    const width = 800;
    const height = 400;
    const needleValue = 68; // Needle points to 68%
    const innerRadius = 100;
    const outerRadius = 200;
    const colorScale = chroma.scale("Set3").colors(data.length);

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pie = d3
      .pie()
      .startAngle(-Math.PI / 1.5)
      .endAngle(Math.PI / 1.5)
      .sort(null)
      .value((d) => d.max - d.min);

    const arcs = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("fill", (d, i) => colorScale[i])
      .attr("d", arcGenerator);

    // Calculate the angle for the needle
    const scale = d3
      .scaleLinear()
      .range([-Math.PI / 2, Math.PI / 2])
      .domain([0, 100]);

    const needleAngle = scale(needleValue);

    // Draw the needle
    const line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    const needleLine = [
      { x: 0, y: 0 }, // center
      {
        x: outerRadius * Math.cos(needleAngle),
        y: -outerRadius * Math.sin(needleAngle),
      }, // outer point
    ];
  }, []);

  return <svg ref={ref} />;
};

export default GaugeChart;

"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "./data.json";
import chroma from "chroma-js";

interface SunburstChartProps {
  width: number;
  height: number;
}

const colorPalette = chroma.scale("Set2").colors(5);

export function assignColorsToData(data: any, color?: string) {
  data.children.forEach((child: any, i: number) => {
    child.color = color ? color : colorPalette[i];
    if (child.children) {
      assignColorsToData(child, child.color);
    }
  });
  return data;
}

const SunburstChart: React.FC<SunburstChartProps> = ({ width, height }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;
    const dataset = assignColorsToData(data);

    const partition = d3.partition().size([2 * Math.PI, radius]);
    const arc = d3
      .arc()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .innerRadius((d: any) => d.y0)
      .outerRadius((d: any) => d.y1);

    const root = d3
      .hierarchy(dataset)
      .sum((d) => d.value)
      .sort((a: any, b: any) => b.value - a.value);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("font", "10px sans-serif");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const path = g
      .selectAll("path")
      .data(partition(root).descendants())
      .enter()
      .append("path")
      .attr("d", arc)
      .style("fill", (d: any) => (d.depth === 0 ? "transparent" : d.data.color))
      .style("stroke", "white")
      .style("stroke-width", 1)
      .style("opacity", 1)
      .style("transition", "opacity 0.3s ease-in-out");

    g.selectAll("text")
      .data(partition(root).descendants())
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("fill", "black")
      .style("font-size", "10px")
      .style("pointer-events", "none")
      .each(function (d: any) {
        const text = d.data.name !== "ROOT" ? d.data.name : "";
        const words = text.split(" ");
        const lineHeight = 12;

        d3.select(this)
          .selectAll("tspan")
          .data(words)
          .enter()
          .append("tspan")
          .text((d: any) => d)
          .attr("x", 0)
          .attr("dy", (_, i) => (i === 0 ? "5px" : lineHeight + "px"));

        const totalHeight = words.length * lineHeight;

        const centroid = arc.centroid(d);
        const x = centroid[0];
        const y = centroid[1] - totalHeight / 2;

        d3.select(this).attr("transform", `translate(${x},${y})`);
      });

    const handleMouseEnter = (event: any, d: any) => {
      path.style("opacity", 0.3);
      d3.select(event.target).style("opacity", 1);

      if (d.parent) {
        const parentPath = path.filter((node) => node === d.parent);
        parentPath.style("opacity", 1);
      }
    };

    path.on("mouseenter", handleMouseEnter);
    path.on("mouseleave", () => path.style("opacity", 1));

    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <div style={{ width: "fit-content", overflowX: "auto" }}>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default SunburstChart;

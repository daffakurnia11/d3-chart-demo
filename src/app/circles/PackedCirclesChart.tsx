"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { PackedCirclesProps } from "./PackedCirclesChartType";
import { assignPaletteData } from "../utils";
import Tooltip, { useTooltipHook } from "../Tooltip";

const PackedCirclesChart: React.FC<PackedCirclesProps> = ({
  width,
  height,
  data,
  print = false,
}) => {
  const svgRef = useRef(null);
  const { tooltip, setTooltip } = useTooltipHook();

  const wrapText = (text: any, diameter: number) => {
    let words = text.text().split(/\s+/);
    text.text(null);
    let line: string[] = [];
    let lineHeight = 1.1; // ems
    let y = text.attr("y");
    let dy = parseFloat(text.attr("dy"));
    let tspan = text
      .append("tspan")
      .attr("x", 0)
      .attr("y", y)
      .attr("dy", dy + "em");

    words.forEach((word: string) => {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > diameter) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", lineHeight + dy + "em")
          .text(word);
      }
    });

    // Applying the logic for lines with a colon
    text.selectAll("tspan").each(function (d: any, i: number, nodes: any) {
      const currentLine = d3.select(nodes[i]).text();
      if (currentLine.includes(":")) {
        const parts = currentLine.split(":");
        d3.select(nodes[i]).text(parts[0]);
        text
          .append("tspan")
          .text("(" + parts[1] + ")")
          .attr("x", 0)
          .attr("dy", "1.5em");
      }
    });

    // Calculate total text height
    let textHeight = 0;
    text.selectAll("tspan").each(function (this: SVGTSpanElement) {
      textHeight += this.getBBox().height;
    });

    // Adjust text position to center it vertically within the circle
    const textOffset = diameter - textHeight / 2;
    text.attr("transform", `translate(0, ${-(diameter / 2 - textOffset / 2)})`);
  };

  useEffect(() => {
    if (data && data.data.length > 0) {
      const width = 400,
        height = 400;
      const svg = d3.select(svgRef.current);
      const pack = d3.pack().size([width, height]).padding(3);
      const root = d3
        .hierarchy({ children: data.data })
        .sum((d: any) => d.value);
      pack(root as any);

      const node = svg
        .append("g")
        .selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);

      node
        .append("circle")
        .attr("r", (d: any) => d.r)
        .style("fill", (d: any) => {
          return assignPaletteData(d.data.type)[0];
        })
        .style("opacity", 1)
        .style("transition", "opacity 0.3s ease-in-out")
        .on("mouseenter", function (_, d: any) {
          if (!print) {
            d3.selectAll("circle").style("opacity", 0.2);
            d3.select(this).style("opacity", 1);
            if (d.data.description) {
              setTooltip({
                visible: true,
                x: d.x,
                y: d.y + d.r,
                content: d.data.description,
              });
            }
          }
        })
        .on("mouseleave", function () {
          d3.selectAll("circle").style("opacity", 1);
          setTooltip((prev) => ({ ...prev, visible: false }));
        });

      node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .style("fill", "white")
        .style("font-size", "12px")
        .text((d: any) => d.data.label + ":" + Math.ceil(d.data.value) + "%")
        .each(function (d: any) {
          wrapText(d3.select(this), d.r * 2 - 25);
        })
        .on("mouseenter", function (this: any, _, d: any) {
          if (!print) {
            d3.selectAll("circle").style("opacity", 0.2);
            d3.select(this?.parentNode).select("circle").style("opacity", 1);
            if (d.data.description) {
              setTooltip({
                visible: true,
                x: d.x,
                y: d.y + d.r,
                content: d.data.description,
              });
            }
          }
        })
        .on("mouseleave", function () {
          d3.selectAll("circle").style("opacity", 1);
          setTooltip((prev) => ({ ...prev, visible: false }));
        });
    }
  }, [data]);

  return (
    <div className="relative">
      <svg width={width} height={height} viewBox="0 0 400 400">
        <svg ref={svgRef} width={"100%"} height={"100%"} />
      </svg>
      <Tooltip {...tooltip} />
    </div>
  );
};

export default PackedCirclesChart;

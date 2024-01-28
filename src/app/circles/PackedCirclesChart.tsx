"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import data from "./data.json";

const PackedCirclesChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;

    const pack = d3.pack().size([width, height]).padding(3);

    const root = d3.hierarchy({ children: data }).sum((d: any) => d.value);

    pack(root);

    const color = chroma.scale("Set2").mode("lch").colors(data.length);

    const node = svg
      .append("g")
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);

    node
      .append("circle")
      .attr("r", (d: any) => d.r)
      .style("fill", (_, i) => color[i])
      .style("opacity", 1)
      .style("transition", "opacity 0.3s ease-in-out")
      .on("mouseenter", function () {
        d3.selectAll("circle").style("opacity", 0.2);
        d3.select(this).style("opacity", 1);
      })
      .on("mouseleave", function () {
        d3.selectAll("circle").style("opacity", 1);
      });

    const textLabel = node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.25em")
      .style("fill", "#333")
      .style("font-size", "16px");

    textLabel
      .text((d: any) => d.data.name + ":" + d.data.value + "%")
      .each(function (d: any) {
        const circleDiameter = d.r * 2;
        let text = d3.select(this),
          words = text.text().split(/\s+/),
          tspan = text
            .text(null)
            .append("tspan")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "0em");
        const output = [];
        let current = "";

        for (let word of words) {
          const tempText = current === "" ? word : current + " " + word;
          tspan.text(tempText);
          if (tspan.node()?.getComputedTextLength() < circleDiameter - 20) {
            current = tempText;
          } else {
            if (current !== "") {
              output.push(current);
            }
            current = word;
          }
        }
        if (current !== "") {
          output.push(current);
        }
        text.text(null);

        output.forEach((line, index) => {
          if (line.includes(":")) {
            const parts = line.split(":");
            text
              .append("tspan")
              .text(parts[0])
              .attr("x", 0)
              .attr("dy", index === 0 ? "0em" : "1.2em");
            text
              .append("tspan")
              .text("(" + parts[1] + ")")
              .attr("x", 0)
              .attr("dy", "1.2em");
          } else {
            text
              .append("tspan")
              .text(line)
              .attr("x", 0)
              .attr("dy", index === 0 ? "0em" : "1.2em");
          }
        });

        let textHeight = 0;
        text.selectAll("tspan").each(function () {
          textHeight += this?.getBBox().height;
        });
        const textOffset = circleDiameter - textHeight / 3.5;
        text.style(
          "transform",
          `translateY(-${circleDiameter / 2 - textOffset / 2}px)`
        );
      });
  }, []);

  return <svg ref={svgRef} width={400} height={400} />;
};

export default PackedCirclesChart;

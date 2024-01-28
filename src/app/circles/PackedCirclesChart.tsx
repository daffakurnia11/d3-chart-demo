"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import data from "./data.json";

const PackedCirclesChart = () => {
  const svgRef = useRef(null);
  const width = 400,
    height = 400;

  const createColorScale = (data: any) =>
    chroma.scale("Set2").mode("lch").colors(data.length);

  const wrapText = (text: any, diameter: number) => {
    let words = text.text().split(/\s+/);
    text.text(null);
    let line: string[] = [];
    let lineNumber = 0;
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
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    });

    // Applying the logic for lines with a colon
    text.selectAll("tspan").each(function (d: any, i: number) {
      const currentLine = d3.select(this).text();
      if (currentLine.includes(":")) {
        const parts = currentLine.split(":");
        d3.select(this).text(parts[0]);
        text
          .append("tspan")
          .text("(" + parts[1] + ")")
          .attr("x", 0)
          .attr("dy", "1.5em");
      }
    });

    // Calculate total text height
    let textHeight = 0;
    text.selectAll("tspan").each(function () {
      textHeight += this.getBBox().height;
    });

    // Adjust text position to center it vertically within the circle
    const textOffset = diameter - textHeight / 2;
    text.attr("transform", `translate(0, ${-(diameter / 2 - textOffset / 2)})`);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const pack = d3.pack().size([width, height]).padding(3);
    const root = d3.hierarchy({ children: data }).sum((d: any) => d.value);
    pack(root);

    const color = createColorScale(data);

    const node = svg
      .append("g")
      .selectAll("g")
      .data(root.leaves())
      .join("g")
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

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#333")
      .style("font-size", "16px")
      .text((d: any) => d.data.name + ":" + d.data.value + "%")
      .each(function (d: any) {
        wrapText(d3.select(this), d.r * 2 - 20);
      });
  }, []);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default PackedCirclesChart;

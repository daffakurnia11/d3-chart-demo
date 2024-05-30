// eslint-disable-file
"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import { assignSankeyColor } from "../utils";
import { SankeyProps } from "./SankeyChartType";

function hideTextBasedOnConstraints(svg: any, links: any) {
  svg
    .selectAll(".node-text")
    .style("opacity", 1)
    .each(function (this: SVGTextElement, d: any) {
      const self = d3.select(this);
      const bbox = self.node()!.getBBox();
      const textHeight = bbox.height;
      const nodeHeight = d.y1 - d.y0;

      if (textHeight > nodeHeight) {
        self.style("opacity", 0);
      }
    });

  svg
    .selectAll(".node-text")
    .each(function (this: SVGTextElement, d: any, i: number) {
      const self = d3.select(this);
      const textLength = self.node()!.getComputedTextLength();
      let availableWidth;

      if (i === 0) {
        const minTargetX0 = Math.min(
          ...links
            .filter((l: any) => l.source === d)
            .map((l: any) => l.target.x0)
        );
        availableWidth = minTargetX0 - d.x1 - 12;
      } else {
        const maxSourceX1 = Math.max(
          ...links
            .filter((l: any) => l.target === d)
            .map((l: any) => l.source.x1)
        );
        availableWidth = d.x0 - maxSourceX1 - 10;
      }

      if (textLength > availableWidth) {
        self.style("opacity", 0);
      }
    });
}

const SankeyChart: React.FC<SankeyProps> = ({
  data,
  width = 1200,
  height = 600,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sankeyData = assignSankeyColor(data);

  useEffect(() => {
    if (!containerRef.current || !sankeyData) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight =
      height === "auto"
        ? containerWidth * 0.5
        : containerRef.current.clientHeight;

    const sankeyGenerator = sankey()
      .nodeWidth(16)
      .nodePadding(8)
      .extent([
        [45, 15],
        [containerWidth - 15, containerHeight - 15],
      ]);

    const { nodes, links } = sankeyGenerator(sankeyData as any);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const grads = svg
      .append("defs")
      .selectAll("linearGradient")
      .data(links)
      .enter()
      .append("linearGradient")
      .attr("id", (_, i: number) => `grad-${i}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d: any) => d.source.x1)
      .attr("x2", (d: any) => d.target.x0)
      .attr("y1", (d: any) => (d.source.y0 + d.source.y1) / 2)
      .attr("y2", (d: any) => (d.target.y0 + d.target.y1) / 2);

    grads
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", (d: any) => d.source.color);

    grads
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", (d: any) => d.target.color);

    const link = svg
      .append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("class", (d) => `node-link node-link-${d.index}`)
      .style("stroke", (_, i) => `url(#grad-${i})`)
      .style("stroke-width", (d: any) => Math.max(1, d.width))
      .style("stroke-opacity", 1)
      .style("transition", "stroke-opacity 0.3s ease-in-out");

    svg
      .selectAll(".link-text")
      .data(links)
      .enter()
      .append("text")
      .attr("class", (d) => `link-text link-text-${d.index}`)
      .attr("x", (d: any) =>
        d.source.targetLinks.length === 0 ? d.source.x0 - 20 : d.source.x1 + 20
      )
      .attr("y", (d: any) => d.y0)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => `${d.value}%`)
      .style("font", "14px sans-serif")
      .style("fill", "#000")
      .style("opacity", 0)
      .style(
        "text-shadow",
        "2px 2px 3px white, 2px -2px 3px white, -2px 2px 3px white, -2px -2px 3px white"
      )
      .style("transition", "opacity 0.3s ease-in-out");

    const node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .classed("node", true);

    node
      .append("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", sankeyGenerator.nodeWidth())
      .attr("class", (d) => `node-rect node-rect-${d.index}`)
      .style("fill", (d: any, i) => d.color)
      .style("opacity", 1)
      .style("transition", "opacity 0.3s ease-in-out");

    node
      .append("text")
      .attr("x", (d: any, i) =>
        d.targetLinks?.length === 0 ? d.x1 + 6 : d.x0 - 6
      )
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d, i) =>
        d.targetLinks?.length === 0 ? "start" : "end"
      )
      .text((d: any) => d.name)
      .style("font", "16px sans-serif")
      .style("pointer-events", "none")
      .style("fill", "#000")
      .style("transition", "opacity 0.3s ease-in-out")
      .style(
        "text-shadow",
        "2px 2px 4px white, 2px -2px 4px white, -2px 2px 4px white, -2px -2px 4px white"
      )
      .attr("class", (d) => `node-text node-text-${d.index}`);

    hideTextBasedOnConstraints(svg, links);

    link
      .on("mouseenter", function (_, d: any) {
        d3.selectAll(link.nodes().map((el) => (el === this ? null : el))).style(
          "stroke-opacity",
          0.3
        );

        node.selectAll(".node-rect").style("opacity", 0.3);
        node.select(`.node-rect-${d.source.index}`).style("opacity", 1);
        node.select(`.node-rect-${d.target.index}`).style("opacity", 1);

        svg.selectAll(".node-text").style("opacity", 0);
        svg.select(`.node-text-${d.source.index}`).style("opacity", 1);
        svg.select(`.node-text-${d.target.index}`).style("opacity", 1);

        svg.select(`.link-text-${d.index}`).style("opacity", 1);

        d3.select(this).style("stroke-opacity", 1);
      })
      .on("mouseleave", function () {
        d3.selectAll(link.nodes()).style("stroke-opacity", 1);

        node.selectAll(".node-rect").style("opacity", 1);
        svg.selectAll(".link-text").style("opacity", 0);
        hideTextBasedOnConstraints(svg, links);
      });

    node
      .on("mouseenter", function (_, d: any) {
        d3.selectAll(link.nodes().map((el) => (el === this ? null : el))).style(
          "stroke-opacity",
          0.3
        );
        svg.selectAll(".node-text").style("opacity", 0);
        svg.select(`.node-text-${d.index}`).style("opacity", 1);
        node.selectAll(".node-rect").style("opacity", 0.3);
        node.select(`.node-rect-${d.index}`).style("opacity", 1);
        d.sourceLinks.forEach((linkData: any) => {
          node
            .select(`.node-rect-${linkData.target.index}`)
            .style("opacity", 1);
          d3.select(`.node-link-${linkData.index}`).style("stroke-opacity", 1);
          svg.select(`.node-text-${linkData.target.index}`).style("opacity", 1);
          svg.select(`.link-text-${linkData.index}`).style("opacity", 1);
        });
        d.targetLinks.forEach((linkData: any) => {
          node
            .select(`.node-rect-${linkData.source.index}`)
            .style("opacity", 1);
          d3.select(`.node-link-${linkData.index}`).style("stroke-opacity", 1);
          svg.select(`.node-text-${linkData.source.index}`).style("opacity", 1);
          svg.select(`.link-text-${linkData.index}`).style("opacity", 1);
        });
      })
      .on("mouseleave", function () {
        node.selectAll(".node-rect").style("opacity", 1);
        d3.selectAll(link.nodes()).style("stroke-opacity", 1);
        svg.selectAll(".link-text").style("opacity", 0);

        hideTextBasedOnConstraints(svg, links);
      });
  }, [width, height]);

  return (
    <div ref={containerRef} style={{ width, height }}>
      <svg ref={svgRef} width="100%" height="100%" viewBox={`0 0 1200 600`} />
    </div>
  );
};

export default SankeyChart;

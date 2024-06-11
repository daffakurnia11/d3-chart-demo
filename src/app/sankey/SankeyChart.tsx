"use client";

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import {
  SankeyLinksDataType,
  SankeyNodesDataType,
  SankeyProps,
} from "./SankeyChartType";
import { assignSankeyColor } from "../utils";

function hideTextBasedOnConstraints(svg: any, links: any) {
  svg.selectAll(".node-text").each(function (this: SVGTextElement, d: any) {
    const self = d3.select(this);
    const textLength = self.node()!.getComputedTextLength();
    let availableWidth;

    if (d.targetLinks.length === 0) {
      const minTargetX0 = Math.min(
        ...links.filter((l: any) => l.source === d).map((l: any) => l.target.x0)
      );
      availableWidth = minTargetX0 - d.x1 - 30;
    } else {
      const maxSourceX1 = Math.max(
        ...links.filter((l: any) => l.target === d).map((l: any) => l.source.x1)
      );
      availableWidth = d.x0 - maxSourceX1 - 10;
    }

    if (textLength > availableWidth) {
      self.style("opacity", 0);
    }
  });
}

const SankeyChart: React.FC<SankeyProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const aspectRatio = 1200 / 800;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width } = entries[0].contentRect;
      const height = width / aspectRatio;
      setDimensions({ width, height });
    });

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        resizeObserver.unobserve(wrapperRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!data || dimensions.width === 0 || dimensions.height === 0) return;

    const { nodes, links } = assignSankeyColor(data);
    const { width, height } = dimensions;

    // Select the SVG element and set its width and height
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Initialize the sankey generator with specified node width, padding, and extent
    const sankeyGenerator = sankey<SankeyNodesDataType, SankeyLinksDataType>()
      .nodeWidth(16)
      .nodePadding(16)
      .extent([
        [45, 15],
        [width - 15, height - 15],
      ]);

    // Generate the sankey layout data (nodes and links)
    const { nodes: sankeyNodes, links: sankeyLinks } = sankeyGenerator({
      nodes: nodes.map((d: any) => ({ ...d })),
      links: links.map((d: any) => ({ ...d })),
    });

    // Clear any existing elements in the SVG
    svg.selectAll("*").remove();

    // Define gradients for each link
    const grads = svg
      .append("defs")
      .selectAll("linearGradient")
      .data(sankeyLinks)
      .enter()
      .append("linearGradient")
      .attr("id", (_, i: number) => `grad-${i}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d: any) => d.source.x1)
      .attr("x2", (d: any) => d.target.x0)
      .attr("y1", (d: any) => (d.source.y0 + d.source.y1) / 2)
      .attr("y2", (d: any) => (d.target.y0 + d.target.y1) / 2);

    // Gradient start color
    grads
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", (d: any) => d.source.color);

    // Gradient end color
    grads
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", (d: any) => d.target.color);

    // Add links (paths) to the SVG
    const link = svg
      .append("g")
      .attr("fill", "none")
      .selectAll(".link")
      .data(sankeyLinks)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal()) // Define the path generator for links
      .attr("class", (d) => `node-link node-link-${d.index}`)
      .attr("stroke", (_, i) => `url(#grad-${i})`) // Use the defined gradient
      .attr("stroke-width", (d: any) => Math.max(1, d.width)) // Set the width of the link
      .attr("stroke-opacity", 1)
      .style("transition", "stroke-opacity 0.3s ease-in-out");

    // Define the value of the nodes
    svg
      .selectAll(".link-text")
      .data(sankeyLinks)
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
      .style("font", "10px sans-serif")
      .style("fill", "#000")
      .style("opacity", 0)
      .style(
        "text-shadow",
        "2px 2px 3px white, 2px -2px 3px white, -2px 2px 3px white, -2px -2px 3px white"
      )
      .style("transition", "opacity 0.3s ease-in-out");

    // Add nodes (rectangles) to the SVG
    const node = svg
      .append("g")
      .selectAll(".node")
      .data(sankeyNodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`); // Position the nodes

    // Add rectangles for each node
    node
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", (d: any) => d.y1 - d.y0) // Set the height of the rectangle
      .attr("width", sankeyGenerator.nodeWidth()) // Set the width of the rectangle
      .attr("class", (d) => `node-rect node-rect-${d.index}`)
      .style("fill", (d: any) => d.color)
      .style("opacity", 1)
      .style("transition", "opacity 0.3s ease-in-out");

    // Add text labels for each node
    node
      .append("text")
      .attr("x", (d: any) => (d.targetLinks?.length === 0 ? 20 : -6))
      .attr("y", (d: any) => (d.y1 - d.y0) / 2) // Position the text in the center of the node
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) =>
        d.targetLinks?.length === 0 ? "start" : "end"
      )
      .text((d) => d.name.split(":")[0])
      .style("font", "12px sans-serif")
      .style("pointer-events", "none")
      .style("fill", "#000")
      .style("transition", "opacity 0.3s ease-in-out")
      .style(
        "text-shadow",
        "2px 2px 4px white, 2px -2px 4px white, -2px 2px 4px white, -2px -2px 4px white"
      )
      .attr("class", (d) => `node-text node-text-${d.index}`)
      .append("tspan")
      .attr("x", -6)
      .attr("y", (d: any) => (d.y1 - d.y0) / 2 + 16)
      .text((d) => d.name.split(":")[1] ?? "")
      .style("font", "12px sans-serif")
      .style("pointer-events", "none")
      .style("fill", "#000")
      .style("transition", "opacity 0.3s ease-in-out")
      .style(
        "text-shadow",
        "2px 2px 4px white, 2px -2px 4px white, -2px 2px 4px white, -2px -2px 4px white"
      )
      .attr("class", (d) => `node-text node-desc-${d.index}`);

    hideTextBasedOnConstraints(svg, sankeyLinks);

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
        svg.selectAll(".node-text").style("opacity", 1);

        node.selectAll(".node-rect").style("opacity", 1);
        svg.selectAll(".link-text").style("opacity", 0);
        hideTextBasedOnConstraints(svg, sankeyLinks);
      });

    node
      .on("mouseenter", function (_, d: any) {
        d3.selectAll(link.nodes().map((el) => (el === this ? null : el))).style(
          "stroke-opacity",
          0.3
        );
        svg.selectAll(".node-text").style("opacity", 0);
        svg.select(`.node-text-${d.index}`).style("opacity", 1);
        svg.select(`.node-desc-${d.index}`).style("opacity", 1);
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
        svg.selectAll(".node-text").style("opacity", 1);
        d3.selectAll(link.nodes()).style("stroke-opacity", 1);
        svg.selectAll(".link-text").style("opacity", 0);

        hideTextBasedOnConstraints(svg, sankeyLinks);
      });
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SankeyChart;

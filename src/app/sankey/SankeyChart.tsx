// eslint-disable-file
"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import chroma from "chroma-js";
import { sankeyData } from "./data";

interface SankeyChartProps {
  width: number;
  height: number;
}

function hideTextBasedOnConstraints(svg: any, links: any) {
  svg
    .selectAll(".node-text")
    .style("opacity", 1)
    .each(function (d: any) {
      const self = d3.select(this);
      const bbox = self.node()!.getBBox();
      const textHeight = bbox.height;
      const nodeHeight = d.y1 - d.y0;

      if (textHeight > nodeHeight) {
        self.style("opacity", 0);
      }
    });

  svg.selectAll(".node-text").each(function (d: any, i: number) {
    const self = d3.select(this);
    const textLength = self.node()!.getComputedTextLength();
    let availableWidth;

    if (i === 0) {
      const minTargetX0 = Math.min(
        ...links.filter((l: any) => l.source === d).map((l: any) => l.target.x0)
      );
      availableWidth = minTargetX0 - d.x1 - 12;
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

const SankeyChart: React.FC<SankeyChartProps> = ({ width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!sankeyData) {
      return;
    }
    const sankeyGenerator = sankey()
      .nodeWidth(16)
      .nodePadding(8)
      .extent([
        [45, 15],
        [width - 15, height - 15],
      ]);

    const { nodes, links } = sankeyGenerator(sankeyData);

    const colorScale = chroma.scale("Set2").colors(nodes.length);

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
      .attr("stop-color", (d: any) => colorScale[d.source.index]);

    grads
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", (d: any) => colorScale[d.target.index]);

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
        d.source.index === 0 ? d.source.x0 - 20 : d.source.x1 + 20
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
      .style("fill", (_, i) => colorScale[i])
      .style("opacity", 1)
      .style("transition", "opacity 0.3s ease-in-out");

    node
      .append("text")
      .attr("x", (d: any, i) => (i === 0 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d, i) => (i === 0 ? "start" : "end"))
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
    <div style={{ width: "fit-content", overflowX: "auto" }}>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default SankeyChart;

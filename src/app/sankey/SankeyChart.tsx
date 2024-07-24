"use client";

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import {
  SankeyLink,
  SankeyNode,
  sankey,
  sankeyLinkHorizontal,
} from "d3-sankey";
import {
  SankeyLinksDataType,
  SankeyNodesDataType,
  SankeyProps,
} from "./SankeyChartType";
import Tooltip, { useTooltipHook } from "../Tooltip";
import { modifySankeyData } from "../utils";

function hideTextBasedOnConstraints(svg: any, links: any) {
  svg.selectAll(".node-text").each(function (this: SVGTextElement, d: any) {
    const self = d3.select(this);
    const textLength = self.node()!.getComputedTextLength();
    let availableWidth;

    if (d.targetLinks.length === 0) {
      const minTargetX0 = Math.min(
        ...links.filter((l: any) => l.source === d).map((l: any) => l.target.x0)
      );
      availableWidth = minTargetX0 - d.x1 - 10;
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

function narrowingLayers(
  sankeyNodes: SankeyNode<SankeyNodesDataType, SankeyLinksDataType>[],
  sankeyLinks: SankeyLink<SankeyNodesDataType, SankeyLinksDataType>[],
  translate: number
) {
  sankeyNodes = sankeyNodes.map((node: any) => {
    if (node.category === "Evaluation") {
      return {
        ...node,
        x0: node.x0 + translate,
        x1: node.x1 + translate,
      };
    }
    if (node.category === "Prioritization") {
      return {
        ...node,
        x0: node.x0 - translate,
        x1: node.x1 - translate,
      };
    }
    if (node.category === "SDG") {
      return {
        ...node,
        x0: node.x0 - translate / 2,
        x1: node.x1 - translate / 2,
      };
    }
    return node;
  });

  sankeyLinks = sankeyLinks.map((link: any) => {
    if (link.target.category === "Evaluation") {
      return {
        ...link,
        target: {
          ...link.target,
          x0: link.target.x0 + translate,
          x1: link.target.x1 + translate,
        },
      };
    }
    if (link.source.category === "Evaluation") {
      return {
        ...link,
        source: {
          ...link.source,
          x0: link.source.x0 + translate,
          x1: link.source.x1 + translate,
        },
        target: {
          ...link.target,
          x0: link.target.x0 - translate,
          x1: link.target.x1 - translate,
        },
      };
    }
    if (link.source.category === "Prioritization") {
      return {
        ...link,
        source: {
          ...link.source,
          x0: link.source.x0 - translate,
          x1: link.source.x1 - translate,
        },
        target: {
          ...link.target,
          x0: link.target.x0 - translate / 2,
          x1: link.target.x1 - translate / 2,
        },
      };
    }
    if (link.source.category === "SDG") {
      return {
        ...link,
        source: {
          ...link.source,
          x0: link.source.x0 - translate / 2,
          x1: link.source.x1 - translate / 2,
        },
      };
    }
    return link;
  });

  return { sankeyLinks, sankeyNodes };
}

const SankeyChart: React.FC<SankeyProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { tooltip, setTooltip } = useTooltipHook();
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const aspectRatio = 1200 / 700;

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

    const sortedNodes = data.nodes.sort((a, b) => a.id - b.id);

    const { nodes, links } = modifySankeyData({ ...data, nodes: sortedNodes });
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
      .nodeSort((d) => d.id)
      .nodeAlign((d) => d.layer ?? 0)
      .extent([
        [45, 75],
        [width - 15, height - 15],
      ]);

    // Generate the sankey layout data (nodes and links)
    let { nodes: generatedNodes, links: generatedLinks } = sankeyGenerator({
      nodes: nodes.map((d: any) => ({ ...d })),
      links: links.map((d: any) => ({ ...d })),
    });

    const translateNumber: number = 40;
    const { sankeyNodes, sankeyLinks } = narrowingLayers(
      generatedNodes,
      generatedLinks,
      translateNumber
    );

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
      .attr("stroke-opacity", 0.2)
      .style("transition", "stroke-opacity 0.3s ease-in-out");

    // Define the value of the nodes
    svg
      .selectAll(".link-text")
      .data(sankeyLinks)
      .enter()
      .append("text")
      .attr("class", (d) => `link-text link-text-${d.index}`)
      .attr("x", (d: any) =>
        d.source.layer <= 1 ? d.source.x0 - 20 : d.source.x1 + 20
      )
      .attr("y", (d: any) => d.y0)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => `${Math.ceil(d.value as number)}%`)
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
      .attr("x", (d: any) => (d.layer <= 1 ? 20 : -6))
      .attr("y", (d: any) => (d.y1 - d.y0) / 2) // Position the text in the center of the node
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => (d.layer <= 1 ? "start" : "end"))
      .text((d) => d.name)
      .style("font", "12px sans-serif")
      .style("pointer-events", "none")
      .style("fill", "#000")
      .style("transition", "opacity 0.3s ease-in-out")
      .style(
        "text-shadow",
        "2px 2px 4px white, 2px -2px 4px white, -2px 2px 4px white, -2px -2px 4px white"
      )
      .attr("class", (d) => `node-text node-text-${d.index}`);

    let categoryArray = Array.from(
      { length: 5 },
      (_, index) => sankeyNodes.filter((node: any) => node.layer === index)[0]
    );

    const category = svg
      .append("g")
      .selectAll(".node")
      .data(categoryArray)
      .enter();
    const widthCategory = 160,
      heightCategory = 30;

    const categoryPosition = (layer: number) => {
      const position =
        ((categoryArray[categoryArray.length - 1].x1 as number) -
          widthCategory -
          (categoryArray[0].x0 as number)) /
        4;
      let renderPosition = (categoryArray[0].x0 as number) + layer * position;
      return renderPosition;
    };

    category
      .append("rect")
      .attr("x", (d: any) => {
        if (d.layer !== 4) {
          const firstX1 = categoryPosition(d.layer) + widthCategory;
          const secondX0 = categoryPosition(d.layer + 1);
          const positionX = firstX1 + (secondX0 - firstX1) / 2;
          return positionX;
        }
        return 0;
      })
      .attr("y", 10)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("height", heightCategory)
      .attr("width", 1)
      .style("fill", (d: any) => (d.layer !== 4 ? "#A4A4AB" : "transparent"));

    category
      .append("text")
      .attr("x", (d: any) => categoryPosition(d.layer) + widthCategory / 2)
      .attr("y", heightCategory / 2 + 10)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d: any) => {
        switch (d.layer) {
          case 0:
            return "ESG Material Impacts";
          case 1:
            return "How well are we doing?";
          case 2:
            return "What is the Priority?";
          case 3:
            return "Which SDGS can we impact?";
          case 4:
            return "Which IDG skills are needed?";
          default:
            return "";
        }
      })
      .style("fill", "#3E4C59")
      .style("font-size", "10px");

    hideTextBasedOnConstraints(svg, sankeyLinks);

    const highlight = (index: number, targetIndex?: number) => {
      // Highlighting the label
      svg.select(`.node-text-${targetIndex || index}`).style("opacity", 1);

      // Showing the node value
      svg.select(`.link-text-${index}`).style("opacity", 1);

      // Highlighting the node
      node.select(`.node-rect-${targetIndex || index}`).style("opacity", 1);

      // Highlighting the path link
      d3.select(`.node-link-${index}`).style("stroke-opacity", 1);
    };

    const recursiveHighlight = (
      links: any[],
      key: "targetLinks" | "sourceLinks"
    ) => {
      links.forEach((link: any) => {
        if (key === "targetLinks") {
          highlight(link.index, link.source.index);
          recursiveHighlight(link.source[key], key);
        } else {
          highlight(link.index, link.target.index);
          recursiveHighlight(link.target[key], key);
        }
      });
    };

    link
      .on("mouseenter", function (_, d: any) {
        node.selectAll(".node-rect").style("opacity", 0.3);
        svg.selectAll(".node-text").style("opacity", 0);
        highlight(d.index, d.source.index);
        highlight(d.index, d.target.index);
        recursiveHighlight(d.source.targetLinks, "targetLinks");
        recursiveHighlight(d.target.sourceLinks, "sourceLinks");
      })
      .on("mouseleave", function () {
        d3.selectAll(link.nodes()).style("stroke-opacity", 0.2);
        svg.selectAll(".node-text").style("opacity", 1);

        node.selectAll(".node-rect").style("opacity", 1);
        svg.selectAll(".link-text").style("opacity", 0);
        hideTextBasedOnConstraints(svg, sankeyLinks);
      });

    node
      .on("mouseenter", function (_, d: any) {
        svg.selectAll(".node-text").style("opacity", 0);
        node.selectAll(".node-rect").style("opacity", 0.3);
        highlight(d.index);
        recursiveHighlight(d.sourceLinks, "sourceLinks");
        recursiveHighlight(d.targetLinks, "targetLinks");

        // Showing description tooltip
        if (d.description) {
          setTooltip({
            visible: true,
            x: d.x0 + (d.x1 - d.x0) / 2,
            y: d.y1 + 6,
            content: d.description,
          });
        }
      })
      .on("mouseleave", function () {
        node.selectAll(".node-rect").style("opacity", 1);
        svg.selectAll(".node-text").style("opacity", 1);
        d3.selectAll(link.nodes()).style("stroke-opacity", 0.2);
        svg.selectAll(".link-text").style("opacity", 0);
        setTooltip((prev) => ({ ...prev, visible: false }));

        hideTextBasedOnConstraints(svg, sankeyLinks);
      });
  }, [data, dimensions]);

  return (
    <div
      className="relative"
      ref={wrapperRef}
      style={{ width: "100%", height: "100%" }}
    >
      <svg ref={svgRef}></svg>
      <Tooltip {...tooltip} />
    </div>
  );
};

export default SankeyChart;

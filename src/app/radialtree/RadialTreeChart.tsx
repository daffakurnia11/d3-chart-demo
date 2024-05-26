import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { assignColorsToData } from "../utils";
import { RadialTreeProps } from "./RadialTreeChartType";

const RadialTreeChart: React.FC<RadialTreeProps> = ({
  width,
  height,
  data,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 700;
    const height = 700;
    const radius = width / 2;
    const dataset = assignColorsToData(data);

    // Clear the container in case of re-render
    d3.select(svgRef.current).selectAll("*").remove();

    // Adjust the data by skipping the ROOT node
    const root = d3.hierarchy(dataset, (d: any) => d.children);

    // Create primary SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create a root for the tree layout
    const treeLayout = d3.tree<Node>().size([2 * Math.PI, radius - 200]);

    // Compute the new tree layout
    treeLayout(root);

    // Draw links (edges)
    const linkCurvedGenerator = d3
      .linkRadial<d3.HierarchyPointLink<Node>, d3.HierarchyPointNode<Node>>()
      .angle((d) => d.x)
      .radius((d) => d.y);
    const linkStraightGenerator = (d: any) => {
      return `M${d.source.y * Math.cos(d.source.x - Math.PI / 2)},${
        d.source.y * Math.sin(d.source.x - Math.PI / 2)
      }
                L${d.target.y * Math.cos(d.target.x - Math.PI / 2)},${
        d.target.y * Math.sin(d.target.x - Math.PI / 2)
      }`;
    };

    svg
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d: any) =>
        d.source.data.children.length === 5
          ? linkStraightGenerator(d)
          : linkCurvedGenerator(d)
      )
      .style("fill", "none")
      .style("stroke", "#555");

    // Draw nodes
    const nodes = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr(
        "transform",
        (d: any) => `rotate(${(d.x * 180) / Math.PI - 90})translate(${d.y},0)`
      )
      .style("opacity", 1)
      .style("transition", "opacity 0.3s ease-in-out");

    nodes
      .attr("id", (_, i: number) => `node-${i}`)
      .append("circle")
      .attr("r", 5)
      .style("fill", (d: any) => (d.data.color ? d.data.color : "transparent"));

    // Draw node percentage bars
    nodes
      .append("rect")
      .attr("x", -5) // Position based on the text
      .attr("y", "-0.5em") // Align with the text vertically
      .attr("width", (d: any) => (d.data.score / 100) * (100 - 28) + 28) // Set a fixed width or calculate based on text length
      .attr("height", "1em") // Height based on text size
      .style("fill", (d: any) =>
        d.data.name !== "ROOT" && d.parent.data.name !== "ROOT"
          ? d.data.color
          : "transparent"
      )
      .style("transition", "opacity 0.3s ease-in-out");

    // Draw node percentage labels
    nodes
      .append("text")
      .attr("dy", ".31em")
      .attr("x", (d: any) => {
        let padding: number = 20;
        return d.x < Math.PI === !d.children ? padding : -padding;
      })
      .attr("text-anchor", (d: any) =>
        d.x < Math.PI === !d.children ? "end" : "start"
      )
      .attr("transform", (d: any) => (d.x >= Math.PI ? "rotate(180)" : null))
      .text((d: any) =>
        d.data.name !== "ROOT" && d.parent.data.name !== "ROOT"
          ? d.data.score + "%"
          : ""
      )
      .style("font-size", "8px")
      .style("user-select", "none")
      .style(
        "text-shadow",
        "2px 2px 3px white, 2px -2px 3px white, -2px 2px 3px white, -2px -2px 3px white"
      )
      .style("cursor", "default")
      .style("opacity", 0)
      .style("transition", "opacity 0.3s ease-in-out");

    // Draw node labels
    nodes
      .append("text")
      .attr("dy", ".31em")
      .attr("x", (d: any) => {
        let padding: number;
        if (d.data.name !== "ROOT" && d.parent.data.name !== "ROOT") {
          padding = (d.data.score / 100) * (100 - 28) + 28;
        } else {
          padding = 6;
        }
        return d.x < Math.PI === !d.children ? padding : -padding;
      })
      .attr("text-anchor", (d: any) =>
        d.x < Math.PI === !d.children ? "start" : "end"
      )
      .attr("transform", (d: any) => (d.x >= Math.PI ? "rotate(180)" : null))
      .text((d) => (d.data.name !== "ROOT" ? d.data.name : ""))
      .style("font-size", "8px")
      .style("user-select", "none")
      .style(
        "text-shadow",
        "2px 2px 3px white, 2px -2px 3px white, -2px 2px 3px white, -2px -2px 3px white"
      )
      .style("cursor", "default")
      .style("transition", "opacity 0.3s ease-in-out");

    // Add interaction of hovering over nodes
    nodes
      .on("mouseenter", (event: any, d: any) => {
        const currentNode = d3.select(event.currentTarget);
        d3.selectAll(".node").style("opacity", 0.3);
        currentNode.style("opacity", 1);
        currentNode.select("text").style("opacity", 1);
        nodes.filter((node) => node === d.parent).style("opacity", 1);
        if (d.children) {
          d.children.forEach((child: any) => {
            let childrenNode = nodes
              .filter((node) => node === child)
              .style("opacity", 1);
            childrenNode.select("text").style("opacity", 1);
          });
        }
      })
      .on("mouseleave", () => {
        d3.selectAll(".node").style("opacity", 1);
        d3.selectAll(".node").select("text").style("opacity", 0);
      });

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data]);

  return (
    <svg width={width} height={height} viewBox="0 0 700 700">
      <svg ref={svgRef} width={"100%"} height={"100%"} />
    </svg>
  );
};

export default RadialTreeChart;

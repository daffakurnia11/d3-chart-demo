import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import data from "./data.json";

interface Node {
  name: string;
  children?: Node[];
  value?: number;
}
const colorPalette = chroma.scale("Set2").colors(8);

export function assignColorsToData(data: any, color?: string) {
  data.children.forEach((child: any, i: number) => {
    child.color = color ? color : colorPalette[i];
    if (child.children) {
      assignColorsToData(child, child.color);
    }
  });
  return data;
}

const RadialTreeChart = () => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const width = 700;
      const height = 700;
      const radius = width / 2;
      const dataset = assignColorsToData(data);

      // Clear the container in case of re-render
      d3.select(d3Container.current).selectAll("*").remove();

      // Adjust the data by skipping the ROOT node
      const root = d3.hierarchy(dataset, (d: Node) => d.children);

      // Create primary SVG container
      const svg = d3
        .select(d3Container.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Create a root for the tree layout
      const treeLayout = d3.tree<Node>().size([2 * Math.PI, radius - 130]);

      // Compute the new tree layout
      treeLayout(root);

      // Set3 color palette
      const color = chroma.scale("Set3");

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
        );

      nodes
        .append("circle")
        .attr("r", 5)
        .style("fill", (d: any) =>
          d.data.color ? d.data.color : "transparent"
        );

      // Draw node labels
      nodes
        .append("text")
        .attr("dy", ".31em")
        .attr("x", (d: any) => (d.x < Math.PI === !d.children ? 6 : -6))
        .attr("text-anchor", (d: any) =>
          d.x < Math.PI === !d.children ? "start" : "end"
        )
        .attr("transform", (d: any) => (d.x >= Math.PI ? "rotate(180)" : null))
        .text((d) => (d.data.name !== "ROOT" ? d.data.name : ""))
        .style("font-size", "10px")
        .style("user-select", "none")
        .style(
          "text-shadow",
          "2px 2px 3px white, 2px -2px 3px white, -2px 2px 3px white, -2px -2px 3px white"
        )
        .style("cursor", "default");
    }
  }, []);

  return <svg ref={d3Container} width={700} height={700} />;
};

export default RadialTreeChart;

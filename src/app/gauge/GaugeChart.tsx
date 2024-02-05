import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import dataset from "./data.json";

const GaugeChart = () => {
  const ref = useRef(null);

  useEffect(() => {
    const data: any = dataset.data;

    const width = 800;
    const height = 400;
    const innerRadius = 100;
    const outerRadius = 200;
    const borderWidth = 2; // Adjust the border width as needed
    const borderColor = "#000"; // Adjust the border color as needed

    const colorScale = chroma
      .scale(["#EEE3D2", "#EEE3D2", "#E1CFB1", "#E1CFB1", "#D4B88C", "#D4B88C"])
      .mode("lch")
      .colors(data.length);

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator: any = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pie = d3
      .pie()
      .startAngle(-Math.PI / 1.4)
      .endAngle(Math.PI / 1.4)
      .sort(null)
      .value((d: any) => d.max - d.min);

    const arcs = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("fill", (_, i) => colorScale[i])
      .attr("d", arcGenerator);

    arcs
      .append("text")
      .attr("transform", (d) => {
        const centroid = arcGenerator.centroid(d);
        const angle = (d.startAngle + d.endAngle) / 2;
        return `translate(${centroid}) rotate(${(angle * 180) / Math.PI})`;
      })
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .selectAll("tspan")
      .data((d: any) => {
        const label = d.data.label.split("-");
        return label;
      })
      .enter()
      .append("tspan")
      .text((text: any, i: number, nodes: any) => {
        const currentData = nodes[i].parentNode.__data__;
        const hiddenText: any = svg
          .append("text")
          .attr("opacity", 0)
          .style("font-size", "12px")
          .text(text);
        const textWidth = hiddenText.node().getComputedTextLength();
        hiddenText.remove();

        const maxTextWidth =
          (currentData.endAngle - currentData.startAngle) * (innerRadius - 20);

        if (textWidth > maxTextWidth) {
          const truncatedText =
            text.substring(
              0,
              Math.floor((maxTextWidth / textWidth) * text.length)
            ) + "...";
          return truncatedText;
        }

        return text;
      })
      .attr("x", 0)
      .attr("dy", (_, i) => i * 16);

    const scale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([Math.PI / 1.4, -Math.PI / 1.4]);

    const largeTicks = scale.ticks(11);
    const largeTickLength = 25;
    const smallTicks = scale.ticks(51);
    const smallTickLength = 15;

    svg
      .selectAll(".large-tick")
      .data(largeTicks)
      .enter()
      .append("line")
      .attr("class", "large-tick")
      .attr("x1", (d) => outerRadius * Math.cos(scale(d)))
      .attr("y1", (d) => outerRadius * Math.sin(scale(d)))
      .attr("x2", (d) => (outerRadius - largeTickLength) * Math.cos(scale(d)))
      .attr("y2", (d) => (outerRadius - largeTickLength) * Math.sin(scale(d)))
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("transform", `rotate(${-90})`);

    svg
      .selectAll(".small-tick")
      .data(smallTicks)
      .enter()
      .append("line")
      .attr("class", "small-tick")
      .attr("x1", (d) => outerRadius * Math.cos(scale(d)))
      .attr("y1", (d) => outerRadius * Math.sin(scale(d)))
      .attr("x2", (d) => (outerRadius - smallTickLength) * Math.cos(scale(d)))
      .attr("y2", (d) => (outerRadius - smallTickLength) * Math.sin(scale(d)))
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("transform", `rotate(${-90})`);

    // Needle dimensions
    const needleLength = outerRadius - 20; // Adjust as needed
    const needleWidth = 10; // Adjust as needed

    // Needle Value (set this to whatever value you need to point at)
    const needleValue = dataset.value; // Example value

    // Create a group for the needle
    const needleGroup = svg
      .append("g")
      .attr("class", "needle")
      .attr("transform", `translate(0, 0)`);

    // Draw the needle triangle
    const needleTriangle: any = [
      { x: 0, y: -needleLength }, // Tip of the triangle
      { x: -needleWidth, y: 0 }, // Left point of the base
      { x: needleWidth, y: 0 }, // Right point of the base
      { x: 0, y: -needleLength }, // Closing point to complete the triangle
    ];

    const needlePath = d3
      .line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
      .curve(d3.curveLinearClosed); // Connect the points to close the path

    needleGroup
      .append("path")
      .attr("class", "needle")
      .attr("d", needlePath(needleTriangle))
      .attr("fill", "#7B8794");

    // Draw the needle circle base with a white border
    needleGroup
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", needleWidth + 2) // Adjust the border width as needed
      .attr("fill", "white"); // Set the border color to white

    // Draw the main circle for the needle
    needleGroup
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", needleWidth)
      .attr("fill", "#7B8794"); // Set the main color of the needle

    // Rotate the needle
    const rotationScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([-Math.PI / 1.4, Math.PI / 1.4]);

    const needleRotation = rotationScale(needleValue);

    needleGroup
      .transition()
      .duration(1500) // Transition time in milliseconds
      .attr("transform", `rotate(${(needleRotation * 180) / Math.PI})`);
  }, []);

  return <svg ref={ref} />;
};

export default GaugeChart;

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import {
  GaugeDataType,
  GaugeDatasetType,
  GaugeProps,
  GenerateDatasetType,
} from "./GaugeChartType";

const generateDataset = (data: GaugeDataType, index: number) => {
  const { value } = data.data[index];
  let dataArray: GaugeDatasetType[] = [];
  let increament = 0;
  for (let i = 0; i < data.parameter.length; i++) {
    dataArray.push({
      label: data.parameter[i].label,
      min: increament,
      max: increament + data.parameter[i].value,
    });
    increament = increament + data.parameter[i].value;
  }

  return {
    value,
    data: dataArray,
  };
};

const GaugeChart: React.FC<GaugeProps> = ({
  data,
  width = 800,
  height = 800,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const dataset: GenerateDatasetType = generateDataset(data, 0);

    const width = 800;
    const height = 400;
    const innerRadius = 100;
    const outerRadius = 200;

    const colorScale = chroma
      .scale(["#535554", "#5D6768", "#01474F", "#206970", "#0097B2", "#A9EDF8"])
      .mode("lch")
      .colors(6);

    const svg = d3
      .select(svgRef.current)
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
      .data(pie(dataset.data as any))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("fill", (_, i) => colorScale[i])
      .attr("d", arcGenerator);

    // Separator lines
    const separatorLines = arcs.data().map((d: any, i) => {
      return {
        angle: d.endAngle,
        label: data.data[i].label, // Assuming your data items have a 'label' property
        stroke: i !== data.data.length - 1,
      };
    });

    // Draw the separator lines
    separatorLines.forEach((d) => {
      // Convert the angle from radians to degrees
      const degrees = (d.angle * 180) / Math.PI;
      svg
        .append("line")
        .attr("y1", -innerRadius)
        .attr("y2", -outerRadius)
        .attr("stroke", d.stroke ? "black" : "transparent")
        .attr("stroke-width", 1)
        .attr("transform", `rotate(${degrees})`);
    });

    arcs
      .append("text")
      .attr("transform", (d) => {
        const centroid = arcGenerator.centroid(d);
        const angle = (d.startAngle + d.endAngle) / 2;
        return `translate(${centroid}) rotate(${(angle * 180) / Math.PI})`;
      })
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .selectAll("tspan")
      .data((d: any) => d.data.label)
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
      });

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

    // Add text value
    svg
      .append("text")
      .attr("class", "gauge-value")
      .attr("x", 0)
      .attr("y", innerRadius / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "2em")
      .attr("font-weight", "bold")
      .text(`${needleValue}%`);
  }, [data]);

  // return <svg ref={ref} />;
  return (
    <svg width={width} height={height} viewBox="0 0 800 400">
      <svg ref={svgRef} width={"100%"} height={"100%"} />
    </svg>
  );
};

export default GaugeChart;

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";

const GaugeChart = () => {
  const ref = useRef(null);

  useEffect(() => {
    const data: any = [
      { label: "Deteriorating", min: 0, max: 25 },
      { label: "Inhibiting", min: 25, max: 45 },
      { label: "Entropic", min: 45, max: 60 },
      { label: "Scalable", min: 60, max: 75 },
      { label: "Innovative", min: 75, max: 90 },
      { label: "Regenerative", min: 90, max: 100 },
    ];

    const width = 800;
    const height = 400;
    const innerRadius = 100;
    const outerRadius = 200;
    const colorScale = chroma.scale("Spectral").colors(data.length);

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

    svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("fill", (d, i) => colorScale[i])
      .attr("d", arcGenerator);

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
  }, []);

  return <svg ref={ref} />;
};

export default GaugeChart;

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";

const GaugeChart = () => {
  const ref = useRef(null);

  useEffect(() => {
    const data: any = [
      { label: "Deteriorating-(Apathic)", min: 0, max: 25 },
      { label: "Inhibiting-(Non Compliant)", min: 25, max: 45 },
      { label: "Entropic-(Formal)", min: 45, max: 60 },
      { label: "Scalable-(Compliant)", min: 60, max: 75 },
      { label: "Innovative-(Enrolled)", min: 75, max: 90 },
      { label: "Regenerative-(Committed)", min: 90, max: 100 },
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
  }, []);

  return <svg ref={ref} />;
};

export default GaugeChart;



import * as d3 from 'd3';
import '../style/style.css';

import DonutChart from './DonutChart';


Promise.all([d3.csv('./H-1B_Disclosure_Data_FY17.csv')])
	.then(([error,data]) => {
		const g = svg.selectAll(".arc")
		      .data(pie(data))
		    .enter().append("g")
		      .attr("class", "arc");

		  g.append("path")
		      .attr("d", arc)
		      .style("fill", function(d) { return color(d.SOC_TYPE); });

		  g.append("text")
		      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		      .attr("dy", ".35em")
		      .text(function(d) { return d.SOC_TYPE; });


		  d3.select('#occupation-distribution')
		  	.datum(data)
		  	.each(DonutChart);


	});


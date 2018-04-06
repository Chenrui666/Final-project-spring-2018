import * as d3 from 'd3';
import '../style/style.css';

function DonutChart(_){

	//let _value = () => {};

	function exports(data){
		const root = this;

		console.log(this);

		console.log(data);

		const width = root.clientWidth;
		const height = root.clientHeight;
		const radius = Math.min(width, height) / 2;
		const thickness = 20;

		const color = d3.scaleOrdinal(d3.schemeCategory20);

		const arc = d3.arc()
		    .outerRadius(radius)
		    .innerRadius(radius - thickness);

		const pie = d3.pie()
		    .sort(null)
		    .value(function(d){
		    	return d.value;
		    });

		const svg = d3.select(root)
			.selectAll('svg')
			.data([1])
		 .append('svg')
		    .attr("width", width)
		    .attr("height", height)
		.append('g')
		    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		 
	    const g = svg.selectAll(".arc")
		      .data(pie(data))
		    .enter().append("g")
		      .attr("class", "arc");

		   g.append("path")
		      .attr("d", arc)
		      .style('fill','red');
		      //.style("fill", function(d) { return color(d.occupation); });
	



	}

	/*
	exports.value = function(fn){
		if (typeof fn === 'undefined') return _value;
		_value = fn;
		return this;
	}
	*/


	return exports;

}
export default DonutChart;


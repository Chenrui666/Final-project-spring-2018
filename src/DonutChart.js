import * as d3 from 'd3';
import '../style/style.css';

function DonutChart(_){

	let _value = () => {};

	function exports(data,i){
		const root = this;

		const width = root.clientWidth;
		const height = root.clientHeight;
		const radius = Math.min(width, height) / 2;

		const color = d3.scaleOrdinal(d3.schemeCategory20);

		const arc = d3.svg.arc()
		    .outerRadius(radius - 10)
		    .innerRadius(radius - 70);

		const pie = d3.layout.pie()
		    .sort(null)
		    .value(_value );

		const svg = d3.select(root)
			.selectAll('svg')
			.data([1])
		 .append('svg')
		    .attr("width", width)
		    .attr("height", height)
		.append('g')
		    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		 
	


	}

}
export default DonutChart;
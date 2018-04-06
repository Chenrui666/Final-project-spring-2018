import * as d3 from 'd3';

const svg= d3.select('svg'),
	width = 
	height = 

const color = d3.scaleOrdinal(d3.schemeCategory20);

const simulation = d3.forceSimulation()
	.force('charge', de.forceManyBody().strength(5))
	.force('center', d3.forceCenter(Width/2,height/2))
	.force('collision', d3.forceCollide().radius()

d3.csv('H-1B_Disclosure_Data_FY17.csv', function(error,graph){
	if(error) throw error;

	const node = svg.append('g')
		.attr('class','nodes')
		.selectAll('circle')
		.data(graph.nodes)
		.enter().append('circle')
			.attr('r',5)
			.attr('fill', function(d){return color(d.SOC_CODE);})
})
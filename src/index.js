

import * as d3 from 'd3';
import '../style/style.css';

import {parse} from './utils.js';

import DonutChart from './DonutChart';


// Promise.all([d3.csv('./H-1B_Disclosure_Data_FY17.csv')], parse)
// 	.then(([error,data]) => {

// 		console.log(data);
			



// 	});

Promise.all([
  d3.csv('./H-1B_Disclosure_Data_FY17.csv', parse)
 ]).then(([H1B]) => {

//console.log(H1B);

const H1BOccupation = d3.nest()
	.key(function(d){
		return d.occupation;
	})
	.rollup(function(v){
		return v.length
	})
	.entries(H1B);



console.log(H1BOccupation);

	const root = this;



		const width = 1000;
		const height = 1000;
		const radius = Math.min(width, height) / 4;
		const thickness = 20;

		const color = d3.scaleOrdinal(d3.schemeCategory20);
		const svg = d3.select('#occupation-distribution')
			.append('svg')
			.attr('class', 'pie')
			.attr('width', width)
			.attr('height', height);

		const g = svg.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arc = d3.arc()
		    .outerRadius(radius)
		    .innerRadius(radius - thickness);

		const pie = d3.pie()
		    .sort(null)
		    .value(function(d){
		    	return d.value;
		    });

		const path = g.selectAll('path')
				.data(pie(H1BOccupation))
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc)
				  .attr('fill', function(d) { return color(d.occupation);});



d3.select('#occupation-distribution')
	.datum(H1BOccupation)
	.each(DonutChart);



 })
 
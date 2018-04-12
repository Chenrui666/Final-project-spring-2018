

import * as d3 from 'd3';
import '../style/style.css';

import {parse, parse2} from './utils.js';

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
		return v.length;
	})
	.entries(H1B);



console.log(H1BOccupation);

	const root = this;



		const width = 1000;
		const height = 1000;
		const radius = Math.min(width, height) / 2;
		const thickness = 20;

		// const color = d3.scaleOrdinal(d3.schemeCategory20);
		const color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e"]);

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
		    })
		    // .colors(function(d){ return color(d.occupation; });

		const path = g.selectAll('path')
				.data(pie(H1BOccupation))
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc)
				  .attr('fill', function(d,i) { return color(d.data.occupation);})
				  .attr('stroke', 'white')
				  .attr('stroke-width', '3px');






 });

Promise.all([
  d3.csv('./H-1B_Disclosure_Data_FY17.csv', parse2)
 ]).then(([States]) => {

 	const H1BStates = d3.nest()
 		.key(function(d){
 				return d.state;

 		})
 		.rollup(function(v){
 			return v.length;
 		})
 		.entries(States);
 		console.log(H1BStates);




		const width = 1000;
		const height = 1000;
		const radius = Math.min(width, height) / 4;
		const thickness = 20;

		// const color = d3.scaleOrdinal(d3.schemeCategory20);
		const color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e"]);

		const svg = d3.select('#state-distribution')
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
		    })
		    // .colors(function(d){ return color(d.occupation; });

		const path = g.selectAll('path')
				.data(pie(H1BStates))
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc)
				  .attr('fill', function(d,i) { return color(d.state);})
				  .attr('stroke', 'white')
				  .attr('stroke-width', '3px');




 })
 
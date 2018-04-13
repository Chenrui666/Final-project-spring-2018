

import * as d3 from 'd3';
import '../style/style.css';

import {parse, parse2} from './utils.js';

// import DonutChart from './DonutChart';




Promise.all([
  d3.csv('./H-1B_Disclosure_Data_FY17.csv', parse)
 ]).then(([H1B, States]) => {

//console.log(H1B);

const H1BOccupation = d3.nest()
	.key(function(d){
		return d.state;
	})
	// .rollup(function(v){ return v.length})
	.key(function(d){
		return d.occupation;
	})
	.rollup(function(v){
		return {
			count:v.length
			// sum: d3.sum(v, function(d) { return parseFloat(d.count);})
		};
	})
	.entries(H1B);
	console.log(H1BOccupation);


const occupationTotals = d3.nest()

	// .rollup(function(v){ return v.length})
	.key(function(d){
		return d.occupation;
	})
	.rollup(function(v){
		return {
			count:v.length,
		};
	})
	.entries(H1B);
console.log(occupationTotals);

// console.log(H1BOccupation);



	const root = this;



		const width = 800;
		const height = 800;
		const radius = Math.min(width, height) / 5;
		const radius2 = Math.min(width, height) / 2-10;

		const thickness = 30;
		const thickness2 = 30;
		const cornerRadius = 10;
		const padAngle = 0.0015;
		const arc2Over = d3.arc()
			.innerRadius(radius2 + 10)
			.outerRadius(radius2 - thickness2 + 5)
			.cornerRadius(cornerRadius)
		    .padAngle(padAngle);



		// const color = d3.scaleOrdinal();
		const color = d3.scaleOrdinal(["red", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "red","ffb5c5", "pink","cd919e","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e"]);

		const svg = d3.select('#occupation-distribution')
			.append('svg')
			.attr('class', 'pie')
			.attr('width', width)
			.attr('height', height);

		const g1 = svg.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arc1 = d3.arc()
		    .outerRadius(radius)
		    .innerRadius(radius - thickness)
		    .cornerRadius(cornerRadius)
		    .padAngle(padAngle);

		const pie1 = d3.pie()
		    .sort(null)
		   
		    .value(function(d){
		    	return d.value.count;
		    });

		const path1 = g1.selectAll('path')
				.data(pie1(occupationTotals))
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc1)
				  .attr('fill', function(d,i) { 
				  	return color(i);
				  });
   				
				

           

	//the outer states donut
		const g2 = svg.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arc2 = d3.arc()
		    .outerRadius(radius2)
		    .innerRadius(radius2 - thickness2)
		    .cornerRadius(cornerRadius)
		    .padAngle(padAngle);

		const pie2 = d3.pie()
		    .sort(null)
		    .value(function(d){
		    	let sum = 0;
		    	d.values.forEach(function(dd) {
		    		sum += dd.value.count;
		    	})
		    	// console.log(sum);
		    	return sum;

		    	// return d.value;
		    })
		    // .colors(function(d){ return color(d.occupation; });

let changeState = 0;
		const path2 = g2.selectAll('path')
				.data(pie2(H1BOccupation))
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc2)
				  .attr('fill', function(d,i) { return color(i);})				  
				  // .attr('stroke', 'white')
				  // .attr('stroke-width', '3px')
				  .on('click', function(d){

				  	
				      d3.select(this).transition()
				        .duration(100)
				        .attr("d", arc2Over);

				  	// if(changeState == 0){
				  	// 	d3.select(this).transition()
				   //      .duration(200)
				   //      .attr('d', arc2Over);
				   //      console.log(changeState);
				   //      changeState = 1;
				   //      console.log(changeState);
				       
				  	// }
				  	// else{
				  	// 	d3.select(this).transition()
				   //      .duration(200)
				   //      .attr('d', arc2Over)
				   //      .transition()
				   //      .duration(1000)
				   //      .attr('d', arc2);

				   //      changeState = 0;
				  	// }
  
				      

				      // d3.select('path1')
				      // .data(pie1(H1BOccupation))
				      // .attr()
				    });
				  // .on('mouseout', function(){
				  //     d3.select(this).transition()
				  //       .duration(100)
				  //       .attr("d", arc2);
				     
				    
				  //   });

			





 });




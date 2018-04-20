

import * as d3 from 'd3';
import '../style/style.css';

import {parse, parse2} from './utils.js';

// import DonutChart from './DonutChart';




Promise.all([
  d3.csv('./Clean_H-1B_Disclosure_Data_FY17.csv', parse)
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
	.key(function(d){
		return d.state;
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

		const thickness = 20;
		const cornerRadius = 10;
		const padAngle = 0.0015;
		const arc2Over = d3.arc()
			.innerRadius(radius2 + 10)
			.outerRadius(radius2 - thickness + 5)
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
		    // .sort(null)
		   .value(function(d){
		    	let sum = 0;
		    	d.values.forEach(function(dd) {
		    		sum += dd.value.count;
		    	})
		    	return sum;

		    });

		const path1 = g1.selectAll('path')
				.data(pie1(occupationTotals))
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc1)
				  // .attr('fill', function(d,i) {return color(i); })
				  .attr('fill', '#5bcaff');
   				
				

           

	//the outer states donut
		const g2 = svg.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arc2 = d3.arc()

		    .outerRadius(radius2*.75)
		    .innerRadius(radius2*.75 - thickness)
		    .cornerRadius(cornerRadius)
		    .padAngle(padAngle);

		const pie2 = d3.pie()
		    // .sort(null)
		    .value(function(d){
		    	let sum = 0;
		    	d.values.forEach(function(dd) {
		    		sum += dd.value.count;
		    	})
		    	// console.log(sum);
		    	return sum;

		    	// return d.value;
		    });
		    // .colors(function(d){ return color(d.occupation; });

		const State = function(){
			const currentState = arc2;
			return function(){
				currentState == arc2 ? arc2Over : arc2;
				d3.select(this).attr('d', currentState);
			}

		};

		// const State = (function(){
		// 	const currentState = 'arc2';
		// 	return function(){
		// 		if (currentState === 'arc2'){
		// 			return currentState == 'arc2Over';
		// 		}
		// 		else {return currentState == 'arc2';}
		// 		d3.select(this).attr('d', currentState);
		// 	}

		// })();

		const path2 = g2.selectAll('path')
				.data(pie2(H1BOccupation))
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc2)
				  .attr('fill', '#feaa64');
				  // .on('click', State);
				
	var outerArc = d3.arc()
                .outerRadius(radius2 * 0.65)
                .innerRadius(radius2 * 0.65);	
 function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
var label = g2.selectAll('text')
                .data(pie2(H1BOccupation))
              .enter()
              .append('g').append('text')
                .attr('dy', '.35em')
                .style("font-size", "12px")
                .html(function(d) {
                    // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                    return d.state + ': <tspan>' + d.value + '</tspan>';
                })
                .attr("transform", function(d) {  
    var c = outerArc.centroid(d);
    return "translate(" + c[0]*1.2 +"," + c[1]*1.2 + ")";
 })
                .style('text-anchor', function(d) {
                    // if slice centre is on the left, anchor text to start, otherwise anchor to end
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });


 });




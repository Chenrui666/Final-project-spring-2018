

import * as d3 from 'd3';
import '../style/style.css';

import {parse, parse2} from './utils.js';

// import DonutChart from './DonutChart';




Promise.all([
  d3.csv('./Clean_H-1B_Disclosure_Data_FY17.csv', parse)
 ]).then(([H1B]) => {

const byState = d3.nest()
  .key(d => d.state)
  .key(d => d.category)

  .rollup(d => d.length)
  .entries(H1B);

const byStatePie = (d3.pie()
  .value(state => d3.sum(state.values, d => d.value)))(byState)
  .map(state => {
    //A second level of pie layout
    const pie = d3.pie()
      .startAngle(state.startAngle)
      .endAngle(state.endAngle)
      .value(d => d.value);
    
    return {
      startAngle: state.startAngle,
      endAngle: state.endAngle,
      value: state.value,
      state: state.data.key,
      values: pie(state.data.values)
    }
  })
  

  


const byJob = d3.nest()
  .key(d => d.category)
  .key(d => d.state)

  .rollup(d => d.length)
  .entries(H1B);

const byJobPie = (d3.pie()
  .value(cate => d3.sum(cate.values, d => d.value)))(byJob)
  .map(cate => {
    //A second level of pie layout
    const pie = d3.pie()
      .startAngle(cate.startAngle)
      .endAngle(cate.endAngle)
      .value(d => d.value);
    
    return {
      startAngle: cate.startAngle,
      endAngle: cate.endAngle,
      value: cate.value,
      category: cate.data.key,
      values: pie(cate.data.values)
    }
  })

 //console.log(byStatePie);
  console.log(byJob);

// const testx = byStatePie
// 	.map(function(d){
// 	console.log(d);
	
// 	return {
// 		...d.values
// 	};
// });
// console.log(testx);


//console.log(testx);


	const root = this;



		const width = 800;
		const height = 800;
		const radius = Math.min(width, height) / 5;
		const radius2 = Math.min(width, height) / 2;

		const thickness = 20;
		const cornerRadius = 10;
		const padAngle = 0.0015;

		const arcOver = d3.arc()
			.outerRadius(radius + 8)
			.innerRadius(radius - thickness + 3)
			.cornerRadius(cornerRadius)
		    .padAngle(padAngle);

		const arc2Over = d3.arc()
			.outerRadius(radius2*.75 + 8)
			.innerRadius(radius2*.75 - thickness + 3)
			.cornerRadius(cornerRadius)
		    .padAngle(padAngle);



		// const color = d3.scaleOrdinal();
		const colorSet3 = d3.scaleOrdinal(d3.schemeSet3);
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
				.data(byJobPie)
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc1)
				  // .attr('fill', function(d,i) {return color(i); })
				  .attr('fill', '#5bcaff')
				  .on("mouseover", function(d){
  console.log(d);
				      d3.select(this).transition()
				        .duration(200)
				        .attr("d", arcOver)
				        .style("fill", "#01a7fb");

				  		let pieData = d.values;
				  		console.log(pieData);
				  		
let thisJobPie = d3.pie()
  .value(function(dd) { return dd.data.value; });

console.log(thisJobPie);

						gh.selectAll('path').data(thisJobPie(pieData))
							.enter()
							.append('g')
							.append('path')
							  .attr('d', arch)
							  .attr('fill', function(d,i) {return colorSet3(i); })
							  .exit().remove();

						// pathh.exit().remove();
						// byJob.forEach(function(b) {
						// 	if(d.category === b.key) {
						// 		pieData = b.values;
						// 	} 
						// 	// let vals = d.values;
						// 	// console.log(vals);
						// });
						// console.log(pieData);

				  }).on("mouseout", function(){

				  	gh.selectAll('path').remove();
				      d3.select(this).transition()
				        .duration(100)
				        .attr("d", arc1)
				   		.style("fill", '#5bcaff');
				    
				    });

   				
				

           

	//the outer states donut
		const g2 = svg.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arc2 = d3.arc()

		    .outerRadius(radius2*.75)
		    .innerRadius(radius2*.75 - thickness)
		    .cornerRadius(cornerRadius)
		    .padAngle(padAngle);
		    // .startAngle(function(state) { return state.startAngle; })
		    // .endAngle(function(state) { return state.endAngle; });

		// const pie2 = d3.pie()
		//     // .sort(null)
		//     .value(function(d){
		//     	let sum = 0;
		//     	d.values.forEach(function(dd) {
		//     		sum += dd.value.count;
		//     	})
		//     	// console.log(sum);
		//     	return sum;

		//     	// return d.value;
		//     });
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
				.data(byStatePie)
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc2)
				  .attr('fill', '#feaa64')
				  .on("mouseover", function(d){
  
				      d3.select(this).transition()
				        .duration(200)
				        .attr("d", arc2Over)
				        .style("fill", "#ef810a");
				  }).on("mouseout", function(){
				      d3.select(this).transition()
				        .duration(100)
				        .attr("d", arc2)
				   		.style("fill", '#feaa64');
				    
				    });

///////////the hover pies//////////
const gh = svg.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arch = d3.arc()
		    .outerRadius(radius/2)
		    .innerRadius(0)
		    .padAngle(padAngle);

		const pieh = d3.pie()
		    // .sort(null)
		   
		     .value(function(d){
		    	let sum = 0;
		    	d.values.forEach(function(dd) {
		    		sum += dd.value.count;
		    	})
		    	return sum;

		    });

		// const pathh = gh.selectAll('path')
		// 		.data(byJobPie)
		// 		.enter()
		// 		.append('g')
		// 		.append('path')
		// 		  .attr('d', arch)
		// 		  .attr('fill', function(d,i) {return colorSet3(i); })
		
//////////////////////the outer labels////////////////////
		const outerArc = d3.arc()
                .outerRadius(radius2 * 0.65)
                .innerRadius(radius2 * 0.65);	
 		const midAngle = function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
		const label = g2.selectAll('text')
                .data(byStatePie)
              .enter()
              .append('g').append('text')
                .attr('dy', '.35em')
                .style("font-size", "12px")
                

                .html(function(d,error) {
                    if (d.value < 150) {return null}
                    	else
                    {return d.state + ': <tspan>' + d.value + '</tspan>'};
                })
                .attr("transform", function(d) {  
  					const c = outerArc.centroid(d);
    				return "translate(" + c[0]*1.2 +"," + c[1]*1.2 + ")";
 				})
                .style('text-anchor', function(d) {
                    // if slice centre is on the left, anchor text to start, otherwise anchor to end
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });

//////////////////////the inner labels////////////////////
		const occuArc = d3.arc()
                .outerRadius(radius * 0.7)
                .innerRadius(radius * 0.7);	
		const occuLabel = g1.selectAll('text')
                .data(byJobPie)
              .enter()
              .append('g').append('text')
                .attr('dy', '.35em')
                .style('font-size', '12px')
                

                // .html(function(d) {
                // 	return wr
                //     return d.category + ': <tspan>' + d.value + '</tspan>';
                // })
                .attr("transform", function(d) {  
  					const c = occuArc.centroid(d);
    				return "translate(" + c[0]*1.5 +"," + c[1]*1.5 + ")";
 				})
                .style('text-anchor', function(d) {
                    // if slice centre is on the left, anchor text to start, otherwise anchor to end
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                })
                .text(function(d) { return d.category; })
                // .selectAll('text')
                .call(wrap, '200');




function wrap(textG, width) {
console.log(width);
  textG.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")

    while (word = words.pop()) {
    	console.log(word)
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
      }
    }
  })
}


// var getAngle = function (d) {
//     return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
// };

// const label = g2.selectAll('text')
//                 .data(byStatePie)
//               .enter()
//               .append('g').append("text")
//               .style("font-size", "10px")
//     .attr("transform", function(d) { 
//             return "translate(" + outerArc.centroid(d) + ") " +
//                     "rotate(" + getAngle(d) + ")"; }) 
//     .attr("dy", 5) 
//     .style("text-anchor", "start")
//     .text(function(d) { return d.state + d.value ; });


// var r = 75;
// var theta = 45;

// // Convert polar to cartesian
// const x = radius2 * Math.cos(theta);
// const y = radius2 * Math.sin(theta);



// console.log(x,y);

////////////////////////////dots for occupation///////////////
		// const dotsArc = d3.arc()
  //               .outerRadius(radius * 0.65)
  //               .innerRadius(radius * 0.65);	
		// const g3 = svg.append('g')
		// 	.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
		// const dots = g3.selectAll('circle')
		// 	.data(byJobPie)
		// 	.enter()
		// 	.append('circle')
		// 	.attr('r', 2)
		// 	.attr('fill', '#5bcaff')
		// 	.attr("transform", function(d) {  
		//   					const c = dotsArc.centroid(d);
		//     				return "translate(" + c[0]*1.6 +"," + c[1]*1.6 + ")";
		//  				});


		



			// .attr("transform", function(d) {  

			// 				const Ag = d.values.startAngle + (d.values.endAngle-d.values.startAngle)/2;
			// 				const x = width/2 + radius2/2*Math.cos(Ag);
			// 				const y = height/2 + radius2/2*Math.sin(Ag);

		 //    				return "translate(" + x +"," + y + ")";
		 // 


		 

 });




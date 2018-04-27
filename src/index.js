

import * as d3 from 'd3';
import '../style/style.css';

import {parse, parse2} from './utils.js';





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

 


	const root = this;



		const width = 800;
		const height = 800;
		const radius = Math.min(width, height) / 3.2;
		const radius2 = Math.min(width, height) / 2;

		const thickness = 30;
		const thickness2 = 60;
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
		// const color = d3.scaleOrdinal(["red", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "red","ffb5c5", "pink","cd919e","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "ffc0cb","ffb5c5", "eea9b8","cd919e"]);
		
		const svg = d3.select('#occupation-distribution')
			.selectAll('svg')
			.data([1]); 
		const svgEnter = svg.enter().append('svg')
			.attr('width',width)
			.attr('height',height);
		svgEnter.append('g').attr('class','plot')

		const plot = svg.merge(svgEnter)
			.select('.plot');
		

////////////////////////////occupation dunut/////inner////////////////////
		const g1 = plot.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arc1 = d3.arc()
		    .outerRadius(radius)
		    .innerRadius(radius - thickness)
		    .cornerRadius(cornerRadius)
		    .padAngle(padAngle);

		// const pie1 = d3.pie()
		//     // .sort(null)
		   
		//      .value(function(d){
		//     	let sum = 0;
		//     	d.values.forEach(function(dd) {
		//     		sum += dd.value.count;
		//     	})
		//     	return sum;

		//     });

		const path1 = g1.selectAll('path')
				.data(byJobPie)
				.enter()
				.append('g')
				.append('path')
				  .attr('d', arc1)
				  .attr('fill', '#5bcaff')
				  .on("mouseover", function(d){
				      d3.select(this).transition()
				        .duration(200)
				        .attr("d", arcOver)
				        .style("fill", "#01a7fb");

				    let pieData = d.values;
				  		
					let thisJobPie = d3.pie()
						// .sort(null)
  						.value(function(dd) { return dd.data.value; });


					gh.selectAll('path').data(thisJobPie(pieData))
						.attr('class', '.hoverPie')
						.enter()
						.append('g')
						.append('path')
						  .attr('d', arch)
						  .attr('fill', function(d,i) {return colorSet3(i); });
						


							  textTop.text(d.category)
							  .call(wrap, 220);
							  textBottom.text(d.value);


					gh.selectAll('text')
					.attr('class', '.hoverLabel')

		                .data(thisJobPie(pieData))
		              .enter()
		              .append('g').append('text')
		                .attr('dy', '.35em')
		                .style("font-size", "12px")
		                
					.text(function(d) {
						console.log(d);
						const standard = d.endAngle-d.startAngle;
						// console.log(standard);
		                    if (standard < 0.07) {return null}
		                    	else
		                    {return d.data.data.key };
            	    })
		                // .text(function(d){return d.value})
		                .attr("transform", function(d) {  
		  					const c = outerArc.centroid(d);
		    				return "translate(" + c[0]*.7 +"," + c[1]*.7 + ")";
		 				})
		                .style('text-anchor', function(d) {
		                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
		                });





                              
				  })

				 .on("mouseout", function(){

				  	gh.selectAll('path').remove();
				  	gh.selectAll('text').remove();
				      d3.select(this).transition()
				        .duration(100)
				        .attr("d", arc1)
				   		.style("fill", '#5bcaff');

				   		textTop.text('Hover over the slices to see the detail');
     					textBottom.text(null);
				    
				    });

				

           

	//////////////////////////the outer states donut/////////////////////
		const g2 = plot.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arc2 = d3.arc()

		    .outerRadius(radius2*.75)
		    .innerRadius(radius2*.75 - thickness)
		    .cornerRadius(cornerRadius)
		    .padAngle(padAngle);
		    

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

				        let pieData = d.values;
				  		
					let thisJobPie = d3.pie()
						// .sort(null)
  						.value(function(dd) { return dd.data.value; });


					gh.selectAll('path').data(thisJobPie(pieData))
						.attr('class', '.hoverPie')
						.enter()
						.append('g')
						.append('path')
						  .attr('d', arch)
						  .attr('fill', function(d,i) {return colorSet3(i); });
						


							  textTop.text(d.state)
							  .call(wrap, 220);
							  textBottom.text(d.value);




					gh.selectAll('text')
					.attr('class', '.hoverLabel')

		                .data(thisJobPie(pieData))
		              .enter()
		              .append('g').append('text')
		                .attr('dy', '.35em')
		                .style("font-size", "12px")
		                
						.text(function(d) {
							const standard = d.endAngle-d.startAngle;
			                    if (standard < 0.3) {return null}
			                    	else
			                    {return d.data.data.key };
	            	    })
		                .attr("transform", function(d) {  
		  					const c = outerArc.centroid(d);
		    				return "translate(" + c[0]*.5 +"," + c[1]*.5 + ")";
		 				})
		                .style('text-anchor', function(d) {
		                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
		                })
		                .call(wrapForOccu, 140);


				  })


				  .on("mouseout", function(){
				      d3.select(this).transition()
				        .duration(100)
				        .attr("d", arc2)
				   		.style("fill", '#feaa64');


				   	gh.selectAll('path').remove();
				   	gh.selectAll('text').remove();

				      
				     

			   		textTop.text('Hover over the slices to see the detail');
 					textBottom.text(null);
				    
				    
				    });

///////////the hover pies//////////
		const gh = plot.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		const arch = d3.arc()
		    .outerRadius(radius*.7)
		    .innerRadius(radius*.7 - thickness2)
		    .padAngle(padAngle*2);

		const textTop = plot.append('text')
			 .attr("dy", ".35em")
	 		 .style("text-anchor", "middle")
	   		 .attr("font-size", '18px')
		     .attr("fill", "black")
	         .attr("x", width / 2)
	    	 .attr("y", height/ 2 - 28)
	    	 .text('Hover over the slices to see the detail');

		const textBottom = plot.append('text')
			 .attr("dy", ".35em")
	 		 .style("text-anchor", "middle")
	   		 .attr("font-size", '25px')
		     .attr("fill", "black")
	         .attr("x", width / 2)
	    	 .attr("y", height/ 2+ 36);

		
//////////////////////the outer labels////////////////////
		const outerArc = d3.arc()
                .outerRadius(radius2 * 0.65)
                .innerRadius(radius2 * 0.65);	
 		const midAngle = function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
		// const label = g2.selectAll('text')
  //               .data(byStatePie)
  //             .enter()
  //             .append('g').append('text')
  //               .attr('dy', '.35em')
  //               .style("font-size", "12px")
                

  //               .html(function(d,error) {
  //                   if (d.value < 150) {return null}
  //                   	else
  //                   {return d.state + ': <tspan>' + d.value + '</tspan>'};
  //               })
  //               .attr("transform", function(d) {  
  // 					const c = outerArc.centroid(d);
  //   				return "translate(" + c[0]*1.2 +"," + c[1]*1.2 + ")";
 	// 			})
  //               .style('text-anchor', function(d) {
  //                   // if slice centre is on the left, anchor text to start, otherwise anchor to end
  //                   return (midAngle(d)) < Math.PI ? 'start' : 'end';
  //               });

//////////////////////the inner labels////////////////////
		// const occuArc = d3.arc()
  //               .outerRadius(radius * 0.7)
  //               .innerRadius(radius * 0.7);	
		// const occuLabel = g1.selectAll('text')
  //               .data(byJobPie)
  //             .enter()
  //             .append('g').append('text')
  //               .attr('dy', '.35em')
  //               .style('font-size', '12px')
                

  //               // .html(function(d) {
  //               // 	return wr
  //               //     return d.category + ': <tspan>' + d.value + '</tspan>';
  //               // })
  //               .attr("transform", function(d) {  
  // 					const c = occuArc.centroid(d);
  //   				return "translate(" + c[0]*1.5 +"," + c[1]*1.5 + ")";
 	// 			})
  //               .style('text-anchor', function(d) {
  //                   // if slice centre is on the left, anchor text to start, otherwise anchor to end
  //                   return (midAngle(d)) < Math.PI ? 'start' : 'end';
  //               })
  //               .text(function(d) { return d.category; })
  //               .selectAll('text')
  //               .call(wrap, '200');



////////////////////////wrapping text function////////perfectly working///////////////////
				function wrap(textG, width) {
				  textG.each(function() {
				    var text = d3.select(this),
				        words = text.text().split(/\s+/).reverse(),
				        word,
				        line = [],
				        lineNumber = 0,
				        lineHeight = 1.1, // ems
				        x= text.attr('x'),
				        y = text.attr("y"),
				        dy = parseFloat(text.attr("dy")),
				        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em")

				    while (word = words.pop()) {
				      line.push(word)
				      tspan.text(line.join(" "))
				      if (tspan.node().getComputedTextLength() > width) {
				        line.pop()
				        tspan.text(line.join(" "))
				        line = [word]
				        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
				      }
				    }
				  })
				}



				function wrapForOccu(textG, width) {
				  textG.each(function() {
				    var text = d3.select(this),
				        words = text.text().split(/\s+/).reverse(),
				        word,
				        line = [],
				        lineNumber = 0,
				        lineHeight = 1.1, // ems
				        x= text.attr('x'),
				        y = text.attr("y"),
				        dy = parseFloat(text.attr("dy")),
				        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")

				    while (word = words.pop()) {
				      line.push(word)
				      tspan.text(line.join(" "))
				      if (tspan.node().getComputedTextLength() > width) {
				        line.pop()
				        tspan.text(line.join(" "))
				        line = [word]
				        tspan = text.append("tspan").attr("x", 0).attr("y", `${++lineNumber * lineHeight + y}`).attr("dy", `${++lineNumber * 0.5 + dy}em`).text(word)
				      }
				    }
				  })
				}

//////////////////////////////////////////////////////////////////////////////////////////


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




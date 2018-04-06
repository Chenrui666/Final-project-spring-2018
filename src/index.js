

import * as d3 from 'd3';
import '../style/style.css';

import DonutChart from './DonutChart';


Promise.all([d3.csv('./H-1B_Disclosure_Data_FY17.csv')])
	.then(([error,data]) => {
		

		  d3.select('#occupation-distribution')
		  	.datum(data)
		  	.each(DonutChart);


	});


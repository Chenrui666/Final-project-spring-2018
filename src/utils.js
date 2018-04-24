

import * as d3 from 'd3';

export const parse = d => {

	return {
		state: d.CLEAN_WORKSITE_STATE,
 	    category:d.CLEAN_SOC_TYPE
		// occupation: d.CLEAN_SOC_TYPE,
		// state: d.CLEAN_WORKSITE_STATE,
		// wage: d.PREVAILING_WAGE,
		// status: d.CASE_STATUS


	};
}

export const parse2 = d => {

	return {
		state: d.WORKSITE_STATE


	};
}

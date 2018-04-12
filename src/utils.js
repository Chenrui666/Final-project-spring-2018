

import * as d3 from 'd3';

export const parse = d => {

	return {
		occupation: d.SOC_TYPE,
		state: d.WORKSITE_STATE


	};
}

export const parse2 = d => {

	return {
		state: d.WORKSITE_STATE


	};
}

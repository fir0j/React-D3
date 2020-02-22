import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const red = '#eb6a5b';
const blue = '#52b6ca';

class LineChart extends Component {
	// this state is same as writing this.state = {} inside constructor lifeCycle Method. it's not local variable.
	state = {
		highs: null, // svg path command for all the high temps
		lows: null, // svg path command for low temps,

		// d3 will return the following functions for us
		xScale: d3.scaleTime().range([ margin.left, width - margin.right ]),
		yScale: d3.scaleLinear().range([ height - margin.bottom, margin.top ]),
		lineGenerator: d3.line()
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
		const { data } = nextProps;
		const { xScale, yScale, lineGenerator } = prevState;

		// data has changed, so recalculate scale domains
		const timeDomain = d3.extent(data, (d) => d.date);
		const tempMax = d3.max(data, (d) => d.high);
		xScale.domain(timeDomain);
		yScale.domain([ 0, tempMax ]);

		// constant parameter
		lineGenerator.x((d) => xScale(d.date));

		// calculate d attribute for path to draw lines based on LineGenerator.x()
		// blue line
		lineGenerator.y((d) => yScale(d.low));
		const lows = lineGenerator(data);
		// red line
		lineGenerator.y((d) => yScale(d.high));
		const highs = lineGenerator(data);

		// return to merge them with our state Object
		return { lows, highs };
	}

	xAxis = d3.axisBottom().scale(this.state.xScale).tickFormat(d3.timeFormat('%b'));
	yAxis = d3.axisLeft().scale(this.state.yScale).tickFormat((d) => `${d}℉`);

	componentDidUpdate() {
		d3.select(this.refs.xAxisRef).call(this.xAxis);
		d3.select(this.refs.yAxisRef).call(this.yAxis);
	}

	render() {
		return (
			<div className="flex justify-center w-full">
				<svg className="border w-full max-w-screen-xl h-screen90 " viewBox={`0 0 ${width} ${height}`}>
					<path d={this.state.highs} fill="none" stroke={red} strokeWidth="2" />
					<path d={this.state.lows} fill="none" stroke={blue} strokeWidth="2" />
					<g>
						<g ref="xAxisRef" transform={`translate(0, ${height - margin.bottom})`} />
						<g ref="yAxisRef" transform={`translate(${margin.left}, 0)`} />
					</g>
				</svg>
			</div>
		);
	}
}

export default LineChart;

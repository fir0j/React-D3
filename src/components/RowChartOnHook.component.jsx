import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// how to add event listners using hook ?
// how to fetch data before components mounts using hook ?

const data = [
	{ skill: 'CSS', value: 80 },
	{ skill: 'HTML', value: 70 },
	{ skill: 'JS', value: 85 },
	{ skill: 'ANGULAR', value: 90 },
	{ skill: 'REACT', value: 75 },
	{ skill: 'D3', value: 70 },
	{ skill: 'NODE JS', value: 65 },
	{ skill: 'JAVA', value: 65 },
	{ skill: 'UI DESIGN', value: 70 },
	{ skill: 'XD', value: 65 }
];

const yAxisAttribute = 'skill';
const xAxisAttribute = 'value';

export const RowChartOnHook = () => {
	const chartRef = useRef();

	const drawChart = () => {
		let margin = { top: 20, right: 30, bottom: 40, left: 90 };
		let width = chartRef.current.parentElement.offsetWidth - margin.left - margin.right;
		let height = chartRef.current.parentElement.offsetHeight - margin.top - margin.bottom;

		// append the svg object to the body of the page
		let svg = d3
			.select('.rowChart')
			// or .select(chartRef.current)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// Add X axis
		let xScale = d3.scaleLinear().domain([ 0, 100 ]).range([ 0, width ]);
		svg
			.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.attr('class', 'axis x')
			.call(d3.axisBottom(xScale))
			.selectAll('text')
			.attr('transform', 'translate(-10,0)rotate(-45)')
			.style('text-anchor', 'end');

		// Add Y axis
		let yScale = d3.scaleBand().range([ 0, height ]).domain(data.map((d) => d[yAxisAttribute])).padding(0.1);
		svg.append('g').attr('class', 'axis y').call(d3.axisLeft(yScale)).selectAll('text').attr('dy', null);

		// Add Bars
		svg
			.selectAll('myRect')
			.data(data)
			.enter()
			.append('rect')
			.on('mouseover', function() {
				d3.select('rect').style('opacity', 0.5);
			})
			.on('mouseout', function() {
				d3.select(this).style('opacity', 1);
			})
			.attr('x', xScale(0))
			.attr('y', (d) => yScale(d[yAxisAttribute]))
			.attr('width', 0)
			.attr('height', yScale.bandwidth() - 10)
			.attr('fill', '#DF337D')
			.transition(d3.transition().duration(1000))
			.attr('width', (d) => xScale(d[xAxisAttribute]));
	};

	useEffect(() => {
		drawChart();
		window.addEventListener('resize', () => {
			d3.select('.rowChart svg').remove();
			drawChart();
		});
	}, []);

	return (
		<div className="bg-white w-full max-w-screen-xl h-screen90 text-center m-auto">
			<div className="rowChart" ref={chartRef} />
		</div>
	);
};

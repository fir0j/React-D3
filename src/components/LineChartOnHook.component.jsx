import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const red = '#eb6a5b';
const blue = '#52b6ca';

const LineChartOnHook = () => {
	const xAxisRef = useRef();
	const yAxisRef = useRef();
	const [ data, setData ] = useState('');
	const [ temperature, setTemperature ] = useState({
		highs: null,
		lows: null
	});

	// fetching data using newer javascript
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				'https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json'
			);
			const result = await response.json();
			const processedResult = result.map((item) => Object.assign(item, { date: new Date(item.date) }));
			setData(processedResult);
		};

		fetchData();
	}, []);

	// another hook is required to log the asynchronously fetched data.
	// logging into the same useEffect will not be able to fectch result due to asynchronous code execution.
	useEffect(
		() => {
			console.log(data);
		},
		[ data ]
	);

	// generating path data
	useEffect(
		() => {
			const timeDomain = d3.extent(data, (d) => d.date);
			const tempMax = d3.max(data, (d) => d.high);
			const xScale = d3.scaleTime().domain(timeDomain).range([ margin.left, width - margin.right ]);
			const yScale = d3.scaleLinear().domain([ 0, tempMax ]).range([ height - margin.bottom, margin.top ]);

			const getLowsLinePath = d3.line().x((d) => xScale(d.date)).y((d) => yScale(d.low));
			const getHighsLinePath = d3.line().x((d) => xScale(d.date)).y((d) => yScale(d.high));
			const lows = getLowsLinePath(data);
			const highs = getHighsLinePath(data);

			// return to merge them with our state Object
			setTemperature({ lows, highs });
		},
		[ data ]
	);

	// drawing axes
	useEffect(
		() => {
			// d3.select(reactRef or any css selector)
			const xScale = d3.scaleTime().range([ margin.left, width - margin.right ]);
			const yScale = d3.scaleLinear().range([ height - margin.bottom, margin.top ]);
			const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat('%b'));
			const yAxis = d3.axisLeft().scale(yScale).tickFormat((d) => `${d}℉`);
			d3.select(xAxisRef.current).call(xAxis);
			d3.select(yAxisRef.current).call(yAxis);
		},
		[ data ]
	);

	return (
		<div className="flex justify-center w-full">
			<svg className="border w-full max-w-screen-xl h-screen90 " viewBox={`0 0 ${width} ${height}`}>
				<path d={temperature.highs} fill="none" stroke={red} strokeWidth="2" />
				<path d={temperature.lows} fill="none" stroke={blue} strokeWidth="2" />
				<g>
					<g ref={xAxisRef} transform={`translate(0, ${height - margin.bottom})`} />
					<g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
				</g>
			</svg>
		</div>
	);
};

export default LineChartOnHook;
